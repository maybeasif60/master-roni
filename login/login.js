import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const loginForm = document.getElementById('loginForm');
const errorMsg = document.getElementById('error-msg');

// Redirect if already logged in
onAuthStateChanged(auth, (user) => {
  if(user){
    console.log("Logged in UID:", user.uid);
    window.location.href = '..//dashboard/index.html';
  }
});

// Handle login
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const uid = userCredential.user.uid;
      console.log("Logged in UID:", uid);
      window.location.href = '..//dashboard/index.html';
    })
    .catch((error) => {
      let message = "";

      switch(error.code){
        case "auth/invalid-email":
          message = "❌ Email ঠিক হয়নি।";
          break;
        case "auth/user-not-found":
          message = "❌ User পাওয়া যায়নি।";
          break;
        case "auth/wrong-password":
          message = "❌ Password ভুল।";
          break;
        case "auth/too-many-requests":
          message = "❌ অনেকবার চেষ্টা হয়েছে, কিছুক্ষণ পরে আবার চেষ্টা করুন।";
          break;
        default:
          message = "❌ Login করতে সমস্যা হচ্ছে।";
      }

      errorMsg.textContent = message;
    });
});
