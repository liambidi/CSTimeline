import { CardData } from './types';

export const EVENT_CARDS: CardData[] = [
  {
    id: 1, year: 1750, description: "Débuts de la communication scientifique moderne",
    context: "Au 18e siècle, la science se professionnalise. Les journaux savants et les académies deviennent les principaux canaux de diffusion, remplaçant la correspondance privée.",
    claim: {
      statement: "La publication devient la norme pour valider une découverte.",
      evidence: "L'émergence de revues comme le 'Journal des sçavans' ou les 'Philosophical Transactions'.",
      source: "Chavot & Masseran, 2010"
    },
    quiz: {
      question: "Quel était le principal mode de communication scientifique avant les journaux ?",
      options: ["Les décrets royaux", "La correspondance privée", "Les crieurs publics"],
      answer: "La correspondance privée"
    }
  },
  {
    id: 2, year: 1900, description: "Vulgarisation scientifique pour le grand public",
    context: "À la fin du 19e siècle, des auteurs comme Camille Flammarion ou Jules Verne popularisent la science à travers des récits captivants, visant un public large et non expert.",
    claim: {
      statement: "La vulgarisation adopte une forme narrative et spectaculaire.",
      evidence: "Le succès de livres comme 'L'Astronomie populaire' (Flammarion).",
      source: "Chavot & Masseran, 2010"
    },
    quiz: {
      question: "Qui est un auteur emblématique de la vulgarisation à cette époque ?",
      options: ["Louis Pasteur", "Marie Curie", "Camille Flammarion"],
      answer: "Camille Flammarion"
    }
  },
  {
    id: 3, year: 1968, description: "Mouvements de Culture Scientifique et Technique (CST)",
    context: "La contestation des années 60 s'étend à la science. Des mouvements critiquent une science jugée trop liée au pouvoir militaire et industriel, et réclament une 'science pour le peuple'.",
    claim: {
      statement: "La CST naît d'une remise en cause de l'autorité scientifique.",
      evidence: "Apparition de 'boutiques de sciences' pour répondre aux questions des citoyens.",
      source: "Chavot & Masseran, 2010"
    },
    quiz: {
      question: "Quelle était l'une des critiques adressées à la science dans les années 60 ?",
      options: ["Trop théorique", "Trop liée au pouvoir", "Pas assez financée"],
      answer: "Trop liée au pouvoir"
    }
  },
  { id: 4, year: 1973, description: "Période marquée par des accidents industriels et nucléaires" },
  { id: 5, year: 1969, description: "Création de l'Exploratorium de San Francisco" },
  { id: 6, year: 1978, description: "Grands débats sur l'énergie nucléaire" },
  { id: 7, year: 1982, description: "Loi d'orientation et de programmation pour la recherche en France" },
  { id: 8, year: 1985, description: "Publication du Rapport Bodmer au Royaume-Uni" },
  {
    id: 9, year: 1986, description: "Ouverture de la Cité des Sciences et de l'Industrie",
    context: "La Cité des Sciences à Paris incarne une nouvelle muséologie interactive, inspirée de l'Exploratorium. L'objectif est de rendre la science accessible par l'expérimentation et le jeu.",
    claim: {
      statement: "Le modèle du 'science center' met l'accent sur l'interactivité.",
      evidence: "La devise 'interdit de ne pas toucher' de nombreux musées de science.",
      source: "Frank Oppenheimer"
    },
    quiz: {
      question: "De quel musée américain la Cité des Sciences s'est-elle inspirée ?",
      options: ["Le MoMA", "Le MET", "L'Exploratorium"],
      answer: "L'Exploratorium"
    }
  },
  { id: 10, year: 1987, description: "Premières conférences de consensus en Europe" },
  { id: 11, year: 1989, description: "Premier Eurobaromètre sur la science et la technologie" },
  { id: 12, year: 1991, description: "Création de la Fête de la Science en France" },
  { id: 13, year: 1992, description: "Ouverture de la Cité des enfants à Paris" },
  { id: 14, year: 1994, description: "Conférence de consensus sur les OGM" },
  { id: 15, year: 1997, description: "Développement de structures CST sur les OGM" },
  { id: 16, year: 1999, description: "Programmes de sensibilisation du public à la science" },
  { id: 17, year: 2000, description: "Adoption de l'Agenda de Lisbonne par l'Union Européenne" },
  { id: 18, year: 2002, description: "Lancement du 6ème PCRD (Programme Cadre de Recherche)" },
  { id: 19, year: 2007, description: "Lancement du 7ème PCRD avec l'axe 'Science dans la Société'" },
];

export const INITIAL_HAND_SIZE = 4;
