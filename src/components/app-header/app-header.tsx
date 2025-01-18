import { FC, useEffect, useState } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from 'react-redux';
import { selectUser } from '../../../src/services/slices/userSlice';

export const AppHeader: FC = () => {
  const user = useSelector(selectUser);
  const userName = user.name;
  return (
    <>
      <AppHeaderUI userName={userName} />
    </>
  );
};
