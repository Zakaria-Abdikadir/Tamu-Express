import { db, collection, addDoc } from "./firebase.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("orderForm");
  const statusMsg = document.getElementById("order-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusMsg.textContent = "Submitting your order...";

    const name = document.getElementById("name").value;
    const phone = document.getElementById("phone").value;
    const food = document.getElementById("food").value;
    const notes = document.getElementById("notes").value;

    try {
      await addDoc(collection(db, "orders"), {
        name,
        phone,
        food,
        notes,
        timestamp: new Date().toISOString(),
      });

      statusMsg.textContent = "✅ Order submitted successfully!";
      form.reset();
    } catch (error) {
      console.error("Error:", error);
      statusMsg.textContent = "❌ Failed to submit. Please try again.";
    }
  });
});
