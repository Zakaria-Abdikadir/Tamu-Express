import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, password);
    loginMessage.textContent = "✅ Login successful!";
    setTimeout(() => (window.location.href = "admin.html"), 1000);
  } catch (error) {
    console.error("Login failed:", error);
    loginMessage.textContent = "❌ Invalid email or password.";
  }
});
