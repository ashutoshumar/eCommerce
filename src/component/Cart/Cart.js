import React, { Fragment ,useEffect} from "react";
import "./Cart.css";
import Loader from "../layout/Loader/Loader";
import CartItemCard from "./CartItemCard.js";
import { useSelector, useDispatch } from "react-redux";
import { updateItemsToCart, removeItemsFromCart,clearErrors,getItemsFromCart } from "../../actions/cartAction";
import { Typography } from '@mui/material';
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";
import { Link,useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { DELETE_CART_RESET, UPDATE_CART_RESET } from "../../constants/cartConstants";
const Cart = () => {
  const dispatch = useDispatch();
  const { cartItems,loading, error } = useSelector((state) => state.cart);
  const {
   
    error: updateError,
    isUpdated,isDeleted
  } = useSelector((state) => state.changeCert);
  const { isAuthenticated} = useSelector((state) => state.user);
  const navigate = useNavigate()
  const alert = useAlert();
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(updateItemsToCart(id, newQty));
   
  };

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (1 >= quantity) {
      return;
    }
    dispatch(updateItemsToCart(id, newQty));
   
  };

  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id));
   
  };

  const checkoutHandler = () => { 
    if(isAuthenticated)
    navigate("/shipping");
    else
    navigate("/login")
  };

 
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
   if(updateError)
   {
    alert.error(updateError);
    dispatch(clearErrors());
   }
   if (isUpdated) {
    alert.success("Updated Successfully");
  
    dispatch({ type: UPDATE_CART_RESET });
  }
  if(isDeleted)
  {
    alert.success("Deleted Successfully");
  
    dispatch({ type: DELETE_CART_RESET });
  }
    dispatch(getItemsFromCart());
  }, [dispatch,alert,error,updateError,isUpdated,isDeleted]);


  return (
    <Fragment>
      {
        loading ? ( <Loader />):(
          <Fragment>

{(cartItems && cartItems.length === 0 ) ? (
        <div className="emptyCart">
          <RemoveShoppingCartIcon />

          <Typography>No Product in Your Cart</Typography>
          <Link to="/product/products">View Products</Link>
        </div>
      ) : (
        <Fragment>
          <div className="cartPage">
            <div className="cartHeader">
              <p>Product</p>
              <p>Quantity</p>
              <p>Subtotal</p>
            </div>

            {cartItems &&
              cartItems.map((item) => (
                <div className="cartContainer" key={item.product}>
                  <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                  <div className="cartInput">
                    <button
                      onClick={() =>
                        decreaseQuantity(item.product, item.Quantity)
                      }
                      
                    >
                      -
                    </button>
                    <input type="number" value={item.Quantity} readOnly />
                    <button
                      onClick={() =>
                        increaseQuantity(
                          item.product,
                          item.Quantity,
                          item.stock
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <p className="cartSubtotal">{`₹${
                    item.price * item.Quantity
                  }`}</p>
                </div>
              ))}

            <div className="cartGrossProfit">
              <div></div>
              <div className="cartGrossProfitBox">
                <p>Gross Total</p>
                <p>{`₹${cartItems.reduce(
                  (acc, item) => acc + item.Quantity * item.price,
                  0
                )}`}</p>
              </div>
              <div></div>
              <div className="checkOutBtn">
                <button onClick={checkoutHandler}>Check Out</button>
              </div>
            </div>
          </div>
        </Fragment>
      )}
            </Fragment>
        )
      }
     
    </Fragment>
  );
};

export default Cart;