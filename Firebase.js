// Firebase App
import { initializeApp }
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

// Authentication
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// Firestore
import {
  getFirestore,
  collection,
  addDoc
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Storage
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";


// ==========================
// FIREBASE CONFIG
// ==========================

const firebaseConfig = {

  apiKey: "YOUR_API_KEY",

  authDomain: "YOUR_PROJECT.firebaseapp.com",

  projectId: "YOUR_PROJECT_ID",

  storageBucket: "YOUR_PROJECT.appspot.com",

  messagingSenderId: "YOUR_SENDER_ID",

  appId: "YOUR_APP_ID"

};


// ==========================
// INITIALIZE FIREBASE
// ==========================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);


// ==========================
// REGISTER
// ==========================

window.register = async function(){

  const email =
  document.getElementById("email").value;

  const password =
  document.getElementById("password").value;

  try{

    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Account Created Successfully 🚀");

  }

  catch(error){

    alert(error.message);

  }

};


// ==========================
// LOGIN
// ==========================

window.login = async function(){

  const email =
  document.getElementById("email").value;

  const password =
  document.getElementById("password").value;

  try{

    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    alert("Login Successful 🚀");

    window.location.href =
    "dashboard.html";

  }

  catch(error){

    alert(error.message);

  }

};


// ==========================
// LOGOUT
// ==========================

window.logout = async function(){

  await signOut(auth);

  alert("Logged Out");

  window.location.href =
  "index.html";

};


// ==========================
// RESUME UPLOAD
// ==========================

window.uploadResume = async function(){

  const file =
  document.getElementById("resume").files[0];

  if(!file){

    alert("Select Resume First");

    return;

  }

  try{

    const storageRef =
    ref(
      storage,
      "resumes/" + file.name
    );

    await uploadBytes(
      storageRef,
      file
    );

    const url =
    await getDownloadURL(
      storageRef
    );

    await addDoc(
      collection(db,"resumes"),
      {
        fileName:file.name,
        resumeUrl:url,
        uploadedAt:new Date()
      }
    );

    alert("Resume Uploaded Successfully ✅");

    console.log(url);

  }

  catch(error){

    alert(error.message);

  }

};