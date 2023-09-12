const { getAllPokemons } = require("../controllers/getAllPokemons.js");
const { Type } = require("../db.js");

const getAllTypesHandler = async (req, res) => {
  try {
    const countTypes = await Type.count(); // Cuenta las ocurrencias de elementos en la base de datos

    if (!countTypes) {
      console.log("Create them");

      const allMyPokemons = await getAllPokemons(); // Asegúrate de tener esta función definida para obtener todos los Pokémon

      const pokemonTypes = allMyPokemons.map((pokemon) => pokemon.types); // Mapea todos los tipos de Pokémon

      const myTypes = pokemonTypes.flat(); // Nuevo arreglo con los elementos de los subarreglos concatenados -> [[1, 2], [3, 2]] -> [1, 2, 3, 2]

      const mySetTypes = [...new Set(myTypes)]; // Elimina los tipos duplicados (Set solo acepta valores únicos) -> [1, 2, 3, 2] -> [1, 2, 3]

      mySetTypes.forEach(async (type) => {
        await Type.findOrCreate({ where: { name: type } }); // Busca en la tabla Type, en la columna name, si tiene el tipo, si no lo crea.
      });

      const theTypes = await Type.findAll(); // Trae todos los datos de la tabla Type.

      res.status(200).send(theTypes);
    } else {
      console.log("Ya los tenía, así que no los creé");

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
