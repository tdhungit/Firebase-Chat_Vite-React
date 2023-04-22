import { Box, Button, List, ListItem } from '@chakra-ui/react';
import React from 'react';

function ChatChannel({ user, active }) {
  return (
    <Box p={4} borderWidth={1} m={3}>
      <List>
        <ListItem>
          <Button width='100%' colorScheme='gray' size='xs' variant='outline'>
            Channel 1
          </Button>
        </ListItem>
        <ListItem>
          <Button width='100%' colorScheme='teal' size='xs' variant='outline'>
            Channel 2
          </Button>
        </ListItem>
      </List>
    </Box>
  )
}

export default ChatChannel;