import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import './App.css';
import ChatBox from './components/ChatBox';
import Welcome from './components/Welcome';
import { auth } from './config/database';
import { addUser } from './utils/user';

function App() {
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      addUser({ user }).then((res) => {});
    }
  }, [user]);

  return (
    <div className='App'>{user ? <ChatBox user={user} /> : <Welcome />}</div>
  );
}

export default App;
