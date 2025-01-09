import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { AppHeaderUI } from '@ui';
import { useAppDispatch } from '@store';
import { checkUserAuthThunk } from '@slices';
import { getIsAuthChecked, getUser } from '@selectors';

export const AppHeader: FC = () => {
  const dispatch = useAppDispatch();

  const user = useSelector(getUser);
  const isAuthChecked = useSelector(getIsAuthChecked);

  useEffect(() => {
    if (isAuthChecked) {
      return;
    }

    dispatch(checkUserAuthThunk());
  }, [isAuthChecked]);

  return <AppHeaderUI userName={user?.name} />;
};
