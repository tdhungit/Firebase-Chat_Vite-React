import { Avatar, Flex, Text } from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';

function ChatBoxMessage({ user, messages }) {
  const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
  };

  return (
    <Flex w='100%' h='100%' overflowY='scroll' flexDirection='column' p='3'>
      {messages.map((item, index) => {
        if (item.email === user.email) {
          return (
            <Flex key={index} w='100%' justify='flex-end'>
              <Flex
                bg='black'
                color='white'
                minW='100px'
                maxW='350px'
                my='1'
                p='2'
                borderRadius={10}
              >
                <Text>{item.message}</Text>
              </Flex>
            </Flex>
          );
        } else {
          return (
            <Flex key={index} w='100%'>
              <Avatar name='Computer' src={item.avatar} bg='blue.300'></Avatar>
              <Flex
                bg='gray.100'
                color='black'
                minW='100px'
                maxW='350px'
                my='1'
                p='2'
                borderRadius={10}
              >
                <Text>{item.message}</Text>
              </Flex>
            </Flex>
          );
        }
      })}
      <AlwaysScrollToBottom />
    </Flex>
  );
}

export default ChatBoxMessage;
