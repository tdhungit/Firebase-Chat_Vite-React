import {
  addDoc,
  collection,
  deleteDoc,
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

export function getChatChannels(user, cb) {
  const q = query(
    collection(db, DbCollections.channel),
    where('type', '==', 'group'),
    where('memberIds', 'array-contains', user.uid),
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
  const { uid, displayName, email, photoURL } = user;
  let membersInfo = {
    [uid]: {
      id: uid,
      name: displayName,
      avatar: photoURL,
      email,
    },
  };
  let allMemberIds = { [uid]: true };
  let memberIds = [uid];
  members.forEach((m) => {
    allMemberIds[m.id] = true;
    membersInfo[m.id] = m;
    memberIds.push(m.id);
  });

  return await addDoc(collection(db, DbCollections.channel), {
    createdAt: serverTimestamp(),
    name,
    type: 'group',
    ownerId: user.uid,
    membersInfo,
    allMemberIds,
    memberIds,
    members,
  });
}

export async function updateChatChannel(channelId, { name, members, user }) {
  const { uid, displayName, email, photoURL } = user;
  const channel = await getChannel(channelId);
  let membersInfo = channel.membersInfo || {
    [uid]: {
      id: uid,
      name: displayName,
      avatar: photoURL,
      email,
    },
  };
  let allMemberIds = channel.allMemberIds || { [uid]: true };
  let memberIds = [uid];
  members.forEach((m) => {
    allMemberIds[m.id] = true;
    membersInfo[m.id] = m;
    memberIds.push(m.id);
  });

  const ref = doc(db, DbCollections.channel, channelId);
  const result = await updateDoc(ref, {
    name,
    members,
    memberIds,
    membersInfo,
    allMemberIds,
  });
  return { id: channelId, ...result };
}

export async function leftChannel(channelId, user) {
  const channel = await getChannel(channelId);
  const members = channel.members.filter((m) => m.id !== user.uid);
  const memberIds = channel.memberIds.filter((id) => id !== user.uid);
  const allMemberIds = { ...channel.allMemberIds, [user.uid]: false };
  const ref = doc(db, DbCollections.channel, channelId);
  const result = await updateDoc(ref, { members, memberIds, allMemberIds });
  return { id: channelId, ...result };
}

export function deleteChatChannel(channelId) {
  const ref = doc(db, DbCollections.channel, channelId);
  return deleteDoc(ref);
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
