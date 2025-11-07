export interface CardData {
  id: number;
  year: number;
  description: string;
  context?: string;
  claim?: {
    statement: string;
    evidence: string;
    source: string;
  };
  quiz?: {
    question: string;
    options: string[];
    answer: string;
  };
}

export interface Player {
  id: number;
  name: string;
  hand: CardData[];
}

export enum GameState {
  Setup = 'SETUP',
  Playing = 'PLAYING',
  Finished = 'FINISHED',
}
