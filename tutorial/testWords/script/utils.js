/**
 * 从JSON文件加载数据
 * @param {string} url JSON文件路径
 * @returns {Promise<any>} 解析后的JSON数据
 */
async function loadJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading JSON:', error);
        return null;
    }
}

/**
 * 随机打乱数组顺序
 * @param {Array} array 要打乱的数组
 * @returns {Array} 打乱后的数组
 */
function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

/**
 * 从单词列表中生成测试用的单词数组
 * @param {Word[]} words 单词列表
 * @param {number} count 要生成的测试单词数量
 * @returns {TestWord[]} 测试用的单词数组
 */
function generateTestWords(words, count) {
    const shuffledWords = shuffleArray(words);
    const testWords = [];
    
    for (let i = 0; i < Math.min(count, shuffledWords.length); i++) {
        const word = shuffledWords[i];
        const isEnglishToChinese = Math.random() > 0.5;
        
        // 随机选择一个中文释义和对应的词性
        const index = Math.floor(Math.random() * word.chinese.length);
        
        testWords.push({
            english: word.english,
            chinese: word.chinese[index],
            partOfSpeech: word.partsOfSpeech[index],
            isEnglishToChinese,
            wordData: word // 保留原始单词数据
        });
    }
    
    return testWords;
}

/**
 * 检查用户答案是否正确
 * @param {string} userAnswer 用户输入的答案
 * @param {TestWord} testWord 测试的单词
 * @returns {boolean} 是否正确
 */
function checkAnswer(userAnswer, testWord) {
    const userAnswerLower = userAnswer.trim().toLowerCase();
    
    if (testWord.isEnglishToChinese) {
        // 英译中：检查用户答案是否匹配任何中文释义
        return testWord.wordData.chinese.some(chinese => 
            chinese.toLowerCase() === userAnswerLower
        );
    } else {
        // 中译英：检查用户答案是否匹配英文单词
        return userAnswerLower === testWord.english.toLowerCase();
    }
}

export { loadJSON, shuffleArray, generateTestWords, checkAnswer };