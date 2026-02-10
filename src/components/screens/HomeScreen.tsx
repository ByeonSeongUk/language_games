import { useState } from 'react';
import styles from './HomeScreen.module.css';
import { useLanguage } from '../../i18n';

type LearnLanguage = 'japanese' | 'korean';

interface HomeScreenProps {
  onStart: () => void;
  onChart: () => void;
  onWords: () => void;
}

export default function HomeScreen({ onStart, onChart, onWords }: HomeScreenProps) {
  const { t } = useLanguage();
  const [selectedLang, setSelectedLang] = useState<LearnLanguage>('japanese');

  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.logoWrap}>
          <img src={`${process.env.PUBLIC_URL}/logo.svg`} alt={t.appTitle} className={styles.logo} />
        </div>
        <p className={styles.subtitle}>
          {t.homeSubtitle}
        </p>
      </div>

      {/* Language Selection */}
      <section className={styles.section}>
        <h3 className={styles.sectionTitle}>{t.selectLanguage}</h3>
        <div className={styles.langCards}>
          <button
            className={`${styles.langCard} ${selectedLang === 'japanese' ? styles.langCardActive : ''}`}
            onClick={() => setSelectedLang('japanese')}
          >
            <span className={styles.langFlag}>🇯🇵</span>
            <span className={styles.langName}>{t.japanese}</span>
          </button>
          <button
            className={`${styles.langCard} ${selectedLang === 'korean' ? styles.langCardActive : ''} ${styles.langCardDisabled}`}
            onClick={() => {}}
          >
            <span className={styles.langFlag}>🇰🇷</span>
            <span className={styles.langName}>{t.koreanLang}</span>
            <span className={styles.langSoon}>{t.comingSoon}</span>
          </button>
        </div>
      </section>

      {/* Charts Section */}
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

      {/* Games Section */}
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
