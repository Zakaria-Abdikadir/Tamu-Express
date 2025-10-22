import { db, collection, addDoc } from "./firebase.js";

const orderForm = document.getElementById("orderForm");
const orderMessage = document.getElementById("orderMessage");

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
      name,
      phone,
      address,
      orderDetails,
      timestamp: new Date().toISOString()
    });

    orderMessage.textContent = "✅ Order placed successfully!";
    orderForm.reset();
  } catch (error) {
    console.error("Error adding document: ", error);
    orderMessage.textContent = "❌ Failed to place order. Try again later.";
  }
});
