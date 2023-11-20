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

const PROMOTIONS_COLLECTION_NAME = "promotions";

export const addPromotion = async (promotion) => {
  try {
    console.log("add promotion: ", promotion);
    const promotionsRef = collection(fireDb, PROMOTIONS_COLLECTION_NAME);
    const newPromotionDocRef = await addDoc(promotionsRef, promotion);
    const newPromotionId = newPromotionDocRef.id;

    return newPromotionId;
  } catch (error) {
    console.error("Error adding promotion: ", error.message);
    return null;
  }
};

export async function getPromotions(uid, brandId) {
  try {
    const promotionsRef = collection(fireDb, PROMOTIONS_COLLECTION_NAME);

    // Create a query to get all promotions for the specified uid
    const q = query(
      promotionsRef,
      where("uid", "==", uid),
      where("brandId", "==", brandId)
    );

    // Execute the query and get the documents
    const querySnapshot = await getDocs(q);

    // Extract and format the promotion data
    const promotions = [];
    querySnapshot.forEach((doc) => {
      promotions.push({ id: doc.id, ...doc.data() });
    });

    return promotions;
  } catch (error) {
    console.error("Error fetching promotions: ", error.message);
    return [];
  }
}

export async function getPromotion(promoId) {
  try {
    const promotionsRef = doc(fireDb, PROMOTIONS_COLLECTION_NAME, promoId);

    // Retrieve the promotion document by its ID
    const promotionDocSnapshot = await getDoc(promotionsRef);

    if (promotionDocSnapshot.exists()) {
      return { id: promoId, ...promotionDocSnapshot.data() };
    } else {
      throw new Error(`Promotion with ID ${promoId} not found`);
    }
  } catch (error) {
    console.error("Error fetching promotion: ", error.message);
    return null;
  }
}

export async function deletePromotion(promoId) {
  try {
    const promotionsRef = doc(fireDb, PROMOTIONS_COLLECTION_NAME, promoId);

    // Delete the promotion document by its ID
    await deleteDoc(promotionsRef);

    return true; // Deletion successful
  } catch (error) {
    console.error(
      `Error deleting promotion with ID ${promoId}: ${error.message}`
    );
    return false; // Deletion failed
  }
}
export async function updatePromotion(promoId, updatedPromotion) {
  try {
    const promotionRef = doc(fireDb, PROMOTIONS_COLLECTION_NAME, promoId);

    // Use the updateDoc function to update the promotion
    await updateDoc(promotionRef, updatedPromotion);

    return true;
  } catch (error) {
    console.error(
      `Error updating promotion with ID ${promoId}: ${error.message}`
    );
    return false;
  }
}
