let reseauxList = [
  { name: "iad France", commission: 69, prix_pack: 163 },
  { name: "Safti", commission: 70, prix_pack: 159 },
  { name: "BSK Immobilier", commission: 75, prix_pack: 125 },
  { name: "Propriétés Privées", commission: 70, prix_pack: 169 },
  { name: "Capifrance", commission: 73, prix_pack: 169 },
  { name: "Efficity", commission: 70, prix_pack: 105 },
  { name: "Optimhome", commission: 60, prix_pack: 29 },
  { name: "Dr House Immo", commission: 85, prix_pack: 85 },
  { name: "megAgence", commission: 70, prix_pack: 67 },
  { name: "Expertimo", commission: 98, prix_pack: 190 },
  { name: "LF immo", commission: 70, prix_pack: 150 },
  { name: "3G IMMO", commission: 92, prix_pack: 100 },
  { name: "Les porteclés", commission: 87, prix_pack: 0 },
  { name: "eXp France", commission: 75, prix_pack: 50 },
  { name: "Immo reseau", commission: 75, prix_pack: 129 },
  { name: "BL Agents immobiliers", commission: 60, prix_pack: 0 },
  { name: "Ikami", commission: 70, prix_pack: 169 },
  { name: "REGM", commission: 80, prix_pack: 0 },
  { name: "Sextant France & International", commission: 70, prix_pack: 119 },
  { name: "AXO - L'immobilier Actif", commission: 80, prix_pack: 0 },
  { name: "3%.COM", commission: 85, prix_pack: 125 },
  { name: "Liberkeys", commission: 70, prix_pack: 0 },
  { name: "Prompt Immo", commission: 70, prix_pack: 0 },
  { name: "Keymex", commission: 60, prix_pack: 189 },
  { name: "Tower Immobilier", commission: 75, prix_pack: 0 },
  { name: "ImmoForfait", commission: 100, prix_pack: 110 },
  { name: "Weelodge", commission: 75, prix_pack: 149 },
  { name: "Solution.immo", commission: 75, prix_pack: 0 },
  { name: "AgentMandataire.fr", commission: 70, prix_pack: 0 },
  { name: "C2i Groupe", commission: 70, prix_pack: 0 },
  { name: "PROJETLOCATIF", commission: 70, prix_pack: 0 },
  { name: "LMD Immobilier", commission: 70, prix_pack: 159 },
  { name: "IMOCONSEIL France", commission: 75, prix_pack: 49 },
  { name: "Noovimo", commission: 72, prix_pack: 169 },
  { name: "Comptoir Immobilier de France", commission: 80, prix_pack: 250 },
  { name: "A la lucarne de l'immobilier", commission: 60, prix_pack: 35 },
  { name: "Groupement Immobilier", commission: 60, prix_pack: 50 },
  { name: "MAXimmo", commission: 60, prix_pack: 40 },
];

/**
 * Met à jour la liste des suggestions en fonction du terme de recherche.
 * Affiche les 5 meilleurs résultats dans le conteneur "reseauxSuggestions".
 */
function updateReseauxSuggestions() {
  const searchInput = document.getElementById("reseauSearch");
  const suggestionsContainer = document.getElementById("reseauxSuggestions");
  const query = searchInput.value.toLowerCase();

  if (query.trim() === "") {
    suggestionsContainer.innerHTML = "";
    suggestionsContainer.style.display = "none";
    suggestionsContainer.style.border = "none";
    suggestionsContainer.style.boxShadow = "none";
    return;
  }

  const filteredNetworks = reseauxList.filter((reseau) =>
    reseau.name.toLowerCase().includes(query)
  );
  const top5 = filteredNetworks.slice(0, 5);

  suggestionsContainer.innerHTML = "";
  top5.forEach((reseau, index) => {
    const suggestionItem = document.createElement("div");
    suggestionItem.classList.add("suggestion-item");
    suggestionItem.setAttribute("data-index", index); // Add index for keyboard navigation
    suggestionItem.textContent = reseau.name;
    suggestionItem.style.cursor = "pointer";
    suggestionItem.style.padding = "5px";
    suggestionItem.style.borderBottom = "1px solid #ccc";

    suggestionItem.addEventListener("click", () => {
      selectReseau(reseau);
    });

    suggestionsContainer.appendChild(suggestionItem);
  });

  if (top5.length > 0) {
    suggestionsContainer.style.display = "block";
    suggestionsContainer.style.border = "1px solid #ddd";
    suggestionsContainer.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.15)";
  } else {
    suggestionsContainer.style.display = "none";
    suggestionsContainer.style.border = "none";
    suggestionsContainer.style.boxShadow = "none";
  }
}

