**Back-End Project**

## Prérequis

- `Node.js` (version 18 ou plus)
- `MongoDB` (local ou hébergé)
- `TypeScript` installé globalement

## Installation

_Clonez ce dépôt_

1 - git clone <url_du_dépôt>

2 - cd back-end

_Installez les dépendances_

- npm install

## Structure du project

back-end
├── data # les données au format csv
├── src
│ ├── controllers # Logique des endpoints (contrôleurs)
│ │ └── [fichiers de contrôle]
│ ├── routes # Définition des routes de l'application
│ │ └── [fichiers de routage]
│ ├── models # Modèles Mongoose (schémas de données)
│ │ └── [fichiers des modèles]
│ ├── database # Gestion de la base de données
│ │ ├── connection.ts # Connexion à la base de données MongoDB
│ │ ├── setData.ts # Conversion Excel -> JSON et importation dans MongoDB
│ ├── index.ts # Point d'entrée principal de l'application
├── build # Fichiers compilés (générés après `npm run build`)
├── node_modules # Dépendances installées via npm
├── .gitignore # Fichiers/dossiers à exclure du contrôle de version
├── package.json # Configuration et scripts npm
├── package-lock.json # Verrouillage des dépendances
├── tsconfig.json # Configuration TypeScript
└── README.md # Documentation du projet

## Scripts disponibles

`npm run dev` : Lance le projet en mode développement avec Nodemon.
`npm run build` : Compile les fichiers TypeScript.
`npm start` : Exécute le projet compilé.
`npm run set-data` : Charge les données à partir d'un fichier Excel dans MongoDB.

## Comment commencer ??

_executez les commande suivante_
1- `npm run build` pour compiler le project 
2- `npm run set-data` pour charge les données dans la base de donnes mongoDb
3 - `npm run dev` pour lancer le project

- si vous souhaitez exécuter le projet compiler, exécutez :
  - `npm run start`

## ENDPOINTS

_port_ : http://localhost:3000

_GET_ : /api/products - Retourne un tableau des produits avec le nombre de ventes pour chaque produit
`example` : http://localhost:3000/api/products?page=1

_GET_ : /api/analytics/total_sales - Retourne le montant total des ventes pour la
période sélectionnée , accepte deux paramètres mind(date minimale) et maxd(date maximale) .
`example` : http://localhost:3000/api/analytics/total_sales?mind=2023-02-26&maxd=2023-06-17

_GET_ : /api/analytics/trending_products - Retourne une liste des 3 produits les plus
vendus, avec leur nom, quantité vendue et montant total des ventes pour
chacun.
`example` : http://localhost:3000/api/analytics/trending_products

_GET_ : /api/analytics/category_sales - Retourne la répartition des ventes par catégorie,
en indiquant le nombre de ventes, et le pourcentage.
`example` : http://localhost:3000/api/analytics/category_sales
