import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

const config = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DB_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  //measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(config);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const realtimeDB = getDatabase(app);

export const DbCollections = {
  channel: 'chakra-channel',
  chat: 'chakra-chat',
  user: 'chakra-user',
};

export async function getDocument(collection, id) {
  const docRef = doc(db, collection, id);
  const document = await getDoc(docRef);
  return document.data();
}