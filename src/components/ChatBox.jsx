import {
  Card,
  CardBody,
  CardFooter,
  Divider,
  Flex,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { addChat, getChatMessages } from '../utils/chat';
import ChatBoxFooter from './ChatBoxFooter';
import ChatBoxHeader from './ChatBoxHeader';
import ChatBoxMessage from './ChatBoxMessage';
import ChatChannel from './ChatChannel';

function ChatBox({ user }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [activeChannel, setActiveChannel] = useState('');
  const [activeUser, setActiveUser] = useState('');

  const getChannelId = () => {
    if (activeChannel) {
      return activeChannel;
    }

    if (activeUser) {
      return [`${user.uid}_${activeUser}`, `${activeUser}_${user.uid}`];
    }

    return '';
  };

  useEffect(() => {
    const channelId = getChannelId();
    if (channelId) {
      let operator = '==';
      if (activeUser) {
        operator = 'in';
      }
      const unsubscribe = getChatMessages(
        channelId,
        (messages) => {
          setMessages(messages);
        },
        operator
      );

      return () => unsubscribe;
    }
  }, [activeChannel, activeUser]);

  const handleSendMessage = async () => {
    const channelId = `${user.uid}_${activeUser}`;
    if (!channelId) {
      return;
    }

    setIsSending(true);
    try {
      await addChat({ channelId, user, inputMessage });
      setInputMessage('');
      setIsSending(false);
    } catch (err) {
      console.log(err);
      setIsSending(false);
    }
  };

  const onSelectedChannel = (selectedChannel) => {
    setActiveChannel(selectedChannel.id);
    setActiveUser('');
  };

  const onSelectedUser = (selectedUser) => {
    setActiveChannel('');
    setActiveUser(selectedUser.id);
  };

  return (
    <Flex w='100%' h='100vh' justify='center' align='center'>
      <Flex w={['100%', '100%', '50%']} h='90%' flexDir='column'>
        <ChatBoxHeader user={user} />
        <Divider w='100%' borderBottomWidth='3px' color='black' mt='5' />
        <Grid templateColumns='repeat(4, 1fr)' gap={2}>
          <GridItem>
            <ChatChannel
              user={user}
              selectedChannelId={activeChannel}
              selectedUserId={activeUser}
              setChannel={onSelectedChannel}
              setUser={onSelectedUser}
            />
          </GridItem>
          <GridItem colSpan={3}>
            <Card marginTop={3} h='75vh'>
              <CardBody>
                <ChatBoxMessage user={user} messages={messages} />
              </CardBody>
              <CardFooter>
                <ChatBoxFooter
                  inputMessage={inputMessage}
                  setInputMessage={setInputMessage}
                  handleSendMessage={handleSendMessage}
                  isSending={isSending}
                />
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
      </Flex>
    </Flex>
  );
}

export default ChatBox;
