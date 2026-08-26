import { BurgerIngredient } from '@components';

import type { TIngredientsCategoryUIProps } from './type';

import styles from './ingredients-category.module.css';

export const IngredientsCategoryUI = ({
  title,
  titleRef,
  ingredients,
  ingredientsCounters,
  ref,
  ...rest
}: TIngredientsCategoryUIProps): React.JSX.Element => (
  <>
    <h3 className="text text_type_main-medium mt-10 mb-6" ref={titleRef}>
      {title}
    </h3>
    <ul className={styles.items} ref={ref} {...rest}>
      {ingredients.map((ingredient) => (
        <BurgerIngredient
          ingredient={ingredient}
          key={ingredient._id}
          count={ingredientsCounters[ingredient._id]}
        />
      ))}
    </ul>
  </>
);
