import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getFirestore,
  collection,
  addDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
  apiKey: "AIzaSyCjBdYzpw86_L58OfXLcUzV78aB6AOKEIo",
  authDomain: "tache-validation-ab125.firebaseapp.com",
  projectId: "tache-validation-ab125",
  storageBucket: "tache-validation-ab125.appspot.com",
  messagingSenderId: "430630979397",
  appId: "1:430630979397:web:9929f287054b3d3bcde02c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const submitEtudiant = document.getElementById("submit");

submitEtudiant.addEventListener("click", addEtudiant);

async function addEtudiant(event) {
  event.preventDefault();
  // alert("ca marche")
  try {
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const age = document.getElementById("age").value;
    const note = document.getElementById("note").value;

    // Replace 'your-collection-name' with the name of your Firestore collection
    const docRef = await addDoc(collection(db, "etudiants"), {
      // Replace the following with the data you want to store
      nom: nom,
      prenom: prenom,
      age: parseInt(age),
      note: parseInt(note),
    });
    setTimeout(() => {
      window.location.href = "./";
    }, 1000);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
