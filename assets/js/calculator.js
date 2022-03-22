var ar_honoraires = 75000;
var ar_forfait = 150;
var ar_ventes = 10;
var ar_commissions = 70;
var ar_total = 50700;

var mb_honoraires = 75000;
var mb_forfait = 179;
var mb_ventes = 10;
var mb_commissions = 100;
var mb_total = 70502;
var mb_difference = 10;

// --------------------------------------------------

var ar_input_honoraires = document.querySelector('#ar_honoraires');
var ar_input_forfait = document.querySelector('#ar_forfait');
var ar_input_ventes = document.querySelector('#ar_ventes');
var ar_input_commissions = document.querySelector('#ar_commissions');
var ar_text_total = document.querySelector('#ar_total');

var mb_input_honoraires = document.querySelector('#mb_honoraires');
var mb_input_forfait = document.querySelector('#mb_forfait');
var mb_input_ventes = document.querySelector('#mb_ventes');
var mb_input_commissions = document.querySelector('#mb_commissions');
var mb_text_total = document.querySelector('#mb_total');
var mb_text_difference = document.querySelector('#mb_difference');

// --------------------------------------------------

ar_input_honoraires.addEventListener('input', function() {
    let value = parseFloat(ar_input_honoraires.value);
    ar_honoraires = isNaN(value) ? 75000 : value;
    mb_input_honoraires.value = ar_honoraires;
    calculate();
});

ar_input_forfait.addEventListener('input', function() {
    let value = parseFloat(ar_input_forfait.value);
    ar_forfait = isNaN(value) ? 150 : value;
    calculate();
});

ar_input_ventes.addEventListener('input', function() {
    let value = parseFloat(ar_input_ventes.value);
    ar_ventes = isNaN(value) ? 10 : value;
    mb_input_ventes.value = ar_ventes;
    calculate();
});

ar_input_commissions.addEventListener('input', function() {
    let value = parseFloat(ar_input_commissions.value);
    ar_commissions = isNaN(value) ? 70 : value;
    calculate();
});

// --------------------------------------------------

function calculate(){
    let resultNormal = Math.round((ar_honoraires * (ar_commissions / 100)) - (ar_forfait * 12));
    let resultMB = Math.round((ar_honoraires - (139 * mb_ventes)) - (mb_forfait * 12));

    resultMB = resultMB < 0 ? 0 : resultMB;
    mb_difference = resultMB - resultNormal;
    ar_total = resultNormal;

    ar_text_total.innerHTML = formatPrice(resultNormal);
    mb_text_total.innerHTML = formatPrice(resultMB);
    mb_text_difference.innerHTML = formatPrice(resultMB - resultNormal);
}

// --------------------------------------------------

function formatPrice(price){
    var formatter = new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
    });

    return formatter.format(price);
}

// --------------------------------------------------

calculate();
