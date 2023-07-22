'use client'

import { useCallback, useState } from 'react';

export const useInput = (initValue: string) => {
  const [value, setValue] = useState<string | undefined>(initValue);

  const handleOnChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement> | null) => {
      setValue(event?.target?.value);
    },
    [setValue]
  );

  return {
    value,
    setValue,
    handleOnChange,
  };
};
