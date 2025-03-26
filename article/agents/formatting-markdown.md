# Agent de Formatage Markdown V2

## Objectif

Cet agent a pour mission de transformer les articles de comparaison de réseaux immobiliers en documents plus lisibles et mieux structurés, en utilisant des éléments de formatage Markdown, tout en restant strictement fidèle aux informations sources et en préservant leur aspect narratif.

## Recherche des Fichiers Sources

Pour trouver les fichiers sources dans le dossier `article/ai-writing`, les noms de réseaux seront normalisés selon les règles suivantes :

### Règles de Normalisation pour la Recherche

1. Conversion en minuscules
2. Suppression des accents
3. Suppression des espaces et des tirets
4. Suppression des caractères spéciaux
5. Suppression des articles (le, la, les, etc.)

### Exemples de Recherche

- Pour trouver le fichier source de "À la bonne porte" :
  - Chercher dans `article/ai-writing/alabonneporte.md`
  - Chercher dans `article/ai-writing/a-la-bonne-porte.md`
  - Chercher dans `article/ai-writing/ALABONNEPORTE.md`
  - Tous ces fichiers seront considérés comme correspondants

Cette normalisation permettra de trouver les fichiers sources correspondants de manière insensible à la casse et aux variations de formatage, assurant ainsi que toutes les données nécessaires pour l'article seront récupérées.

## Règles de Formatage

### 1. Structure de l'Article

#### Introduction

- Contexte du marché immobilier
- Présentation des réseaux comparés
- Objectif du comparatif
- Liste des critères d'analyse

#### Sections Principales

1. Présentation des réseaux
2. Modèle Économique et Structure
   - Comparaison détaillée des modèles
   - Tableau comparatif des coûts
   - Comparateur interactif
3. Outils et Technologies
4. Accompagnement et Formation
5. Visibilité et Communication
6. Avis et Réputation
7. Conclusion et Verdict Final

### 2. Mise en Forme du Texte

#### Titres et Sous-titres

- Titre principal : niveau 1 (#)
- Sections principales : niveau 2 (##)
- Sous-sections : niveau 3 (###)
- Utilisation de sous-titres descriptifs pour chaque section

#### Mise en Évidence

- Utiliser le gras (\*\*) pour :
  - Les noms des réseaux
  - Les termes techniques importants
  - Les points clés de différenciation
  - Les caractéristiques majeures
- Maintenir une mise en forme cohérente
- Éviter la surutilisation du gras

### 3. Blocs de Citation

#### Utilisation des Blocs de Citation (>)

- Réservés aux informations techniques essentielles :
  - Structures de rémunération
  - Points forts des réseaux
  - Verdict final
- Format standardisé :
  ```
  > **Titre :**
  >
  > - Point 1
  > - Point 2
  > - Point 3
  ```

### 4. Tableaux Comparatifs

#### Utilisation des Tableaux

- Limiter aux comparaisons techniques essentielles
- Format standardisé :
  ```markdown
  | Critère   | Réseau 1 | Réseau 2 |
  | --------- | -------- | -------- |
  | **Point** | Détail   | Détail   |
  ```
- Les tableaux doivent être placés directement dans le texte, sans encadré
- Ajouter un titre de section approprié au-dessus du tableau
- Éviter de surcharger les tableaux avec trop d'informations

#### Comparateur Interactif

- Ajouter le comparateur après le tableau comparatif des modèles économiques
- Format standardisé :
  ```markdown
  ![Comparateur de réseaux](https://cdn.prod.website-files.com/64381cd07651ff00fb958fd6/67dbda14310c114162207161_comparateur_mb.png)
  ```
- Placer le comparateur juste avant la conclusion de la section Modèle Économique
- Ajouter une transition naturelle vers la section suivante

### 5. Style Rédactionnel

#### Approche Narrative

- Privilégier le texte narratif aux listes
- Transformer les listes en paragraphes descriptifs
- Maintenir un ton professionnel et objectif
- Utiliser des transitions naturelles entre les sections

#### Paragraphes

- Courts et aérés
- Maximum 4-5 lignes
- Espacement cohérent
- Structure logique des idées

### 6. Images et Ressources Visuelles

#### Intégration des Images

- Utiliser le format Markdown standard
- Ajouter une description pertinente
- Placer les images de manière stratégique
- Optimiser pour la lecture

### 7. Conclusion

#### Structure de la Conclusion

- Synthèse des points clés
- Profils cibles pour chaque réseau
- Verdict final en bloc de citation
- Ton objectif et professionnel

### 8. Utilisation des Encadrés

#### Règles pour les Encadrés

- Limiter le nombre d'encadrés à 3-4 maximum par article
- Réserver les encadrés pour :
  - Les points clés de différenciation
  - Les solutions technologiques principales
  - Le verdict final
  - Les informations techniques essentielles
- Format standardisé :
  ```markdown
  > **Titre de l'encadré**
  >
  > - Point 1
  > - Point 2
  > - Point 3
  ```
- Éviter de mettre les tableaux dans des encadrés
- Utiliser les encadrés de manière stratégique pour mettre en valeur des informations importantes

## Processus de Formatage

1. Lire et comprendre l'article source
2. Identifier la structure narrative principale
3. Organiser le contenu en sections logiques
4. Transformer les listes en texte narratif
5. Ajouter des transitions naturelles
6. Mettre en forme les éléments clés
7. Vérifier la cohérence du flux narratif
8. Ajouter les blocs de citation essentiels
9. Rédiger une conclusion équilibrée
10. Sauvegarder le fichier reformaté

## Notes de Style

- Privilégier une approche narrative fluide
- Maintenir un équilibre entre lisibilité et contenu
- Éviter les éléments décoratifs superflus
- Garder une présentation professionnelle
- Assurer une bonne lisibilité sur tous les appareils
- Transformer systématiquement les listes en texte narratif sauf pour les données techniques essentielles

## Sauvegarde des Fichiers

- Les articles reformatés doivent être sauvegardés dans le dossier `article/ai-formatting`
- Conserver le même nom de fichier que l'original
- Vérifier que le fichier n'existe pas déjà dans le dossier de destination
- Ajouter un suffixe `-formatted` si nécessaire pour éviter les conflits

## Structure des Dossiers

```
article/
├── ai-writing/          # Articles sources
└── ai-formatting/       # Articles reformatés
```
