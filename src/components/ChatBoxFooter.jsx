import { SunIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spinner,
} from '@chakra-ui/react';
import EmojiPicker from 'emoji-picker-react';
import React, { useEffect, useState } from 'react';

const EmojiView = ({ selected }) => {
  const onEmojiClick = (emoji) => {
    selected(emoji);
  };

  return (
    <>
      <Popover>
        <PopoverTrigger>
          <Button variant='link' size='sm'>
            <SunIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent>
          <EmojiPicker emojiStyle='facebook' onEmojiClick={onEmojiClick} />
        </PopoverContent>
      </Popover>
    </>
  );
};

function ChatBoxFooter({
  inputMessage,
  setInputMessage,
  handleSendMessage,
  isSending,
  active,
}) {
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage(inputMessage || '');
  }, [inputMessage]);

  const onSelectEmoji = (emoji) => {
    if (active) {
      setMessage(`${message} ${emoji.emoji}`.trim());
    }
  };

  const onSend = () => {
    setInputMessage(message);
    handleSendMessage(message);
  };

  return (
    <Flex w='100%' mt='5'>
      <InputGroup size='md'>
        <Input
          placeholder='Type Something...'
          border='none'
          _focus={{
            border: '1px solid black',
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              onSend();
            }
          }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!active}
        />
        <InputRightElement width='6.1rem'>
          <EmojiView selected={onSelectEmoji} />
          {!isSending && message.trim().length > 0 && active && (
            <Button
              size='sm'
              bg='black'
              color='white'
              borderRadius={5}
              _hover={{
                bg: 'white',
                color: 'black',
                border: '1px solid black',
              }}
              onClick={onSend}
            >
              Send
            </Button>
          )}
          {(isSending || message.trim().length <= 0 || !active) && (
            <Button size='sm' bg='gray' color='white' borderRadius={5}>
              Send {isSending && <Spinner />}
            </Button>
          )}
        </InputRightElement>
      </InputGroup>
    </Flex>
  );
}

export default ChatBoxFooter;
