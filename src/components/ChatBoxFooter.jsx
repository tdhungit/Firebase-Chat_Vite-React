import { Button, Flex, Input, Spinner } from '@chakra-ui/react';
import React from 'react';

function ChatBoxFooter({
  inputMessage,
  setInputMessage,
  handleSendMessage,
  isSending,
}) {
  return (
    <Flex w='100%' mt='5'>
      <Input
        placeholder='Type Something...'
        border='none'
        borderRadius='none'
        _focus={{
          border: '1px solid black',
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleSendMessage();
          }
        }}
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
      />
      {isSending && <Spinner />}
      {!isSending && (
        <Button
          bg='black'
          color='white'
          borderRadius={5}
          _hover={{
            bg: 'white',
            color: 'black',
            border: '1px solid black',
          }}
          disabled={inputMessage.trim().length <= 0}
          onClick={handleSendMessage}
        >
          Send
        </Button>
      )}
    </Flex>
  );
}

export default ChatBoxFooter;
