import type { PageUIProps } from '@ui-pages/common-type';
import type { Dispatch, SetStateAction } from 'react';

export type LoginUIProps = PageUIProps & {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
};
