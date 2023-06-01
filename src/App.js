import './App.css';
import { useEffect, useState } from "react";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/Footer.js";
import {  Route, Routes} from "react-router-dom"
import WebFont from "webfontloader";
import React from "react";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUp.js";
import store from "./store";
import {getItemsFromCart} from "./actions/cartAction"
import { loadUser } from "./actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword.js";
import ForgotPassword from "./component/User/ForgotPassword.js";
import ResetPassword from "./component/User/ResetPassword.js";
import Cart from "./component/Cart/Cart.js";
import Shipping from "./component/Cart/Shipping.js";
import ConfirmOrder from "./component/Cart/ConfirmOrder.js";
import axios from "axios";
import OrderSuccess from "./component/Cart/OrderSuccess.js";
import MyOrders from "./component/Order/MyOrders.js";
import OrderDetails from "./component/Order/OrderDetails.js";
import Dashboard from "./component/Admin/Dashboard.js";
import ProductList from "./component/Admin/ProductList.js";
import NewProduct from "./component/Admin/NewProduct.js";
import UpdateProduct from "./component/Admin/UpdateProduct.js";
import OrderList from "./component/Admin/OrderList.js";
import ProcessOrder from "./component/Admin/ProcessOrder.js";
import UsersList from "./component/Admin/UsersList.js";
import UpdateUser from "./component/Admin/UpdateUser.js";
import ProductReviews from "./component/Admin/ProductReviews.js";
import Contact from "./component/layout/Contact/Contact.js";
import About from "./component/layout/About/About";
import NotFound from "./component/layout/Not Found/NotFound.js";
import PaymentRedirect from './component/Cart/PaymentRedirect';
function App() {
  const { isAuthenticated, user ,role} = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");
  const isAdmin = (role==="admin")?true:false
  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    // console.log(user)
   
    
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);
  window.addEventListener("contextmenu", (e) => e.preventDefault());
  return (
    <div>
    <Header/>
    {isAuthenticated && <UserOptions user={user}  />}
   
    <Routes>
     <Route exact path="/" element={ <Home/>} /> 
     <Route exact path="/product/:id" element={<ProductDetails/>} />
     <Route exact path="/product/products" element={<Products/>} />
     <Route path="/products/:keyword" element={<Products/>} />
     <Route exact path="/search" element={<Search/>} />
     <Route exact path="/login" element={<LoginSignUp/>} />
      <Route exact path="/contact" element={<Contact/>}/>
      <Route exact path="/about" element={<About/>} />
     {isAuthenticated && <Route exact path="/account" element={<Profile/>} />}      
     {isAuthenticated && <Route exact path="/me/update" element={<UpdateProfile/>} />} 
     {isAuthenticated && <Route exact  path="/password/update" element={<UpdatePassword/>} />} 
     <Route exact  path="/password/forgot" element={<ForgotPassword/>} /> 
      <Route exact path="/password/reset/:token" element={<ResetPassword/>} />
     <Route exact path="/cart" element={<Cart/>} />
     {isAuthenticated && <Route exact path="/shipping"  element={<Shipping/>} />}
     {isAuthenticated && <Route exact path="/order/confirm"  element={<ConfirmOrder/>} />}
     {isAuthenticated && <Route exact path="/success"  element={<OrderSuccess/>} />}
     {isAuthenticated && <Route exact path="/orders"  element={<MyOrders/>} />}
     {isAuthenticated && <Route exact path="/order/:id"  element={<OrderDetails/>} />}
     {isAdmin && <Route exact path="/admin/dashboard"  element={<Dashboard/>} />}
     {isAdmin && <Route exact path="/admin/products"  element={<ProductList/>} />}
     {isAdmin && <Route exact path="/admin/product"  element={<NewProduct/>} />}
     {isAdmin && <Route exact path="/admin/product/:id"  element={<UpdateProduct/>} />}
     {isAdmin && <Route exact path="/admin/orders"  element={<OrderList/>} />}
     {isAdmin && <Route exact path="/admin/order/:id"  element={<ProcessOrder/>} />}
     {isAdmin && <Route exact  path="/admin/users"  element={<UsersList/>} />}
     {isAdmin && <Route exact path="/admin/user/:id"  element={<UpdateUser/>} />}
     {isAdmin && <Route exact  path="/admin/reviews"  element={<ProductReviews/>} />}
  
      
    {stripeApiKey && (
       
          <Route exact path="/process/payment" element={<PaymentRedirect stripeApiKey={stripeApiKey}/>} /> 
        
      )}

          <Route
          element={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
        
    </Routes>
    <Footer />
    </div>
    
  );
}

export default App;
