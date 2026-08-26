import { BurgerConstructorElement, Modal } from '@components';
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { Preloader, OrderDetailsUI } from '@ui';

import type { BurgerConstructorUIProps } from './type';
import type { TConstructorIngredient } from '@utils-types';

import styles from './burger-constructor.module.css';

export const BurgerConstructorUI = ({
  constructorItems,
  orderRequest,
  price,
  orderModalData,
  onOrderClick,
  closeOrderModal,
}: BurgerConstructorUIProps): React.JSX.Element => (
  <section className={styles.burger_constructor} data-testid="constructor">
    {constructorItems.bun ? (
      <div className={`${styles.element} mb-4 mr-4`} data-testid="constructor-bun-1">
        <ConstructorElement
          type="top"
          isLocked
          text={`${constructorItems.bun.name} (верх)`}
          price={constructorItems.bun.price}
          thumbnail={constructorItems.bun.image}
        />
      </div>
    ) : (
      <div
        className={`${styles.noBuns} ${styles.noBunsTop} ml-8 mb-4 mr-5 text text_type_main-default`}
      >
        Выберите булки
      </div>
    )}
    <ul className={styles.elements} data-testid="constructor-ingredients">
      {constructorItems.ingredients.length > 0 ? (
        constructorItems.ingredients.map(
          (item: TConstructorIngredient, index: number) => (
            <BurgerConstructorElement
              ingredient={item}
              index={index}
              totalItems={constructorItems.ingredients.length}
              key={item.id}
            />
          )
        )
      ) : (
        <li className={`${styles.noBuns} ml-8 mb-4 mr-5 text text_type_main-default`}>
          Выберите начинку
        </li>
      )}
    </ul>
    {constructorItems.bun ? (
      <div className={`${styles.element} mt-4 mr-4`} data-testid="constructor-bun-2">
        <ConstructorElement
          type="bottom"
          isLocked
          text={`${constructorItems.bun.name} (низ)`}
          price={constructorItems.bun.price}
          thumbnail={constructorItems.bun.image}
        />
      </div>
    ) : (
      <div
        className={`${styles.noBuns} ${styles.noBunsBottom} ml-8 mb-4 mr-5 text text_type_main-default`}
      >
        Выберите булки
      </div>
    )}
    <div className={`${styles.total} mt-10 mr-4`} data-testid="order-summ">
      <div className={`${styles.cost} mr-10`}>
        <p className={`text ${styles.text} mr-2`}>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <Button htmlType="button" type="primary" size="large" onClick={onOrderClick}>
        Оформить заказ
      </Button>
    </div>
    {/* Прелоадер в данном месте в "Можно лучше" */}
    {orderRequest && (
      <Modal onClose={closeOrderModal} title={'Оформляем заказ...'}>
        <Preloader />
      </Modal>
    )}

    {orderModalData && (
      <Modal onClose={closeOrderModal} title={orderRequest ? 'Оформляем заказ...' : ''}>
        <OrderDetailsUI orderNumber={orderModalData.number} />
      </Modal>
    )}
  </section>
);
