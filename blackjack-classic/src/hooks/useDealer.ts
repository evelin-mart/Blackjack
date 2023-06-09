import { useEffect, useState } from 'react';
import { useAppDispatch, useGame, endGame, hitCardDealer } from '../store';
import { Cost } from '../constants';

export const useDealer = () => {
    const dispatch = useAppDispatch();
    const { playingSeat, dealer } = useGame();
    const { cards, score } = dealer;
    const [shownScore, setShownScore] = useState(0);

    const isDealerTurn = playingSeat === 0;

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        if (isDealerTurn) {
            setShownScore(score);
            timeout = setTimeout(() => {
                if (score < 17) {
                    dispatch(hitCardDealer());
                } else {
                    dispatch(endGame());
                }
            }, 500);
        } else if (cards.length) {
            if (shownScore === 0) {
                setShownScore(Cost[cards[0].rank]);
            }
        } else {
            setShownScore(0);
        }

        return () => {
            clearTimeout(timeout);
        };
    }, [isDealerTurn, cards, score]);

    return { cards, shownScore, isDealerTurn };
};
