//import the model
const productModel = require("../models/productModel");
const Products = require("../models/productModel");
const userModel = require("../models/userModel");
const Categories = require("../models/categoryModel");
const SubCategories = require("../models/subCategoryModel");

//Define Route handler
exports.createProduct = async (req, res) => {
  const NewProduct = req.body;

  if (NewProduct != null) {
    // console.log(NewProduct);
    const oldproduct = await Products.findOne({ title: NewProduct.title });

    if (oldproduct) {
      return res.status(400).send(`Product already exists`);
    }
    await Products.create(NewProduct)
      .then((data) => {
        res.status(201).send("Product created successfully");
      })
      .catch((err) => {
        res.status(400).send({ error: err });
      });

    // const product = new Products(NewProduct);
    // try {
    //     await product.save(); // mongodb: { ..., firstName_fuzzy: [String], lastName_fuzzy: [String] }
    //     res.status(200).send("Product created successfully")
    // }
    // catch (e) {
    //     res.status(400).send({ error: e })
    // }
  } else {
    res.status(400).send("Product not created");
  }
};
//get all the product
// exports.getProduct = async (req, res) => {
//     // Products.find()
//     const { q } = req.query;
//     Products.fuzzySearch(q)
//         .then((data) => {
//             res.status(200).json(data);
//         })
//         .catch((err) => {
//             res.status(400).send({ error: err })
//         })
// }

//Update the product by id
exports.updateProductById = async (req, res) => {
  const id = req.params.id;
  const modifiedValue = req.body;
  Products.findByIdAndUpdate(id, modifiedValue)
    .then((data) => res.status(204).send(data))
    .catch((err) => res.status(404).send((err) => "Item not found" + err));
};

// exports.getProduct = async (req, res) => {

//   // Products.find()
//   const { q } = req.query;
//   Products.find({
//     $or: [
//       { category: { $regex: new RegExp(q, "i") } },
//       { title: { $regex: new RegExp(q, "i") } },
//     ],
//   })
//     .then((data) => {
//       res.status(200).json(data);
//     })
//     .catch((err) => {
//       res.status(400).send({ error: err });
//     });
// };

exports.getProductSearchAny = async (req, res) => {
  // Products.find()
  const { q } = req.query;
  Products.find({
    $or: [
      { category: { $regex: new RegExp(q, "i") } },
      { title: { $regex: new RegExp(q, "i") } },
      { description: { $regex: new RegExp(q, "i") } },
      { brand: { $regex: new RegExp(q, "i") } },
    ],
  })
    .limit(5)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send({ error: err });
    });
};

exports.getProduct = async (req, res) => {
  // Products.find()
  const { q } = req.query;
  Products.find({
    $or: [
      { category: { $regex: new RegExp(q, "i") } },
      { title: { $regex: new RegExp(q, "i") } },
    ],
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send({ error: err });
    });
};

//get by category
exports.getProductByCategories = async (req, res) => {
  // Products.find()
  const { q } = req.query;

  Products.find({ category: { $in: q } })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send({ error: err });
    });
};

//get the product by id
exports.getProductById = async (req, res) => {
  const id = req.params.id;
  if (id != null) {
    Products.findById(id)
      .then((data) => {
        res.status(200).json(data);
      })
      .catch((err) => {
        res.status(400).send({ error: err });
      });
    // Products.fuzzySearch(id)
    //     .then((data) => {
    //         res.status(200).json(data);
    //     })
    //     .catch((err) => {
    //         res.status(400).send({ error: err })
    //     })
  } else {
    res.status(401).send(`Product with id ${id} does not exist`);
  }
};

//Delete the product by id
exports.DeleteProduct = (req, res) => {
  const id = req.params.id;
  Products.findByIdAndDelete(id)
    .then(() => res.status(201).send("deleted sucessfuly"))
    .catch((err) => res.status(404).send((err) => "id not found" + err));
};
//Delete all the product
exports.DeleteAllProduct = (req, res) => {
  Products.deleteMany({})
    .then(() => res.status(201).send("Deleted all data sucessfuly"))
    .catch((err) => res.status(404).send((err) => "Delete Failed" + err));
};

//Update the bookmark
exports.UpdateBookmark = (req, res) => {
  const id = req.params.id;
  const bookmarkState = req.body.bookmark;
  if (id != null) {
    Products.findByIdAndUpdate(id, { bookmark: bookmarkState })
      .then(() => res.status(201).send("Updated sucessfuly"))
      .catch((err) => res.status(400).send((err) => "id not found" + err));
  } else {
    res.status(401).send(`Product with id ${id} does not exist`);
  }
};

// //GET THE the user specific wishlist
// exports.getProductByWishlist = async (req, res) => {
//   //  const  data  = req.body;
//   const userId = req.params.wishlist;
//   const { q } = req.query;

//   try {
//     const user = await userModel.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const wishlist = user.wishlist;

//     try {
//       const matchingData = await productModel.find({
//         _id: { $in: wishlist },
//         $or: [
//           { category: { $regex: new RegExp(q, "i") } },
//           { title: { $regex: new RegExp(q, "i") } },
//         ],
//       });

//       res.status(200).json({ matchingData: matchingData });
//     } catch (error) {
//       console.error("Error finding matching data:", error);
//       res.status(500).json({ message: "Failed to find matching data" });
//     }
//   } catch (error) {
//     console.error("Error finding wishlist:", error);
//     return res.status(500).json({ message: "Failed to find wishlist" });
//   }
// };

exports.createCategory = async (req, res) => {
  const NewCategory = req.body;
  if (NewCategory != null) {
    const oldCategory = await Categories.findOne({ name: NewCategory.name });

    if (oldCategory) {
      return res.status(400).send("Category Already exist");
    }
    await Categories.create(NewCategory)
      .then((data) => {
        res.status(201).send("Category created successfully");
      })
      .catch((err) => {
        res.status(400).send({ error: err });
      });
  } else {
    res.status(400).send("Categories not created");
  }
};

//Delete all the category
exports.DeleteAllCategory = (req, res) => {
  Categories.deleteMany({})
    .then(() => res.status(201).send("Deleted all category sucessfuly"))
    .catch((err) => res.status(404).send((err) => "Delete Failed" + err));
};
//get all the Category
exports.getAllCategory = async (req, res) => {
  Categories.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send({ error: err });
    });
};

exports.createSubCategory = async (req, res) => {
  const NewSubCategory = req.body;
  if (NewSubCategory != null) {
    const oldSubCategory = await SubCategories.findOne({
      name: NewSubCategory.name,
    });

    if (oldSubCategory) {
      return res.status(400).send("Sub Category Already exist");
    }
    await SubCategories.create(NewSubCategory)
      .then((data) => {
        res.status(201).send("Sub Category created successfully");
      })
      .catch((err) => {
        res.status(400).send({ error: err });
      });
  } else {
    res.status(400).send("Sub Category not created");
  }
};

//get all the SubCategory
exports.getAllSubCategory = async (req, res) => {
  SubCategories.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res.status(400).send({ error: err });
    });
};
