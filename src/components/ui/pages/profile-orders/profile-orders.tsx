import { FC } from 'react';

import styles from './profile-orders.module.css';

import { ProfileOrdersUIProps } from './type';
import { ProfileMenu, OrdersList } from '@components';

interface UpdatedProfileOrdersUIProps extends ProfileOrdersUIProps {
  onLogout: () => void;
}

export const ProfileOrdersUI: FC<UpdatedProfileOrdersUIProps> = ({
  orders,
  onOrderClick,
  onLogout
}) => (
  <main className={`${styles.main}`}>
    <div className={`mt-30 mr-15 ${styles.menu}`}>
      <ProfileMenu onLogout={onLogout} />
    </div>
    <div className={`mt-10 ${styles.orders}`}>
      <OrdersList orders={orders} onClick={onOrderClick} />
    </div>
  </main>
);
