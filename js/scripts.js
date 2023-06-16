
newFunction();  

function newFunction() {
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
    
    for (let i = 0; i < pokemonList.length; i++) {
        if (pokemonList[i].height < 6 && pokemonList[i].height > 0.5) {
            document.write(pokemonList[i].name + " is super tall (height: " + pokemonList[i].height + ")<br>");
        } else if (pokemonList[i].height < 0.5) {
            document.write(pokemonList[i].name + " is tiny (height: " + pokemonList[i].height + ")<br>");
        } else {
            document.write(pokemonList[i].name + " is huge (height: " + pokemonList[i].height + ")");
            if (pokemonList[i].height > 5) {
                document.write(" - WOW THAT'S BIG!<br> ");
        }
    }
    }
}