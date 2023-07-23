import firebase from "firebase/app";
import {
  collection,
  addDoc,
  serverTimestamp,
  startAfter,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { database } from "@/modules/base";
import { MovieSession } from "../types";

export const MOVIE_COLLECTION = "movies";

export const shareMovieFirebase = ({
  youtube_id,
  title,
  description,
  thumbnail,
}: MovieSession) => {
  return addDoc(collection(database, MOVIE_COLLECTION), {
    youtube_id,
    title,
    description,
    thumbnail,
    shared_by: getAuth().currentUser?.email,
    created_date: serverTimestamp(),
    updated_date: serverTimestamp(),
    id: `${youtube_id}_${Date.now()}`
  });
};

export const getMoviesFirebase = ({ lastId, limitParam = 6 }: any) => {
  if (!lastId) {
    return getDocs(
      query(
        collection(database, MOVIE_COLLECTION),
        limit(limitParam),
        orderBy("created_date", "desc")
      )
    );
  }
  return getDocs(
    query(
      collection(database, MOVIE_COLLECTION),
      startAfter(lastId),
      limit(limitParam),
      orderBy("created_date", "desc")
    )
  );
};
