import { InfoIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Image,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tag,
  TagCloseButton,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { addChatChannel, getChannel, updateChatChannel } from '../utils/chat';
import { getUsers } from '../utils/user';

function ChatChannelModalForm({
  open,
  onFinish,
  user,
  onOpenChange,
  activeChannel,
}) {
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [isSave, setIsSave] = useState(false);

  useEffect(() => {
    getUsers((users) => {
      setUsers(users);
    }, user);
  }, []);

  useEffect(() => {
    if (activeChannel && activeChannel.members) {
      setMembers(activeChannel.members);
    } else {
      setMembers([]);
    }
  }, [activeChannel]);

  const onSave = async (values, actions) => {
    setIsSave(true);
    let result;
    if (activeChannel && activeChannel.id) {
      result = await updateChatChannel(activeChannel.id, {
        name: values.name,
        members,
        user,
      });
    } else {
      result = await addChatChannel({ user, name: values.name, members });
    }
    const channel = await getChannel(result.id);
    setIsSave(false);
    setMembers([]);
    onFinish(channel);
  };

  const onMemberSelect = (userSelected) => {
    const found = members.filter((m) => m.id === userSelected.id);
    if (found.length <= 0) {
      setMembers([...members, userSelected]);
    }
  };

  const onMemberDel = (userId) => {
    const newMembers = members.filter((m) => m.id !== userId);
    setMembers(newMembers);
  };

  const selectUsers = (data) => {
    let usersView = [];
    data.map((u) => {
      usersView.push(
        <MenuItem onClick={() => onMemberSelect(u)} key={u.id}>
          <Image
            boxSize='2rem'
            borderRadius='full'
            src={u.avatar}
            alt={u.name}
            mr='12px'
          />
          <span>{u.name}</span>
        </MenuItem>
      );
    });
    return usersView;
  };

  const membersView = (data) => {
    let view = [];
    data.map((m) => {
      view.push(
        <Tag marginRight={2} key={m.id}>
          <Avatar size='sm' src={m.avatar} ml={-1} mr={2} name={m.name} />
          <span>{m.name}</span>
          <TagCloseButton onClick={() => onMemberDel(m.id)} />
        </Tag>
      );
    });
    return view;
  };

  return (
    <Modal isOpen={open} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Channel</ModalHeader>
        <ModalCloseButton onClick={() => onOpenChange(false)} />
        <ModalBody>
          <Formik
            initialValues={{
              name: (activeChannel && activeChannel.name) || '',
            }}
            onSubmit={onSave}
          >
            {(props) => (
              <Form>
                <Field name='name' key='name'>
                  {({ field, form }) => (
                    <FormControl>
                      <FormLabel>Channel Name</FormLabel>
                      <Input {...field} />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <div style={{ marginTop: 15 }}>
                  <div style={{ marginBottom: 10 }}>{membersView(members)}</div>
                  <Menu>
                    <MenuButton as={Button} leftIcon={<InfoIcon />}>
                      Select Members
                    </MenuButton>
                    <MenuList>{selectUsers(users)}</MenuList>
                  </Menu>
                </div>

                <Button
                  mt={4}
                  float='right'
                  colorScheme='blue'
                  isLoading={isSave}
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
