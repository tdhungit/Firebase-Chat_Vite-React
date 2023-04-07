 import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import './App.css';
import ChatBox from './components/ChatBox';
import Welcome from './components/Welcome';
import { auth } from './config/database';

function App() {
  const [user] = useAuthState(auth);

  useEffect(() => {
    
  }, []);

  return (
    <div className="App">
      {user ? <ChatBox user={user} /> : <Welcome />}
    </div>
  );
}

export default App
