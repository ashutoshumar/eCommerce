import {
   GET_CART_FAIL,
   GET_CART_SUCCESS,
   GET_CART_ITEM,
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
   UPDATE_TO_CART,UPDATE_TO_CART_FAIL,UPDATE_TO_CART_SUCCESS,
    ADD_TO_CART_SUCCESS,ADD_TO_CART_FAIL,REMOVE_TO_CART_FAIL,REMOVE_TO_CART_SUCCESS,REMOVE_ALL_CART_ITEM,REMOVE_ALL_CART_ITEM_FAIL,REMOVE_ALL_CART_ITEM_SUCCESS,CLEAR_ERRORS 
  } from "../constants/cartConstants";
  import  axios from "axios"
  
  
  // Add to Cart
  export const addItemsToCart = (id, quantity) => async (dispatch) => {try {

      const { data } = await axios.get(`/api/v1/product/${id}`)
    
       
  
    
     const cart = {
    
        products:{
          product:id,
          name: data.product.name,
          price: data.product.price,
          image: data.product.images[0].url,
          Stock: data.product.Stock,
          Quantity:quantity,
        }
      
      }
      
      dispatch({type: ADD_TO_CART });
  
      const config = { headers: { "Content-Type": "application/json" } };
  
      await axios.post(
        `/api/v1/cart/new`,
          cart,
        config
      ).then((res)=>{
        console.log(res.data)
        dispatch({ type: ADD_TO_CART_SUCCESS, payload: res.data });
      });
  
      
    } catch (error) {
      dispatch({ type: ADD_TO_CART_FAIL, payload: error });
    }
  };
  
  export const updateItemsToCart = (id, quantity) => async (dispatch) => {try {

    
   console.log(quantity)
   const cart = {
      
      productId:id,
        quantity:quantity,
      
    
    }
    dispatch({type: UPDATE_TO_CART });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/cart/update`,
        cart,
      config
    );

    dispatch({ type: UPDATE_TO_CART_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: UPDATE_TO_CART_FAIL, payload: error.response.data.message });
  }
};
  // REMOVE FROM CART
  export const removeItemsFromCart = (id) => async (dispatch) => {

    try{

      dispatch({
        type: REMOVE_CART_ITEM,
        
      });
      console.log(id)
      const data =  {
        product:id}

        const config = { headers: { "Content-Type": "application/json" } };
  
         await axios.put(
          `/api/v1/cart/remove`,
            data,
          config
        ).then((res)=>{
          console.log(res)
          dispatch({ type: REMOVE_TO_CART_SUCCESS, payload: res.data });
        });

   
       
      } catch (error) {
        dispatch({ type: REMOVE_TO_CART_FAIL, payload: error.response.data.message });
      }
    
  
    
  };

   //GET CART ITEM
   export const getItemsFromCart = () => async (dispatch) => {

    try{

      dispatch({
        type: GET_CART_ITEM,
        
      });
      await axios.get(
          `/api/v1/cart/item`).then((res)=>{
            console.log(res)
            if(res.data.success){
            if(res.data.cart)
           {console.log("hii")
            dispatch({ type: GET_CART_SUCCESS, payload: res.data.cart.products });}
            else
           {
            console.log("bii")
             dispatch({ type: GET_CART_SUCCESS, payload: [] });}}
          })

      
       
      } catch (error) {
       
        dispatch({ type: GET_CART_FAIL, payload: error });
      }
    
  
    
  };
  //REMOVE ALL CART ITEM
  export const removeAllCart = () => async (dispatch) => { try { 
    dispatch({
      type: REMOVE_ALL_CART_ITEM,
     
    });
   

    

    await axios.delete(
      `/api/v1/cart/delete`
    ).then((res)=>{
      console.log(res)
      dispatch({ type: REMOVE_ALL_CART_ITEM_SUCCESS, payload: res.data });
    });;


    
  } catch (error) {
    dispatch({ type: REMOVE_ALL_CART_ITEM_FAIL, payload: error.response.data.message });
  }
  
      
  };
  // SAVE SHIPPING INFO
  export const saveShippingInfo = (data) => async (dispatch, getState) => {
    dispatch({
      type: SAVE_SHIPPING_INFO,
      payload: data,
    });
  
    localStorage.setItem("shippingInfo", JSON.stringify(data));
  };

  // Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};