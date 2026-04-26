import { Link } from "react-router-dom";

const exercices = [
  {
    path: "/ex1",
    num: "EX-01",
    icon: "➕",
    title: "Addition",
    desc: "Appelle une fonction du contrat qui retourne la somme de deux entiers.",
  },
  {
    path: "/ex2",
    num: "EX-02",
    icon: "🔄",
    title: "Éther → Wei",
    desc: "Convertit une valeur en Éther vers l'unité Wei via le contrat.",
  },
  {
    path: "/ex3",
    num: "EX-03",
    icon: "✏️",
    title: "Stockage de chaîne",
    desc: "Enregistre un message sur la blockchain puis le relit depuis le contrat.",
  },
  {
    path: "/ex4",
    num: "EX-04",
    icon: "🔢",
    title: "Nombre positif",
    desc: "Vérifie si un entier est positif grâce à la logique du contrat Solidity.",
  },
  {
    path: "/ex5",
    num: "EX-05",
    icon: "⚖️",
    title: "Parité",
    desc: "Détermine si un nombre est pair ou impair via une fonction Solidity.",
  },
  {
    path: "/ex6",
    num: "EX-06",
    icon: "📊",
    title: "Tableau dynamique",
    desc: "Ajoute des nombres à un tableau on-chain et calcule leur somme.",
  },
  {
    path: "/ex7",
    num: "EX-07",
    icon: "📐",
    title: "Surface rectangle",
    desc: "Calcule la surface d'un rectangle défini dans un struct Solidity.",
  },
  {
    path: "/ex8",
    num: "EX-08",
    icon: "💸",
    title: "Paiement ETH",
    desc: "Envoie des Ethers à la fonction payable du contrat intelligent.",
  },
];

export default function Home() {
  return (
    <div className="ex-page">
      {/* Hero */}
      <div className="home-hero">
        <div className="home-badge">Contrats Intelligents Solidity</div>
        <h1 className="home-title">
          TP3 <span className="gradient-text">Blockchain</span> dApp
        </h1>
        <p className="home-subtitle">
          Exercices Web3 interactifs basés sur Ethereum, Ganache et Solidity.
          Chaque exercice interagit directement avec un contrat déployé en local.
        </p>

        <div className="home-stats">
          <div className="stat-badge">
            <span className="stat-icon">🔷</span>
            <strong>8</strong>&nbsp;exercices
          </div>
          <div className="stat-badge">
            <span className="stat-icon">⚡</span>
            Réseau Ganache local
          </div>
          <div className="stat-badge">
            <span className="stat-icon">🔗</span>
            Web3.js · Solidity
          </div>
        </div>
      </div>

      {/* Grille des exercices */}
      <div className="ex-grid">
        {exercices.map((ex) => (
          <Link key={ex.path} to={ex.path} className="ex-card">
            <span className="ex-card-number">{ex.num}</span>
            <span className="ex-card-icon">{ex.icon}</span>
            <span className="ex-card-title">{ex.title}</span>
            <span className="ex-card-desc">{ex.desc}</span>
            <span className="ex-card-arrow">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}