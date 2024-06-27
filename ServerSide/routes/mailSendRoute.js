const express = require("express");
const mailSendRouter = express.Router();

const { sendLatestOffer } = require("../controllers/mailSendController");

mailSendRouter.post("/sendmail", sendLatestOffer);

module.exports = mailSendRouter;
