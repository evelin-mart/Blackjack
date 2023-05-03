export enum Suit {
    Club = 'Club',
    Diamond = 'Diamond',
    Heart = 'Heart',
    Spade = 'Spade',
};

export enum Rank {
    Ace ='Ace',
    Two = 'Two',
    Three ='Three',
    Four = 'Four',
    Five = 'Five',
    Six = 'Six',
    Seven = 'Seven',
    Eight = 'Eight',
    Nine = 'Nine',
    Ten = 'Ten',
    Jack = 'Jack',
    Queen = 'Queen',
    King = 'King',
};

type Cost = {
    [x in keyof typeof Rank]: number;
};

export const Cost: Cost = {
    Ace: 11,
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
