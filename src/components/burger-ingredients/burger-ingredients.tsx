import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';

import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { useSelector } from '../../services/store';
import { getIngredientsWithSelector } from '../../services/slices/IngredientsSlice';
import { Preloader } from '../../components/ui';
import { getLoadingStatus } from '../../services/slices/IngredientsSlice';

//компонент-обертка для описания логики отображения списка ингридиентов, логика передается в следующий компонент UI для последующего рендера
export const BurgerIngredients: FC = () => {
  const ingredients = useSelector(getIngredientsWithSelector);

  const isLoading = useSelector(getLoadingStatus);

  if (isLoading) {
    return <Preloader />;
  }

  // Фильтруем ингредиенты по их типу (булки, основные ингредиенты, соусы)
  const buns = ingredients.filter((item) => item.type === 'bun');
  const mains = ingredients.filter((item) => item.type === 'main');
  const sauces = ingredients.filter((item) => item.type === 'sauce');
  // Текущее состояние выбранной вкладки
  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');

  // Ссылки на заголовки для прокрутки по вкладкам
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  // Обновляем текущую вкладку в зависимости от того, какая секция видна на экране
  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  // Обработчик кликов по вкладкам: прокручиваем страницу к нужной секции
  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
