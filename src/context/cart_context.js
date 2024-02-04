import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

const getLocalStorage = ()=>{
  const cart = localStorage.getItem('cart');
  if(cart){
   return JSON.parse(localStorage.getItem('cart'))
   
  }
  else{
    return []
  }
}

const initialState = {
  // cart:[]  made project using this empty cart then used Local storage for saving the values into the cart
  cart:getLocalStorage(),
  total_items:0,
  total_amount:0,
  shipping_fee:534,
}

const CartContext = React.createContext()

export const CartProvider = ({ children }) => {
  const [state , dispatch] = useReducer(reducer , initialState);

  // add to cart
  const addToCart = (id, color, product, amount,)=>{
    // console.log("this is MAOUNT");
     dispatch({type:ADD_TO_CART, payload:{id, color, product, amount}})
  }
  // removeItem
  const removeItem =(id) =>{
    
    dispatch({type:REMOVE_CART_ITEM , payload:id})
  }
  // toggle Amount

  // ----First way----
  // const toggleAmount = (id, value)=>{
  //  console.log(id,value);
  //  dispatch({type:TOGGLE_CART_ITEM_AMOUNT, payload:{id , value}})
  // }
  // ----------Second way---------
  const toggleAmount = (id, value)=>{
    console.log(id,value);
       dispatch({type:TOGGLE_CART_ITEM_AMOUNT, payload:{id, value}})
  }
  // clear Cart
  const clearCart = ()=>{
dispatch({type:CLEAR_CART})
  }

  useEffect(()=>{
    dispatch({type:COUNT_CART_TOTALS})
   localStorage.setItem('cart' , JSON.stringify(state.cart))
  },[state.cart])
  return (
    <CartContext.Provider value={{...state, addToCart, removeItem, toggleAmount, clearCart}}>
      {children}
      </CartContext.Provider>
  )
}
// make sure use
export const useCartContext = () => {
  return useContext(CartContext)
}
