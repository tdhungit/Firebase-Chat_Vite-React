import {
  addDoc,
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore';
import { DbCollections, db } from '../config/database';

export function getChatChannels(cb) {
  const q = query(
    collection(db, DbCollections.channel),
    orderBy('createdAt'),
    limit(50)
  );

  onSnapshot(q, (QuerySnapshot) => {
    let channels = [];
    QuerySnapshot.forEach((doc) => {
      channels.push({ ...doc.data(), id: doc.id });
    });
    cb(channels);
  });
}

export function addChatChannel({ name, user }) {
  return addDoc(collection(db, DbCollections.channel), {
    createdAt: serverTimestamp(),
    name,
    ownerId: user.uid,
  });
}

export function addChat({ channelId, user, message }) {}
