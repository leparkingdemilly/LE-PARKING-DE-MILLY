function calculerPrix() {
  const arrivee = new Date(document.getElementById("arrivee").value);
  const depart = new Date(document.getElementById("depart").value);
  const transfert = parseInt(document.getElementById("transfert").value);

  if (!arrivee || !depart || depart <= arrivee) {
    alert("Veuillez entrer des dates valides");
    return;
  }

  const arrivee = new Date(arriveeInput);
  const depart = new Date(departInput);

  if (depart < arrivee) {
    alert("La date de départ doit être après l'arrivée");
    return;
  }

  // Différence en millisecondes
  const diffMs = depart - arrivee;

  // Conversion en jours +1 pour inclure arrivée ET départ
  const jours = Math.floor(diffMs / (1000 * 60 * 60 * 24)) + 1;

  let prixJour = 10;

  if (jours >= 30) prixJour = 6;
  else if (jours >= 22) prixJour = 7;
  else if (jours >= 15) prixJour = 8;
  else if (jours >= 7) prixJour = 9;

  const total = jours * prixJour + transfert;
  document.getElementById("prix").textContent = total + "€";
}
