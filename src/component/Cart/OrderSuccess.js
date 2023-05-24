import React, { useEffect} from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./orderSuccess.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { removeAllCart,clearErrors } from "../../actions/cartAction";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { DELETE_ALL_CART_RESET } from "../../constants/cartConstants";
const OrderSuccess = () => {
  const dispatch = useDispatch();
  const {  error,isAllDeleted} = useSelector((state) => state.removeCart);

 
  const alert = useAlert();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if(isAllDeleted)
    {
      
  
    dispatch({ type: DELETE_ALL_CART_RESET });
    }

    dispatch(removeAllCart());
  }, [dispatch,alert,error,isAllDeleted]);

  return (
    <div className="orderSuccess">
      <CheckCircleIcon />
       
      <Typography>Your Order has been Placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
  );
};

export default OrderSuccess;