const { getAllPokemons } = require("../controllers/getAllPokemons.js");
const { Type } = require("../db.js");

const getAllTypesHandler = async (req, res) => {
  try {
    const countTypes = await Type.count(); // Cuenta las ocurrencias de elementos en la base de datos

    if (!countTypes) {
      console.log("Create them");

      const allMyPokemons = await getAllPokemons(); 

      const pokemonTypes = allMyPokemons.map((pokemon) => pokemon.types);

      const myTypes = pokemonTypes.flat(); //-> [[1, 2], [3, 2]] -> [1, 2, 3, 2]

      const mySetTypes = [...new Set(myTypes)]; 

      mySetTypes.forEach(async (type) => {
        await Type.findOrCreate({ where: { name: type } }); // Busca en la tabla Type, en la columna name, si tiene el tipo, si no lo crea.
      });

      const theTypes = await Type.findAll(); // Trae todos los datos de la tabla Type.

      res.status(200).send(theTypes);
    } else {
      console.log("No los cree porque ya los tenia");

      const theTypes = await Type.findAll(); // Trae todos los datos de la tabla Type.
      res.status(200).send(theTypes);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



module.exports = {
  getAllTypesHandler,
  
};
