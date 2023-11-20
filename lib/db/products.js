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

const PRODUCTS_COLLECTION_NAME = "products";

export const addProduct = async (product) => {
  try {
    const productsRef = collection(fireDb, PRODUCTS_COLLECTION_NAME);
    const newProductDocRef = await addDoc(productsRef, product);
    const newProductId = newProductDocRef.id;

    return newProductId;
  } catch (error) {
    console.error("Error adding product: ", error.message);
    return null;
  }
};

export async function getProducts(uid, brandId) {
  try {
    const productsRef = collection(fireDb, PRODUCTS_COLLECTION_NAME);

    // Create a query to get all products for the specified uid
    const q = query(
      productsRef,
      where("uid", "==", uid),
      where("brandId", "==", brandId)
    );

    // Execute the query and get the documents
    const querySnapshot = await getDocs(q);

    // Extract and format the product data
    const products = [];
    querySnapshot.forEach((doc) => {
      products.push({ id: doc.id, ...doc.data() });
    });

    return products;
  } catch (error) {
    console.error("Error fetching products: ", error.message);
    return [];
  }
}

export async function deleteProduct(productId) {
  try {
    const productRef = doc(fireDb, PRODUCTS_COLLECTION_NAME, productId);
    await deleteDoc(productRef);
    return true;
  } catch (error) {
    console.error(
      `Error deleting product with productId ${productId}: ${error.message}`
    );
    return false;
  }
}

export async function updateProduct(productId, updatedProduct) {
  try {
    const productRef = doc(fireDb, PRODUCTS_COLLECTION_NAME, productId);

    // Use the updateDoc function to update the product
    await updateDoc(productRef, updatedProduct);

    return true;
  } catch (error) {
    console.error(
      `Error updating product with productId ${productId}: ${error.message}`
    );
    return false;
  }
}
