const cartModel = require("../models/cartModel");
const userModel = require("../models/userModel");
const productModel = require("../models/productModel");

//get all cart
exports.getAllCart = async (req, res) => {
  const userId = req.params.userId;
  try {
    let userData = await userModel.findById(userId);
    let cartData = await cartModel.findOne({ userId: userId });

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    if(!cartData) {
      return res.status(404).json({message: "Cart is empty"});
    }

    const cartDetails = await Promise.all(
      cartData.cart.map(async (item) => {
        try {
          const response = await productModel.findById(item.product);
          return { product: response, quantity: item.quantity };
        } catch (err) {
          console.log(err);
        }
      })
    );
    console.log("cart Details", cartDetails);
    res.status(200).json(cartDetails);
  } catch (err) {
    console.error(`Error in fetching cart data: ${err}`);
  }
};
//add to cart
exports.addToCart = async (req, res) => {
  const userId = req.params.userId;
  const { cartItem } = req.body;

  try {
    let userData = await userModel.findById(userId);
    let cartData = await cartModel.findOne({ userId: userId });

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    if (cartData) {
      const oldCartItem = cartData.cart.find(
        (item) => item.product === cartItem
      );
      if (oldCartItem) {
        return res.status(200).json({ message: "Product already in the cart" });
      } else {
        cartData.cart.push({ product: cartItem, quantity: 1 });
        await cartData.save();
        return res.status(200).json({ message: "Product added to cart" });
      }
    } else {
      let newCartData = new cartModel({ userId: userId, cart: [{ product: cartItem, quantity: 1 }] });
    await newCartData.save();
      return res.status(200).json({ message: "Product added to cart" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to add item to cart",
      error: true,
    });
  }
};
//remove from cart
exports.removeFromCart = async (req, res) => {
  const userId = req.params.userId;
  const { cartItem } = req.body;
  try {
    let userData = await userModel.findById(userId);
    let cartData = await cartModel.findOne({ userId: userId });

    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    if(!cartData) {
      return res.status(404).json({message: "Cart is empty"});
    }

    const oldCartItemIndex = cartData.cart.findIndex(
      (item) => item.product === cartItem
    );
    if (oldCartItemIndex !== -1) {
      // Using findByIdAndUpdate to update the document in the database
      await cartModel.findOneAndUpdate({userId:userId}, {
        $pull: { cart: cartData.cart[oldCartItemIndex] },
      });
      return res.status(200).json({ message: "Product removed from the cart" });
    } else {
      return res.status(200).json({ message: "Product not available in cart" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Failed to remove item from cart",
      error: true,
    });
  }
};
//update cart
exports.updateCartQuantity = async (req, res) => {
  const userId = req.params.userId;
  const { cartItem, action } = req.body;
  try {
    let userData = await userModel.findById(userId);
    let cartData = await cartModel.findOne({ userId: userId });
    let newQuantity;
    if (!userData) {
      return res.status(400).json({ message: "User not found" });
    }
    if(!cartData) {
      return res.status(404).json({message: "Cart is empty"});
    }

    const oldCartItemIndex = cartData.cart.findIndex(
      (item) => item.product === cartItem
    );
    const product = await productModel.findById(cartItem);

    if (oldCartItemIndex !== -1) {
      if (action && cartData.cart[oldCartItemIndex].quantity >= product.stock) {
        return res.status(400).json({
          message: "No More Product Available ",
          error: true,
          success: false,
        });
      }
      else if(!action && cartData.cart[oldCartItemIndex].quantity ==1){
        return res.status(400).json({
          message: "Atleast one product must be present",
          error: true,
          success: false,
        });
      } else {
        if (action) {
          newQuantity = cartData.cart[oldCartItemIndex].quantity + 1;
        } else {
          newQuantity = cartData.cart[oldCartItemIndex].quantity - 1;
        }

        if (newQuantity <= 0) {
          // console.log(user.cart[oldCartItemIndex].quantity);
          await cartModel.findByIdAndUpdate(userId, {
            $pull: { cart: cartData.cart[oldCartItemIndex] },
          });

          return res
            .status(200)
            .json({ message: "Product removed from the cart the cart" });
        } else {
          await cartModel.findOneAndUpdate(
            { userId: userId, "cart.product": cartItem }, // Match the user by _id and the cart item by product
            { $set: { "cart.$.quantity": newQuantity } } // Update the quantity of the matched cart item
          );
          return res
            .status(200)
            .json({ message: "Product quantitiy updated in the cart" });
        }
      }
    } else {
      return res.status(400).json({ message: "Product not available in cart" });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Failed to update item quantity from cart",
      error: true,
    });
  }
};
