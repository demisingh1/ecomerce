import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if(LOAD_PRODUCTS === action.type){
    let maxPrice = action.payload.map((product)=> product.price)
    maxPrice = Math.max(...maxPrice)
    return {...state , all_products:[...action.payload] , filtered_products:[...action.payload],
      filter:{...state.filter, max_price:maxPrice, price:maxPrice}
    }
  }
  if(SET_GRIDVIEW === action.type){
    return{...state, grid_view:true}
  }
  if(SET_LISTVIEW === action.type){
    return{...state, grid_view:false}
  }
  if(UPDATE_SORT === action.type){
    return{...state, sort:action.payload}
  }
  if(SORT_PRODUCTS === action.type){
    const {sort , filtered_products} = state;
    let tempProduct = [...filtered_products]
    if(sort === 'price-lowest'){
      // console.log('price-lowest')
      tempProduct = tempProduct.sort((a,b)=> a.price - b.price);
    }
    if(sort === 'price-Highest'){
      // console.log('price-Highest')
      tempProduct = tempProduct.sort((a,b)=> b.price - a.price);
    }
    if(sort === 'name-a'){
      console.log('name-a')
      tempProduct = tempProduct.sort((a,b)=> a.name.localeCompare(b.name));
      // console.log(tempProduct)
    }
    if(sort === 'name-z'){
      // console.log('name-z')
      tempProduct = tempProduct.sort((a,b)=> b.name.localeCompare(a.name));
    }
    return {...state, filtered_products:tempProduct}
  }
  if(UPDATE_FILTERS === action.type){
    const {name, value} = action.payload;
    return{...state, filter:{...state.filter , [name]:value}}
  }
  if(FILTER_PRODUCTS === action.type){
    // console.log("filtering products")
    const{all_products} = state;
    const{text, category, company, color, price, shipping} = state.filter;

    let tempProduct = [...all_products]
    // filtering
    // text
    if(text){
      console.log(tempProduct)
      tempProduct = tempProduct.filter((product)=> product.name.toLowerCase().startsWith(text.toLowerCase()))
    }
    // category
    if(category !== 'all'){
      tempProduct = tempProduct.filter((product) => product.category === category);
    }
    // company
    if(company !== 'all'){
      tempProduct = tempProduct.filter((product)=> product.company === company)
    }
    // color
    if(color !== 'all'){
      tempProduct = tempProduct.filter((product)=>{
        return product.colors.find((c)=> c === color)
      })
    }
    // price
    tempProduct = tempProduct.filter((product)=> product.price <= price)
    // shipping
    if(shipping){
      tempProduct = tempProduct.filter((product)=>{
        return product.shipping === true
      })
    }
    return{...state, filtered_products:tempProduct}
  }
  if(CLEAR_FILTERS === action.type){
    return {...state, filter:{ ...state.filter ,
      text:'',
      company:'all',
      category:'all',
      color:'all',
      price:state.filter.max_price,
      shipping:false,
    }}
  }
  return state
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer
