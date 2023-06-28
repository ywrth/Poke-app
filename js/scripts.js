let pokemonRepository = (function () {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon
    ) {
      pokemonList.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector('.pokemon-list');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);
    button.addEventListener('click', function (event) {
      showDetails(pokemon);
    });
  }

  function showLoadingMessage() {
    let loadingMessage = document.createElement('p');
    loadingMessage.innerText = 'Loading...';
    document.body.appendChild(loadingMessage);
  }

  function hideLoadingMessage() {
    let loadingMessage = document.querySelector('p');
    if (loadingMessage) {
      loadingMessage.remove();
    }
  }

  function loadList() {
    showLoadingMessage();

    return fetch(apiUrl).then(function (response) {
      hideLoadingMessage();
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
        console.log(pokemon);
      });
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
  }

  function loadDetails(pokemon) {
    showLoadingMessage();

    let url = pokemon.detailsUrl;
    return fetch(url).then(function (response) {
      hideLoadingMessage();
      return response.json();
    }).then(function (details) {
      pokemon.imgUrl = details.sprites.front_default;
      pokemon.height = details.height;
    }).catch(function (e) {
      hideLoadingMessage();
      console.error(e);
    });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      console.log(pokemon);
    });
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
