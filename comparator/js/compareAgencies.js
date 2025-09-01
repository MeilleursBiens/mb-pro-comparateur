let agenciesList = [
  // Réseaux d'agences traditionnelles
  { name: "Century 21", commission: 35 }, // Commission standard réseau
  { name: "Laforêt", commission: 40 }, // Variable selon franchises
  { name: "Orpi", commission: 38 }, // Moyenne réseau
  { name: "ERA Immobilier", commission: 40 },
  { name: "Stéphane Plaza", commission: 35 },
  { name: "Foncia", commission: 35 },
  { name: "Nexity", commission: 35 },
  { name: "Square Habitat", commission: 38 },
  { name: "Citya Immobilier", commission: 35 },
  { name: "L'Adresse", commission: 40 }, // Réseau coopératif
  { name: "Avis Immobilier", commission: 38 },
  { name: "Cimm Immobilier", commission: 35 },
  { name: "La Forêt Immobilier", commission: 40 },
  { name: "Arthurimmo", commission: 38 }, // Réseau notarial
  { name: "Nestenn", commission: 35 },
  { name: "Immo de France", commission: 35 },
  { name: "Agences Réunies", commission: 38 },

  // Agences haut de gamme
  { name: "Barnes", commission: 45 }, // Luxe international
  { name: "Daniel Féau", commission: 45 }, // Prestige Paris
  { name: "Sotheby's", commission: 45 }, // Réseau international
  { name: "Emile Garcin", commission: 45 },
  { name: "John Taylor", commission: 45 }, // Groupe LVMH
  { name: "Coldwell Banker", commission: 45 }, // Luxe international
  { name: "Engel & Völkers", commission: 45 }, // Réseau allemand
  { name: "Knight Frank", commission: 45 }, // Britannique haut de gamme

  // Néo-agences
  { name: "Proprioo", commission: 50 }, // Modèle hybride
  { name: "Hosman", commission: 45 }, // Salariés + bonus
  { name: "Zefir", commission: 45 }, // Nouveau modèle
  { name: "Liberkeys", commission: 45 }, // Tech-enabled
  { name: "PriceHubble", commission: 45 }, // Data-driven
  { name: "Welmo", commission: 45 }, // Digital first
];

window.agenciesList = [
  { name: "Century 21", commission: 35 },
  { name: "Laforêt", commission: 40 },
  { name: "Orpi", commission: 38 },
  { name: "ERA Immobilier", commission: 40 },
  { name: "Stéphane Plaza", commission: 35 },
  { name: "Foncia", commission: 35 },
  { name: "Nexity", commission: 35 },
  { name: "Square Habitat", commission: 38 },
  { name: "Citya Immobilier", commission: 35 },
  { name: "L'Adresse", commission: 40 },
  { name: "Avis Immobilier", commission: 38 },
  { name: "Cimm Immobilier", commission: 35 },
  { name: "La Forêt Immobilier", commission: 40 },
  { name: "Arthurimmo", commission: 38 },
  { name: "Nestenn", commission: 35 },
  { name: "Immo de France", commission: 35 },
  { name: "Agences Réunies", commission: 38 },
  { name: "Barnes", commission: 45 },
  { name: "Daniel Féau", commission: 45 },
  { name: "Sotheby's", commission: 45 },
  { name: "Emile Garcin", commission: 45 },
  { name: "John Taylor", commission: 45 },
  { name: "Coldwell Banker", commission: 45 },
  { name: "Engel & Völkers", commission: 45 },
  { name: "Knight Frank", commission: 45 },
  { name: "Proprioo", commission: 50 },
  { name: "Hosman", commission: 45 },
  { name: "Zefir", commission: 45 },
  { name: "Liberkeys", commission: 45 },
  { name: "PriceHubble", commission: 45 },
  { name: "Welmo", commission: 45 },
];

// Ajouter la gestion du clavier pour les agences
let currentAgencySelection = -1;

