import { BurgerIngredients, BurgerConstructor } from '@components';
import { Preloader } from '@ui';

import type { ConstructorPageUIProps } from './type';

import styles from './constructor-page.module.css';

export const ConstructorPageUI = ({
  isIngredientsLoading,
}: ConstructorPageUIProps): React.JSX.Element => (
  <>
    {isIngredientsLoading ? (
      <Preloader />
    ) : (
      <main className={styles.containerMain}>
        <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
          Соберите бургер
        </h1>
        <div className={`${styles.main} pl-5 pr-5`}>
          <BurgerIngredients />
          <BurgerConstructor />
        </div>
      </main>
    )}
  </>
);
