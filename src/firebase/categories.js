import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseSetup";

const categoriesCollection = collection(db, 'categories')

export async function getCategories() {
    const categorySnapshot = await getDocs(categoriesCollection);
    const categories = categorySnapshot.docs.map(doc => doc.data());
    return categories;
}