import { useState } from 'react';

export default function useToggleValue(initialValue: boolean = false) {
  const [value, setValue] = useState(initialValue);
  const handleToggleValue = () => {
    setValue(!value);
  };
  return {
    value,
    handleToggleValue,
  };
}
