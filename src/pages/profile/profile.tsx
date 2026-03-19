import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch, RootState } from '../../services/store';
import { updateUser } from '../../services/user/action';

export const Profile: FC = () => {
  /** TODO: взять переменную из стора */
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  if (!user) {
    return null;
  }
  const [formValue, setFormValue] = useState({
    name: user.name,
    email: user.email,
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const [isFormChanged, setIsFormChanged] = useState(false);

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!isFormChanged) return;

    const result = await dispatch(
      updateUser({
        name: formValue.name,
        email: formValue.email
      })
    );
    if (updateUser.fulfilled.match(result)) {
      setFormValue((prevState) => ({ ...prevState, password: '' }));
      setIsFormChanged(false);
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user.name,
      email: user.email,
      password: ''
    });
    setIsFormChanged(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue((prevState) => ({
      ...prevState,
      [name]: value
    }));

    if (
      (name === 'name' && value !== user?.name) ||
      (name === 'email' && value !== user?.email)
    ) {
      setIsFormChanged(true);
    }
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
