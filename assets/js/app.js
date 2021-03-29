const pokemonContainer = document.querySelector(".pokemon-container");
const formEl = document.querySelector("form");
const inputEl = document.querySelector("input[type=text]");
var prevPokemon = JSON.parse(localStorage.getItem("prevPokemon")) || [];

console.log(inputEl);

formEl.addEventListener("submit", (e) => {
  e.preventDefault();
  pokemonContainer.innerHTML = "";
  getPokemon(inputEl.value);

if (!prevPokemon.includes(inputEl.value)) {

prevPokemon.unshift(inputEl.value);
} else {
  var filterPoke = prevPokemon.filter(function(item){
    return item !== inputEl.value;
  }) 
  filterPoke.unshift(inputEl.value);
  prevPokemon.length = 0;
  prevPokemon = filterPoke;
}

localStorage.setItem("prevPokemon", JSON.stringify(prevPokemon));
});



async function getPokemon(name = "") {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
  const pokemon = await res.json();


  console.log(pokemon);

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

    <div class="stats">
    <p> Type: ${pokemon.types.length && pokemon.types[0].type.name}  <p>
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
      'https://api.giphy.com/v1/gifs/search?q=' + 'pokémon' + '&api_key=aq1kqqFa3CJKTR7Sz6dkS3UDosSBGFrt&limit=50'
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
  


function generateButtons() {
  
  $(".prevSearch").empty();

  for (i=0; i < prevPokemon.length; i++) {
    document.querySelector(".prevSearch").append(`
     ${prevPokemon[i]}
    `

    )
  }
 
}
generateButtons();
}








