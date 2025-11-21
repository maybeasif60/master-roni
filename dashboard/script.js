import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyC77RfgLBX9jqOaYT088HQyZC1a3O55kUc",
  authDomain: "master-roni-f17ec.firebaseapp.com",
  databaseURL: "https://master-roni-f17ec-default-rtdb.firebaseio.com",
  projectId: "master-roni-f17ec",
  storageBucket: "master-roni-f17ec.firebasestorage.app",
  messagingSenderId: "200053184974",
  appId: "1:200053184974:web:8bb3563f08e8dfc5ed339f",
  measurementId: "G-LYVBML2PV6"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// DOM Elements
const userNameEl = document.getElementById('userName');

// Check login state
onAuthStateChanged(auth, (user) => {
  if (user) {
    if(userNameEl) {
      // Show user's email or display name
      userNameEl.textContent = user.displayName || user.email || "User";
    }
  } else {
    // Redirect to login if not logged in
    window.location.href = '../login/index.html';
  }
});

// Logout function
window.logout = () => {
  signOut(auth)
    .then(() => {
      window.location.href = '../login/';
    })
    .catch((error) => {
      console.error("Logout failed:", error);
      alert("Logout failed. Try again.");
    });
};
