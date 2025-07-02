// Function to send height to parent window
function sendHeight() {
  const container = document.getElementById("network-comparator"); 
const height = container?.getBoundingClientRect().height || 0;
  window.parent.postMessage(height, "*");
}

// Send height when page loads
window.addEventListener("load", function () {
  sendHeight();
  // Send height again after a short delay to account for dynamic content
  setTimeout(sendHeight, 100);
  setTimeout(sendHeight, 500);
  setTimeout(sendHeight, 1000);
});

// Send height when window resizes
window.addEventListener("resize", function () {
  sendHeight();
  // Debounce the resize event
  clearTimeout(window.resizeTimer);
  window.resizeTimer = setTimeout(sendHeight, 250);
});

// Send height after calculations and animations
function updateHeightAfterChanges() {
  sendHeight();
  // Send multiple updates to ensure proper height
  setTimeout(sendHeight, 100);
  setTimeout(sendHeight, 300);
  setTimeout(sendHeight, 500);
}

// Create a MutationObserver to watch for DOM changes
const observer = new MutationObserver(function (mutations) {
  updateHeightAfterChanges();
});

// Start observing the document with the configured parameters
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  characterData: true,
});

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

// Variables pour les éléments du DOM
var ar_input_honoraires;
var ar_input_forfait;
var ar_input_ventes;
var ar_input_commissions;
var ar_text_total;
var ar_text_network;

var mb_input_honoraires;
var mb_input_forfait;
var mb_input_ventes;
var mb_input_commissions;
var mb_text_total;
var mb_text_difference;
var mb_text_total_2;
var mb_text_difference_2;

let isNetwork = true;

// Fonction pour initialiser un réseau
function initializeNetwork(networkName) {
  if (typeof reseauxList !== "undefined") {
    const network = reseauxList.find(
      (r) =>
        r.name.toLowerCase().replace(/\s+/g, "") ===
        networkName.toLowerCase().replace(/\s+/g, "")
    );

    if (network) {
      const initializeNetworkValues = () => {
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
          if (typeof calculate === "function") {
            calculate();
          }
          if (typeof updateNetworkCostText === "function") {
            updateNetworkCostText();
          }
        } else {
          // Si les éléments ne sont pas encore disponibles, réessayer
          setTimeout(initializeNetworkValues, 100);
        }
      };

      // Démarrer l'initialisation
      initializeNetworkValues();
    }
  }
}

// Exposer la fonction d'initialisation globalement
window.initializeComparator = function (networkName) {
  initializeNetwork(networkName);
};

// Écouter les messages pour la compatibilité
window.addEventListener("message", function (event) {
  if (event.data && event.data.network) {
    initializeNetwork(event.data.network);
  }
});

// --------------------------------------------------
// Récupération des éléments du DOM
document.addEventListener("DOMContentLoaded", function () {
  ar_input_honoraires = document.querySelector("#ar_honoraires");
  ar_input_forfait = document.querySelector("#ar_forfait");
  ar_input_ventes = document.querySelector("#ar_ventes");
  ar_input_commissions = document.querySelector("#ar_commissions");
  ar_text_total = document.querySelector("#ar_total");
  ar_text_network = document.querySelector("#ar_network");

  mb_input_honoraires = document.querySelector("#mb_honoraires");
  mb_input_forfait = document.querySelector("#mb_forfait");
  mb_input_ventes = document.querySelector("#mb_ventes");
  mb_input_commissions = document.querySelector("#mb_commissions");
  mb_text_total = document.querySelector("#mb_total");
  mb_text_difference = document.querySelector("#mb_difference");
  mb_text_total_2 = document.querySelector("#mb_total_2");
  mb_text_difference_2 = document.querySelector("#mb_difference_2");

  // Add event listeners only after elements are found
  if (ar_input_honoraires) {
    ar_input_honoraires.addEventListener("input", calculate);
  }
  if (ar_input_forfait) {
    ar_input_forfait.addEventListener("input", calculate);
  }
  if (ar_input_ventes) {
    ar_input_ventes.addEventListener("input", calculate);
  }
  if (ar_input_commissions) {
    ar_input_commissions.addEventListener("input", calculate);
  }

  // Initial calculation
  calculate();
});

// --------------------------------------------------
// Fonction de calcul
function calculate() {
  // Récupérer les valeurs actuelles
  let honoraires = parseFloat(ar_input_honoraires?.value) || ar_honoraires;
  let forfait = parseFloat(ar_input_forfait?.value) || ar_forfait;
  let ventes = parseFloat(ar_input_ventes?.value) || ar_ventes;
  let commissions = parseFloat(ar_input_commissions?.value) || ar_commissions;

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

  // Calculer le pourcentage d'augmentation
  let percentageIncrease = (
    ((resultMB - resultNormal) / resultNormal) *
    100
  ).toFixed(1);
  const percentageElement = document.getElementById("percentage_increase");
  if (percentageElement) {
    percentageElement.textContent = percentageIncrease;
  }

  // Calculer le coût total du réseau
  let networkCost = honoraires - resultNormal;

  // Mettre à jour les affichages
  if (ar_text_total) ar_text_total.innerHTML = formatPrice(resultNormal);
  if (mb_text_total) mb_text_total.innerHTML = formatPrice(resultMB);
  if (mb_text_difference)
    mb_text_difference.innerHTML = formatPrice(networkCost);

  // Mettre à jour les autres variables
  ar_total = resultNormal;
  ar_network = networkCost;
  mb_difference = resultMB - resultNormal;
  mb_total = resultMB;

  // Mettre à jour les textes de réseau
  if (ar_text_network) ar_text_network.innerHTML = formatPrice(ar_network);
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
    networkCostText.textContent = "";
    situationType.textContent = isNetwork ? "Votre réseau" : "Votre agence";
  }
}
