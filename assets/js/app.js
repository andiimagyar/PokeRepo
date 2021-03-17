const pokemonContainer = document.querySelector(".pokemon-container");
const formEl = document.querySelector("form");
const inputEl = document.querySelector("input[type=text]");

console.log(inputEl);

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  pokemonContainer.innerHTML = "";
  getPokemon(inputEl.value);
});

async function getPokemon(name = "") {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemon = await res.json();

  const pokemonEl = document.createElement("div");
  pokemonEl.classList.add("pokemon");

  pokemonEl.innerHTML = `
    <div class="info">
      <img src="https://pokeres.bastionbot.org/images/pokemon/${
        pokemon.id
      }.png" width="200">
    <h2>${pokemon.name}</h2>
    <h2> Pokémon No.${pokemon.id} <h2>
    </div>
    <p> Type: ${pokemon.types[0].type.name}  <p>
    <div class="abilities">
    <p>Abilities: ${pokemon.abilities
      .map((ability) => {
        return `<p>${ability.ability.name}</p>`;
      })
      .join("")}</p>
   
    <div>
  `;

  pokemonContainer.appendChild(pokemonEl);
}

getPokemon();