``javascript
const arrivee = document.getElementById("arrivee");
const depart = document.getElementById("depart");
const transfert = document.getElementById("transfert");
const joursSpan = document.getElementById("jours");
const totalSpan = document.getElementById("total");
const whatsapp = document.getElementById("whatsapp");

function prixParJour(jours) {
  if (jours >= 30) return 6;
  if (jours >= 22) return 7;
  if (jours >= 15) return 8;
  if (jours >= 7) return 9;
  return 10;
}

function calcul() {
  const d1 = new Date(arrivee.value);
  const d2 = new Date(depart.value);

  if (!arrivee.value || !depart.value) return;

  const diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
  if (diff <= 0) return;

  const prixJour = prixParJour(diff);
  const total = diff * prixJour + Number(transfert.value);

  joursSpan.textContent = diff;
  totalSpan.textContent = total + "€";

  const message = `Bonjour, je souhaite réserver au Parking de Milly\nArrivée: ${arrivee.value}\nDépart: ${depart.value}\nDurée: ${diff} jours\nTotal: ${total}€`;
  whatsapp.href = `https://wa.me/590690724661?text=${encodeURIComponent(message)}`;
}

arrivee.addEventListener("change", calcul);
depart.addEventListener("change", calcul);
transfert.addEventListener("change", calcul);
```
