import { useState } from 'react';

export default function useToggle(toggleValue: boolean) {
  const [isOpen, setIsOpen] = useState(toggleValue);

  function toggle(isOpen: boolean) {
    setIsOpen((currentValue) =>
      typeof isOpen === 'boolean' ? isOpen : !currentValue
    );
  }

  return [isOpen, toggle];
}
