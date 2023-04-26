import { useEffect, useState } from 'react';
import { useAppDispatch, useGame, endGame, hitCardDealer } from '../store';
import { Cost } from '../constants';

export const useDealer = () => {
    const dispatch = useAppDispatch();
    const { seats, playingSeat, dealer } = useGame();
    const { cards, score } = dealer;
    const [shownScore, setShownScore] = useState(0);

    const isDealerTurn = playingSeat === seats.allIds.length;

    useEffect(() => {
        if (isDealerTurn) {
            setShownScore(score);
            if (score < 17) {
                dispatch(hitCardDealer());
            } else {
                dispatch(endGame());
            }
        } else if (cards.length && shownScore === 0) {
            setShownScore(Cost[cards[0].rank]);
        }
    }, [isDealerTurn, cards, score]);

    return { cards, shownScore, isDealerTurn };
};
