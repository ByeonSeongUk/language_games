import styles from './Header.module.css';

interface HeaderProps {
  showBack?: boolean;
  onBack?: () => void;
}

export default function Header({ showBack, onBack }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {showBack ? (
          <button className={styles.backBtn} onClick={onBack}>
            &larr; Back
          </button>
        ) : (
          <div className={styles.spacer} />
        )}
        <h1 className={styles.title}>
          <span className={styles.titleAccent}>Nihongo</span> Master
        </h1>
        <div className={styles.spacer} />
      </div>
    </header>
  );
}
