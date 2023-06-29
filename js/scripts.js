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

  function loadList() {
    showLoadingMessage();

    return fetch(apiUrl)
      .then(function (response) {
        hideLoadingMessage();
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
          console.log(pokemon);
        });
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  function loadDetails(pokemon) {
    showLoadingMessage();

    let url = pokemon.detailsUrl;
    return fetch(url)
      .then(function (response) {
        hideLoadingMessage();
        return response.json();
      })
      .then(function (details) {
        pokemon.imgUrl = details.sprites.front_default;
        pokemon.height = details.height;
      })
      .catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
  }

  // Updated showDetails function
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  // Function to show the modal
  function showModal(pokemon) {
    // Modal container element
    let modalContainer = document.getElementById('modal-container');

    // Elements for the Pokémon's name, height, and image
    let nameElement = document.createElement('h2');
    nameElement.innerText = pokemon.name;

    let heightElement = document.createElement('p');
    heightElement.innerText = 'Height: ' + pokemon.height;

    let imageElement = document.createElement('img');
    imageElement.src = pokemon.imgUrl;

    // Append elements to the modal container
    modalContainer.innerHTML = '';
    modalContainer.appendChild(nameElement);
    modalContainer.appendChild(heightElement);
    modalContainer.appendChild(imageElement);

    // Display the modal container
    modalContainer.classList.add('is-visible');
  }

  // Function to hide the modal
  function hideModal() {
    let modalContainer = document.getElementById('modal-container');
    modalContainer.classList.remove('is-visible');
  }

  // Event listeners for closing the modal
  let modalCloseButton = document.querySelector('.modal-close');
  modalCloseButton.addEventListener('click', hideModal);

  window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      hideModal();
    }
  });

  let modalContainer = document.getElementById('modal-container');
  modalContainer.addEventListener('click', function (e) {
    if (e.target === modalContainer) {
      hideModal();
    }
  });

  // hideLoadingMessage function to hide the loading message
  function hideLoadingMessage() {
    let loadingMessage = document.querySelector('p');
    if (loadingMessage) {
      loadingMessage.remove();
    }
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
