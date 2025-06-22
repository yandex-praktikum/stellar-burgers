import styles from './appLayout.module.css';

import { AppHeader } from '@components';
import { TAppLayout } from './type';

export const AppLayout = ({ children }: TAppLayout) => (
  <div className={styles.root}>
    <AppHeader />
    {children}
  </div>
);
