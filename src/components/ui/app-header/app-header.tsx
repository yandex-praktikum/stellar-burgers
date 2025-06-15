import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import { NavLink } from 'react-router-dom';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <div className={styles.menu_item}>
          <BurgerIcon type={'primary'} />
          <NavLink to={'/'} className='text text_type_main-default ml-2 mr-10'>
            Конструктор
          </NavLink>
        </div>
        <div className={styles.menu_item}>
          <ListIcon type={'primary'} />
          <NavLink to={'/feed'} className='text text_type_main-default ml-2'>
            Лента заказов
          </NavLink>
        </div>
      </div>
      <div className={styles.logo}>
        <Logo className={styles.logoIcon} />{' '}
      </div>
      <div className={styles.link_position_last}>
        <ProfileIcon type={'primary'} />
        <NavLink to={'/profile'} className='text text_type_main-default ml-2'>
          {userName || 'Личный кабинет'}
        </NavLink>
      </div>
    </nav>
  </header>
);
