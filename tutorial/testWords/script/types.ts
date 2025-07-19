interface Level {
    id: string;
    title: string;
    tags: string[];
    wordCount: number;
    wordsFile: string;
}

interface Word {
    id: string;
    english: string;
    chinese: string[];
    partsOfSpeech: string[];
}

interface TestWord {
    english: string;
    chinese: string;
    partOfSpeech: string;
    isEnglishToChinese: boolean;
    wordData: Word;
}