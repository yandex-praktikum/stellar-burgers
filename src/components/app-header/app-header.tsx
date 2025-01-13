import { FC, useEffect, useState } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';

export const AppHeader: FC = () => {
  const userName = useSelector((state: any) => state.userReducer.name);
  return (
    <>
      <AppHeaderUI userName={userName} />
    </>
  );
};
