let pokemonRepository = (function () {
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
  
    function add(pokemon) {
      pokemonList.push(pokemon);
    }
  
    function getAll() {
      return pokemonList;
    }
  
    pokemonList.forEach(function (pokemon) {
      if (pokemon.height < 6 && pokemon.height > 0.5) {
        document.write(pokemon.name + " is super tall (height: " + pokemon.height + ")<br>");
      } else if (pokemon.height < 0.5) {
        document.write(pokemon.name + " is tiny (height: " + pokemon.height + ")<br>");
      } else {
        document.write(pokemon.name + " is huge (height: " + pokemon.height + ")");
        if (pokemon.height > 5) {
          document.write(" - WOW THAT'S BIG!<br> ");
        }
      }
    });
  
    return {
      add: add,
      getAll: getAll
    };
  })();