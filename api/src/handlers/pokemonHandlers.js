const { getAllPokemons } = require("../controllers/getAllPokemons.js");
const { Pokemon, Type } = require("../db.js");

const getAllPokemonsHandler = async (req, res) => {
  try {
    const { name } = req.query;
    const allPokemons = await getAllPokemons();
    if (name) {
      const pokemonsName = allPokemons.filter((p) =>
        p.name.toLowerCase().includes(name.toLowerCase())
      );
      pokemonsName.length
        ? res.status(200).send(pokemonsName)
        : res.status(404).send("Pokemon not found");
    } else {
      res.status(200).send(allPokemons);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getPokemonByIdHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const getByID = await getAllPokemons();

    if (id) {
      const filterByID = getByID.filter((p) => p.id.toString() === id);
      filterByID.length
        ? res.status(200).send(filterByID)
        : res.status(404).send("ID not found");
    } else {
      res.status(404).send("Error url");
    }
  } catch (error) {
    res.json({ error: error.message });
  }
};

const createPokemonHandler = async (req, res) => {
  try {
    const {
      name,
      hp,
      attack,
      defense,
      speed,
      height,
      weight,
      image,
      types,
      createdInDb,
    } = req.body;

    let urlDeImagen = "";

    if (image) {
      urlDeImagen = image;
    } else {
      urlDeImagen =
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/800px-Pokebola-pokeball-png-0.png";
    }

    if (name && types.length) {
      const createPokemon = await Pokemon.create({
        name,
        hp,
        attack,
        defense,
        speed,
        height: Number(height),
        weight: Number(weight),
        image: urlDeImagen,
        createdInDb,
      });

      const typeDb = await Type.findAll({
        where: { name: types },
      });

      createPokemon.addType(typeDb);

      res.status(200).send("Pokemon creado con éxito");
    } else {
      res.status(400).send("Faltaron datos para crear el pokemon");
    }
  } catch (error) {
    res.send("Error en el post", error);
  }
};

const deletePokemonHandler = async (req, res) => {
  const { id } = req.params;
  try {
    const pokemonDelete = await Pokemon.findByPk(id);
    if (!pokemonDelete) {
      res.status(400).send("The ID to delete does not exist");
    } else {
      pokemonDelete.destroy();
      return res.status(200).send("Successfully deleted");
    }
  } catch (error) {
    res.status(400).json("Error delete", { error: error.message });
  }
};

module.exports = {
  getAllPokemonsHandler,
  getPokemonByIdHandler,
  createPokemonHandler,
  deletePokemonHandler,
};
