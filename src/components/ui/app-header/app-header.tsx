import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import { Link, NavLink, useLocation } from 'react-router-dom';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation().pathname;
  let ref = '/';
  if (location.match(`/ingredients/`)) {
    ref = location;
  } else if (location === '/') {
    ref = location;
  }

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
            to={ref}
            className={({ isActive }) =>
              `text text_type_main-medium text-primary-color pt-4 pb-4 ${
                styles.link
              } ${isActive ? styles.link_active : ''} ${isActive ? styles.link_active : ''}`
            }
            end={false}
          >
            <BurgerIcon type={'primary'} />
            <p className='text text_type_main-default ml-2 mr-10'>
              Конструктор
            </p>
          </NavLink>
          <NavLink
            to={'/feed'}
            className={({ isActive }) =>
              `text text_type_main-medium text-primary-color pt-4 pb-4 ${
                styles.link
              } ${isActive ? styles.link_active : ''}`
            }
            end={false}
          >
            <ListIcon type={'primary'} />
            <p className='text text_type_main-default ml-2'>Лента заказов</p>
          </NavLink>
        </div>
        <div className={styles.logo}>
          <NavLink
            to={'/'}
            className={({ isActive }) =>
              `text text_type_main-medium text-primary-color pt-4 pb-4 ${
                styles.link
              } ${isActive ? styles.link_active : ''}`
            }
            end={false}
          >
            <Logo className='' />
          </NavLink>
        </div>
        <div className={styles.link_position_last}>
          {userName ? (
            <NavLink
              to={'/profile'}
              className={({ isActive }) =>
                `text text_type_main-medium text-primary-color pt-4 pb-4 ${
                  styles.link
                } ${isActive ? styles.link_active : ''}`
              }
              end={false}
            >
              <ProfileIcon type={'primary'} />
              <p className='text text_type_main-default ml-2'>
                {userName || 'Личный кабинет'}
              </p>
            </NavLink>
          ) : (
            <NavLink
              to={'/login'}
              className={({ isActive }) =>
                `text text_type_main-medium text-primary-color pt-4 pb-4 ${
                  styles.link
                } ${isActive ? styles.link_active : ''}`
              }
              end={false}
            >
              <ProfileIcon type={'primary'} />
              <p className='text text_type_main-default ml-2'>
                {userName || 'Личный кабинет'}
              </p>
            </NavLink>
          )}
        </div>
      </nav>
    </header>
  );
};
