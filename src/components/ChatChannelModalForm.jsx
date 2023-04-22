import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React from 'react';

function ChatChannelModalForm({ open, onFinish }) {
  const onSave = (values, actions) => {
    console.log('a');
    onFinish();
  };

  return (
    <Modal isOpen={open} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Channel</ModalHeader>
        <ModalBody>
          <Formik initialValues={{ name: '', users: '' }} onSubmit={onSave}>
            {(props) => (
              <Form>
                <Field name='name'>
                  {({ field, form }) => (
                    <FormControl>
                      <FormLabel>Channel Name</FormLabel>
                      <Input {...field} />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name='users'>
                  {({ field, form }) => (
                    <FormControl marginTop={3}>
                      <FormLabel>Users</FormLabel>
                      <Input {...field} />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  mt={4}
                  float='right'
                  colorScheme='blue'
                  isLoading={props.isSubmitting}
                  type='submit'
                >
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ChatChannelModalForm;
