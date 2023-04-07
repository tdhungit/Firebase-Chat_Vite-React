import { Avatar, AvatarBadge, Flex, Text } from '@chakra-ui/react';
import React from 'react';

function ChatBoxHeader({ user }) {
  console.log(user);
  return (
    <Flex w="100%">
      <Avatar size="lg" name={user.displayName} src={user.photoURL}>
        <AvatarBadge boxSize="1.25em" bg="green.500" />
      </Avatar>
      <Flex flexDirection="column" mx="5" justify="center">
        <Text fontSize="lg" fontWeight="bold">
          {user.displayName}
        </Text>
        <Text color="green.500">Online</Text>
      </Flex>
    </Flex>
  )
}

export default ChatBoxHeader;