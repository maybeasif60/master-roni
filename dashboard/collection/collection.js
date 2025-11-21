// collection.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-auth.js";
import { getDatabase, ref, onChildAdded, onValue, remove, update, query, orderByChild, equalTo } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";
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


// Initialize
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

let adminUID = null;
const tableBody = document.querySelector("#collectionTable tbody");
const notifications = document.getElementById("notifications");

// Login check
onAuthStateChanged(auth, (user)=>{
  if(user){
    adminUID = user.uid;
    loadOrders();
  } else {
    window.location.href = "../login";
  }
});

// Logout
window.logout = ()=>{
  signOut(auth).then(()=>window.location.href="../login");
};

// Load only this admin's orders
function loadOrders(){
  const ordersRef = query(ref(db, "orders"), orderByChild("adminRef"), equalTo(adminUID));
  let firstLoad = true;

  onValue(ordersRef, (snapshot)=>{
    tableBody.innerHTML = "";
    const data = snapshot.val();
    const keys = Object.keys(data || {});
    notifications.innerHTML = `<p>${keys.length} requests found</p>`;

    keys.forEach(key=>{
      const order = data[key];
      tableBody.innerHTML += `
        <tr>
          <td>${order.email || ""}</td>
          <td>${order.name || ""}</td>
          <td>
            <button onclick="deleteOrder('${key}')">Delete</button>
          </td>
        </tr>
      `;
    });
  });

  // Listen for new orders for notification (optional)
  onChildAdded(ordersRef, (snapshot)=>{
    if(firstLoad) return;
    const order = snapshot.val();
    new Notification("New Order!", { body:`Email: ${order.email}`, icon:"../logo.png" });
  });

  setTimeout(()=>firstLoad=false,3000);
}

// Delete order
window.deleteOrder = function(key){
  if(confirm("Delete this order?")){
    remove(ref(db, `orders/${key}`));
  }
}
