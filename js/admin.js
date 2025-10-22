import { auth } from "./firebase.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { db, collection, getDocs } from "./firebase.js";

// Redirect non-logged-in users
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = "admin-login.html";
  } else {
    loadOrders();
  }
});

// Logout functionality
document.getElementById("logoutBtn").addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "admin-login.html";
});

// Load orders from Firestore
async function loadOrders() {
  const ordersList = document.getElementById("ordersList");
  ordersList.innerHTML = "<tr><td colspan='5'>Loading orders...</td></tr>";

  try {
    const querySnapshot = await getDocs(collection(db, "orders"));
    ordersList.innerHTML = ""; // clear

    if (querySnapshot.empty) {
      ordersList.innerHTML = "<tr><td colspan='5'>No orders found yet.</td></tr>";
      return;
    }

    querySnapshot.forEach((doc) => {
      const data = doc.data();
      const row = `
        <tr>
          <td>${data.name}</td>
          <td>${data.phone}</td>
          <td>${data.address}</td>
          <td>${data.orderDetails}</td>
          <td>${new Date(data.timestamp).toLocaleString()}</td>
        </tr>`;
      ordersList.innerHTML += row;
    });
  } catch (error) {
    console.error("Error fetching orders: ", error);
    ordersList.innerHTML = "<tr><td colspan='5'>Error loading orders.</td></tr>";
  }
}
