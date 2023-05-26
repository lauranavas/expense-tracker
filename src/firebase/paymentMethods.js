import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseSetup";

const paymentMethodsCollection = collection(db, "payment-methods");

export async function getPaymentMethods() {
  const paymentMethodSnapshot = await getDocs(paymentMethodsCollection);
  const paymentMethods = paymentMethodSnapshot.docs.map((doc) => doc.data());
  return paymentMethods;
}
