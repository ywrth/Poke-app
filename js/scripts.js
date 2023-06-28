// Create a pokemonRepository using an IIFE (Immediately Invoked Function Expression)
let pokemonRepository = (function () {
    // Private variable to store the pokemonList array
    let pokemonList = [
      {
        name: 'Bulbasaur',
        id: 1,
        type: ['grass', 'poison'],
        height: 7
      },
      {
        name: 'Machoke',
        id: 2,
        type: ['fighting'],
        height: 1.5
      },
      {
        name: 'Crobat',
        id: 3,
        type: ['poison', 'flying'],
        height: 1.8
      },
      {
        name: 'Lillipup',
        id: 4,
        type: ['normal'],
        height: 0.4
      }
    ];

    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';


    // Function to add a new pokemon to the pokemonList array
    function add(pokemon) {
      if (typeof pokemon === 'object') {
        pokemonList.push(pokemon);
      } else {
        console.log('Only objects can be added to the pokemonList.');
      }
    }

    // Function to get all the pokemon in the pokemonList array
    function getAll() {
      return pokemonList;
    }

    // Function to create a button element for each pokemon in the pokemonList array
    function addListItem(pokemon) {
      let pokemonListElement = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('pokemon-button');
      listItem.appendChild(button);
      pokemonListElement.appendChild(listItem);

      // Call the function to add the event listener to the button
      addButtonClickListener(button, pokemon);
    }

    // Function to add event listener to a button
    function addButtonClickListener(button, pokemon) {
      button.addEventListener('click', function () {
        showDetails(pokemon);
      });
    }

    // Function to show details of a pokemon
    function showDetails(pokemon) {
      console.log(pokemon);
    }

    // Return an object with the add, getAll, and addListItem functions as public methods
    return {
      add: add, // Public method to add a new pokemon to the pokemonList
      getAll: getAll, // Public method to get all the pokemon in the pokemonList
      addListItem: addListItem // Public method to create a button element for each pokemon
    };

    function loadList() {
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        console.error(e);
      })
    }
  
    return {
      add: add,
      getAll: getAll,
      loadList: loadList
    };
  })();
  
  pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon){
      pokemonRepository.addListItem(pokemon);
    });
  });

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails
  };

  // Print the entire pokemonList array
  console.log(pokemonRepository.getAll());

  // Add a new pokemon to the pokemonList array
  pokemonRepository.add({
    name: 'Pikachu',
    id: 5,
    type: ['electric'],
    height: 0.4
  });

  // Print the updated pokemonList array
  console.log(pokemonRepository.getAll());

  // Attempt to add an invalid pokemon (non-object)
  pokemonRepository.add('Invalid Pokemon');

  // Loop through the pokemonList array and create buttons for each pokemon using addListItem()
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });

  
