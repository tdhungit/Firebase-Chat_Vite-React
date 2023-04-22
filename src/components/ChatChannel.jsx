import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  List,
  ListItem,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { getChatChannels } from '../utils/chat';
import { getUsers } from '../utils/user';

function ChatChannel({ user, active }) {
  const [users, setUsers] = useState([]);
  const [channels, setChannels] = useState([]);

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

  const usersView = (users) => {
    let listView = [];
    users.forEach((u) => {
      if (u.id !== user.uid) {
        listView.push(
          <ListItem key={u.id}>
            <Button width='100%' colorScheme='gray' size='xs' variant='outline'>
              {u.name}
            </Button>
          </ListItem>
        );
      }
    });
    return listView;
  };

  const channelsView = (channels) => {
    let listView = [];
    channels.forEach((c) => {
      listView.push(
        <Button width='100%' colorScheme='gray' size='xs' variant='outline'>
          {c.name}
        </Button>
      );
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
      </Card>

      <Card marginTop={3}>
        <CardHeader p={0} paddingLeft={3}>
          <Heading size='xs'>Users</Heading>
        </CardHeader>
        <CardBody p={2} m={0}>
          <List p={0}>{usersView(users)}</List>
        </CardBody>
      </Card>
    </>
  );
}

export default ChatChannel;