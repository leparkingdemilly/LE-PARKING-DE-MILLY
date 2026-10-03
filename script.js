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
  const arriveeInput = document.getElementById("formArrivee").value;
  const departInput = document.getElementById("formDepart").value;
  const transfertSelect = document.getElementById("formTransfertSelect");

  // Vérifier les dates du formulaire
  if (!arriveeInput || !departInput) {
    alert("Veuillez renseigner les dates d'arrivée et de départ.");
    return false;
  }

  // Créer les dates en heure locale
  const [aa, ma, ja] = arriveeInput.split("-").map(Number);
  const [ad, md, jd] = departInput.split("-").map(Number);

  const arrivee = new Date(aa, ma - 1, ja);
  const depart = new Date(ad, md - 1, jd);

  if (depart < arrivee) {
    alert("La date de départ doit être égale ou postérieure à la date d'arrivée.");
    return false;
  }

  // Comptage inclusif : arrivée + départ comptent
  const jours = Math.round((depart - arrivee) / 86400000) + 1;

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

  // Calcul du transfert
  const transfertTexte = transfertSelect.value;
  let prixTransfert = 0;

  if (transfertTexte.startsWith("Aéroport")) {
    prixTransfert = 14;
  } else if (transfertTexte.startsWith("Gare maritime")) {
    prixTransfert = 20;
  }

  const total = jours * prixJour + prixTransfert;

  // Informations envoyées à Web3Forms
  document.getElementById("formJours").value = jours;
  document.getElementById("formTransfert").value = transfertTexte;
  document.getElementById("formPrix").value = total + " €";

  return true;
}

/ ===== SYNCHRONISATION DU TRANSFERT =====
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
