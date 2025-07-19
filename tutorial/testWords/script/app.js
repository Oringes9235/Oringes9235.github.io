import { loadJSON, generateTestWords, checkAnswer } from './utils.js';

// DOM元素
const homePage = document.getElementById('home-page');
const testPage = document.getElementById('test-page');
const levelsContainer = document.getElementById('levels-container');
const settingsBtn = document.getElementById('settings-btn');
const scoreboard = document.getElementById('scoreboard');
const correctCount = document.getElementById('correct-count');
const incorrectCount = document.getElementById('incorrect-count');
const exitBtn = document.getElementById('exit-btn');
const question = document.getElementById('question');
const answerInput = document.getElementById('answer-input');
const result = document.getElementById('result');
const checkBtn = document.getElementById('check-btn');
const exitModal = document.getElementById('exit-modal');
const confirmExit = document.getElementById('confirm-exit');
const cancelExit = document.getElementById('cancel-exit');
const resultModal = document.getElementById('result-modal');
const finalCorrect = document.getElementById('final-correct');
const finalIncorrect = document.getElementById('final-incorrect');
const accuracy = document.getElementById('accuracy');
const restartBtn = document.getElementById('restart-btn');
const homeBtn = document.getElementById('home-btn');
const successSound = document.getElementById('success-sound');

// 应用状态
let currentLevel = null;
let testWords = [];
let currentWordIndex = 0;
let correctAnswers = 0;
let incorrectAnswers = 0;
let isChecking = false;

// 初始化应用
async function initApp() {
    try {
        const levels = await loadJSON('./json/levellist.json');
        if (!levels) throw new Error('无法加载等级列表');
        renderLevelCards(levels);
    } catch (error) {
        console.error('初始化失败:', error);
        document.getElementById('levels-container').addEventListener('click', (e) => {
            const arrow = e.target.closest('.level-arrow');
            if (!arrow) return;
            const levelCard = arrow.closest('.level-card');
            const levelId = levelCard.dataset.levelId;
            startTest(levelId);
        });
    }
    // 使用事件委托监听点击
    document.getElementById('levels-container').addEventListener('click', (e) => {
        // 检查是否点击了箭头或箭头所在的元素
        const arrow = e.target.closest('[data-testid="level-arrow"], .level-arrow');
        
        if (arrow) {
            const levelCard = arrow.closest('.level-card');
            if (levelCard) {
                const levelId = levelCard.dataset.levelId;
                console.log('准备加载等级:', levelId);  // 调试用
                startTest(levelId);
            }
        }
    });
    // 绑定结果弹窗按钮事件
    document.getElementById('restart-btn').addEventListener('click', async () => {
        resultModal.querySelector('.modal-content').classList.add('slide-out');
        document.body.classList.remove('blur');
        
        setTimeout(async () => {
            resultModal.classList.add('hidden');
            await startTest(currentLevel.id);  // 重新开始当前级别测试
        }, 300);
    });

    document.getElementById('home-btn').addEventListener('click', () => {
        resultModal.querySelector('.modal-content').classList.add('slide-out');
        document.body.classList.remove('blur');
        
        setTimeout(() => {
            resetTest();
            homePage.classList.remove('hidden');
            testPage.classList.add('hidden');
            resultModal.classList.add('hidden');
        }, 300);
    });
    document.getElementById('exit-btn').addEventListener('click', () => {
        // 显示退出确认弹窗
        document.getElementById('exit-modal').classList.remove('hidden');
        document.body.classList.add('blur');
        
        // 添加动画效果
        document.querySelector('#exit-modal .modal-content').classList.add('slide-in');
    });

    // 确认退出按钮
    document.getElementById('confirm-exit').addEventListener('click', () => {
        resetTest();
        document.getElementById('home-page').classList.remove('hidden');
        document.getElementById('test-page').classList.add('hidden');
        document.getElementById('exit-modal').classList.add('hidden');
        document.body.classList.remove('blur');
    });

    // 取消退出按钮
    document.getElementById('cancel-exit').addEventListener('click', () => {
        document.getElementById('exit-modal').classList.add('hidden');
        document.body.classList.remove('blur');
    });
}

// 渲染等级卡片
function renderLevelCards(levels) {
    levelsContainer.innerHTML = '';
    
    levels.forEach(level => {
        const levelCard = document.createElement('div');
        levelCard.className = 'level-card';
        levelCard.dataset.levelId = level.id;
        
        levelCard.innerHTML = `
            <div class="level-info">
                <div class="level-title">${level.title}</div>
                <div class="level-tags">
                    ${level.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                <div class="level-word-count">词汇量: ${level.wordCount}</div>
            </div>
            <div class="level-arrow" data-testid="level-arrow"><i class="fas fa-arrow-right"></i></div>  <!-- 添加data属性便于识别 -->
        `;
        
        levelsContainer.appendChild(levelCard);
    });
}

