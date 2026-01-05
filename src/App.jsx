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
  { image: banana },
  { image: dragonFruit },
  { image: kiwi },
  { image: mango },
  { image: orange },
  { image: peach },
  { image: pear },
  { image: watermelon },
  { image: banana },
  { image: dragonFruit },
  { image: kiwi },
  { image: mango },
  { image: orange },
  { image: peach },
  { image: pear },
  { image: watermelon },
];

function App() {
  const {
    cards,
    score,
    moves,
    isGameComplete,
    initializeGame,
    handleCardClick,
  } = UseGameLogic(cardValues);
  return (
    <div className="app">
      <GameHeader score={score} moves={moves} onReset={initializeGame} />

      {isGameComplete && <WinMessage moves={moves} />}

      <div className="cards-grid">
        {cards.map((card, index) => (
          <Card key={card.id} card={card} onClick={handleCardClick} />
        ))}
      </div>
      </div>
  );
}

export default App;
