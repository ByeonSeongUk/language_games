# 일본어 학습 앱 (Nihongo Master)

## 프로젝트 개요
일본어 독학을 위한 웹 기반 학습 앱. 히라가나/카타카나 문자 퀴즈와 JLPT N5~N3 단어장 기능이 구현되어 있으며, 문법 학습, 한자 모드 등을 단계적으로 확장 중이다.

## 기술 스택
- **프레임워크:** CRA + React 19
- **언어:** TypeScript (strict)
- **스타일링:** CSS Modules + CSS 변수 (Atom Dark 테마)
- **배포:** GitHub Pages (`/language_games/`)
- **i18n:** 자체 Context 기반 (en/ko)

## 명령어

```bash
npm start          # 개발 서버 (포트 3000)
npm run build      # 프로덕션 빌드 → /build
npm test           # Jest 테스트 (watch 모드)
npm run deploy     # 빌드 + GitHub Pages 배포
```

> Windows에서 포트 3000이 사용 중일 경우: `set PORT=3001 && npm start` (cmd) 또는 `$env:PORT=3001; npm start` (PowerShell)

## 프로젝트 구조
```
src/
├── components/
│   ├── common/           # 재사용 UI (Button, CheckboxGrid, ToggleGroup)
│   ├── game/             # 게임 진행 UI (CharacterDisplay, FeedbackOverlay, ScoreDisplay, TypingMode, MultipleChoiceMode, ProgressBar, WordMultipleChoice)
│   ├── layout/           # 공통 레이아웃 (Header, Footer)
│   └── screens/          # 화면 단위 (Home, Setup, Game, Result, Chart, WordSetup, WordGame, WordResult)
├── data/
│   ├── types.ts          # 모든 TypeScript 인터페이스 (중앙 관리)
│   ├── index.ts          # 가나 데이터 유틸 (getCharactersByRows, getRows)
│   ├── hiragana.ts       # 히라가나 KanaSet (15행)
│   ├── katakana.ts       # 카타카나 KanaSet (15행)
│   └── words/
│       ├── index.ts      # 단어 데이터 유틸 (getWordsByLevels, getWordCount)
│       ├── n5.ts         # JLPT N5 단어
│       ├── n4.ts         # JLPT N4 단어
│       └── n3.ts         # JLPT N3 단어
├── hooks/
│   ├── useGameState.ts       # 가나 게임 상태 (useReducer)
│   └── useWordGameState.ts   # 단어 게임 상태 (useReducer)
├── i18n/
│   ├── index.ts              # 내보내기 barrel
│   ├── LanguageContext.tsx    # LanguageProvider + useLanguage 훅
│   └── translations.ts       # Translations 인터페이스 + en/ko 객체
├── styles/
│   ├── animations.css        # 공통 애니메이션
│   └── theme.ts              # JS 테마 객체 (CSS 변수와 동일 값)
├── utils/
│   └── gameLogic.ts          # shuffle, isCorrectAnswer, generateOptions
├── App.tsx                   # 화면 전환 (Screen union type + useState)
├── index.css                 # CSS 변수 정의 (Atom Dark 테마)
└── index.tsx                 # 엔트리 포인트
```

## 현재 구현 완료된 기능
- [x] 히라가나 퀴즈 (직접 입력 / 4지선다)
- [x] 카타카나 퀴즈 (직접 입력 / 4지선다)
- [x] 가나 표 (오십음도 + 탁음/반탁음)
- [x] JLPT N5~N3 단어 퀴즈 (뜻→단어 / 단어→뜻)
- [x] 한/영 UI 전환 (i18n)

## 아키텍처

### 화면 전환
라우터 없이 `App.tsx`에서 `Screen` union type + `useState`로 관리한다.
```typescript
type Screen = 'home' | 'setup' | 'game' | 'result' | 'chart'
            | 'wordSetup' | 'wordGame' | 'wordResult';
```
`<GameScreen key={Date.now()} />`로 새 게임마다 컴포넌트를 강제 리마운트하여 `useReducer` 상태를 초기화한다.

### 게임 상태
`useReducer` 패턴의 커스텀 훅 2개:
- `useGameState(config)` — 가나 게임 (`SUBMIT_ANSWER`, `NEXT_QUESTION`)
- `useWordGameState(config)` — 단어 게임 (동일 액션 패턴)

공통 유틸은 `gameLogic.ts`에 집중: `shuffle`, `isCorrectAnswer`, `generateOptions`.

오답 생성(`generateOptions`)은 혼동하기 쉬운 문자(같은 모음/자음)를 우선 선택한다.
대체 로마지 허용: shi=si, chi=ti, tsu=tu, fu=hu, ji=zi, wo=o, n=nn (`ROMAJI_ALTERNATIVES`).

### i18n
자체 Context 기반 시스템. `LanguageProvider`가 앱을 감싸고, 컴포넌트에서 `useLanguage()` 훅으로 사용한다.
```typescript
const { t, language, setLanguage } = useLanguage();
```
언어 설정은 `localStorage` 키 `nihongo-master-lang`에 저장된다.

새 UI 문자열 추가 시: `Translations` 인터페이스 → `en` 객체 → `ko` 객체 순서로 추가.

