import styles from './HomeScreen.module.css';

interface HomeScreenProps {
  onStart: () => void;
  onChart: () => void;
}

export default function HomeScreen({ onStart, onChart }: HomeScreenProps) {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.logoWrap}>
          <img src={`${process.env.PUBLIC_URL}/logo.svg`} alt="Nihongo Master" className={styles.logo} />
        </div>
        <p className={styles.subtitle}>
          Select a category to start learning
        </p>
      </div>

      <div className={styles.categories}>
        <button className={styles.categoryCard} onClick={onChart}>
          <span className={styles.categoryChar}>表</span>
          <div className={styles.categoryInfo}>
            <span className={styles.categoryName}>Kana Chart</span>
            <span className={styles.categoryDesc}>View all characters</span>
          </div>
          <span className={styles.categoryArrow}>&rarr;</span>
        </button>

        <button className={styles.categoryCard} onClick={onStart}>
          <span className={styles.categoryChar}>あ</span>
          <div className={styles.categoryInfo}>
            <span className={styles.categoryName}>Kana</span>
            <span className={styles.categoryDesc}>Hiragana & Katakana</span>
          </div>
          <span className={styles.categoryArrow}>&rarr;</span>
        </button>

        <div className={`${styles.categoryCard} ${styles.disabled}`}>
          <span className={styles.categoryChar}>言</span>
          <div className={styles.categoryInfo}>
            <span className={styles.categoryName}>Words</span>
            <span className={styles.categoryDesc}>Vocabulary & Phrases</span>
          </div>
          <span className={styles.comingSoon}>Coming Soon</span>
        </div>

        <div className={`${styles.categoryCard} ${styles.disabled}`}>
          <span className={styles.categoryChar}>漢</span>
          <div className={styles.categoryInfo}>
            <span className={styles.categoryName}>Kanji</span>
            <span className={styles.categoryDesc}>Chinese Characters</span>
          </div>
          <span className={styles.comingSoon}>Coming Soon</span>
        </div>
      </div>
    </div>
  );
}
