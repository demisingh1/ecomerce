import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  const {filtered_products:products, grid_view} = useFilterContext()
if(products.length < 1){
  return(
  <h5 style = {{textTransform:'none'}}>
    sorry No product found ....
  </h5>
  )
}
  if(grid_view === false){
    
    return <ListView products={products} > List view</ListView>
  }
  
  return <GridView products={products}>product list</GridView>
}

export default ProductList
