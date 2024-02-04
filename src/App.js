import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';


import { Navbar, Sidebar, Footer } from './components'
import {Home, Product, SingleProduct, About, Cart, Error, CheckoutPage, Private, LandingPage} from './pages'
 
const router = createBrowserRouter([{
      path:'/',
      element:<LandingPage />,
      children:[
        {
          element:<Home />,
          index:true
        },
        {
          path:'about',
          element:<About />
        },{
          path:'cart',
          element:<Cart />,
        },
        {
          path:'products',
          element:<Product />,
        },
        {
          path:'product/:id',
          element:<SingleProduct />,
        },
        {
          path:'*',
          element:<Error />
        }
      ]
},])

function App() {
  return<RouterProvider router = {router} />
}

export default App
