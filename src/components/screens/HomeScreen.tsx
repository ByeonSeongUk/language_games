import styles from './HomeScreen.module.css';
import { useLanguage } from '../../i18n';

interface HomeScreenProps {
  onStart: () => void;
  onChart: () => void;
  onWords: () => void;
}

export default function HomeScreen({ onStart, onChart, onWords }: HomeScreenProps) {
  const { t } = useLanguage();

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.logoWrap}>
          <img src={`${process.env.PUBLIC_URL}/logo.svg`} alt={`${t.appTitle1}${t.appTitle2}`} className={styles.logo} />
        </div>
        <p className={styles.subtitle}>
          {t.homeSubtitle}
        </p>
      </div>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>{t.sectionChart}</h3>
        <div className={styles.categories}>
          <button className={styles.categoryCard} onClick={onChart}>
            <span className={styles.categoryChar}>{'\u8868'}</span>
            <div className={styles.categoryInfo}>
              <span className={styles.categoryName}>{t.kanaChart}</span>
              <span className={styles.categoryDesc}>{t.kanaChartDesc}</span>
            </div>
            <span className={styles.categoryArrow}>&rarr;</span>
          </button>
        </div>
      </section>

      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>{t.sectionGame}</h3>
        <div className={styles.categories}>
          <button className={styles.categoryCard} onClick={onStart}>
            <span className={styles.categoryChar}>{'\u3042'}</span>
            <div className={styles.categoryInfo}>
              <span className={styles.categoryName}>{t.kana}</span>
              <span className={styles.categoryDesc}>{t.kanaDesc}</span>
            </div>
            <span className={styles.categoryArrow}>&rarr;</span>
          </button>

          <button className={styles.categoryCard} onClick={onWords}>
            <span className={styles.categoryChar}>{'\u8A00'}</span>
            <div className={styles.categoryInfo}>
              <span className={styles.categoryName}>{t.words}</span>
              <span className={styles.categoryDesc}>{t.wordsDesc}</span>
            </div>
            <span className={styles.categoryArrow}>&rarr;</span>
          </button>

          <div className={`${styles.categoryCard} ${styles.disabled}`}>
            <span className={styles.categoryChar}>{'\u6F22'}</span>
            <div className={styles.categoryInfo}>
              <span className={styles.categoryName}>{t.kanji}</span>
              <span className={styles.categoryDesc}>{t.kanjiDesc}</span>
            </div>
            <span className={styles.comingSoon}>{t.comingSoon}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
