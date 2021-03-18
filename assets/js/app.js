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

  function getGif() {
    var searchTerm = document.querySelector('.gif').value
    fetch(
      'https://api.giphy.com/v1/gifs/search?q=' + 'pokemon' + '&api_key=aq1kqqFa3CJKTR7Sz6dkS3UDosSBGFrt&limit=20'
    )
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      console.log(response.data[0]);
      var gifContainerEl = document.querySelector('.gif');
      gifContainerEl.innerHTML = '';
      var gifImg = document.createElement('img');
      gifImg.setAttribute('src', response.data[0].images.fixed_height.url);
      gifContainerEl.appendChild(gifImg);
    });
  }

  getGif();
}

getPokemon();