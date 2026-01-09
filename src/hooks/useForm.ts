import React, { useState } from 'react';

export const useForm = <TForm>(inputValues: TForm) => {
  const [values, setValues] = useState(inputValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.currentTarget;
    setValues({ ...values, [name]: value });
  };

  return { values, handleChange, setValues };
};
