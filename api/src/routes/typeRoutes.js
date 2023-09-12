const { Router } = require('express');
const { getAllTypesHandler} = require("../handlers/typeHandlers");

const typeRouter = Router();

typeRouter.get("/", getAllTypesHandler);


module.exports = typeRouter;
