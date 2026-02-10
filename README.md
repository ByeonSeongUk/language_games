# Nihongo Master (일본어 마스터)

> 일본어 독학을 위한 웹 기반 학습 앱 — React + TypeScript

## 주요 기능

- **히라가나 / 카타카나 퀴즈** — 직접 입력(타이핑) 또는 4지선다
- **가나 문자표** — 오십음도 + 탁음/반탁음 차트
- **JLPT 단어장** — N5 ~ N3 단어 퀴즈 (뜻→단어 / 단어→뜻)
- **다국어 UI** — 한국어 / 영어 전환 지원
- **Atom Dark 테마** — 깔끔한 다크 테마 디자인

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm start

# 프로덕션 빌드
npm run build

# GitHub Pages 배포
npm run deploy
```

[http://localhost:3000](http://localhost:3000) 에서 확인할 수 있습니다.

## 게임 흐름

```
홈 → 설정 (문자 종류, 모드, 행 선택) → 게임 → 결과
홈 → 단어 설정 (레벨, 모드, 문제 수) → 단어 게임 → 결과
```

## 기술 스택

| 기술 | 용도 |
|------|------|
| React 19 | UI 프레임워크 |
| TypeScript | 타입 안전성 |
| CSS Modules + CSS 변수 | 스코프 스타일링 |
| CRA | 빌드 도구 |
| GitHub Pages | 배포 |

## 프로젝트 구조

```
src/
  data/           # 문자/단어 데이터 (hiragana, katakana, words/)
  hooks/          # 게임 상태 관리 (useGameStateBase, useGameState, useWordGameState)
  utils/          # 게임 로직 (shuffle, 정답 판별, 선택지 생성)
  styles/         # 테마 & 애니메이션
  i18n/           # 다국어 지원 (en/ko)
  components/
    common/       # Button, ToggleGroup, CheckboxGrid
    layout/       # Header, Footer
    screens/      # Home, Setup, Game, Result, Chart, WordSetup, WordGame, WordResult
    game/         # CharacterDisplay, TypingMode, MultipleChoiceMode, WordMultipleChoice
```

## 버전 히스토리

### v0.5 — UI/UX 개선
- 홈 화면 카테고리 그룹화 (문자표 / 게임 섹션 분리)
- 단어 게임 언어 설정을 앱 다국어 설정(i18n)과 자동 연동
- 게임 중 언어 전환 비활성화 (설정 화면까지만 변경 가능)
- 헤더 로고 클릭 시 홈 화면 이동
- 미니멀 토리이 게이트 로고로 교체
- 뒤로가기 버튼 아이콘화
- 헤더 레이아웃 grid 기반으로 변경 (로고 항상 정중앙)
- JLPT 레벨 선택 순서 정렬 (N5 → N4 → N3 → N2 → N1)

### v0.4 — 코드 리팩터링
- 게임 훅 통합: `useGameStateBase` 제네릭 공통 훅 생성
- `useGameState`(가나)와 `useWordGameState`(단어)의 중복 코드 제거
- `BaseGameState<Q, R>`, `BaseQuestionResult<Q>` 제네릭 타입 도입
- 새 게임 모드 추가 시 문제 생성 로직만 작성하면 되도록 구조 개선

### v0.3 — 다국어 지원 (i18n)
- 한국어 / 영어 UI 전환 기능 추가
- 자체 Context 기반 i18n 시스템 (`LanguageProvider` + `useLanguage`)
- 언어 설정 `localStorage` 저장

### v0.2 — JLPT 단어장
- N5 ~ N3 단어 퀴즈 구현
- 뜻→단어 / 단어→뜻 두 가지 모드
- 레벨별 필터링 및 문제 수 설정
- 한국어/영어 뜻 지원

### v0.1 — 가나 게임 & 문자표
- 히라가나 / 카타카나 퀴즈 (타이핑 + 4지선다)
- 행 선택 기능 (원하는 행만 연습)
- 오십음도 차트 (탁음/반탁음 포함)
- 혼동하기 쉬운 문자 우선 출제 (Smart Wrong Answers)
- Atom Dark 테마 적용

## 로드맵

- [ ] 문법 학습 모듈 (N5 ~ N3)
- [ ] 문장/독해 연습
- [ ] AI 예문 생성 & 회화 연습 (Claude API)
- [ ] 오답 노트 & 학습 동기부여 시스템

## License

MIT
