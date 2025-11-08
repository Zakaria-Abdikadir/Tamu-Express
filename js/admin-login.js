import { auth } from "./firebase.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

const setFeedback = (element, message, type = "") => {
  if (!element) return;
  element.textContent = message;
  element.classList.remove("success", "error");
  if (type) {
    element.classList.add(type);
  }
};

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  try {
    await signInWithEmailAndPassword(auth, email, password);
    setFeedback(loginMessage, "✅ Login successful!", "success");
    setTimeout(() => (window.location.href = "admin.html"), 1000);
  } catch (error) {
    console.error("Login failed:", error);
    setFeedback(loginMessage, "❌ Invalid email or password.", "error");
  }
});
