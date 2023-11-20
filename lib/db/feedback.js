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

const FEEDBACK_COLLECTION_NAME = "feedback";

export const addFeedback = async (feedback) => {
  try {
    console.log("add feedback: ", feedback);

    const feedbackRef = collection(fireDb, FEEDBACK_COLLECTION_NAME);
    const newFeedbackDocRef = await addDoc(feedbackRef, feedback);

    console.log("feedback added : ", newFeedbackDocRef.id);
    return newFeedbackDocRef.id;
  } catch (error) {
    console.error("Error adding feedback: ", error.message);
    return null;
  }
};

export async function getFeedbacks(promoUrl) {
  try {
    const feedbackRef = collection(fireDb, FEEDBACK_COLLECTION_NAME);

    console.log("Getting feedback for ", promoUrl);
    // Create a query to get all feedback for the specified uid
    const q = query(feedbackRef, where("promo", "==", promoUrl));

    // Execute the query and get the documents
    const querySnapshot = await getDocs(q);

    // Extract and format the feedback data
    const feedback = [];
    querySnapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });

    return feedback;
  } catch (error) {
    console.error("Error fetching feedback: ", error.message);
    return [];
  }
}

export async function getFeedback(promoUrl) {
  try {
    const feedbackRef = doc(fireDb, PROMOTIONS_COLLECTION_NAME, promoUrl);

    // Retrieve the feedback document by its ID
    const feedbackDocSnapshot = await getDoc(feedbackRef);

    if (feedbackDocSnapshot.exists()) {
      return { id: promoId, ...feedbackDocSnapshot.data() };
    } else {
      throw new Error(`Feedback with ID ${promoUrl} not found`);
    }
  } catch (error) {
    console.error("Error fetching feedback: ", error.message);
    return null;
  }
}
