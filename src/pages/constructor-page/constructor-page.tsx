import { BurgerIngredients, BurgerConstructor } from '@components';

import styles from './constructor-page.module.css';

export const ConstructorPage = (): React.JSX.Element => (
  <main className={styles.containerMain} data-testid="constructor-container">
    <h1 className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}>
      Соберите бургер
    </h1>
    <div className={`${styles.main} pl-5 pr-5`} data-testid="ingredients-list">
      <BurgerIngredients/>
      <BurgerConstructor />
    </div>
  </main>
);
