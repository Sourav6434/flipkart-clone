const Offers = require("../models/offersModel");

exports.createOffers = async (req, res) => {
  const NewOffers = req.body;

  if (NewOffers != null) {
    // console.log(NewProduct);
    await Offers.create(NewOffers)
      .then((data) => {
        res.status(201).send("Offers created successfully");
      })
      .catch((err) => {
        res.status(400).send({ error: err });
      });
  } else {
    res.status(400).send("Offers not created");
  }
};

//get offers by Id
exports.getOffersById = async (req, res) => {
  const id = req.params.id;
  if (id != null) {
    Offers.findById(id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(400).send({ error: err });
      });
  } else {
    res.status(401).send(`Offers with id ${id} does not exist`);
  }
};

// Get all offers or limit the results based on query parameter
exports.getAllOffers = async (req, res) => {
  try {
    let query = Offers.find();

    // Check if limit query parameter is provided
    if (req.query.lim) {
      const limit = parseInt(req.query.lim); // Parse limit to integer
      query = query.limit(limit); // Limit the results
    }

    const data = await query.exec(); // is where the actual execution of the query against the database occurs. Without calling exec(), the query would not be executed, and you wouldn't get the results from the database.

    res.status(200).json(data);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};
