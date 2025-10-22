import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const orderForm = document.getElementById("orderForm");
const orderMessage = document.getElementById("orderMessage");

orderForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const orderDetails = document.getElementById("orderDetails").value.trim();

  if (!name || !phone || !address || !orderDetails) {
    orderMessage.textContent = "⚠️ Please fill in all fields.";
    return;
  }

  try {
    await addDoc(collection(db, "orders"), {
      name,
      phone,
      address,
      orderDetails,
      timestamp: serverTimestamp()
    });

    orderMessage.textContent = "✅ Order placed successfully!";
    orderForm.reset();
  } catch (error) {
    console.error("Error placing order:", error);
    orderMessage.textContent = "❌ Failed to place order. Try again later.";
  }
});
