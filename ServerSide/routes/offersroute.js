const express = require('express');
const offerRouter = express.Router();


const offersController = require('../controllers/offersController');
offerRouter.post("/createoffer", offersController.createOffers);
offerRouter.get("/", offersController.getAllOffers);
offerRouter.get("/:id", offersController.getOffersById);

module.exports = offerRouter;