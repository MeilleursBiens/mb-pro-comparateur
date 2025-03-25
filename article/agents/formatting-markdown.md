# Guide de Formatage Markdown pour la Transformation HTML

## Objectif

Ce guide vise à transformer un article brut en format Markdown structuré, optimisé pour sa transformation ultérieure en HTML. Il s'agit d'une étape intermédiaire entre la rédaction initiale et la transformation HTML, permettant d'améliorer la lisibilité et la structure du contenu tout en préservant son essence.

## Règles de Formatage

### 1. Structure Générale

- Utiliser des titres de niveau appropriés (h1, h2, h3)
- Maintenir une hiérarchie claire des sections
- Ajouter des espaces entre les sections pour une meilleure lisibilité
- Utiliser des séparateurs horizontaux (---) entre les sections majeures

### 2. Mise en Forme du Texte

- **Texte important** en gras avec `**texte**`
- _Termes techniques_ en italique avec `*texte*`
- Citations avec `> texte`
- Code ou commandes avec `` `texte` ``

### 3. Listes et Tableaux

#### Listes à Puces

Utiliser pour :

- Énumérer des points clés
- Présenter des avantages/inconvénients
- Lister des fonctionnalités

Exemple :

```markdown
- Point clé 1
- Point clé 2
  - Sous-point 2.1
  - Sous-point 2.2
```

#### Listes Numérotées

Utiliser pour :

- Étapes d'un processus
- Instructions séquentielles
- Classements

Exemple :

```markdown
1. Première étape
2. Deuxième étape
3. Troisième étape
```

#### Tableaux

Utiliser pour :

- Comparaisons directes
- Données chiffrées
- Caractéristiques techniques

Exemple :

```markdown
| Fonctionnalité | MeilleursBiens | Autre Réseau |
| -------------- | -------------- | ------------ |
| Commission     | 100%           | 80%          |
| Frais mensuels | 199€           | 250€         |
```

### 4. Mise en Page

#### Encadrés

Utiliser pour :

- Points importants
- Résumés
- Conseils

Exemple :

```markdown
> **Note importante** : Ce point est crucial pour la compréhension du sujet.
```

#### Encadrés Spéciaux

Les encadrés spéciaux doivent être utilisés avec parcimonie et uniquement dans les cas suivants :

1. **Points critiques** : Informations essentielles qui nécessitent une attention particulière
2. **Résumés de section** : Synthèse des points clés d'une section importante
3. **Avertissements** : Informations importantes sur des points de vigilance
4. **Conseils pratiques** : Astuces ou bonnes pratiques spécifiques

Format recommandé :

```markdown
> **Important** : [Contenu de l'encadré] > **Résumé** : [Contenu de l'encadré] > **Attention** : [Contenu de l'encadré] > **Conseil** : [Contenu de l'encadré]
```

Règles d'utilisation :

- Maximum 2-3 encadrés par article
- Ne pas utiliser d'encadrés dans les sections d'introduction ou de conclusion
- Privilégier l'intégration naturelle des informations dans le texte
- Éviter les encadrés imbriqués
- Garder le contenu concis et pertinent

#### Citations

Utiliser pour :

- Témoignages
- Statistiques
- Définitions

Exemple :

```markdown
> "Citation pertinente d'un expert ou d'un utilisateur"
```

### 5. Liens et Références

- Liens internes : `[texte](chemin)`
- Liens externes : `[texte](url)`
- Notes de bas de page : `[^1]`

### 6. Images et Médias

- Images : `![alt text](chemin/image.jpg)`
- Vidéos : Utiliser des blocs de code pour les intégrations

## Exemple de Transformation

### Texte Brut

```markdown
MeilleursBiens offre plusieurs avantages aux agents immobiliers. Les agents conservent 100% de leurs commissions. Ils bénéficient d'outils technologiques performants. La formation est gratuite et régulière.
```

### Texte Formaté

```markdown
## Avantages de MeilleursBiens

**MeilleursBiens** offre plusieurs avantages majeurs aux agents immobiliers :

- **Commission intégrale** : Les agents conservent 100% de leurs commissions
- **Outils technologiques** : Accès à des solutions performantes
- **Formation continue** : Formations gratuites et régulières

> **Point clé** : Cette structure permet une meilleure lisibilité et une transformation HTML plus efficace.
```

## Bonnes Pratiques

1. **Préserver le Contenu** : Ne pas modifier le message ou l'information
2. **Structurer Logiquement** : Organiser l'information de manière cohérente
3. **Faciliter la Lecture** : Utiliser des espaces et des sauts de ligne appropriés
4. **Optimiser pour le HTML** : Préparer une structure qui se transformera facilement
5. **Maintenir la Cohérence** : Utiliser un style uniforme tout au long du document

## Points d'Attention

- Ne pas surcharger le texte avec trop de formatage
- Garder une structure simple et claire
- Éviter les imbrications complexes de listes
- Maintenir une hiérarchie logique des titres
- Assurer la compatibilité avec la transformation HTML ultérieure
