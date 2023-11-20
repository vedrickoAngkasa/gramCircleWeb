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

const BRANDS_COLLECTION_NAME = "brands";
import { Brand } from "@/lib/db/types";

export const addBrand = async (brand) => {
  try {
    const brandsRef = collection(fireDb, BRANDS_COLLECTION_NAME);
    const newBrandDocRef = await addDoc(brandsRef, brand);
    const newBrandId = newBrandDocRef.id;

    return newBrandId;
  } catch (error) {
    console.error("Error adding brand: ", error.message);
    return null;
  }
};

export const getBrand = async (id) => {
  try {
    const brandsRef = collection(fireDb, BRANDS_COLLECTION_NAME);
    const brandDocRef = doc(brandsRef, id);
    const brandSnapshot = await getDoc(brandDocRef);

    if (brandSnapshot.exists()) {
      // The document exists; you can access its data using brandSnapshot.data()
      return brandSnapshot.data();
    } else {
      console.error("Brand not found");
      return null;
    }
  } catch (error) {
    console.error("Error getting brand: ", error.message);
    return null;
  }
};

export async function getBrands(uid) {
  try {
    const brandsRef = collection(fireDb, BRANDS_COLLECTION_NAME);

    // Create a query to get all brands for the specified uid
    const q = query(brandsRef, where("uid", "==", uid));

    // Execute the query and get the documents
    const querySnapshot = await getDocs(q);

    // Extract and format the brand data
    const brands = [];
    querySnapshot.forEach((doc) => {
      brands.push({ id: doc.id, ...doc.data() });
    });

    return brands;
  } catch (error) {
    console.error("Error fetching brands: ", error.message);
    return [];
  }
}

export async function deleteBrand(brandId) {
  try {
    const brandRef = doc(fireDb, BRANDS_COLLECTION_NAME, brandId);
    await deleteDoc(brandRef);
    return true;
  } catch (error) {
    console.error(
      `Error deleting brand with brandId ${brandId}: ${error.message}`
    );
    return false;
  }
}

export async function updateBrand(brandId, updatedBrand) {
  try {
    const brandRef = doc(fireDb, BRANDS_COLLECTION_NAME, brandId);

    // Use the updateDoc function to update the brand
    await updateDoc(brandRef, updatedBrand);

    return true;
  } catch (error) {
    console.error(
      `Error updating brand with brandId ${brandId}: ${error.message}`
    );
    return false;
  }
}
