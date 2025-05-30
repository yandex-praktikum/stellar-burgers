import { FC, memo, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { TModalProps } from './type';
import { ModalUI } from '@ui';

const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps> = memo(({ title, onClose, children }) => {
  // Хук  для добавления и удаления обработчика нажатия клавиши Esc
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      e.key === 'Escape' && onClose();
    };

    document.addEventListener('keydown', handleEsc);
    // Удаляем обработчик при размонтировании компонента
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]); // Зависимость от функции onClose

  // Рендеринг модального окна через портал
  return ReactDOM.createPortal(
    <ModalUI title={title} onClose={onClose} data-cy='modal'>
      {children}
    </ModalUI>,
    modalRoot as HTMLDivElement
  );
});
