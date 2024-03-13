function searchPokemon() {
    const inputElement = document.getElementById('searchInput');
    const resultElement = document.getElementById('result');
    const pokemonName = inputElement.value.toLowerCase();

    if (pokemonName.trim() === '') {
        resultElement.innerHTML = '<p>Por favor, ingresa un nombre de Pokémon válido.</p>';
        return;
    }

    // Puedes usar la PokéAPI para buscar el Pokémon por su nombre
    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Manipula los datos obtenidos de la API como desees
            const pokemonInfo = `<p>Nombre: ${data.name}</p><p>Altura: ${data.height}</p><p>Peso: ${data.weight}</p>`;
            resultElement.innerHTML = pokemonInfo;
        })
        .catch(error => {
            resultElement.innerHTML = '<p>No se encontró información para ese Pokémon.</p>';
        });
}