// 添加事件监听器
function addEventListeners() {
    // 等级卡片点击事件
    levelsContainer.addEventListener('click', async (e) => {
        const levelCard = e.target.closest('.level-card');
        if (!levelCard) return;
        
        const levelId = levelCard.dataset.levelId;
        await startTest(levelId);
    });
    
    // 检查按钮点击事件
    checkBtn.addEventListener('click', checkUserAnswer);
    
    // 输入框回车事件
    answerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkUserAnswer();
        }
    });
    
    // 退出按钮点击事件
    exitBtn.addEventListener('click', () => {
        exitModal.classList.remove('hidden');
        document.body.classList.add('blur');
    });
    
    // 确认退出按钮点击事件
    confirmExit.addEventListener('click', () => {
        resetTest();
        homePage.classList.remove('hidden');
        testPage.classList.add('hidden');
        exitModal.classList.add('hidden');
        document.body.classList.remove('blur');
    });
    
    // 取消退出按钮点击事件
    cancelExit.addEventListener('click', () => {
        exitModal.classList.add('hidden');
        document.body.classList.remove('blur');
    });
    
    // 再来一次按钮点击事件
    restartBtn.addEventListener('click', async () => {
        resultModal.querySelector('.modal-content').classList.add('slide-out');
        document.body.classList.remove('blur');
        
        setTimeout(async () => {
            resultModal.classList.add('hidden');
            await startTest(currentLevel.id);
        }, 300);
    });
    
    // 返回首页按钮点击事件
    homeBtn.addEventListener('click', () => {
        resultModal.querySelector('.modal-content').classList.add('slide-out');
        document.body.classList.remove('blur');
        
        setTimeout(() => {
            resetTest();
            homePage.classList.remove('hidden');
            testPage.classList.add('hidden');
            resultModal.classList.add('hidden');
        }, 300);
    });
}

// 开始测试
async function startTest(levelId) {
    console.log('startTest被调用，levelId:', levelId);
    if (!levelId) {
        console.error('无效的levelId');
        return;
    }
    // 加载等级数据
    const levels = await loadJSON('./json/levellist.json');
    if (!levels) return;
    
    currentLevel = levels.find(level => level.id === levelId);
    if (!currentLevel) return;
    
    // 加载单词数据
    const words = await loadJSON(`./json/words/${currentLevel.wordsFile}`);
    if (!words) return;
    
    // 生成测试单词
    testWords = generateTestWords(words, currentLevel.wordCount);
    currentWordIndex = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    
    // 更新计分板
    updateScoreboard();
    
    // 动画切换页面
    homePage.classList.add('slide-out-left');
    
    setTimeout(() => {
        homePage.classList.add('hidden');
        homePage.classList.remove('slide-out-left');
        
        testPage.classList.remove('hidden');
        testPage.classList.add('slide-in-right');
        
        setTimeout(() => {
            testPage.classList.remove('slide-in-right');
            scoreboard.classList.remove('hidden');
            showNextWord();
        }, 500);
    }, 500);
}

// 显示下一个单词
function showNextWord() {
    if (currentWordIndex >= testWords.length) {
        showTestResults();
        return;
    }
    
    const currentWord = testWords[currentWordIndex];
    isChecking = false;
    
    // 设置问题
    if (currentWord.isEnglishToChinese) {
        question.textContent = currentWord.english;
    } else {
        question.textContent = currentWord.chinese;
    }
    
    // 重置输入和结果
    answerInput.value = '';
    answerInput.style.color = '';
    answerInput.disabled = false;
    answerInput.focus();
    result.textContent = '';
    
    // 重置按钮
    checkBtn.textContent = '检查';
    checkBtn.style.marginTop = '0';
    checkBtn.onclick = checkUserAnswer;
}

// 检查用户答案
function checkUserAnswer() {
    if (isChecking) {
        // 如果正在检查状态，点击"下一个"按钮
        currentWordIndex++;
        showNextWord();
        return;
    }
    
    const userAnswer = answerInput.value.trim();
    if (!userAnswer) return;
    
    const currentWord = testWords[currentWordIndex];
    const isCorrect = checkAnswer(userAnswer, currentWord);
    
    // 更新计分板
    if (isCorrect) {
        correctAnswers++;
        answerInput.style.color = 'var(--correct-color)';
    } else {
        incorrectAnswers++;
        answerInput.style.color = 'var(--incorrect-color)';
    }
    
    updateScoreboard();
    
    // 显示完整信息
    let fullInfo = '';
    if (currentWord.isEnglishToChinese) {
        fullInfo = `${currentWord.english} (${currentWord.partOfSpeech}): ${currentWord.chinese}`;
    } else {
        fullInfo = `${currentWord.chinese}: ${currentWord.english} (${currentWord.partOfSpeech})`;
    }
    
    result.textContent = fullInfo;
    
    // 禁用输入并更改按钮
    answerInput.disabled = true;
    checkBtn.textContent = '下一个';
    checkBtn.style.marginTop = '20px';
    isChecking = true;
}

// 更新计分板
function updateScoreboard() {
    correctCount.textContent = correctAnswers;
    incorrectCount.textContent = incorrectAnswers;
}

// 显示测试结果
function showTestResults() {
    const total = correctAnswers + incorrectAnswers;
    const accuracyValue = total > 0 ? Math.round((correctAnswers / total) * 100) : 0;
    
    finalCorrect.textContent = correctAnswers;
    finalIncorrect.textContent = incorrectAnswers;
    accuracy.textContent = `${accuracyValue}%`;
    
    // 播放成功音效（如果正确率大于80%）
    if (accuracyValue > 80) {
        successSound.play();
    }
    
    // 显示结果弹窗
    resultModal.classList.remove('hidden');
    document.body.classList.add('blur');
    resultModal.querySelector('.modal-content').classList.remove('slide-out');
    resultModal.querySelector('.modal-content').classList.add('slide-in');
}

// 重置测试
function resetTest() {
    currentLevel = null;
    testWords = [];
    currentWordIndex = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;
    isChecking = false;
    
    // 重置UI
    question.textContent = '';
    answerInput.value = '';
    answerInput.style.color = '';
    answerInput.disabled = false;
    result.textContent = '';
    checkBtn.textContent = '检查';
    checkBtn.style.marginTop = '0';
    scoreboard.classList.add('hidden');
}

// 初始化应用
document.addEventListener('DOMContentLoaded', initApp);