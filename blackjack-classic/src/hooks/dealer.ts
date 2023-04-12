import { useEffect, useState } from 'react';
import { useAppDispatch, useGame } from '../store';
import { Cost } from '../constants/suits';
import { hitCard } from '../store/game';

export const useDealer = () => {
    const dispatch = useAppDispatch();
    const { seats, playingSeat } = useGame();
    const { cards, score } = seats[0];
    const [shownScore, setShownScore] = useState(Cost[cards[0].rank]);

    useEffect(() => {
        if (playingSeat === 0) {
            setShownScore(score);
        }
    }, [playingSeat]);

    useEffect(() => {
        if (playingSeat === 0) {
            if (score <= 16) {
                dispatch(hitCard(0));
            } else {
                //game over
            }
        }
    }, [cards, score]);

    return { shownScore };
};
