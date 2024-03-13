function createPokemonCard(pokemon) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('pokemon-card');

    const imageElement = document.createElement('img');
    imageElement.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;
    imageElement.alt = pokemon.name;

    const infoElement = document.createElement('div');
    infoElement.classList.add('pokemon-info');

    const nameElement = document.createElement('h3');
    nameElement.textContent = pokemon.name;

    const heightElement = document.createElement('p');
    heightElement.textContent = `Altura: ${pokemon.height}`;

    const weightElement = document.createElement('p');
    weightElement.textContent = `Peso: ${pokemon.weight}`;

    infoElement.appendChild(nameElement);
    infoElement.appendChild(heightElement);
    infoElement.appendChild(weightElement);

    cardElement.appendChild(imageElement);
    cardElement.appendChild(infoElement);

    return cardElement;
}
document.addEventListener('DOMContentLoaded', function () {
    const buttonElement = document.querySelector('button');
    buttonElement.addEventListener('click', searchPokemon);
});


function searchPokemon() {
    const inputElement = document.getElementById('searchInput');
    const resultElement = document.getElementById('result');
    const pokemonName = inputElement.value.toLowerCase();

    if (pokemonName.trim() === '') {
        resultElement.innerHTML = '<p>Por favor, ingresa un nombre de Pokémon válido.</p>';
        return;
    }

    const apiUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonName}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`No se encontró información para ${pokemonName}.`);
            }
            return response.json();
        })
        .then(data => {
            const pokemonCard = createPokemonCard(data);
            resultElement.innerHTML = ''; // Limpiar resultados anteriores
            resultElement.appendChild(pokemonCard);
        })
        .catch(error => {
            resultElement.innerHTML = `<p>${error.message}</p>`;
        });
}

