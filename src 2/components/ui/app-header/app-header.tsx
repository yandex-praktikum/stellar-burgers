import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => (
  <header className={styles.header}>
    <nav className={`${styles.menu} p-4`}>
      <div className={styles.menu_part_left}>
        <>
          <NavLink to='/' className={clsx(styles.navlink, 'mr-4', 'p-4')}>
            {({ isActive }) => (
              <div
                className={clsx(styles.link, isActive && styles.link_active)}
              >
                <BurgerIcon type={isActive ? 'primary' : 'secondary'} />
                <span className='text text_type_main-default ml-2'>
                  Конструктор
                </span>
              </div>
            )}
          </NavLink>
          <NavLink to='/feed' className={clsx(styles.navlink, 'p-4')}>
            {({ isActive }) => (
              <div
                className={clsx(styles.link, isActive && styles.link_active)}
              >
                <ListIcon type={isActive ? 'primary' : 'secondary'} />
                <span className='text text_type_main-default ml-2'>
                  Лента заказов
                </span>
              </div>
            )}
          </NavLink>
        </>
      </div>
      <div className={styles.logo}>
        <Logo className='' />
      </div>
      <div className={styles.link_position_last}>
        <NavLink to='/profile' className={clsx(styles.navlink, 'p-4')}>
          {({ isActive }) => (
            <div className={clsx(styles.link, isActive && styles.link_active)}>
              <ProfileIcon type={isActive ? 'primary' : 'secondary'} />
              <span className='text text_type_main-default ml-2'>
                {userName || 'Личный кабинет'}
              </span>
            </div>
          )}
        </NavLink>
      </div>
    </nav>
  </header>
);
