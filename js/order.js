import { db } from "./firebase.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const orderForm = document.getElementById("orderForm");
const orderMessage = document.getElementById("orderMessage");

const setFeedback = (element, message, type = "") => {
  if (!element) return;
  element.textContent = message;
  element.classList.remove("success", "error");
  if (type) {
    element.classList.add(type);
  }
};

orderForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();
  const orderDetails = document.getElementById("orderDetails").value.trim();

  if (!name || !phone || !address || !orderDetails) {
    setFeedback(orderMessage, "⚠️ Please fill in all fields.", "error");
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

    setFeedback(orderMessage, "✅ Order placed successfully!", "success");
    orderForm.reset();
  } catch (error) {
    console.error("Error placing order:", error);
    setFeedback(orderMessage, "❌ Failed to place order. Try again later.", "error");
  }
});