### 데이터
- **가나:** `KanaSet` = `KanaRow[]`, 각 행에 `KanaCharacter[]` (character, romaji, rowId)
- **단어:** `Word` = { expression, reading, meaning, meaningKo? }
- **타입:** 모든 인터페이스는 `src/data/types.ts`에서 중앙 관리

### 스타일링
CSS Modules 전용. 색상은 반드시 CSS 변수를 사용한다 (하드코딩 금지).

주요 CSS 변수: `--bg-primary`, `--bg-secondary`, `--text-primary`, `--accent-blue`, `--accent-green`, `--accent-red` 등 (`src/index.css` 정의).

JS에서 색상이 필요하면 `src/styles/theme.ts`의 `theme` 객체를 사용한다.

## 코딩 규칙

### 컴포넌트 구조
```
1. Import (React → CSS Module → types → hooks → components → i18n)
2. Props 인터페이스 (ComponentNameProps)
3. export default function ComponentName() { ... }
```

### 네이밍
| 대상 | 규칙 | 예시 |
|------|------|------|
| 컴포넌트 파일 | PascalCase | `GameScreen.tsx` |
| 훅 파일 | camelCase | `useGameState.ts` |
| 데이터 파일 | lowercase | `n5.ts` |
| CSS 클래스 | camelCase | `.topBar`, `.scoreArea` |
| 상태 클래스 | 의미 기반 | `.correct`, `.wrong`, `.disabled` |
| Props 타입 | 접미사 Props | `GameScreenProps` |
| 콜백 prop | onXxx | `onFinish`, `onQuit` |
| 데이터 상수 | UPPER_CASE | `HIRAGANA`, `KATAKANA` |
| 컴포넌트 내 매핑 | PascalCase | `TYPE_LABELS` |

### Export 스타일
- 컴포넌트: `export default function` (default export)
- 데이터/유틸/훅: named export (`export const`, `export function`)

### 상태 관리
- 단순 상태: `useState` (화면 전환, UI 토글)
- 복잡한 게임 로직: `useReducer` in custom hook
- 커스텀 훅: `useMemo`로 초기 상태, `useCallback`으로 dispatch wrapper

### 기타
- Public assets: `process.env.PUBLIC_URL` prefix 필수 (GitHub Pages subpath)
- Union type 선호, `any` 사용 금지
- CRA ESLint: import 문은 export 문보다 먼저 위치

## 새 기능 추가 가이드

### 새 화면 추가
1. `src/components/screens/NewScreen.tsx` + `NewScreen.module.css` 생성
2. 복잡한 상태 → `src/hooks/useNewScreenState.ts` (useReducer 패턴)
3. `App.tsx`의 `Screen` union type에 추가 + 조건부 렌더링
4. Setup → Game → Result 흐름이 필요하면 각각 별도 컴포넌트

### 새 단어 레벨 추가
1. `src/data/words/n2.ts` 생성 — `export const n2Words: Word[]`
2. `src/data/words/index.ts`의 `wordsByLevel`에 추가, `availableLevels` 배열에 추가
3. `WordSetupScreen.tsx`에서 레벨 선택지에 반영

### 새 번역 키 추가
1. `src/i18n/translations.ts`의 `Translations` 인터페이스에 키 추가
2. `en` 객체에 영어 값 추가
3. `ko` 객체에 한국어 값 추가

---

## 개발 로드맵

### Phase 1: 문법 학습 모듈

**목표:** N5~N3 문법 패턴을 카드 형태로 학습하고 퀴즈로 복습

**데이터 구조:**
```json
{
  "id": "n5-01",
  "level": "N5",
  "pattern": "〜は〜です",
  "meaning": "~은/는 ~입니다",
  "explanation": "명사문의 기본 형태",
  "examples": [
    { "jp": "私は学生です。", "reading": "わたしはがくせいです。", "kr": "저는 학생입니다." }
  ],
  "tags": ["기초", "명사문"]
}
```

**구현할 기능:**
1. 문법 카드 뷰 — 패턴 → 설명 → 예문 순서로 넘기기
2. 문법 퀴즈 — 의미 맞추기 / 빈칸 채우기
3. 레벨별 필터링

### Phase 2: 문장/독해 연습

**목표:** 짧은 일본어 문장을 읽고 이해도를 테스트

**구현할 기능:**
1. 지문 읽기 뷰 — 단어 클릭 시 뜻 팝업
2. 이해도 확인 퀴즈 — O/X, 객관식
3. 문장 순서 맞추기

### Phase 3: AI 기능 연동

**목표:** Claude API를 활용한 예문 생성 + 회화 연습

**구현할 기능:**
1. AI 예문 생성기 — 문법/단어 입력 시 레벨에 맞는 예문 생성
2. AI 회화 연습 — 상황 설정 기반 일본어 대화 (문법 교정 + 자연스러운 표현 제안)

### Phase 4: 동기부여 시스템

**목표:** 학습 지속을 위한 게이미피케이션

**구현할 기능:**
1. 연속 학습일 트래커 (localStorage)
2. 오답 노트 — 틀린 문제 자동 저장 + 복습 모드
3. 일일 미션

---

## 작업 시 참고사항
- 한 번에 하나의 기능 단위로 작업할 것
- 새 라이브러리 사용 전에 필요성 설명할 것
- 복잡한 로직은 단계별로 나눠서 구현
