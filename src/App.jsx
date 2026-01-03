import { GameHeader } from "./components/GameHeader";
import banana from "./assets/banana.png";
import dragonFruit from "./assets/dragonFruit.png";
import kiwi from "./assets/kiwi.png";
import mango from "./assets/mango.png";
import orange from "./assets/orange.png";
import peach from "./assets/peach.png";
import pear from "./assets/pear.png";
import watermelon from "./assets/watermelon.png";
import { Card } from "./components/Card";
import { WinMessage } from "./components/WinMessage";
import { UseGameLogic } from "./hooks/UseGameLogic";

const cardValues = [
  { id: 1, image: banana },
  { id: 2, image: dragonFruit },
  { id: 3, image: kiwi },
  { id: 4, image: mango },
  { id: 5, image: orange },
  { id: 6, image: peach },
  { id: 7, image: pear },
  { id: 8, image: watermelon },
  { id: 9, image: banana },
  { id: 10, image: dragonFruit },
  { id: 11, image: kiwi },
  { id: 12, image: mango },
  { id: 13, image: orange },
  { id: 14, image: peach },
  { id: 15, image: pear },
  { id: 16, image: watermelon },
];

function App() {
  const {cards, score, moves, isGameComplete, initializeGame, handleCardClick} = UseGameLogic(cardValues);
  return (
    <>
      <GameHeader score={score} moves={moves} onReset={initializeGame}/>

      {isGameComplete && <WinMessage moves={moves}/>}

      <div className="cards-grid">
        {cards.map((card, index) => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
    </>
  );
}

export default App;
