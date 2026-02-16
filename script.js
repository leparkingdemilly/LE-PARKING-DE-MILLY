```javascript
function calculerPrix() {
  const jours = parseInt(document.getElementById("jours").value);
  const transfert = parseInt(document.getElementById("transfert").value);

  if (!jours || jours <= 0) {
    alert("Veuillez entrer un nombre de jours valide");
    return;
  }

  let prixJour = 10;

  if (jours >= 30) prixJour = 6;
  else if (jours >= 22) prixJour = 7;
  else if (jours >= 15) prixJour = 8;
  else if (jours >= 7) prixJour = 9;

  const total = jours * prixJour + transfert;

  document.getElementById("prix").textContent = total + "€";
}
```