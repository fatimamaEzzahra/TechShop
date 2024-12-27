import React from 'react'
// import NavBar from '../components/Naving/NavBar'
import ClientMain from './ClientMain'

import { DisplayCategory } from './components/DisplayCategory'
import { Routes,Route } from 'react-router-dom'
import DisplayBrand from './components/DisplayBrand'
import { NavbarWithMegaMenu } from './components/NavBar2'
import DisplayProduct from './components/DisplayProduct'
import Cart from './components/Cart'
import Checkout from './components/Checkout'
import Thaking from './components/Thaking'
import Footer from './components/Footer'
import AllProducts from './AllProducts'
import Contact from './Contact'
import UserOrders from './components/UserOrders'
import ViewOrder from './components/ViewUserOrder'
import ViewUserOrder from './components/ViewUserOrder'
const initialOptions = {
  "client-id": "YOUR-CLIENT-ID-HERE",
  currency: "USD",
  intent: "capture",
};
const AppClient = () => {

  return (
    <div>
    {/* <StickyNavbar/> */}
    <NavbarWithMegaMenu isLoggedIn={'isLoggedIn'} />
    {/* <MainNav/> */}
    <div>
    <Routes>
        <Route path='/' element={<ClientMain/>}/>
        <Route path='/products/category/:category' element={<DisplayCategory/>}/>
        <Route path='/brands/:brand' element={<DisplayBrand/>}/>
        <Route path="/displayproduct/:ID" element={<DisplayProduct />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/thanking" element={<Thaking />} />
        <Route path="/allproducts" element={<AllProducts />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/orders" element={<UserOrders />} />
        <Route path="/orders/view-user-order/:ID" element={<ViewUserOrder/>} />
        
      </Routes>
      </div>
      
    <Footer/>
    </div>
  )
}

export default AppClient