import {
  DeleteIcon,
  EditIcon,
  PlusSquareIcon,
  SettingsIcon,
} from '@chakra-ui/icons';
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { deleteChatChannel, getChatChannels, leftChannel } from '../utils/chat';
import { getUsers } from '../utils/user';
import ChatChannelModalForm from './ChatChannelModalForm';
import ConfirmDialog from './ConfirmDialog';

function ChatChannel({
  user,
  selectedChannelId,
  selectedUserId,
  setChannel,
  setUser,
}) {
  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([]);
  const [isAddChannel, setIsAddChannel] = useState(false);
  const [activeChannel, setActiveChannel] = useState(null);
  const [confirmDeleteChannel, setConfirmDeleteChannel] = useState(false);
  const [messageConfirmDeleteChannel, setMessageConfirmDeleteChannel] =
    useState('');

  useEffect(() => {
    // get channels
    getChatChannels(user, (allChannels) => {
      setChannels(allChannels);
    });
    // get users
    getUsers((allUsers) => {
      setUsers(allUsers);
    });
  }, []);

  const onSaveChannel = (channel) => {
    setIsAddChannel(false);
    setChannel(channel);
    setActiveChannel(null);
  };

  const onSelectChannel = (channelSelect) => {
    setChannel(channelSelect);
  };

  const onSelectUser = (userSelect) => {
    setUser(userSelect);
  };

  const onEditChannel = (channel) => {
    setIsAddChannel(true);
    setActiveChannel(channel);
  };

  const onDeleteChannel = async (channel) => {
    setActiveChannel(channel);
    setConfirmDeleteChannel(true);
    if (user.uid === channel.ownerId) {
      setMessageConfirmDeleteChannel('Are you want to delete this channel?');
    } else {
      setMessageConfirmDeleteChannel('Are you want to left this channel?');
    }
  };

  const processDeleteChannel = async () => {
    const channel = activeChannel;
    if (user.uid === channel.ownerId) {
      try {
        await deleteChatChannel(channel.id);
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await leftChannel(channel.id, user);
      } catch (err) {
        console.log(err);
      }
    }
    setActiveChannel(null);
    setConfirmDeleteChannel(false);
  };

  const channelsView = (channels) => {
    let listView = [];
    channels.forEach((c) => {
      listView.push(
        <ListItem key={c.id} textAlign='center'>
          <ButtonGroup
            size='xs'
            isAttached
            colorScheme={c.id === selectedChannelId ? 'blue' : 'gray'}
            width='100%'
          >
            <Button width='100%' onClick={() => onSelectChannel(c)}>
              {c.name}
            </Button>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<SettingsIcon />}
                aria-label='Settings'
              />
              <MenuList>
                {user.uid === c.ownerId && (
                  <MenuItem key='edit' onClick={() => onEditChannel(c)}>
                    <EditIcon /> &nbsp;<span>Edit</span>
                  </MenuItem>
                )}
                <MenuItem key='delete' onClick={() => onDeleteChannel(c)}>
                  <DeleteIcon /> &nbsp;
                  <span>{user.uid === c.ownerId ? 'Delete' : 'Left'}</span>
                </MenuItem>
              </MenuList>
            </Menu>
          </ButtonGroup>
        </ListItem>
      );
    });
    return listView;
  };

  const usersView = (users) => {
    let listView = [];
    users.forEach((u) => {
      if (u.id !== user.uid) {
        listView.push(
          <ListItem key={u.id}>
            <Button
              width='100%'
              colorScheme={u.id === selectedUserId ? 'blue' : 'gray'}
              size='xs'
              onClick={() => onSelectUser(u)}
            >
              {u.name}
            </Button>
          </ListItem>
        );
      }
    });
    return listView;
  };

  return (
    <>
      <Card marginTop={3}>
        <CardHeader p={0} paddingLeft={3}>
          <Heading size='xs'>Channels</Heading>
        </CardHeader>
        <CardBody p={2} m={0}>
          <List p={0}>{channelsView(channels)}</List>
        </CardBody>
        <CardFooter p={2}>
          <Button
            size='xs'
            colorScheme='teal'
            variant='outline'
            width='100%'
            leftIcon={<PlusSquareIcon />}
            onClick={() => {
              setActiveChannel(null);
              setIsAddChannel(true);
            }}
          >
            Add
          </Button>
        </CardFooter>
      </Card>

      <Card marginTop={3}>
        <CardHeader p={0} paddingLeft={3}>
          <Heading size='xs'>Users</Heading>
        </CardHeader>
        <CardBody p={2} m={0}>
          <List p={0}>{usersView(users)}</List>
        </CardBody>
      </Card>

      <ChatChannelModalForm
        open={isAddChannel}
        onFinish={onSaveChannel}
        user={user}
        onOpenChange={setIsAddChannel}
        activeChannel={activeChannel}
      />

      <ConfirmDialog
        open={confirmDeleteChannel}
        onConfirm={() => processDeleteChannel()}
        title='Please Confirm'
        message={messageConfirmDeleteChannel}
        cancelLabel='Cancel'
        confirmLabel='Confirm'
        onOpenChange={setConfirmDeleteChannel}
      />
    </>
  );
}

export default ChatChannel;
