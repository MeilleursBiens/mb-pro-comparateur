let agenciesList = [
  { name: "Century 21", commission: 50 },
  { name: "Laforêt", commission: 45 },
  { name: "Guy Hoquet", commission: 48 },
  { name: "Orpi", commission: 45 },
  { name: "ERA Immobilier", commission: 47 },
  { name: "Stéphane Plaza", commission: 45 },
  { name: "Nestenn", commission: 48 },
  { name: "Arthurimmo", commission: 50 },
  { name: "La Centrale de l'Immobilier", commission: 45 },
  { name: "Foncia", commission: 45 },
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

  const suggestionsContainer = document.getElementById("agenciesSuggestions");
  suggestionsContainer.innerHTML = "";
  suggestionsContainer.style.display = "none";

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
