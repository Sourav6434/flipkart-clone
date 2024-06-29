import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import ProductDetails from "./components/ProductDetails";
import Signup from "./components/Signup";
import Parent from "./components/Parent";
import AddProduct from "./components/AddProduct";
import Offers from "./components/Offers";
import ProductFeature from "./components/ProductFeature";
import Spinner from "./components/Spinner";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import MyProfile from "./components/MyProfile";
import EditProfile from "./components/EditProfile";
import ManageAddress from "./components/ManageAddress";
import MyOrders from "./components/MyOrders";

import PageNotFound from "./components/PageNotFound";
import WishList from "./components/WishList";
import Order from "./components/Order";
import OrderPlaced from "./components/OrderPlaced";


function App() {
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Parent />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products/:category" element={<ProductList />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />
          <Route path="/addProduct" element={<AddProduct />} />
          <Route path="/addProduct/:id" element={<AddProduct />} />
          <Route path="/myprofile" element={<MyProfile />}>
            <Route path="/myprofile" element={<EditProfile />} />
            <Route path="/myprofile/address" element={<ManageAddress />} />
          </Route>
          <Route path="/offers" element={<Offers />} />
          <Route path="/addProduct/feature" element={<ProductFeature />} />
          <Route path="/spinner" element={<Spinner />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order/>} />
          <Route path="/order/placed" element={<OrderPlaced/>} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/wishlist" element={<WishList />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
