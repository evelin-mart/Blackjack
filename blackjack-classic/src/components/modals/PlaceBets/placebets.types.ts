import { GameStatus, Player, SeatState } from '../../../store';

export type Props = {
    balance: number;
    seats: {
        [x: number]: SeatState;
    };
    player: Player;
    status: GameStatus;
};
