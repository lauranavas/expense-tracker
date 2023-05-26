import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore";
import { db } from "./firebaseSetup";

const expensesCollection = collection(db, "expenses");

export async function getExpenses() {
  const expenseSnapshot = await getDocs(expensesCollection);
  const expenses = expenseSnapshot.docs.map((doc) => {
    const id = doc.id;
    const data = doc.data();
    const formattedDate = data.date.toDate().toLocaleString();

    return {
      id,
      ...data,
      date: formattedDate,
    };
  });
  return expenses;
}

export async function addExpense(expense) {
  try {
    const docRef = await addDoc(expensesCollection, {
      ...expense,
      date: Timestamp.fromDate(expense.date),
    });
    console.log(`New expense added with ID: ${docRef.id}`);
  } catch (error) {
    console.log(error);
  }
}
