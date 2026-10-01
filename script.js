// ===== CALCULATEUR TARIF =====
function calculerPrix() {
  const arriveeInput = document.getElementById("arrivee").value;
  const departInput = document.getElementById("depart").value;
  const transfertElement = document.getElementById("transfert");

  const transfert = parseInt(transfertElement.value) || 0;

  if (!arriveeInput || !departInput) {
    alert("Veuillez sélectionner les deux dates");
    return false;
  }

  const arrivee = new Date(arriveeInput);
  const depart = new Date(departInput);

  if (depart < arrivee) {
    alert("La date de départ doit être après l'arrivée");
    return false;
  }

  const diffMs = depart - arrivee;
  const jours = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;

  // Tarifs Le Parking de Milly
  let prixJour = 10;

  if (jours >= 31) {
    prixJour = 6;
  } else if (jours >= 22) {
    prixJour = 7;
  } else if (jours >= 15) {
    prixJour = 8;
  } else if (jours >= 8) {
    prixJour = 9;
  }

  const total = jours * prixJour + transfert;

  // Affichage du prix
  document.getElementById("prix").textContent = total + "€";

  // Remplissage automatique du formulaire
  const formArrivee = document.getElementById("formArrivee");
  const formDepart = document.getElementById("formDepart");
  const formJours = document.getElementById("formJours");
  const formTransfert = document.getElementById("formTransfert");
  const formPrix = document.getElementById("formPrix");
  const formTransfertSelect = document.getElementById("formTransfertSelect");

  if (formArrivee) {
    formArrivee.value = arriveeInput;
  }

  if (formDepart) {
    formDepart.value = departInput;
  }

  if (formJours) {
    formJours.value = jours;
  }

  if (formPrix) {
    formPrix.value = total + " €";
  }

  // Nom du transfert
  let transfertTexte = "Aucun transfert";

  if (transfert === 14) {
    transfertTexte = "Aéroport - 14 € aller-retour";
  } else if (transfert === 20) {
    transfertTexte = "Gare maritime - 20 € aller-retour";
  }

  if (formTransfert) {
    formTransfert.value = transfertTexte;
  }

  // Synchronise le choix avec le formulaire
  if (formTransfertSelect) {
    formTransfertSelect.value = transfertTexte;
  }

  return true;
}


// ===== PRÉPARATION DE LA RÉSERVATION =====
function preparerReservation() {

  const resultat = calculerPrix();

  if (!resultat) {
    return false;
  }

  return true;
}


// ===== SYNCHRONISATION DU TRANSFERT =====
const formTransfertSelect = document.getElementById("formTransfertSelect");
const transfertCalculateur = document.getElementById("transfert");

if (formTransfertSelect && transfertCalculateur) {

  formTransfertSelect.addEventListener("change", function () {

    if (this.value.includes("Aéroport")) {
      transfertCalculateur.value = "14";
    } 
    else if (this.value.includes("Gare maritime")) {
      transfertCalculateur.value = "20";
    } 
    else {
      transfertCalculateur.value = "0";
    }

    calculerPrix();
  });
}


// ===== SLIDER AUTO =====
let index = 0;
const slides = document.getElementById("slides");

function slideAuto() {
  if (!slides) return;

  const total = slides.children.length;

  if (total === 0) return;

  index = (index + 1) % total;

  slides.style.transform = `translateX(-${index * 100}%)`;
}

setInterval(slideAuto, 3000);
