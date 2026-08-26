import styles from './preloader.module.css';

export const Preloader = (): React.JSX.Element => (
  <div className={styles.preloader}>
    <div className={styles.preloader_circle} />
  </div>
);
