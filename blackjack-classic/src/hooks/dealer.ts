import { useEffect, useState } from 'react';
import { useAppDispatch, useGame, endGame, hitCardDealer } from '../store';
import { Cost } from '../constants';

export const useDealer = () => {
    const dispatch = useAppDispatch();
    const { seats, playingSeat, dealer } = useGame();
    const { cards, score } = dealer;
    const [shownScore, setShownScore] = useState(() => (cards.length ? Cost[cards[0].rank] : 0));

    useEffect(() => {
        if (playingSeat === seats.allIds.length) {
            setShownScore(score);
            if (score < 17) {
                dispatch(hitCardDealer());
            } else {
                dispatch(endGame());
            }
        }
    }, [playingSeat, cards, score]);

    return { cards, shownScore };
};
