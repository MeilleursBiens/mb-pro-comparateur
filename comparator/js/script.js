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

ar_input_honoraires.addEventListener("input", function () {
  let value = parseFloat(ar_input_honoraires.value);
  ar_honoraires = isNaN(value) ? 75000 : value;
  mb_input_honoraires.value = ar_honoraires;
  mb_honoraires = ar_honoraires;
  calculate();
});

ar_input_forfait.addEventListener("input", function () {
  let value = parseFloat(ar_input_forfait.value);
  ar_forfait = isNaN(value) ? 259 : value;
  calculate();
});

ar_input_ventes.addEventListener("input", function () {
  let value = parseFloat(ar_input_ventes.value);
  ar_ventes = isNaN(value) ? 10 : value;
  mb_input_ventes.value = ar_ventes;
  mb_ventes = ar_ventes;
  calculate();
});

ar_input_commissions.addEventListener("input", function () {
  let value = parseFloat(ar_input_commissions.value);
  ar_commissions = isNaN(value) ? 70 : value;
  calculate();
});

// --------------------------------------------------
// Fonction de calcul
function calculate() {
  let resultNormal = Math.round(
    ar_honoraires * (ar_commissions / 100) - ar_forfait * 12
  );
  let resultMB = Math.round(ar_honoraires - 159 * mb_ventes - mb_forfait * 12);

  resultMB = resultMB < 0 ? 0 : resultMB;
  mb_difference = resultMB - resultNormal;
  ar_total = resultNormal;
  ar_network = ar_honoraires - resultNormal;

  ar_text_total.innerHTML = formatPrice(resultNormal);
  mb_text_total.innerHTML = formatPrice(resultMB);
  mb_text_difference.innerHTML = formatPrice(resultMB - resultNormal);
  mb_text_total_2.innerHTML = formatPrice(resultMB);
  mb_text_difference_2.innerHTML = "+" + formatPrice(resultMB - resultNormal);
  ar_text_network.innerHTML = formatPrice(ar_network);
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
