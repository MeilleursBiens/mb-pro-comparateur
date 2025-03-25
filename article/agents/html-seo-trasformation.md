### 🎯 Objectif

Transformer un texte brut en une section HTML propre, optimisée pour le SEO, et compatible avec Webflow, tout en utilisant les classes CSS du fichier `article.css`.

📌 **Instructions**

- **Générer uniquement une `<section>`** avec une structure sémantique :
  - Utiliser `<h2>`, `<h3>`, `<p>`, `<ul>`, `<ol>`, `<table>`, `<blockquote>`, etc.
  - Intégrer des **mots-clés SEO** naturellement.
  - Prioriser les **listes** et **tableaux** pour structurer l’information.
- **Utilisation des classes CSS de `article.css`** :
  - Appliquer les styles existants :
    - **Texte clé en gras** (`<strong>`).
    - **Mise en avant** avec `.mb-encadre`.
    - **Tableaux** avec `.mb-tableau`.
    - **Listes bien formatées** grâce aux styles définis.
    - **Citations** avec `<blockquote>`.
  - **Ne pas utiliser de styles inline**.
- **Optimisation SEO & Accessibilité** :
  - **Balises alt** sur les images.
  - **Liens internes et externes** bien intégrés avec des ancres pertinentes.
  - **Balises sémantiques** pour améliorer le référencement.
- **Intégration du comparateur** :
  - **Si la section concerne la "Comparaison de la rémunération et du modèle économique"**, ajouter ce bloc HTML **à la fin de la section** :
    ```html
    <h3>
      Pour comparer votre situation financière dans les 2 réseaux, nous vous
      invitons à consulter notre comparateur de réseaux.
    </h3>
    <div class="mb-comparator-container">
      <img
        src="<https://cdn.prod.website-files.com/64381cd07651ff00fb958fd6/67dbda14310c114162207161_comparateur_mb.png>"
        alt="Comparateur de réseaux"
      />
      <div class="ml-embedded" data-form="UExggF"></div>
    </div>
    ```
- **Contraintes techniques** :
  - ❌ **Pas de `<html>`, `<head>`, `<body>` ni `<article>`**.
  - ❌ **Pas de styles inline** (le CSS est géré via `article.css`).
  - ✅ **Code lisible, bien structuré et compatible avec Webflow**.

🔗 **Contexte technique** :

La section générée sera insérée dans un `<article class="mb-article">`, qui suit cette structure :

```html
<article class="mb-article">
  <div class="mb-logo-section">
    <div class="mb-logo-container">
      <img
        src="./network-logos/mb.svg"
        alt="Logo MeilleursBiens"
        class="mb-logo mb-logo-meilleursbiens"
      />
    </div>
    <div class="mb-logo-vs">VS</div>
    <div class="mb-logo-container">
      <img
        src="./network-logos/Logo_iad.png"
        alt="Logo IAD France"
        class="mb-logo mb-logo-iad"
      />
    </div>
  </div>
  <!-- Section HTML générée ici -->
</article>
```

### 🚨 **Règles essentielles**

➡️ **Ne pas modifier le texte brut fourni**.

➡️ **Respecter la structure et les classes CSS existantes**.

💡 **Exemple d’entrée :**

```
"Les réseaux mandataires offrent plus de liberté aux agents. Quels sont les avantages ? Une rémunération plus élevée, un accompagnement personnalisé et une autonomie totale."

```

✅ **Sortie attendue :**

```html
<section>
  <h2>Pourquoi rejoindre un réseau mandataire ?</h2>
  <p>
    Les réseaux mandataires offrent une alternative
    <strong>plus flexible</strong> aux agences traditionnelles.
  </p>
  <ul>
    <li>
      <strong>Rémunération plus élevée</strong> : jusqu'à 90 % de commission.
    </li>
    <li><strong>Autonomie totale</strong> : gestion libre de son activité.</li>
    <li>
      <strong>Accompagnement personnalisé</strong> : formations et outils
      professionnels.
    </li>
  </ul>
</section>
```
