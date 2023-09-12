const { Router } = require('express');
const pokemonRoutes = require('./pokemonRoutes'); 
const typeRoutes = require('./typeRoutes'); 

const router = Router();

router.use('/pokemons', pokemonRoutes); 
router.use('/types', typeRoutes); 

module.exports = router;
