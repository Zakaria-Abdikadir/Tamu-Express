import { db } from "./firebase.js";
import { collection, onSnapshot, orderBy, query } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const statusMessage = document.getElementById("statusMessage");
const ordersBody = document.getElementById("ordersBody");

const setStatusMessage = (message, type = "") => {
  if (!statusMessage) return;
  statusMessage.textContent = message;
  statusMessage.classList.remove("success", "error");
  if (type) {
    statusMessage.classList.add(type);
  }
};

function renderOrders(snapshot) {
  ordersBody.innerHTML = "";

  if (snapshot.empty) {
    setStatusMessage("No orders yet.", "success");
    return;
  }

  snapshot.forEach((doc) => {
    const data = doc.data();

    const dateStr = data.timestamp?.toDate
      ? data.timestamp.toDate().toLocaleString()
      : "—";

    const row = `
      <tr>
        <td data-label="Name">${data.name || "—"}</td>
        <td data-label="Phone">${data.phone || "—"}</td>
        <td data-label="Address">${data.address || "—"}</td>
        <td data-label="Order Details">${data.orderDetails || "—"}</td>
        <td data-label="Timestamp">${dateStr}</td>
      </tr>`;
    ordersBody.insertAdjacentHTML("beforeend", row);
  });

  setStatusMessage("✅ Orders loaded.", "success");
}

const updateStatusWithError = (err) => {
  console.error("Error loading orders:", err);
  setStatusMessage("❌ Failed to load orders.", "error");
};

try {
  const ordersQuery = query(collection(db, "orders"), orderBy("timestamp", "desc"));
  onSnapshot(
    ordersQuery,
    (snapshot) => renderOrders(snapshot),
    (error) => updateStatusWithError(error)
  );
} catch (err) {
  updateStatusWithError(err);
}
