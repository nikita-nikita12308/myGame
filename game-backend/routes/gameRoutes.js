const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const gameController = require("../controllers/gameController");
const {validateGameExist} = require("../middlewares/validateGameExist");

router.post("/start", gameController.startGame);

router.get('/:id',validateGameExist, gameController.getGame);

router.get('/:id/tile-queue',validateGameExist, gameController.getTileQueue);

router.get('/:id/potential-tiles', validateGameExist, gameController.getPotentialTiles)

router.post("/:id/place-tile", validateGameExist, gameController.placeTile)

module.exports = router