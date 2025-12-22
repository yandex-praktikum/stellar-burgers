import React, { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
            to='/'
            className={({ isActive }) =>
              `text text_type_main-medium text_color_inactive pt-4 pb-4 ${
                styles.link
              } ${isActive ? styles.link_active : ''}`
            }
          >
            <BurgerIcon
              type={location.pathname === '/' ? 'primary' : 'secondary'}
            />
            <p
              className={`text text_type_main-default ml-2 mr-10 ${
                location.pathname === '/'
                  ? styles.link_active
                  : styles.link_inactive
              }`}
            >
              Конструктор
            </p>
          </NavLink>

          <NavLink
            to='/feed'
            className={({ isActive }) =>
              `text text_type_main-medium text_color_inactive pt-4 pb-4 ${
                styles.link
              } ${isActive ? styles.link_active : ''}`
            }
          >
            <ListIcon
              type={location.pathname === '/feed' ? 'primary' : 'secondary'}
            />
            <p
              className={`text text_type_main-default ml-2 ${
                location.pathname === '/feed'
                  ? styles.link_active
                  : styles.link_inactive
              }`}
            >
              Лента заказов
            </p>
          </NavLink>
        </div>

        <div className={styles.logo}>
          <Logo className='' />
        </div>

        <div className={styles.link_position_last}>
          <NavLink
            to='/profile'
            className={({ isActive }) =>
              `text text_type_main-medium text_color_inactive pt-4 pb-4 ${
                styles.link
              } ${isActive ? styles.link_active : ''}`
            }
            end
          >
            <ProfileIcon
              type={
                location.pathname.startsWith('/profile')
                  ? 'primary'
                  : 'secondary'
              }
            />
            <p
              className={`text text_type_main-default ml-2 ${
                location.pathname.startsWith('/profile')
                  ? styles.link_active
                  : styles.link_inactive
              }`}
            >
              {userName || 'Личный кабинет'}
            </p>
          </NavLink>
        </div>
      </nav>
    </header>
  );
};
