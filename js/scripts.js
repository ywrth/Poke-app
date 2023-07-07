let pokemonRepository = (function () {
  let pokemonList = []
  let api = [{ url: 'https://pokeapi.co/api/v2/pokemon/?limit=200', offset: 0 }]
  let currentApi = api[0]

  function getAllApi () {
    return api
  }

  function addNavItem (item) {
    let navbarNav = document.querySelector('.navbar-nav')
    let navItem = document.createElement('li')
    let button = document.createElement('button')

    $(button)
      .addClass('nav-link btn btn-link')
      .text(`Resources`)
      .on('click', function () {
        window.location.href = 'https://pokedex.org/'
      })

    $(navItem).addClass('nav-item')

    navItem.appendChild(button)
    navbarNav.appendChild(navItem)
  }

  function changeApi (item) {
    pokemonList = []
    currentApi = item

    let ul = document.querySelector('.pokemon-list')
    $(ul).html('')

    loadList().then(function () {
      getAllPokemon().forEach(function (pokemon) {
        addListItem(pokemon)
      })
    })
  }

  function convertHeight (n) {
    return n + ' m' // to return the original value
  }

  function convertWeight (n) {
    return n + ' kg' // to return the original value
  }

  function showLoadingMessage () {
    console.log('Loading...')
    console.time('Rendered')
  }

  function hideLoadingMessage () {
    console.timeEnd('Rendered')
  }

  function add (pokemon) {
    if (
      typeof pokemon === 'object' &&
      'name' in pokemon &&
      'detailsUrl' in pokemon &&
      'id' in pokemon
    ) {
      pokemonList.push(pokemon)
    } else {
      console.log('pokemon cannot be pushed to pokemonList')
    }
  }

  function loadList () {
    showLoadingMessage()

    return fetch(currentApi.url)
      .then(function (response) {
        return response.json()
      })
      .then(function (json) {
        let count = currentApi.offset + 1
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
            id: count
          }
          add(pokemon)
          count = count + 1
        })
        hideLoadingMessage()
      })
      .catch(function (e) {
        hideLoadingMessage()
        console.error(e)
      })
  }

  function getAllPokemon () {
    return pokemonList
  }

  function loadDetails (item) {
    showLoadingMessage()
    let url = item.detailsUrl
    return fetch(url)
      .then(function (response) {
        return response.json()
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default
        item.id = details.id

        item.height = details.height
        item.weight = details.weight

        item.types = details.types
        if (details.types.length === 2) {
          item.types[0] = details.types[0].type.name
          item.types[1] = details.types[1].type.name
        } else {
          item.types[0] = details.types[0].type.name
        }

        hideLoadingMessage()
      })
      .catch(function (e) {
        hideLoadingMessage()
        console.error(e)
      })
  }

  function searchItem () {
    let searchInput = document.querySelector('#searchInput').value.toLowerCase()
    let listArray = document.querySelectorAll('.list-group-item')

    listArray.forEach(function (pokemon) {
      let listBtn = pokemon
        .querySelector('.list-button')
        .innerText.toLowerCase()
      if (listBtn.includes(searchInput)) {
        pokemon.style.display = 'block'
      } else {
        pokemon.style.display = 'none'
      }
    })
  }

  let searchForm = document.querySelector('#searchForm')
  searchForm.addEventListener('submit', function (e) {
    e.preventDefault() // Prevent form submission
  })

  let searchInput = document.querySelector('#searchInput')
  searchInput.addEventListener('input', searchItem)

  function showDetails (pokemon) {
    loadDetails(pokemon).then(function () {
      let body = document.querySelector('body')
      $(body).addClass('modal-open')

      let modalContainer = document.querySelector('.modal-container')
      $(modalContainer)
        .addClass('modal fade show')
        .attr('aria-labelledby', 'Pokemon details')
        .attr('aria-hidden', 'true')
        .attr('role', 'dialog')
        .attr('aria-modal', 'true')
        .attr('style', 'display: block;')
        .html('')

      let modalDialog = document.createElement('div')
      $(modalDialog).attr('role', 'document').addClass('modal-dialog')

      let modalContent = document.createElement('div')
      $(modalContent).addClass('modal-content')

      let closeButtonElement = document.createElement('button')
      $(closeButtonElement)
        .addClass('modal-close close')
        .attr('data-dismiss', 'modal')
        .attr('aria-label', 'close')
        .attr('type', 'button')
        .on('click', function () {
          hideDetails()
          $(modalContainer)
            .removeClass('show')
            .removeAttr('aria-modal')
            .attr('style', 'display: none;')
        })

      let ariaSpan = document.createElement('span')
      $(ariaSpan).attr('aria-hidden', 'true').text('Close')

      let titleElement = document.createElement('h1')
      titleElement.innerText = `${pokemon.name
        .charAt(0)
        .toUpperCase()}${pokemon.name.slice(1)} #${pokemon.id}`

      let spriteElement = document.createElement('img')
      spriteElement.src = pokemon.imageUrl

      let contentElement = document.createElement('p')
      if (pokemon.types.length > 1) {
        contentElement.innerText = `Height: ${convertHeight(pokemon.height)}
          Weight: ${convertWeight(pokemon.weight)}
          Types: ${pokemon.types[0]}, ${pokemon.types[1]}`
      } else {
        contentElement.innerText = `Height: ${convertHeight(pokemon.height)}
          Weight: ${convertWeight(pokemon.weight)}
          Type: ${pokemon.types[0]}`
      }

      closeButtonElement.appendChild(ariaSpan)
      modalContent.appendChild(closeButtonElement)
      modalContent.appendChild(titleElement)
      modalContent.appendChild(spriteElement)
      modalContent.appendChild(contentElement)
      modalDialog.appendChild(modalContent)
      modalContainer.appendChild(modalDialog)

      modalContainer.addEventListener('click', function (e) {
        let target = e.target
        if (target === modalContainer) {
          hideDetails()
        }
      })
    })
  }

  function hideDetails () {
    let modalContainer = document.querySelector('.modal-container')
    $(modalContainer)
      .removeClass('modal fade')
      .removeAttr('aria-labelledby')
      .removeAttr('aria-hidden')
      .removeAttr('role')
      .removeAttr('style')

    let modalBackdrop = document.querySelector('.modal-backdrop')
    $(modalBackdrop).remove()

    let body = document.querySelector('body')
    $(body).removeAttr('class')
  }

  function addListItem (pokemon) {
    let pokemonList = document.querySelector('.pokemon-list')
    let listItem = document.createElement('li')
    let button = document.createElement('button')

    button.innerText = `#${pokemon.id} ${pokemon.name
      .charAt(0)
      .toUpperCase()}${pokemon.name.slice(1)}`
    $(button)
      .addClass('list-button btn btn-primary')
      .attr('type', 'button')
      .attr('data-toggle', 'modal')
      .attr('data-target', '.modal-container')
    button.addEventListener('click', function () {
      showDetails(pokemon)
    })

    $(listItem).addClass('list-group-item')

    listItem.appendChild(button)
    pokemonList.appendChild(listItem)
  }

  window.addEventListener('keydown', function (e) {
    let modalContainer = document.querySelector('.modal-container')
    if (e.key === 'Escape' && modalContainer.classList.contains('show')) {
      hideDetails()
    }
  })

  return {
    getAllApi: getAllApi,
    addNavItem: addNavItem,
    changeApi: changeApi,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage,
    add: add,
    loadList: loadList,
    getAllPokemon: getAllPokemon,
    loadDetails: loadDetails,
    showDetails: showDetails,
    hideDetails: hideDetails,
    addListItem: addListItem
  }
})()

pokemonRepository.getAllApi().forEach(function (item) {
  pokemonRepository.addNavItem(item)
})

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAllPokemon().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon)
  })
})
