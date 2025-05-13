import React, { FC } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();
  const currentLocation = location.pathname;

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <>
            <NavLink
              className={({ isActive }) =>
                clsx(styles.link, isActive ? styles.link_active : '')
              }
              to={'/'}
            >
              <BurgerIcon
                type={currentLocation === '/' ? 'primary' : 'secondary'}
              />
              <p className='text text_type_main-default ml-2 mr-10'>
                Конструктор
              </p>
            </NavLink>
          </>
          <>
            <NavLink
              className={({ isActive }) =>
                clsx(styles.link, isActive ? styles.link_active : '')
              }
              to={'/feed'}
            >
              <ListIcon
                type={currentLocation === '/feed' ? 'primary' : 'secondary'}
              />
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </NavLink>
          </>
        </div>
        <Link className={styles.link} to={'/'}>
          <div className={styles.logo}>
            <Logo className='' />
          </div>
        </Link>
        <div className={styles.link_position_last}>
          <NavLink
            className={({ isActive }) =>
              clsx(styles.link, isActive ? styles.link_active : '')
            }
            to={'/profile'}
          >
            <ProfileIcon
              type={currentLocation === '/profile' ? 'primary' : 'secondary'}
            />
            <p className='text text_type_main-default ml-2'>
              {userName || 'Личный кабинет'}
            </p>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
