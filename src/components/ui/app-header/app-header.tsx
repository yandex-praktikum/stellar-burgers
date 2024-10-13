import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({
  userName,
  onOrdersClick,
  onConstructorClick,
  onProfileClick // Добавляем обработчик для профиля
}) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <>
          <BurgerIcon type={'primary'} onClick={onConstructorClick} />
          <p
            className='text text_type_main-default ml-2 mr-10'
            onClick={onConstructorClick}
          >
            Конструктор
          </p>
        </>
        <>
          <ListIcon type={'primary'} onClick={onOrdersClick} />
          <p
            className='text text_type_main-default ml-2'
            onClick={onOrdersClick}
          >
            Лента заказов
          </p>
        </>
      </div>
      <div className={styles.logo}>
        <Logo className='' />
      </div>
      <div className={styles.link_position_last}>
        <ProfileIcon type={'primary'} onClick={onProfileClick} />{' '}
        {/* Добавляем обработчик клика для профиля */}
        <p
          className='text text_type_main-default ml-2'
          onClick={onProfileClick}
        >
          {userName || 'Личный кабинет'}
        </p>
      </div>
    </nav>
  </header>
);
