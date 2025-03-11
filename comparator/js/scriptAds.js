const portals = [
  {
    id: 1,
    name: "Leboncoin - À Vendre À Louer",
    price: 0.37,
    duration: 30,
    adsCount: 1,
    enabled: true,
  },
  {
    id: 2,
    name: "SeLoger - Logic-Immo",
    price: 0.63,
    duration: 30,
    adsCount: 1,
    enabled: true,
  },
  {
    id: 3,
    name: "Bien'ici",
    price: 0.22,
    duration: 30,
    adsCount: 1,
    enabled: false,
  },
  {
    id: 5,
    name: "Figaro Immo",
    price: 0.19,
    duration: 30,
    adsCount: 1,
    enabled: false,
  },
  {
    id: 8,
    name: "ParuVendu",
    price: 0.29,
    duration: 30,
    adsCount: 1,
    enabled: false,
  },
  {
    id: 4,
    name: "Ouest France",
    price: 0.48,
    duration: 30,
    adsCount: 1,
    enabled: false,
  },
  {
    id: 9,
    name: "Green-Acres",
    price: 0.39,
    duration: 30,
    adsCount: 1,
    enabled: false,
  },
  {
    id: 10,
    name: "DOMimmo",
    price: 0.31,
    duration: 30,
    adsCount: 1,
    enabled: false,
  },
  {
    id: 7,
    name: "Belles Demeures - Lux Résidences",
    price: 1.98,
    duration: 30,
    adsCount: 1,
    enabled: false,
  },
  {
    id: 6,
    name: "Propriétés de France Le Figaro",
    price: 1.41,
    duration: 30,
    adsCount: 1,
    enabled: false,
  },
  {
    id: 13,
    name: "Cession PME",
    price: 0.48,
    duration: 30,
    adsCount: 1,
    enabled: false,
  },
  {
    id: 11,
    name: "BureauxLocaux",
    price: 0.94,
    duration: 30,
    adsCount: 1,
    enabled: false,
  },
  {
    id: 12,
    name: "SeLoger Bureaux & Commerces",
    price: 0.84,
    duration: 30,
    adsCount: 1,
    enabled: false,
  },
];

const portalsList = document.getElementById("portals-list");
Object.assign(portalsList.style, {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "10px",
});

const portalsFields = document.getElementById("portals-fields");
Object.assign(portalsFields.style, {
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
  marginTop: "2rem",
});

const totalPriceDiv = document.getElementById("mb_total");

const portalsGlobalDuration = document.getElementById(
  "portals-global-duration"
);

const adsCountDiv = document.getElementById("ads-count");

const createPortalField = (portal) => {
  const portalFieldDiv = document.createElement("div");
  portalFieldDiv.id = `portal-field-${portal.id}`;
  portalFieldDiv.innerHTML = `
         <div style="display: flex; width: 100%; gap: 0.75rem">
            <div class="field" style="width:  30%">
                <label class="label label-clamp">Plateforme de diffusion</label>
                <input
                    id="portal-field-name-${portal.id}"
                    class="input"
                    type="text"
                    value="${portal.name}"
                    disabled
                    style="background-color: #fff; color: #000"
                />
            </div>

            <div class="field" style="width:  23.33%">
                <label class="label label-clamp">Prix (${
                  portal.price
                } € / jour)</label>
                <input
                  id="portal-field-price-${portal.id}"
                  class="input"
                  type="text"
                  min="1"
                  step="1"
                  disabled
                  value="${(
                    (parseInt(portal.price * 100 * portal.duration) / 100) *
                    portal.adsCount
                  ).toFixed(2)} € au total"
                  style="background-color: #fff; color: #000; cursor: mouse"
                />
            </div>

            <div class="field" style="width:  23.33%">
                <label class="label label-clamp">Nombre d'annonces</label>
                <input
                  id="portal-field-ads-count-${portal.id}"
                  class="input input-number"
                  type="number"
                  min="1"
                  step="1"
                  value="1"
                  style="background-color: #fff; color: #000"
                />
            </div>
            
            <div class="field" style="width:  23.33%">
                <label class="label label-clamp">Nombre de jours diffusés</label>
                <input
                  id="portal-field-duration-${portal.id}"
                  class="input input-number"
                  type="number"
                  min="1"
                  step="1"
                  value="30"
                  style="background-color: #fff; color: #000"
                />
            </div>
         </div>
      `;
  portalFieldDiv
    .querySelector(`#portal-field-duration-${portal.id}`)
    .addEventListener("change", (event) => {
      const priceField = portalFieldDiv.querySelector(
        `#portal-field-price-${portal.id}`
      );
      portal.duration = event.target.value;
      priceField.value =
        (
          (parseInt(portal.price * 100 * portal.duration) / 100) *
          portal.adsCount
        ).toFixed(2) + " € au total";

      calculateTotalPrice(portal);
    });

  portalFieldDiv
    .querySelector(`#portal-field-ads-count-${portal.id}`)
    .addEventListener("change", (event) => {
      const priceField = portalFieldDiv.querySelector(
        `#portal-field-price-${portal.id}`
      );
      portal.adsCount = event.target.value;
      priceField.value =
        (
          (parseInt(portal.price * 100 * portal.duration) / 100) *
          portal.adsCount
        ).toFixed(2) + " € au total";

      calculateTotalPrice(portal);
    });

  calculateTotalPrice(portal);

  return portalFieldDiv;
};

