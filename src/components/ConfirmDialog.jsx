import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import React from 'react';

function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  message,
  cancelLabel,
  confirmLabel,
}) {
  return (
    <AlertDialog isOpen={open}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize='lg' fontWeight='bold'>
            {title}
          </AlertDialogHeader>

          <AlertDialogBody>{message}</AlertDialogBody>

          <AlertDialogFooter>
            <Button onClick={() => onOpenChange(false)}>{cancelLabel}</Button>
            <Button colorScheme='red' onClick={() => onConfirm()} ml={3}>
              {confirmLabel}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
}

export default ConfirmDialog;