/**
 * Lorsqu'un réseau est sélectionné via une suggestion,
 * met à jour les valeurs et relance le calcul.
 */
function selectReseau(reseau) {
  if (!reseau) return;

  const arCommissionInput = document.getElementById("ar_commissions");
  if (arCommissionInput) {
    arCommissionInput.value = reseau.commission;
  }

  const arForfaitInput = document.getElementById("ar_forfait");
  if (arForfaitInput) {
    arForfaitInput.value = reseau.prix_pack;
  }

  window.ar_commissions = reseau.commission;
  window.ar_forfait = reseau.prix_pack;

  const situationTitle = document.getElementById("situationTitle");
  if (situationTitle) {
    situationTitle.textContent = "Votre réseau actuel";
  }

  isNetwork = true;
  updateNetworkCostText();

  const searchInput = document.getElementById("reseauSearch");
  searchInput.value = reseau.name;

  // Clear agency search input
  const agencySearchInput = document.getElementById("agencySearch");
  if (agencySearchInput) {
    agencySearchInput.value = "";
  }

  // Clear and hide suggestions containers
  const reseauxSuggestionsContainer =
    document.getElementById("reseauxSuggestions");
  reseauxSuggestionsContainer.innerHTML = "";
  reseauxSuggestionsContainer.style.display = "none";
  reseauxSuggestionsContainer.style.border = "none";
  reseauxSuggestionsContainer.style.boxShadow = "none";

  const agenciesSuggestionsContainer = document.getElementById(
    "agenciesSuggestions"
  );
  if (agenciesSuggestionsContainer) {
    agenciesSuggestionsContainer.innerHTML = "";
    agenciesSuggestionsContainer.style.display = "none";
    agenciesSuggestionsContainer.style.border = "none";
    agenciesSuggestionsContainer.style.boxShadow = "none";
  }

  if (typeof calculate === "function") {
    calculate();
  }
}

// Add keyboard navigation functionality
let currentSelection = -1;

function handleKeyboardNavigation(e) {
  const suggestionsContainer = document.getElementById("reseauxSuggestions");
  const items = suggestionsContainer.getElementsByClassName("suggestion-item");

  // If suggestions are not visible, don't handle keyboard navigation
  if (suggestionsContainer.style.display === "none") {
    currentSelection = -1;
    return;
  }

  // Remove previous selection
  if (currentSelection >= 0 && items[currentSelection]) {
    items[currentSelection].classList.remove("selected");
  }

  switch (e.key) {
    case "ArrowDown":
      e.preventDefault();
      currentSelection = Math.min(currentSelection + 1, items.length - 1);
      break;
    case "ArrowUp":
      e.preventDefault();
      currentSelection = Math.max(currentSelection - 1, 0);
      break;
    case "Enter":
      e.preventDefault();
      if (currentSelection >= 0 && items[currentSelection]) {
        const index = parseInt(
          items[currentSelection].getAttribute("data-index")
        );
        const filteredNetworks = reseauxList.filter((reseau) =>
          reseau.name
            .toLowerCase()
            .includes(
              document.getElementById("reseauSearch").value.toLowerCase()
            )
        );
        selectReseau(filteredNetworks[index]);
      }
      return;
    default:
      return;
  }

  // Add selection to new item
  if (items[currentSelection]) {
    items[currentSelection].classList.add("selected");
    items[currentSelection].scrollIntoView({ block: "nearest" });
  }
}

// Initialisation dès que le DOM est chargé
document.addEventListener("DOMContentLoaded", async () => {
  // Add search input listener for suggestions update
  const searchInput = document.getElementById("reseauSearch");
  if (searchInput) {
    searchInput.addEventListener("input", updateReseauxSuggestions);
    searchInput.addEventListener("keydown", handleKeyboardNavigation);
  }
});

// Close the suggestions dropdown when clicking outside of the search container
document.addEventListener("click", function (event) {
  const searchContainer = document.querySelector(".search-container");
  if (searchContainer && !searchContainer.contains(event.target)) {
    const suggestionsContainer = document.getElementById("reseauxSuggestions");
    suggestionsContainer.innerHTML = "";
    suggestionsContainer.style.display = "none";
    suggestionsContainer.style.border = "none";
    suggestionsContainer.style.boxShadow = "none";
  }
});
