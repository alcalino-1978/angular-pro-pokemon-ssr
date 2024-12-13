(async () => {
  const fs = require("fs");
  const TOTAL_POKEMONS = 151;
  const TOTAL_PAGES = 5;
  // const fs = require('fs')
  // const path = require('path')
  // const routes = require('../src/router/routes').default

  // const filePath = path.resolve(__dirname, '../src/router/routes.js')
  // const fileContent = `export default ${JSON.stringify(routes)}`
  // fs.writeFileSync(filePath, fileContent)

  // Pokemon por Ids
  const pokemonIds = Array.from({ length: TOTAL_POKEMONS }, (_, i) => i + 1);
  console.log(pokemonIds);

  let fileContent = pokemonIds.map((id) => `/pokemons/${id}`).join("\n");

  // Paginas de pokemons
  for (let i = 1; i <= TOTAL_PAGES; i++) {
    fileContent += `\n/pokemons/page/${i}`;
  }

  // Por nombres
  const pokemonsNameList = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${TOTAL_POKEMONS}`
  ).then((res) => res.json());

  fileContent += "\n";
  fileContent += pokemonsNameList.results
    .map((pokemon) => `/pokemons/${pokemon.name}`)
    .join("\n");

  fs.writeFileSync("routes.txt", fileContent);
  console.log("File written");
})();
