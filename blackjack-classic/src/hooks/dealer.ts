import { useEffect, useState } from 'react';
import { useAppDispatch, useGame } from '../store';
import { Cost } from '../constants/suits';
import { endGame, hitCard } from '../store/game';

export const useDealer = () => {
    const dispatch = useAppDispatch();
    const { seats, playingSeat } = useGame();
    const { cards, score } = seats[0];
    const [shownScore, setShownScore] = useState(Cost[cards[0].rank]);

    useEffect(() => {
        if (playingSeat === 0) {
            setShownScore(score);
            if (score < 17) {
                dispatch(hitCard(0));
            } else {
                dispatch(endGame());
            }
        }
    }, [playingSeat, cards, score]);

    return { shownScore };
};
