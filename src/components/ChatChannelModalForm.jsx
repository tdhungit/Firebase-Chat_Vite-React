import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React from 'react';

function ChatChannelModalForm({ open }) {
  const onSave = () => {};
  return (
    <Modal isOpen={open} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Channel</ModalHeader>
        <ModalBody>
          <Formik onSubmit={onSave}>
            {(props) => (
              <Form>
                <Field name='name'>
                  {({ field, form }) => (
                    <FormControl>
                      <FormLabel>Channel Name</FormLabel>
                      <Input {...field} />
                    </FormControl>
                  )}
                </Field>
                <Field name='users'>
                  {(field, form) => (
                    <FormControl marginTop={3}>
                      <FormLabel>Users</FormLabel>
                      <Input {...field} />
                    </FormControl>
                  )}
                </Field>
              </Form>
            )}
          </Formik>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue'>Save</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ChatChannelModalForm;
