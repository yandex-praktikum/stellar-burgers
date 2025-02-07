import { FC, useEffect, useState } from 'react';
import { AppHeaderUI } from '@ui';

import { selectUser } from '../../../src/services/slices/userSlice';
import { useSelector } from '../../../src/services/store';

export const AppHeader: FC = () => {
  const user = useSelector(selectUser);

  const userName = user.name;
  return (
    <>
      <AppHeaderUI userName={userName} />
    </>
  );
};
