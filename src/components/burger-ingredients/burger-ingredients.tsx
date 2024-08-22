import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';
import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../services/slices/ingredientsSlice';
import { RootState, AppDispatch } from '../../services/store';
import { Preloader } from '@ui';

export const BurgerIngredients: FC = () => {
  /** TODO: взять переменные из стора */
  const dispatch: AppDispatch = useDispatch();

  const ingredients = useSelector(
    (state: RootState) => state.ingredients.ingredients
  );
  const isLoading = useSelector(
    (state: RootState) => state.ingredients.isLoading
  );

  const status = useSelector((state: RootState) => state.ingredients.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getIngredients());
    }
  }, [status, dispatch]);

  const buns = ingredients.filter((ingredient) => ingredient.type === 'bun');
  const mains = ingredients.filter((ingredient) => ingredient.type === 'main');
  const sauces = ingredients.filter(
    (ingredient) => ingredient.type === 'sauce'
  );

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
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

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return <Preloader />; //preloader
  }

  if (status === 'fail') {
    return <div>Error</div>;
  }

  if (status === 'success') {
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
  }
};
