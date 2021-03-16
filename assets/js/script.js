var getPokemon = function(searchValue) {

    var apiUrl = "https://pokeapi.co/api/v2/pokemon/arcanine" ;//+ searchValue;
    
        fetch (apiUrl).then(function(response) {
            response.json().then(function(data) {
                console.log (data);

                $(".pokeInfo").append(`
                    <h2> ${data.species.name} </h2>
                    <p> <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${data.id}.png"> </img </p> 


                
                `)
            })
        })
    }
getPokemon();