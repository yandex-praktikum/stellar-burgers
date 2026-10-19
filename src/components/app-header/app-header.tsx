import { AppHeaderUI } from '@ui';

import { useSelector } from '../../services/store';

export const AppHeader = (): React.JSX.Element => {
  /* TODO: Получите имя пользователя из хранилища */
  // const userName = undefined;
  const userName = useSelector((state) => state.user.user);

  return <AppHeaderUI userName={userName?.name} />;
};
