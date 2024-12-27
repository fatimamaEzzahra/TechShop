import { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import AppAdmin from './AdminSide/AppAdmin'
import AppClient from './ClientSide/AppClient'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle';
import List from './AdminSide/componentsAdmin/List'
import HomeAd from './AdminSide/Home'
import Create from './AdminSide/componentsAdmin/Create'
import Edit from './AdminSide/componentsAdmin/Edit'
import { DisplayCategory } from './ClientSide/components/DisplayCategory'
import ClientMain from './ClientSide/ClientMain'
import DisplayBrand from './ClientSide/components/DisplayBrand'
import Login from './Authentication/Login'
import Register from './Authentication/SignUp'
import Settings from './AdminSide/Settings'
import DisplayProduct from './ClientSide/components/DisplayProduct'
import Cart from './ClientSide/components/Cart'
import Checkout from './ClientSide/components/Checkout'
import Orders from './AdminSide/componentsAdmin/Orders'
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Thaking from './ClientSide/components/Thaking'
import ViewOrder from './AdminSide/componentsAdmin/ViewOrder'
import Customers from './AdminSide/componentsAdmin/Customers'
import AllProducts from './ClientSide/AllProducts'
import Contact from './ClientSide/Contact'
import Forgotpassword from './Authentication/Forgotpassword'
import UserOrders from './ClientSide/components/UserOrders'
import ViewUserOrder from './ClientSide/components/ViewUserOrder'
import ResetPassword from './Authentication/ResetPassword'
const initialOptions = {
  "client-id": "AZsLTBnu_6bUxvg7Q7BYknCj-QsN1H2TvOvR0zPls-WTdEdPKd8_CYRnFakhvGbWwn1xVdCNS7gurZF4",
  currency: "USD",
  intent: "capture",
};
function App() {
 

  return (
    <>
  <PayPalScriptProvider options={initialOptions}>
    {/* <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1> */}
  
      <Routes>
      
      <Route path='/admin' element={<AppAdmin/>}>
        <Route path='/admin/products' element={<List/>}/>
        <Route path='/admin/Edit/:id' element={<Edit/>}/>
        <Route path='/admin/Create' element={<Create/>}/>
        <Route path='/admin/dashboard' element={<HomeAd/>}/>
        <Route path='/admin/settings' element={<Settings/>}/>
        <Route path='/admin/customers' element={<Customers/>}/>
        <Route path='/admin/orders' element={<Orders/>}/>
        <Route path='/admin/orders/vieworder/:ID' element={<ViewOrder/>}/>

      </Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/forgot-password' element={<Forgotpassword/>}/>
      <Route path='/reset-password/:token/:email' element={<ResetPassword/>}/>
      <Route path='/' element={<AppClient/>}>
        <Route path='/landingpage' element={<ClientMain/>}/>
        <Route path='/products/category/:category' element={<DisplayProduct/>}/>
        <Route path="/displayproduct/:ID" element={<DisplayProduct />} />
        <Route path='/brands/:brand' element={<DisplayBrand/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/checkout' element={<Checkout/>}/>
        <Route path='/thanking' element={<Thaking/>}/>
        <Route path='/allproducts' element={<AllProducts/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/orders' element={<Orders/>}/>
        <Route path="/orders/view-user-order/:ID" element={<ViewUserOrder />} />

        </Route>
</Routes>

</PayPalScriptProvider>
    </>
  )
}

export default App
