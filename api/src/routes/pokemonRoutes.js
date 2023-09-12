const { Router } = require('express');
const {
  getAllPokemonsHandler,
  getPokemonByIdHandler,
  createPokemonHandler,
  deletePokemonHandler,
} = require("../handlers/pokemonHandlers");

const pokemonRouter = Router();

pokemonRouter.get("/", getAllPokemonsHandler);
pokemonRouter.get("/:id", getPokemonByIdHandler);
pokemonRouter.post("/", createPokemonHandler);
pokemonRouter.delete("/:id", deletePokemonHandler);

module.exports = pokemonRouter;
