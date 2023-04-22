import { PlusSquareIcon } from '@chakra-ui/icons';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  List,
  ListItem,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getChatChannels } from '../utils/chat';
import { getUsers } from '../utils/user';
import ChatChannelModalForm from './ChatChannelModalForm';

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

  useEffect(() => {
    // get channels
    getChatChannels((allChannels) => {
      setChannels(allChannels);
    });
    // get users
    getUsers((allUsers) => {
      setUsers(allUsers);
    });
  }, []);

  const onSaveChannel = () => {
    setIsAddChannel(false);
  };

  const onSelectChannel = (channelSelect) => {
    setChannel(channelSelect);
  };

  const onSelectUser = (userSelect) => {
    setUser(userSelect);
  };

  const channelsView = (channels) => {
    let listView = [];
    channels.forEach((c) => {
      listView.push(
        <Button
          width='100%'
          colorScheme={c.id === selectedChannelId ? 'blue' : 'gray'}
          size='xs'
          variant='outline'
          key={c.id}
          onClick={() => onSelectChannel(c)}
        >
          {c.name}
        </Button>
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
              variant='outline'
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
            colorScheme='blue'
            variant='ghost'
            leftIcon={<PlusSquareIcon />}
            onClick={() => setIsAddChannel(true)}
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
      />
    </>
  );
}

export default ChatChannel;
