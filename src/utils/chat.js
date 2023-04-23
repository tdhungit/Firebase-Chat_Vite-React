import {
  addDoc,
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore';
import { DbCollections, db, getDocument } from '../config/database';

export function getChatChannels(cb) {
  const q = query(
    collection(db, DbCollections.channel),
    where('type', '==', 'group'),
    orderBy('createdAt', 'desc'),
    limit(50)
  );

  return onSnapshot(q, (QuerySnapshot) => {
    let channels = [];
    QuerySnapshot.forEach((doc) => {
      channels.push({ ...doc.data(), id: doc.id });
    });
    cb(channels);
  });
}

export function getChatMessages(channelId, cb, operator) {
  operator = operator || '==';
  const q = query(
    collection(db, DbCollections.chat),
    where('channelId', operator, channelId),
    orderBy('createdAt'),
    limit(100)
  );

  return onSnapshot(q, (QuerySnapshot) => {
    let messages = [];
    QuerySnapshot.forEach((doc) => {
      messages.push({ ...doc.data(), id: doc.id });
    });
    cb(messages);
  });
}

export function getChannel(id) {
  return getDocument(DbCollections.channel, id);
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
      members: {
        [user.uid]: true,
        [member.id]: true,
      },
    });
  } catch (err) {
    console.error(err.message);
    return undefined;
  }
}

export async function addChatChannel({ user, name, members }) {
  try {
    members[user.uid] = true;
    return await addDoc(collection(db, DbCollections.channel), {
      createdAt: serverTimestamp(),
      name,
      type: 'group',
      ownerId: user.uid,
      members,
    });
  } catch (err) {
    console.error(err.message);
    return undefined;
  }
}

export async function updateChatChannel(channelId, { name, members, user }) {
  const ref = doc(db, DbCollections.channel, channelId);
  if (members) {
    members[user.uid] = true;
  }
  const result = await updateDoc(ref, { name, members });
  return { id: channelId, ...result };
}

export function addChat({ channelId, user, message }) {
  const { uid, displayName, email, photoURL } = user;
  return addDoc(collection(db, DbCollections.chat), {
    message: message,
    name: displayName,
    avatar: photoURL,
    createdAt: serverTimestamp(),
    uid,
    email,
    channelId: channelId,
  });
}
