import { Divider, Flex, Grid, GridItem } from '@chakra-ui/react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { db } from '../config/database';
import { getChatMessages } from '../utils/chat';
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
      return `${user.uid}_${activeUser}`;
    }

    return '';
  };

  useEffect(() => {
    const channelId = getChannelId();
    if (channelId) {
      const unsubscribe = getChatMessages(channelId, (messages) => {
        setMessages(messages);
      });

      return () => unsubscribe;
    }
  }, [activeChannel, activeUser]);

  const handleSendMessage = () => {
    const channelId = getChannelId();
    if (!channelId) {
      return;
    }

    const { uid, displayName, email, photoURL } = user;
    setIsSending(true);
    addDoc(collection(db, 'chakra-chat'), {
      message: inputMessage,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
      email,
      channelId: channelId,
    })
      .then((res) => {
        setInputMessage('');
        setIsSending(false);
      })
      .catch((e) => {
        console.log(e);
        setIsSending(false);
      });
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
            <ChatBoxMessage user={user} messages={messages} />
          </GridItem>
        </Grid>
        <Divider />
        <ChatBoxFooter
          inputMessage={inputMessage}
          setInputMessage={setInputMessage}
          handleSendMessage={handleSendMessage}
          isSending={isSending}
        />
      </Flex>
    </Flex>
  );
}

export default ChatBox;
