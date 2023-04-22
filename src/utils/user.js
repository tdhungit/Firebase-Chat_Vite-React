import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc
} from 'firebase/firestore';
import { DbCollections, db, getDocument } from '../config/database';

export function getUsers(cb) {
  const q = query(
    collection(db, DbCollections.channel),
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

export async function addUser({ user }) {
  const { uid, displayName, email, photoURL } = user;
  const foundUser = await getDocument(DbCollections.user, uid);
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