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
  
    // Return an object with the add and getAll functions as public methods
    return {
      add: add,
      getAll: getAll
    };
  })();
  
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
  