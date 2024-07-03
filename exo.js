import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  doc,
  setDoc,
  getFirestore,
  updateDoc,
  collection,
  deleteDoc,
  getDocs,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjBdYzpw86_L58OfXLcUzV78aB6AOKEIo",
  authDomain: "tache-validation-ab125.firebaseapp.com",
  projectId: "tache-validation-ab125",
  storageBucket: "tache-validation-ab125.appspot.com",
  messagingSenderId: "430630979397",
  appId: "1:430630979397:web:9929f287054b3d3bcde02c",
};

try {
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  // Function to populate the table
  async function populateTable() {
    const tableBody = document.getElementById("etudiants-table");
    tableBody.innerHTML = ""; // Effacer le contenu actuel du tableau

    const querySnapshot = await getDocs(collection(db, "etudiants"));
    let count = 0;
    let totalNotes = 0;
    let meilleureNote = 0;
    const rows = [];

    querySnapshot.forEach((doc) => {
      count++;
      const note = doc.data().note;
      totalNotes += note;
      if (note > meilleureNote) {
        meilleureNote = note;
      }

      const row = document.createElement("tr");

      const nomCell = document.createElement("td");
      nomCell.textContent = doc.data().nom;
      row.appendChild(nomCell);

      const prenomCell = document.createElement("td");
      prenomCell.textContent = doc.data().prenom;
      row.appendChild(prenomCell);

      const ageCell = document.createElement("td");
      ageCell.textContent = doc.data().age;
      row.appendChild(ageCell);

      const noteCell = document.createElement("td");
      noteCell.textContent = doc.data().note + " /20";
      row.appendChild(noteCell);

      const boutonGroup = document.createElement("td");
      boutonGroup.classList.add("btnGroup");

      const bouton1 = document.createElement("button");
      bouton1.classList.add("buttonModif");
      bouton1.innerHTML = '<ion-icon name="pencil-outline"></ion-icon>';
      bouton1.addEventListener("click", () => {
        modifier(doc.id);
      });
      boutonGroup.appendChild(bouton1);

      const bouton2 = document.createElement("button");
      bouton2.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';
      bouton2.classList.add("buttonModif2");
      bouton2.addEventListener("click", () => {
        supprimer(doc.id);
        setTimeout(() => {
          window.location.href = "./";
        }, 1000);
      });
      boutonGroup.appendChild(bouton2);

      row.appendChild(boutonGroup);
      rows.push(row);
    });

    const moyenne = count > 0 ? totalNotes / count : 0;
    document.getElementById('nombre').innerHTML = count;
    document.getElementById('moyenne').innerHTML = moyenne.toFixed(2) + " /20";
    document.getElementById('meilleur').innerHTML = meilleureNote + " /20";

    displayTable(rows);
    setupPagination(rows);
    setupFiltering(rows);
  }

  populateTable();

  async function modifier(documentId) {
    $("#Modifier").modal("show");
    try {
      const docRef = doc(db, "etudiants", documentId);
      const docSnapshot = await getDoc(docRef);

      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const nom = document.getElementById("M_nom");
        const prenom = document.getElementById("M_prenom");
        const age = document.getElementById("M_age");
        const note = document.getElementById("M_note");

        nom.value = data.nom || " ";
        prenom.value = data.prenom || "";
        age.value = data.age || "";
        note.value = data.note || "";

        console.log("Données chargées dans le formulaire:", data);
      } else {
        console.log("Aucun document trouvé avec l'ID:", documentId);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des données:", error);
    }
    const modifierEtudiant = document.getElementById("modifier");
    modifierEtudiant.addEventListener("click", modifierEtudiantFunction);
    function modifierEtudiantFunction(event) {
      event.preventDefault();
      modifEtudiant(documentId);

      setTimeout(() => {
        $("#Modifier").modal("hide");
        window.location.href = "./";
      }, 1000);
    }
  }

  async function modifEtudiant(documentId) {
    const nom = document.getElementById("M_nom").value;
    const prenom = document.getElementById("M_prenom").value;
    const age = document.getElementById("M_age").value;
    const note = document.getElementById("M_note").value;

    const tontineRef = doc(db, "etudiants", documentId);
    try {
      await updateDoc(tontineRef, {
        nom: nom,
        prenom: prenom,
        age: parseInt(age),
        note: parseInt(note),
      });
      console.log("Document mis à jour avec succès !");
    } catch (error) {
      console.error("Erreur lors de la mise à jour du document :", error);
    }
  }

  async function supprimer(documentId) {
    const choix = window.confirm("Voulez-vous supprimer ce document ?");
    if (choix === true) {
      await deleteDoc(doc(db, "etudiants", documentId));
    }
  }

  function setupFiltering(rows) {
    document.getElementById('filter-nom').addEventListener('keyup', () => filtrerEtudiantsParNom(rows));
    document.getElementById("search").onkeyup = e => {
      const text = e.target.value.toLowerCase();
      rows.forEach(row => {
        const matchText = row.querySelectorAll("td")[2].innerText.toLowerCase();
        row.style.display = matchText.indexOf(text) > -1 ? "" : "none";
      });
    };
  }

  function filtrerEtudiantsParNom(rows) {
    const input = document.getElementById("filter-nom").value.toUpperCase();
    rows.forEach(row => {
      const nomCell = row.getElementsByTagName("td")[0];
      if (nomCell) {
        const txtValue = nomCell.textContent || nomCell.innerText;
        row.style.display = txtValue.toUpperCase().indexOf(input) > -1 ? "" : "none";
      }
    });
  }

  function displayTable(rows) {
    const tableBody = document.getElementById("etudiants-table");
    tableBody.innerHTML = "";
    rows.forEach(row => tableBody.appendChild(row));
  }

  function setupPagination(rows) {
    const tbody = document.querySelector("tbody");
    const pageUl = document.querySelector(".pagination");
    const itemShow = document.querySelector("#itemperpage");
    let itemPerPage = 8;

    itemShow.onchange = () => {
      itemPerPage = Number(itemShow.value);
      displayPage(1, itemPerPage, rows);
      pageGenerator(itemPerPage, rows);
      getPageElement(itemPerPage, rows);
    };

    displayPage(1, itemPerPage, rows);
    pageGenerator(itemPerPage, rows);

    function displayPage(page, limit, rows) {
      tbody.innerHTML = "";
      const start = (page - 1) * limit;
      const end = start + limit;
      for (let i = start; i < end && i < rows.length; i++) {
        tbody.appendChild(rows[i]);
      }
    }

    function pageGenerator(limit, rows) {
      pageUl.innerHTML = "";
      const numOfPages = Math.ceil(rows.length / limit);
      for (let i = 1; i <= numOfPages; i++) {
        const li = document.createElement('li');
        li.className = 'list';
        const a = document.createElement('a');
        a.href = '#';
        a.innerText = i;
        a.setAttribute('data-page', i);
        li.appendChild(a);
        pageUl.appendChild(li);
      }
      pageRunner(pageUl.querySelectorAll("a"), limit, rows);
    }

    function pageRunner(pageLinks, limit, rows) {
      pageLinks.forEach(link => {
        link.onclick = e => {
          const page = e.target.getAttribute('data-page');
          displayPage(Number(page), limit, rows);
        };
      });
    }

    function getPageElement(limit, rows) {
      pageGenerator(limit, rows);
    }
  }
} catch (error) {
  console.error("Error initializing Firestore:", error);
}
