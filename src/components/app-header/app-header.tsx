import { AppHeaderUI } from '@ui';

export const AppHeader = (): React.JSX.Element => {
  /* TODO: Получите имя пользователя из хранилища */
  const userName = '';

  return <AppHeaderUI userName={userName} />;
};
