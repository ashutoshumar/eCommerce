import {
  GET_CART_FAIL,
  GET_CART_SUCCESS,
  GET_CART_ITEM,
   ADD_TO_CART,
   REMOVE_CART_ITEM,
   SAVE_SHIPPING_INFO,
  UPDATE_TO_CART,UPDATE_TO_CART_FAIL,UPDATE_TO_CART_SUCCESS,
   ADD_TO_CART_SUCCESS,ADD_TO_CART_FAIL,REMOVE_TO_CART_FAIL,REMOVE_TO_CART_SUCCESS,REMOVE_ALL_CART_ITEM,REMOVE_ALL_CART_ITEM_FAIL,REMOVE_ALL_CART_ITEM_SUCCESS,CLEAR_ERRORS,ADD_CART_RESET,DELETE_ALL_CART_RESET,DELETE_CART_RESET,UPDATE_CART_RESET
  } from "../constants/cartConstants";
  
  export const cartReducer= (
    state = { cartItems: [] },
    action
  ) => {
    switch (action.type) {
      case GET_CART_ITEM:
        return{
          loading:true,
          cartItems:[]
        }
        case GET_CART_SUCCESS:
          return{
            loading:false,
            cartItems:action.payload,
          }
     
          case GET_CART_FAIL:
            return{
              loading: false,
              error: action.payload,
              // cartItems:[]
            }
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const addCartReducer = (state = { cartItem: {} }, action) => {
    switch (action.type) {
      case ADD_TO_CART:
        return {
          ...state,
          loading: true,
        };
        case ADD_TO_CART_SUCCESS:
          console.log(action.payload.success)
          return {
            loading: false,
            success: action.payload.success,
            cartItem: action.payload.cart
            
          };
        case ADD_TO_CART_FAIL:
         return {
          ...state,
          loading: false,
          error: action.payload,
        };
     
     
    
       case ADD_CART_RESET:
         return {
           ...state,
           success: false,
         };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  
  export const changeCartReducer = (state = {}, action) => {
    switch (action.type) {
      case REMOVE_ALL_CART_ITEM:
        case REMOVE_CART_ITEM:
        case UPDATE_TO_CART:
          return {
            ...state,
            loading: true,
          };
          case REMOVE_ALL_CART_ITEM_SUCCESS:
          case REMOVE_TO_CART_SUCCESS:
            return {
              ...state,
              loading: false,
              isDeleted: action.payload.success,
            };
          case UPDATE_TO_CART_SUCCESS:
          return {
            ...state,
            loading: false,
            isUpdated: action.payload.success,
          };
     
  
          case REMOVE_ALL_CART_ITEM_FAIL:
            case REMOVE_TO_CART_FAIL:
            case UPDATE_TO_CART_FAIL:
              return {
                ...state,
                loading: false,
                error: action.payload,
              };
       case DELETE_ALL_CART_RESET:
       case DELETE_CART_RESET:
         return {
           ...state,
           isDeleted: false,
         };
       case UPDATE_CART_RESET:
         return {
           ...state,
         isUpdated: false,
         };
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  export const removeAllCartReducer = (state = {}, action) => {
    switch (action.type) {
      case REMOVE_ALL_CART_ITEM:
          return {
            ...state,
            loading: true,
          };
          case REMOVE_ALL_CART_ITEM_SUCCESS:
            return {
              ...state,
              loading: false,
              isAllDeleted: action.payload.success,
            };
          
  
          case REMOVE_ALL_CART_ITEM_FAIL:
              return {
                ...state,
                loading: false,
                error: action.payload,
              };
       case DELETE_ALL_CART_RESET:
         return {
           ...state,
           isAllDeleted: false,
         };
     
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
      default:
        return state;
    }
  };
  export const shippingReducer = (
    state = {  shippingInfo: {} },
    action
  ) => {
    switch (action.type) {
   
      case SAVE_SHIPPING_INFO:
        return {
          ...state,
          shippingInfo: action.payload,
        };
  
        case CLEAR_ERRORS:
          return {
            ...state,
            error: null,
          };
        default:
          return state;
    }
  };