import { IngredientsCategory } from '@components';
import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { memo } from 'react';

import type { BurgerIngredientsUIProps } from './type';

import styles from './burger-ingredients.module.css';

export const BurgerIngredientsUI = memo(function BurgerIngredientsUI({
  currentTab,
  buns,
  mains,
  sauces,
  titleBunRef,
  titleMainRef,
  titleSaucesRef,
  bunsRef,
  mainsRef,
  saucesRef,
  onTabClick,
}: BurgerIngredientsUIProps): React.JSX.Element {
  return (
    <>
      <section className={styles.burger_ingredients}>
        <nav>
          <ul className={styles.menu}>
            <Tab value="bun" active={currentTab === 'bun'} onClick={onTabClick}>
              Булки
            </Tab>
            <Tab value="main" active={currentTab === 'main'} onClick={onTabClick}>
              Начинки
            </Tab>
            <Tab value="sauce" active={currentTab === 'sauce'} onClick={onTabClick}>
              Соусы
            </Tab>
          </ul>
        </nav>
        <div className={styles.content} data-testid="ingredients-content">
          <IngredientsCategory
            title="Булки"
            titleRef={titleBunRef}
            ingredients={buns}
            ref={bunsRef}
            data-testid="bun-ingredients"
          />
          <IngredientsCategory
            title="Начинки"
            titleRef={titleMainRef}
            ingredients={mains}
            ref={mainsRef}
            data-testid="mains-ingredients"
          />
          <IngredientsCategory
            title="Соусы"
            titleRef={titleSaucesRef}
            ingredients={sauces}
            ref={saucesRef}
            data-testid="sauces-ingredients"
          />
        </div>
      </section>
    </>
  );
});
