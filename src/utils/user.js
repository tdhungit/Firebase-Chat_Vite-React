import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { DbCollections, db, getDocument } from '../config/database';

export function getUsers(cb) {
  const q = query(
    collection(db, DbCollections.user),
    orderBy('createdAt'),
    limit(50)
  );

  onSnapshot(q, (QuerySnapshot) => {
    let users = [];
    QuerySnapshot.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id });
    });
    cb(users);
  });
}

export function getUser(id) {
  return getDocument(DbCollections.user, id);
}

export async function addUser({ user }) {
  const { uid, displayName, email, photoURL } = user;
  const foundUser = await getUser(uid);
  if (!foundUser) {
    try {
      return await setDoc(doc(db, DbCollections.user, uid), {
        createdAt: serverTimestamp(),
        id: uid,
        email,
        name: displayName,
        avatar: photoURL,
      });
    } catch (err) {
      console.log(err.message);
    }
  }
  return undefined;
}