import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if(action.type === ADD_TO_CART){
    const{id, color, amount, product} = action.payload;
    const tempItem = state.cart.find((i)=> i.id === id + color)

    if(tempItem){
   const Newcart = state.cart.map((cartItem)=>{
           if(cartItem.id === id + color){
              let newAmount = cartItem.amount + amount
              if(amount > cartItem.max){
                 newAmount = cartItem.max;
                 return{...cartItem, amount:newAmount}
              }
           }
           else{
            return cartItem
           }
   })
   return{...state,cart: Newcart}    
    }
    
    else{
  const newItem = {
        id: id + color,
        name:product.name,
        color,
        amount,
        image:product.images[0].url,
        price:product.price,
        max:product.stock,
      }
      return{...state, cart:[...state.cart, newItem]}
    }
  
  }
  // remove cart item
  if(action.type === REMOVE_CART_ITEM){
    
    const newCart = state.cart.filter((item)=> item.id != action.payload)
    
    return {...state, cart:newCart}
  }
  // Toggle amount  
  // ----------- First way---------
  // if(action.type === TOGGLE_CART_ITEM_AMOUNT){
  //   const{id , value} = action.payload
    
  //   const tempCart = state.cart.map((item) =>{
  //     if(item.id === id){

  //         let updateAmount = value
         
  //         return {...item , amount:updateAmount}
  //     }
  //     else{
  //       return item
  //     }
  //   })
  //   return{...state, cart:tempCart}
  // }
// --------------SECOND WAY---------------
if(action.type === TOGGLE_CART_ITEM_AMOUNT){
  const{id, value} = action.payload

  const tempCart = state.cart.map((item)=>{
    if(item.id === id){
      if(value === 'inc'){
     let newAmount = item.amount +1
     if(newAmount > item.max){
      newAmount = item.max
     }     
     return{...item, amount:newAmount}
      }
      if(value === 'dec'){
      let newAmount = item.amount -1
      if(newAmount < 1){
        newAmount = 1
      }
      return{...item , amount:newAmount}
      }
    }
    else {
      return item
    }
  })

  return{...state, cart:tempCart}
}
  // Clear cart values
  if(action.type === CLEAR_CART){
    return{...state, cart:[]}
  }
  // CART COUNT TOTAL VALUES
  if(action.type === COUNT_CART_TOTALS){
     
    // {first and main way }

    // const {total_items,total_amount} = state.cart.reduce((total, item)=>{
    //   const {amount, price} = item;
     
    //   total.total_items += amount
    //   total.total_amount += price*amount

    //   return total
    // },{total_items:0, total_amount:0})

    // {Another Ways}
    const total_amount = state.cart.reduce((total,item)=>{
      const {amount , price} = item;
       return total + amount*price;
    },0)
    console.log(total_amount);
    const total_items = state.cart.reduce((total , item)=>{
      const {amount} = item
      return total + amount
    },0)
    
    return{...state, total_items ,total_amount }
  }
  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default cart_reducer
