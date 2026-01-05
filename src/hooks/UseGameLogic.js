import { useState, useEffect } from "react";

export const UseGameLogic = (cardValues) => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isLocked, setIsLocked] = useState(false);

  const shuffleArray = (array) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--){
      const j = Math.floor(Math.random() * (i+1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  };

  const initializeGame = () => {
    //Shuffle cards
    const shuffled = shuffleArray(cardValues);

    const finalCards = shuffled.map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }));

    setCards(finalCards);
    setMoves(0);
    setScore(0);
    setIsLocked(false);
    setMatchedCards([]);
    setFlippedCards([]);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (card) => {
    //dont allow clicking if card is already flipped or matched

    if (card.isFlipped || card.isMatched || isLocked || flippedCards.length == 2) {
      return;
    }

    //update card flipped state
    const newCards = cards.map((c) => {
      if (c.id === card.id) {
        return { ...c, isFlipped: true };
      } else {
        return c;
      }
    });

    setCards(newCards);

    const newFlippedCards = [...flippedCards, card.id];
    setFlippedCards(newFlippedCards);

    //check for match if two cards are flipped
    if (flippedCards.length === 1) {
      setIsLocked(true);
      const firstCard = cards[flippedCards[0]];

      if (firstCard.value.image === card.value.image) {
        setTimeout(() => {
          setMatchedCards((prev) => [...prev, firstCard.id, card.id]);
          setScore((prev) => prev+1);

          const newMatchedCards = cards.map((c) => {
            if (c.id === card.id || c.id === firstCard.id) {
              return { ...c, isMatched: true };
            } else {
              return c;
            }
          });

          setCards((prev) => prev.map((c) => {
            if (c.id === card.id || c.id === firstCard.id) {
              return { ...c, isMatched: true };
            } else {
              return c;
            }
          }));
          setFlippedCards([]);
          setIsLocked(false);
        }, 500);
      } else {
        // flip back card 1 and 2
        setTimeout(() => {
          const flippedBackCard = newCards.map((c) => {
            if (newFlippedCards.includes(c.id) || c.id === card.id) {
              return { ...c, isFlipped: false };
            } else {
              return c;
            }
          });

          setCards(flippedBackCard);
          setFlippedCards([]);
          setIsLocked(false);
        }, 1000);
      }

      setMoves((prev) => prev+1);
    }
  };

  const isGameComplete = matchedCards.length === cardValues.length;

  return {cards, score, moves, isGameComplete, initializeGame, handleCardClick}
}