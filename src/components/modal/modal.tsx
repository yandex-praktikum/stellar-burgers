import { FC, memo, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { TModalProps } from './type';
import { ModalUI } from '@ui';
import { useOrderInfoData } from '@hooks/useOrderInfoData';

const modalRoot = document.getElementById('modals');

export const Modal: FC<TModalProps> = memo(({ title, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      e.key === 'Escape' && onClose();
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  const orderInfo = useOrderInfoData();
  const orderTitle = orderInfo ? `#${orderInfo.number}` : '';

  const modalUITitle = title === 'Детали заказа' ? orderTitle : title;

  return ReactDOM.createPortal(
    <ModalUI title={modalUITitle} onClose={onClose}>
      {children}
    </ModalUI>,
    modalRoot as HTMLDivElement
  );
});
