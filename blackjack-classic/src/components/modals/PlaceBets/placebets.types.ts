import { Player, SeatState } from '../../../store';

export type Props = {
    open: boolean;
    balance: number;
    seats: {
        [x: number]: SeatState;
    };
    player: Player;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
