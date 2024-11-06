import Cards from "./components/cards";
import "./App.css";
import { useState } from "react";

const defaultPokemon = [9, 1, 25, 4, 150, 95, 73, 68, 48, 126, 18, 199];

function App() {
  const [pokemon, setPokemon] = useState(defaultPokemon);
  const [memory, setMemory] = useState([]);
  const score = memory.length;
  const [bestScore, setBestScore] = useState(0);

  function shufflePokemon() {
    const copyPokemon = [...pokemon];
    for (let i = copyPokemon.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copyPokemon[i], copyPokemon[j]] = [copyPokemon[j], copyPokemon[i]];
    }

    return copyPokemon;
  }

  function onClickShuffle(e) {
    const target = e.currentTarget.id;
    console.log(target);
    checkMemory(target);
    const newArr = shufflePokemon();
    setPokemon(newArr);
  }

  function checkMemory(targetId) {
    const checkFor = memory.includes(targetId);
    if (checkFor) {
      if (score > bestScore) {
        setBestScore(score);
      }
      setMemory([]);
    } else {
      setMemory([...memory, targetId]);
    }
  }

  console.log(memory);
  return (
    <div>
      <div>
        <header>
          <div>
            <h1>Pokemon Memory Game</h1>
          </div>
          <div>
            Try to click each pokemon without clicking on more than once!
          </div>
          <div className="flex">
            <div>Score: {score}</div>
            <div>Best score: {bestScore}</div>
          </div>
        </header>
      </div>
      <div className="card-grid">
        {pokemon.map((pokemon, index) => (
          <Cards key={index} id={pokemon} onClick={onClickShuffle} />
        ))}
      </div>
    </div>
  );
}

export default App;
