async function getPokemon() {
    const response = await fetch('pokedex.json')
    const pokemonArray = await response.json()

    const container = document.getElementById("container");


    pokemonArray.forEach((pokemon) => {
        const card = document.createElement("div")
        card.classList.add("card")

        const textos = document.createElement("div")
        textos.classList.add("textos")

        const image = document.createElement("img");
        image.src = pokemon.imgUrl
 
        const nameElement = document.createElement("h2")
        nameElement.textContent = pokemon.name

        const dexElement = document.createElement("p")
        dexElement.textContent = pokemon.dex

        const versionElement = document.createElement("p")
        versionElement.textContent = pokemon.version

        const heightElement = document.createElement("p")
        heightElement.textContent = pokemon.height

        const weightElement = document.createElement("p")
        weightElement.textContent = pokemon.weight


        textos.appendChild(nameElement)
        textos.appendChild(dexElement)
        textos.appendChild(versionElement)
        textos.appendChild(heightElement)
        textos.appendChild(weightElement)

        card.appendChild(image)
        card.appendChild(textos)
        

        container.appendChild(card)
    })

}

getPokemon();