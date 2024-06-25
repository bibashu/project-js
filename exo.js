// Déclaration globale de sauvegarde
var sauvegarde = [];

// Fonction pour charger les données des étudiants depuis localStorage
function chargerEtudiantsDepuisLocalStorage() {
  sauvegarde = JSON.parse(localStorage.getItem("etudiants")) || [];
}

// Fonction pour calculer la moyenne des notes des étudiants
function calculerMoyenne(awa) {
  var somme = 0;
  for (var i = 0; i < awa.length; i++) {
    somme += awa[i].note;
  }
  console.log(awa.length)
  return somme / awa.length;
}

// Fonction pour peupler le tableau avec les données des étudiants
function populateTable() {
  var tableBody = document.getElementById("etudiants-table");
  tableBody.innerHTML = ""; // Effacer le contenu actuel du tableau

  sauvegarde.forEach(function (etudiant) {
    var row = document.createElement("tr");

    var nomCell = document.createElement("td");
    nomCell.textContent = etudiant.nom;
    row.appendChild(nomCell);

    var prenomCell = document.createElement("td");
    prenomCell.textContent = etudiant.prenom;
    row.appendChild(prenomCell);

    var ageCell = document.createElement("td");
    ageCell.textContent = etudiant.age;
    row.appendChild(ageCell);

    var noteCell = document.createElement("td");
    noteCell.textContent = etudiant.note;
    row.appendChild(noteCell);
    
     // Ajouter la ligne au corps du tableau
  });
}

// Fonction pour afficher les étudiants pour la page actuelle
function displayPage(limit, page) {
  var tableBody = document.getElementById("etudiants-table");
  tableBody.innerHTML = ""; // Effacer le contenu actuel du tableau

  var start = (page - 1) * limit;
  var end = start + limit;
  for (var i = start; i < end && i < sauvegarde.length; i++) {
    var row = document.createElement("tr");

    var nomCell = document.createElement("td");
    nomCell.textContent = sauvegarde[i].nom;
    row.appendChild(nomCell);

    var prenomCell = document.createElement("td");
    prenomCell.textContent = sauvegarde[i].prenom;
    row.appendChild(prenomCell);

    var ageCell = document.createElement("td");
    ageCell.textContent = sauvegarde[i].age;
    row.appendChild(ageCell);

    var noteCell = document.createElement("td");
    noteCell.textContent = sauvegarde[i].note;
    row.appendChild(noteCell);
    // creation de bouton
    var actionbutoon =  document.createElement("td");
    var modifier = document.createElement('button')
    modifier.classList.add("buttonModif")
    modifier.innerHTML = '<ion-icon name="pencil-outline"></ion-icon>';
    modifier.addEventListener('click', modifierForm)
    actionbutoon.appendChild(modifier)
    row.appendChild(actionbutoon)
    // Bouton supprimer
   
    var supprimer = document.createElement('button')
    supprimer.innerHTML = '<ion-icon name="trash-outline"></ion-icon>';
    supprimer.classList.add("buttonModif2")
    actionbutoon.appendChild(supprimer)

    row.appendChild(actionbutoon)

    tableBody.appendChild(row);

    tableBody.appendChild(row); // Ajouter la ligne au corps du tableau
  }
}

// Fonction pour générer les boutons de pagination
function pageGenerator(getItem) {
  var pagination = document.querySelector(".pagination");
  pagination.innerHTML = "";
  var numPages = Math.ceil(sauvegarde.length / getItem);
  for (var i = 1; i <= numPages; i++) {
    var pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.addEventListener(
      "click",
      (function (pageNumber) {
        return function () {
          currentPage = pageNumber;
          displayPage(getItem, currentPage); // Utilisation de getItem au lieu de itemperpage
        };
      })(i)
    );
    pagination.appendChild(pageButton);
  }
}

// Fonction pour gérer le changement d'éléments par page
function giveTrPerPage() {
  var itemperpage = Number(document.getElementById("itemperpage").value);
  currentPage = 1; // Réinitialiser à la première page
  displayPage(itemperpage, currentPage);
  pageGenerator(itemperpage);
}

// Fonction pour soumettre le formulaire d'ajout d'étudiant
function submitForm(event) {
  event.preventDefault();

  const nom = document.getElementById("nom").value;
  const prenom = document.getElementById("prenom").value;
  const age = document.getElementById("age").value;
  const note = document.getElementById("note").value;

  alert("Étudiant enregistré avec succès");

  // Créer un nouvel étudiant
  const nouvelEtudiant = {
    nom: nom,
    prenom: prenom,
    age: age,
    note: note,
  };

  // Ajouter le nouvel étudiant au tableau des étudiants
  sauvegarde.push(nouvelEtudiant);

  // Sauvegarder de nouveau dans localStorage
  localStorage.setItem("etudiants", JSON.stringify(sauvegarde));

  // Mettre à jour l'affichage du tableau avec les données ajoutées
  giveTrPerPage();
}

// Chargement initial des étudiants depuis localStorage
chargerEtudiantsDepuisLocalStorage();

// Affichage initial du tableau
giveTrPerPage();

// Affichage de la moyenne générale (si nécessaire)
var moyenneGenerale = calculerMoyenne(sauvegarde);
document.getElementById("moyenne-generale").textContent =
  "Moyenne générale : " + moyenneGenerale.toFixed(2);

// Écouter le clic sur le bouton "Ajouter" pour afficher le modal (Bootstrap 5)
var boutonAjout = document.getElementById("Ajout");
boutonAjout.addEventListener("click", function () {
  var myModal = new bootstrap.Modal(
    document.getElementById("AjoutModal"),
    {
      keyboard: false,
    }
  );
  myModal.show();
});

// Écouter la soumission du formulaire d'ajout d'étudiant
var submitBouton = document.getElementById("submit");
submitBouton.addEventListener("click", submitForm);
function submitForm(event) {
    event.preventDefault();
  
    const nom = document.getElementById("nom").value;
    const prenom = document.getElementById("prenom").value;
    const age = document.getElementById("age").value;
    const note = document.getElementById("note").value;
    alert("etudiant enregistrer avec sucess");
    // window.location.href= "./"
    let etudiants = JSON.parse(localStorage.getItem("etudiants")) || [];
  
    const nouvelEtudiant = {
      nom: nom,
      prenom: prenom,
      age: age,
      note: note,
    };
    // Ajouter le nouvel étudiant au tableau
    etudiants.push(nouvelEtudiant);
    // convertir en objet json
    localStorage.setItem("etudiants", JSON.stringify(etudiants));
  }
  var sauvegarde = JSON.parse(localStorage.getItem('etudiants'));
  // console.log(sauvegarde) je veux afficher les doées das le tableau
  function modifierForm(etudiant){
    var myModal = new bootstrap.Modal(
        document.getElementById("Modifier"),
        {
          keyboard: false,
        }
      );
      myModal.show();
       // Copier les données de l'étudiant dans les champs du formulaire
  document.getElementById("nom").value = etudiant.nom;
  console.log(etudiant.nom)
  document.getElementById("prenom").value = etudiant.prenom;
  document.getElementById("age").value = etudiant.age;
  document.getElementById("note").value = etudiant.note;

  // Écouteur pour le bouton de soumission du formulaire de modification
//   var submitModifierButton = document.getElementById("submitModifier");
//   submitModifierButton.addEventListener("click", function(event) {
//     event.preventDefault();
//     sauvegarderModification(etudiant);
//     myModal.hide();
//   });
  }
  