function handleAgencyKeyboardNavigation(e) {
  const suggestionsContainer = document.getElementById("agenciesSuggestions");
  const items = suggestionsContainer.getElementsByClassName("suggestion-item");

  if (suggestionsContainer.style.display === "none") {
    currentAgencySelection = -1;
    return;
  }

  if (currentAgencySelection >= 0 && items[currentAgencySelection]) {
    items[currentAgencySelection].classList.remove("selected");
  }

  switch (e.key) {
    case "ArrowDown":
      e.preventDefault();
      currentAgencySelection = Math.min(
        currentAgencySelection + 1,
        items.length - 1
      );
      break;
    case "ArrowUp":
      e.preventDefault();
      currentAgencySelection = Math.max(currentAgencySelection - 1, 0);
      break;
    case "Enter":
      e.preventDefault();
      if (currentAgencySelection >= 0 && items[currentAgencySelection]) {
        const index = parseInt(
          items[currentAgencySelection].getAttribute("data-index")
        );
        const filteredAgencies = agenciesList.filter((agency) =>
          agency.name
            .toLowerCase()
            .includes(
              document.getElementById("agencySearch").value.toLowerCase()
            )
        );
        selectAgency(filteredAgencies[index]);
      }
      return;
    default:
      return;
  }

  if (items[currentAgencySelection]) {
    items[currentAgencySelection].classList.add("selected");
    items[currentAgencySelection].scrollIntoView({ block: "nearest" });
  }
}

function updateAgenciesSuggestions() {
  const searchInput = document.getElementById("agencySearch");
  const suggestionsContainer = document.getElementById("agenciesSuggestions");
  const query = searchInput.value.toLowerCase();

  if (query.trim() === "") {
    suggestionsContainer.innerHTML = "";
    suggestionsContainer.style.display = "none";
    suggestionsContainer.style.border = "none";
    suggestionsContainer.style.boxShadow = "none";
    return;
  }

  const filteredAgencies = agenciesList.filter((agency) =>
    agency.name.toLowerCase().includes(query)
  );
  const top5 = filteredAgencies.slice(0, 5);

  suggestionsContainer.innerHTML = "";
  top5.forEach((agency, index) => {
    const suggestionItem = document.createElement("div");
    suggestionItem.classList.add("suggestion-item");
    suggestionItem.setAttribute("data-index", index);
    suggestionItem.textContent = agency.name;
    suggestionItem.style.cursor = "pointer";
    suggestionItem.style.padding = "5px";
    suggestionItem.style.borderBottom = "1px solid #ccc";

    suggestionItem.addEventListener("click", () => {
      selectAgency(agency);
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

function selectAgency(agency) {
  if (!agency) return;

  const arCommissionInput = document.getElementById("ar_commissions");
  if (arCommissionInput) {
    arCommissionInput.value = agency.commission;
  }

  const arForfaitInput = document.getElementById("ar_forfait");
  if (arForfaitInput) {
    arForfaitInput.value = 0;
  }

  window.ar_commissions = agency.commission;
  window.ar_forfait = 0;

  const situationTitle = document.getElementById("situationTitle");
  if (situationTitle) {
    situationTitle.textContent = "Votre agence actuelle";
  }

  isNetwork = false;
  updateNetworkCostText();

  const searchInput = document.getElementById("agencySearch");
  searchInput.value = agency.name;

  // Clear network search input
  const networkSearchInput = document.getElementById("reseauSearch");
  if (networkSearchInput) {
    networkSearchInput.value = "";
  }

  const suggestionsContainer = document.getElementById("agenciesSuggestions");
  suggestionsContainer.innerHTML = "";
  suggestionsContainer.style.display = "none";

  if (typeof calculate === "function") {
    calculate();
  }

  updateNetworkCostText();
}

// Modifier l'initialisation pour ajouter la gestion du clavier
document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("agencySearch");
  if (searchInput) {
    searchInput.addEventListener("input", updateAgenciesSuggestions);
    searchInput.addEventListener("keydown", handleAgencyKeyboardNavigation);
  }
});

// Fermer les suggestions lors d'un clic à l'extérieur
document.addEventListener("click", function (event) {
  const searchContainer = document.querySelector(".agency-search-container");
  if (searchContainer && !searchContainer.contains(event.target)) {
    const suggestionsContainer = document.getElementById("agenciesSuggestions");
    suggestionsContainer.innerHTML = "";
    suggestionsContainer.style.display = "none";
  }
});