const calculateTotalPrice = (portal) => {
  const totalPrice = portals
    .filter((p) => p.enabled)
    .reduce((acc, p) => {
      return acc + p.price * p.duration * p.adsCount;
    }, 0);
  totalPriceDiv.innerHTML = `
            ${totalPrice.toFixed(2)} € HT
            `;
};

portals.forEach((portal) => {
  const portalItem = document.createElement("div");

  const label = document.createElement("label");
  label.className = "checkbox";

  const input = document.createElement("input");
  input.type = "checkbox";
  input.id = `portal-${portal.id}`;
  input.checked = portal.enabled;
  input.style = "display: none;";

  let portalFieldDiv;
  if (portal.enabled) {
    portalFieldDiv = createPortalField(portal);
    portalsFields.appendChild(portalFieldDiv);
  }

  //update total price on price change
  input.addEventListener("change", (event) => {
    portal.enabled = event.target.checked;
    Object.assign(label.style, {
      border: portal.enabled ? "1px solid #bb2030" : "1px solid #e1e6eb",
      color: portal.enabled ? "#bb2030" : "#4a4a4a",
    });
    console.log(portal);
    if (portal.enabled) {
      portalFieldDiv = createPortalField(portal);
      portalsFields.appendChild(portalFieldDiv);
    } else {
      const existingField = document.getElementById(
        `portal-field-${portal.id}`
      );
      if (existingField) {
        portalsFields.removeChild(existingField);
        calculateTotalPrice(portal);
      }
    }
  });

  //update duration and price on global duration change
  portalsGlobalDuration.addEventListener("change", (event) => {
    const duration = event.target.value;
    portal.duration = duration;
    const durationField = portalFieldDiv.querySelector(
      `#portal-field-duration-${portal.id}`
    );
    durationField.value = event.target.value;

    const priceField = portalFieldDiv.querySelector(
      `#portal-field-price-${portal.id}`
    );
    priceField.value =
      (
        (parseInt(portal.price * 100 * portal.duration) / 100) *
        portal.adsCount
      ).toFixed(2) + " € au total";

    calculateTotalPrice(portal);
  });

  const text = document.createTextNode(`${portal.name}`);

  Object.assign(label.style, {
    border: portal.enabled ? "1px solid #bb2030" : "1px solid #e1e6eb",
    padding: "4px 8px",
    borderRadius: "12px",
    fontSize: "0.875rem",
    cursor: "pointer",
    color: portal.enabled ? "#bb2030" : "#4a4a4a",
  });

  label.appendChild(input);
  label.appendChild(text);

  portalItem.appendChild(label);
  portalsList.appendChild(portalItem);
});

function sendHeight() {
  parent.postMessage(
    document.body.scrollHeight,
    "https://www.meilleursbiens.pro"
  );
}

window.onload = sendHeight;

const resizeObserver = new ResizeObserver(() => sendHeight());
resizeObserver.observe(document.body);
