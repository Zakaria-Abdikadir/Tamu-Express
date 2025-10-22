import { db } from "./firebase.js";
import { collection, onSnapshot, orderBy, query } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const statusMessage = document.getElementById("statusMessage");
const ordersBody = document.getElementById("ordersBody");

function renderOrders(snapshot) {
  ordersBody.innerHTML = "";

  if (snapshot.empty) {
    statusMessage.textContent = "No orders yet.";
    return;
  }

  snapshot.forEach((doc) => {
    const data = doc.data();

    const dateStr = data.timestamp?.toDate
      ? data.timestamp.toDate().toLocaleString()
      : "—";

    const row = `
      <tr>
        <td>${data.name || "—"}</td>
        <td>${data.phone || "—"}</td>
        <td>${data.address || "—"}</td>
        <td>${data.orderDetails || "—"}</td>
        <td>${dateStr}</td>
      </tr>`;
    ordersBody.insertAdjacentHTML("beforeend", row);
  });

  statusMessage.textContent = "✅ Orders loaded.";
}

try {
  const q = query(collection(db, "orders"), orderBy("timestamp", "desc"));
  onSnapshot(q, (snapshot) => renderOrders(snapshot));
} catch (err) {
  console.error("Error loading orders:", err);
  statusMessage.textContent = "❌ Failed to load orders.";
}
