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
  const classListActive = styles.link + ' ' + styles.link_active;
  const classList = styles.link;
  const location = useLocation();
  const pathname = location.state?.background?.pathname || location.pathname;
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <Link to='/'>
            <div
              className={
                pathname === '/' || pathname.includes('ingredients')
                  ? classListActive
                  : classList
              }
            >
              <BurgerIcon type={'primary'} onClick={() => {}} />
              <p className='text text_type_main-default ml-2 mr-10'>
                Конструктор
              </p>
            </div>
          </Link>
          <Link to={'/feed'}>
            <div
              className={
                pathname.includes('/feed') ? classListActive : classList
              }
            >
              <ListIcon type={'primary'} onClick={() => {}} />
              <p className='text text_type_main-default ml-2'>Лента заказов</p>
            </div>
          </Link>
        </div>
        <div className={styles.logo}>
          <Link to='/'>
            <Logo className='' />
          </Link>
        </div>
        <div className={styles.link_position_last}>
          <Link to='/profile'>
            <div
              className={
                pathname.includes('/profile') ? classListActive : classList
              }
            >
              <ProfileIcon type={'primary'} />
              <p className='text text_type_main-default ml-2'>
                {userName || 'Личный кабинет'}
              </p>
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
};
