import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
import React from 'react';
import { auth } from '../config/database';
import { Box, Button } from '@chakra-ui/react';
import { UnlockIcon } from '@chakra-ui/icons';

function Welcome() {
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
  
  const signOut = () => {
    auth.signOut();
  };

  return (
    <div>
      <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
        <Button onClick={googleSignIn}>
          <UnlockIcon /> Login via Google
        </Button>
      </Box>
    </div>
  );
}

export default Welcome;