import { useState, useEffect } from "react";

export default function Cards({ id, onClick }) {
  const [pokemon, setPokemon] = useState({});
  useEffect(() => {
    let ignore = false;
    async function getPokemons() {
      const response = await fetch("https://pokeapi.co/api/v2/pokemon/" + id);
      const jsonResponse = await response.json();
      if (!ignore) {
        setPokemon(jsonResponse);
      }
    }
    getPokemons();
    return () => {
      ignore = true;
    };
  }, [id]);

  return (
    <div className="card" onClick={onClick} id={id}>
      {pokemon ? (
        <>
          {pokemon.sprites ? (
            <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          ) : (
            <p>Image not available</p>
          )}

          <h1>{pokemon.name}</h1>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
