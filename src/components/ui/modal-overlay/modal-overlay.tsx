import styles from './modal-overlay.module.css';

export const ModalOverlayUI = ({
  onClick,
}: {
  onClick: () => void;
}): React.JSX.Element => (
  <div className={styles.overlay} onClick={onClick} data-testid="modal-overlay" />
);
