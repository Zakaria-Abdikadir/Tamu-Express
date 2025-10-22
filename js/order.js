import { db, auth } from "./firebase.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const orderForm = document.getElementById("orderForm");
const orderMessage = document.getElementById("orderMessage");

onAuthStateChanged(auth, (user) => {
  if (!user) {
    orderMessage.textContent = "⚠️ Please log in first before placing an order.";
    orderForm.style.display = "none";
    return;
  }

  orderForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const address = document.getElementById("address").value.trim();
    const orderDetails = document.getElementById("orderDetails").value.trim();

    if (!name || !phone || !address || !orderDetails) {
      orderMessage.textContent = "⚠️ Please fill all fields.";
      return;
    }

    try {
      await addDoc(collection(db, "orders"), {
        uid: user.uid,
        name,
        phone,
        address,
        orderDetails,
        timestamp: new Date().toISOString(),
      });

      orderMessage.textContent = "✅ Order placed successfully!";
      orderForm.reset();
    } catch (error) {
      console.error("Error adding document: ", error);
      orderMessage.textContent = "❌ Failed to place order. Try again later.";
    }
  });
});
