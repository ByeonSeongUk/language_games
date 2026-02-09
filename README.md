# Kana Master

> Hiragana & Katakana learning game built with React + TypeScript

## Features

- **Typing Mode** - See a Japanese character, type its romaji reading
- **Quiz Mode (4-choice)** - Pick the correct romaji from 4 options
- **Row Selection** - Practice specific rows (a-row, ka-row, sa-row, etc.)
- **Full Kana Coverage** - All 15 rows including dakuten & handakuten
- **Smart Wrong Answers** - Quiz options prioritize confusable characters
- **Atom Dark Theme** - Clean, dark IDE-inspired design

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Game Flow

```
Home -> Setup (select character type, mode, rows) -> Game -> Results
```

## Tech Stack

| Tech | Purpose |
|------|---------|
| React 19 | UI framework |
| TypeScript | Type safety |
| CSS Modules | Scoped styling |
| CRA | Build tooling |

## Project Structure

```
src/
  data/           # Character data (hiragana, katakana)
  hooks/          # Game state management (useGameState)
  utils/          # Game logic (shuffle, answer validation)
  styles/         # Theme & animations
  components/
    common/       # Button, ToggleGroup, CheckboxGrid
    layout/       # Header, Footer
    screens/      # Home, Setup, Game, Result
    game/         # CharacterDisplay, TypingMode, MultipleChoiceMode
```

## Roadmap

- [ ] Word matching mode
- [ ] Kanji learning mode
- [ ] Spaced repetition system
- [ ] Score history with localStorage
- [ ] Sound pronunciation playback

## License

MIT
