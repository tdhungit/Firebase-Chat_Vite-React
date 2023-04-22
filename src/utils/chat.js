import {
  addDoc,
  collection,
  doc,
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

export async function addPrivateChannel({ user, member }) {
  const id = `${user.uid}_${member.id}`;
  const channel = doc(db, DbCollections.channel, id);
  try {
    return await setDoc(channel, {
      createdAt: serverTimestamp(),
      name: member.name,
      type: 'private',
      ownerId: user.uid,
    });
  } catch (err) {
    console.error(err.message);
    return undefined;
  }
}

export async function addChatChannel({ name, user }) {
  try {
    return await addDoc(collection(db, DbCollections.channel), {
      createdAt: serverTimestamp(),
      name,
      type: 'group',
      ownerId: user.uid,
    });
  } catch (err) {
    console.error(err.message);
    return undefined;
  }
}

export function addChat({ channelId, user, message }) {}