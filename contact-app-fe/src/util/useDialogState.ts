import { useState } from 'react';

export const useDialogState = <T>(initialOpen = false) => {
  const [status, setStatus] = useState<boolean>(initialOpen);
  const [item, setItem] = useState<T | undefined>(undefined);
  const isOpen = status;

  const openDialog = () => {
    setItem(undefined);
    setStatus(true);
  };

  const openDialogEdit = (data: T) => {
    setItem(data);
    setStatus(true);
  };

  const closeDialog = () => {
    setStatus(false);
  };

  const toggleDialog = () => setStatus((prevStatus) => !prevStatus);

  return { isOpen, openDialog, closeDialog, openDialogEdit, toggleDialog, setItem, item };
};
