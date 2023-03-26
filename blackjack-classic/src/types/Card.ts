export const Suit = {
  Club: 'Club',
  Diamond: 'Diamond',
  Heart: 'Heart',
  Spade: 'Spade',
} as const;

export const Rank = {
  Ace: 1,
  Two: 2,
  Three: 3,
  Four: 4,
  Five: 5,
  Six: 6,
  Seven: 7,
  Eight: 8,
  Nine: 9,
  Ten: 10,
  Jack: 10,
  Queen: 10,
  King: 10,
} as const;

export interface Card {
  rank: keyof typeof Rank;
  suit: keyof typeof Suit;
}
