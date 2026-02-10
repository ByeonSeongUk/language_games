export type Language = 'en' | 'ko';

export interface Translations {
  // Header & Footer
  appTitle1: string;
  appTitle2: string;
  back: string;
  footerText: string;

  // Home Screen
  homeSubtitle: string;
  sectionChart: string;
  sectionGame: string;
  kanaChart: string;
  kanaChartDesc: string;
  kana: string;
  kanaDesc: string;
  words: string;
  wordsDesc: string;
  kanji: string;
  kanjiDesc: string;
  comingSoon: string;

  // Setup Screen (Kana)
  gameSettings: string;
  characterType: string;
  hiragana: string;
  katakana: string;
  both: string;
  gameMode: string;
  typing: string;
  quiz4: string;
  selectRows: string;
  characters: string;
  startGame: string;

  // Chart Screen
  basicGojuon: string;
  dakutenHandakuten: string;

  // Word Setup Screen
  wordGameSettings: string;
  jlptLevel: string;
  meaningToWord: string;
  wordToMeaning: string;
  language: string;
  english: string;
  korean: string;
  questions: string;
  wordsAvailable: string;
  wordsUnit: string;

  // Game
  score: string;
  accuracy: string;
  streak: string;
  typeRomaji: string;
  enter: string;
  correct: string;
  wrong: string;
  answer: string;
  next: string;

  // Result Screen
  perfect: string;
  excellent: string;
  good: string;
  keepPracticing: string;
  tryAgain: string;
  total: string;
  reviewMissedCharacters: string;
  reviewMissedWords: string;
  yours: string;
  playAgain: string;
  changeSettings: string;
  home: string;

  // Common
  selectAll: string;
  clearAll: string;
}

const en: Translations = {
  // Header & Footer
  appTitle1: 'Nihongo',
  appTitle2: ' Master',
  back: '← Back',
  footerText: 'Nihongo Master v0.5',

  // Home Screen
  homeSubtitle: 'Select a category to start learning',
  sectionChart: 'Charts',
  sectionGame: 'Games',
  kanaChart: 'Kana Chart',
  kanaChartDesc: 'View all characters',
  kana: 'Kana',
  kanaDesc: 'Hiragana & Katakana',
  words: 'Words',
  wordsDesc: 'JLPT N5-N3 Vocabulary',
  kanji: 'Kanji',
  kanjiDesc: 'Chinese Characters',
  comingSoon: 'Coming Soon',

  // Setup Screen (Kana)
  gameSettings: 'Game Settings',
  characterType: 'Character Type',
  hiragana: 'Hiragana',
  katakana: 'Katakana',
  both: 'Both',
  gameMode: 'Game Mode',
  typing: 'Typing',
  quiz4: 'Quiz (4)',
  selectRows: 'Select Rows',
  characters: 'characters',
  startGame: 'Start Game',

  // Chart Screen
  basicGojuon: 'Basic (Gojuon)',
  dakutenHandakuten: 'Dakuten & Handakuten',

  // Word Setup Screen
  wordGameSettings: 'Word Game Settings',
  jlptLevel: 'JLPT Level',
  meaningToWord: 'Meaning → Word',
  wordToMeaning: 'Word → Meaning',
  language: 'Language',
  english: 'English',
  korean: '한국어',
  questions: 'Questions',
  wordsAvailable: 'words available',
  wordsUnit: 'words',

  // Game
  score: 'Score',
  accuracy: 'Accuracy',
  streak: 'Streak',
  typeRomaji: 'Type romaji...',
  enter: 'Enter',
  correct: 'Correct',
  wrong: 'Wrong',
  answer: 'Answer:',
  next: 'Next →',

  // Result Screen
  perfect: 'Perfect!',
  excellent: 'Excellent!',
  good: 'Good',
  keepPracticing: 'Keep Practicing',
  tryAgain: 'Try Again',
  total: 'Total',
  reviewMissedCharacters: 'Review Missed Characters',
  reviewMissedWords: 'Review Missed Words',
  yours: 'yours:',
  playAgain: 'Play Again',
  changeSettings: 'Change Settings',
  home: 'Home',

  // Common
  selectAll: 'Select All',
  clearAll: 'Clear All',
};

const ko: Translations = {
  // Header & Footer
  appTitle1: '일본어',
  appTitle2: ' 마스터',
  back: '← 뒤로',
  footerText: '일본어 마스터 v0.5',

  // Home Screen
  homeSubtitle: '학습할 카테고리를 선택하세요',
  sectionChart: '문자표',
  sectionGame: '게임',
  kanaChart: '가나 표',
  kanaChartDesc: '모든 문자 보기',
  kana: '가나',
  kanaDesc: '히라가나 & 가타카나',
  words: '단어',
  wordsDesc: 'JLPT N5-N3 어휘',
  kanji: '한자',
  kanjiDesc: '한자 학습',
  comingSoon: '출시 예정',

  // Setup Screen (Kana)
  gameSettings: '게임 설정',
  characterType: '문자 유형',
  hiragana: '히라가나',
  katakana: '가타카나',
  both: '모두',
  gameMode: '게임 모드',
  typing: '직접 입력',
  quiz4: '4지선다',
  selectRows: '행 선택',
  characters: '글자',
  startGame: '게임 시작',

  // Chart Screen
  basicGojuon: '기본 (오십음)',
  dakutenHandakuten: '탁음 & 반탁음',

  // Word Setup Screen
  wordGameSettings: '단어 게임 설정',
  jlptLevel: 'JLPT 레벨',
  meaningToWord: '뜻 → 단어',
  wordToMeaning: '단어 → 뜻',
  language: '언어',
  english: 'English',
  korean: '한국어',
  questions: '문제 수',
  wordsAvailable: '단어 사용 가능',
  wordsUnit: '단어',

  // Game
  score: '점수',
  accuracy: '정확도',
  streak: '연속',
  typeRomaji: '로마지 입력...',
  enter: '확인',
  correct: '정답',
  wrong: '오답',
  answer: '정답:',
  next: '다음 →',

  // Result Screen
  perfect: '완벽!',
  excellent: '훌륭!',
  good: '좋음',
  keepPracticing: '계속 연습하세요',
  tryAgain: '다시 도전',
  total: '전체',
  reviewMissedCharacters: '틀린 문자 복습',
  reviewMissedWords: '틀린 단어 복습',
  yours: '내 답:',
  playAgain: '다시 하기',
  changeSettings: '설정 변경',
  home: '홈',

  // Common
  selectAll: '전체 선택',
  clearAll: '전체 해제',
};

export const translations: Record<Language, Translations> = { en, ko };
