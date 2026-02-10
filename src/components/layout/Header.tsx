import styles from './Header.module.css';
import { useLanguage } from '../../i18n';
import { Language } from '../../i18n/translations';

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
  onHome?: () => void;
  showLangSwitch?: boolean;
}

const LANG_OPTIONS: { value: Language; label: string }[] = [
  { value: 'en', label: 'EN' },
  { value: 'ko', label: 'KO' },
];

export default function Header({ showBack, onBack, onHome, showLangSwitch = false }: HeaderProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {showBack ? (
          <button className={styles.backBtn} onClick={onBack} aria-label={t.back}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        ) : (
          <div className={styles.spacer} />
        )}
        <button className={styles.logoBtn} onClick={onHome} aria-label={t.home}>
          <img
            src={`${process.env.PUBLIC_URL}/logo.svg`}
            alt={`${t.appTitle1}${t.appTitle2}`}
            className={styles.logoImg}
          />
        </button>
        {showLangSwitch ? (
          <div className={styles.langSwitch}>
            {LANG_OPTIONS.map(opt => (
              <button
                key={opt.value}
                className={`${styles.langBtn} ${language === opt.value ? styles.langActive : ''}`}
                onClick={() => setLanguage(opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        ) : (
          <div className={styles.spacer} />
        )}
      </div>
    </header>
  );
}
