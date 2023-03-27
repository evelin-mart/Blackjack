import { Card } from "./Card";

type playerType = 'AI' | 'player';

export interface Seat {
  number: number;
  free: boolean;
  player: {
    name: string;
    type: playerType;
    bet: number | null;
    score: number;
    cards: Card[];
    blackjackCount: number;
    doubleSeat: {
      score: number;
    } | null;
  }
}
