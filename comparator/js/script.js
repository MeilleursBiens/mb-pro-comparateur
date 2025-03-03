// Initialisation des variables
var ar_honoraires = 75000;
var ar_forfait = 150;
var ar_ventes = 12;
var ar_commissions = 70;
var ar_total = 50700;
var ar_network = 24300;

var mb_honoraires = 75000;
var mb_forfait = 199;
var mb_ventes = 12;
var mb_commissions = 100;
var mb_total = 70502;
var mb_difference = 10;

let isNetwork = true; // Déplacer la variable ici pour qu'elle soit globale

// Fonction pour obtenir les paramètres de l'URL
function getUrlParameter(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
  var results = regex.exec(location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Fonction pour pré-sélectionner un réseau depuis l'URL
function autoSelectNetworkFromUrl() {
  const networkName = getUrlParameter("network");
  if (networkName && typeof reseauxList !== "undefined") {
    // Recherche insensible à la casse et aux espaces
    const network = reseauxList.find(
      (r) =>
        r.name.toLowerCase().replace(/\s+/g, "") ===
        networkName.toLowerCase().replace(/\s+/g, "")
    );

    if (network) {
      // Mettre à jour les champs avec les valeurs du réseau
      const arCommissionInput = document.getElementById("ar_commissions");
      const arForfaitInput = document.getElementById("ar_forfait");
      const reseauSearchInput = document.getElementById("reseauSearch");

      if (arCommissionInput && arForfaitInput && reseauSearchInput) {
        // Mettre à jour les valeurs
        arCommissionInput.value = network.commission;
        arForfaitInput.value = network.prix_pack;
        reseauSearchInput.value = network.name;

        // Mettre à jour les variables globales
        ar_commissions = network.commission;
        ar_forfait = network.prix_pack;
        isNetwork = true;

        // Déclencher le calcul
        calculate();
        updateNetworkCostText();
      }
    }
  }
}

// Attendre que le DOM et tous les scripts soient chargés
window.addEventListener("load", function () {
  // Attendre un court instant pour s'assurer que reseauxList est disponible
  setTimeout(autoSelectNetworkFromUrl, 100);
});

// --------------------------------------------------
// Récupération des éléments du DOM
var ar_input_honoraires = document.querySelector("#ar_honoraires");
var ar_input_forfait = document.querySelector("#ar_forfait");
var ar_input_ventes = document.querySelector("#ar_ventes");
var ar_input_commissions = document.querySelector("#ar_commissions");
var ar_text_total = document.querySelector("#ar_total");
var ar_text_network = document.querySelector("#ar_network");

var mb_input_honoraires = document.querySelector("#mb_honoraires");
var mb_input_forfait = document.querySelector("#mb_forfait");
var mb_input_ventes = document.querySelector("#mb_ventes");
var mb_input_commissions = document.querySelector("#mb_commissions");
var mb_text_total = document.querySelector("#mb_total");
var mb_text_difference = document.querySelector("#mb_difference");
var mb_text_total_2 = document.querySelector("#mb_total_2");
var mb_text_difference_2 = document.querySelector("#mb_difference_2");

// --------------------------------------------------
// Ajout des écouteurs d'évènements

ar_input_honoraires.addEventListener("input", calculate);
ar_input_forfait.addEventListener("input", calculate);
ar_input_ventes.addEventListener("input", calculate);
ar_input_commissions.addEventListener("input", calculate);

// --------------------------------------------------
// Fonction de calcul
function calculate() {
  // Récupérer les valeurs actuelles
  let honoraires = parseFloat(ar_input_honoraires.value) || 0;
  let forfait = parseFloat(ar_input_forfait.value) || 0;
  let ventes = parseFloat(ar_input_ventes.value) || 0;
  let commissions = parseFloat(ar_input_commissions.value) || 0;

  // Calcul situation actuelle
  let resultNormal = Math.round(
    honoraires * (commissions / 100) - forfait * 12
  );

  // Calcul MeilleursBiens (100% des honoraires - pack+ mensuel - coût par vente)
  let resultMB = Math.round(honoraires - 199 * 12 - 159 * ventes);

  // S'assurer que le résultat n'est pas négatif
  resultMB = Math.max(0, resultMB);

  // Calculer la différence
  let difference = resultMB - resultNormal;

  // Mettre à jour les affichages
  ar_text_total.innerHTML = formatPrice(resultNormal);
  mb_text_total.innerHTML = formatPrice(resultMB);
  mb_text_difference.innerHTML = formatPrice(Math.abs(difference));

  // Mettre à jour le texte de la différence
  const differenceText = document.querySelector(".has-text-danger");
  if (differenceText) {
    if (difference > 0) {
      differenceText.innerHTML = `Votre situation vous fait perdre <span id="mb_difference">${formatPrice(
        difference
      )}</span> / an`;
    } else {
      differenceText.innerHTML = `Votre situation vous fait gagner <span id="mb_difference">${formatPrice(
        Math.abs(difference)
      )}</span> / an`;
    }
  }

  // Synchroniser les champs honoraires
  mb_input_honoraires.value = honoraires;
  mb_honoraires = honoraires;

  // Synchroniser les champs ventes
  mb_input_ventes.value = ventes;
  mb_ventes = ventes;

  // Mettre à jour les autres variables
  ar_total = resultNormal;
  ar_network = honoraires - resultNormal;
  mb_difference = resultMB - resultNormal;
  mb_total = resultMB;

  // Mettre à jour les textes de réseau
  ar_text_network.innerHTML = formatPrice(ar_network);
  updateNetworkCostText();
}

// --------------------------------------------------
// Fonctions utilitaires
function roundHundred(value) {
  return Math.round(value / 100) * 100;
}

function formatPrice(price) {
  var price_final = roundHundred(price);
  var formatter = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
  return formatter.format(price_final);
}

// --------------------------------------------------
// Lancement du calcul initial
calculate();

// Ajouter la fonction qui met à jour le texte
function updateNetworkCostText() {
  const networkCostText = document.getElementById("network-cost-text");
  const situationType = document.getElementById("situation-type");
  if (networkCostText && situationType) {
    networkCostText.textContent = "vous coûte";
    situationType.textContent = isNetwork ? "Votre réseau" : "Votre agence";
  }
}
