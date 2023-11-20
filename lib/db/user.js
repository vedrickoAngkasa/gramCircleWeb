import { fireDb } from "@/lib/db";

import {
  collection,
  where,
  addDoc,
  getDocs,
  getDoc,
  updateDoc,
  query,
  setDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const USERS_COLLECTION_NAME = "customers";

export const getUserByUid = async (user) => {
  console.log("getUserByUid db", USERS_COLLECTION_NAME, user);
  const q = query(
    collection(fireDb, USERS_COLLECTION_NAME),
    where("uid", "==", user.uid)
  );
  const snapshot = await getDocs(q);
  console.log(snapshot);
  if (snapshot.empty) {
    return addUserByUid(user);
  }
  const userData = snapshot.docs[0].data();
  return {
    id: snapshot.docs[0].id,
    ...userData,
  };
};

export const addUserByUid = async (user) => {
  console.log("add new user", user);
  if (!user || !user.uid) {
    throw new Error("User or user UID is missing");
  }
  await setDoc(doc(fireDb, USERS_COLLECTION_NAME, user.uid), user);
  return user;
};
