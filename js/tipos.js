// Archivo tipos.js

// Función para obtener la lista de todos los tipos de Pokémon
function getPokemonTypes() {
    const apiUrl = 'https://pokeapi.co/api/v2/type/';

    return fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            return data.results.map(type => {
                return {
                    name: type.name,
                    url: type.url,
                };
            });
        })
        .catch(error => {
            console.error('Error al obtener la lista de tipos de Pokémon:', error);
            return [];
        });
}

// Función para obtener la lista de Pokémon por tipo
function getPokemonByType(type) {
    return fetch(type.url)
        .then(response => response.json())
        .then(data => {
            return data.pokemon.map(pokemon => {
                return {
                    name: pokemon.pokemon.name,
                    url: pokemon.pokemon.url,
                };
            });
        })
        .catch(error => {
            console.error(`Error al obtener la lista de Pokémon por tipo (${type.name}):`, error);
            return [];
        });
}

// Función para crear elementos de tipo en el DOM
function createTypeElement(type) {
    const tipoElement = document.createElement('div');
    tipoElement.classList.add('tipo');
    tipoElement.textContent = type.name;
    
    // Agregar un evento de clic para cargar los Pokémon del tipo seleccionado
    tipoElement.addEventListener('click', function () {
        getPokemonByType(type).then(pokemonList => {
            displayResults(pokemonList);
        });
    });

    return tipoElement;
}

// Función para mostrar resultados en el DOM
function displayResults(pokemonList) {
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = ''; // Limpiar los resultados anteriores

    if (pokemonList.length === 0) {
        resultElement.innerHTML = '<p>No se encontraron Pokémon para este tipo.</p>';
        return;
    }

    // Crear elementos de resultado y agregarlos al DOM
    const resultsContainer = document.createElement('div');
    resultsContainer.classList.add('results-container');

    // Agrupar los Pokémon en conjuntos de tres columnas
    for (let i = 0; i < pokemonList.length; i += 3) {
        const columnGroup = document.createElement('div');
        columnGroup.classList.add('column-group');

        for (let j = 0; j < 3 && i + j < pokemonList.length; j++) {
            const pokemonCard = document.createElement('div');
            pokemonCard.classList.add('pokemon-card');
            pokemonCard.textContent = pokemonList[i + j].name;
            columnGroup.appendChild(pokemonCard);
        }

        resultsContainer.appendChild(columnGroup);
    }

    resultElement.appendChild(resultsContainer);
}


// ... (tu código existente)

// Función para crear botones de tipo en el DOM
function createTypeButton(type) {
    const buttonElement = document.createElement('button');
    buttonElement.classList.add('type-button');
    buttonElement.textContent = type.name;
    
    // Agregar un evento de clic para cargar los Pokémon del tipo seleccionado
    buttonElement.addEventListener('click', function () {
        getPokemonByType(type).then(pokemonList => {
            displayResults(pokemonList);
        });
    });

    return buttonElement;
}
function organizeButtons(typesList) {
    // Ordenar alfabéticamente
    typesList.sort((a, b) => a.name.localeCompare(b.name));

    // Dividir en grupos de 3 para las columnas
    const columns = 3;
    const typesGroups = new Array(columns).fill(null).map(() => []);

    typesList.forEach((type, index) => {
        const columnIndex = index % columns;
        typesGroups[columnIndex].push(type);
    });

    // Concatenar los grupos
    const organizedList = typesGroups.reduce((result, group) => result.concat(group), []);

    return organizedList;
}

// Al cargar la página, obtener los tipos de Pokémon y crear botones en el DOM
document.addEventListener('DOMContentLoaded', function () {
    const tiposContainer = document.getElementById('tiposContainer');

    getPokemonTypes().then(typesList => {
        typesList.forEach(type => {
            const typeButton = createTypeButton(type);
            tiposContainer.appendChild(typeButton);
        });
    });
});


