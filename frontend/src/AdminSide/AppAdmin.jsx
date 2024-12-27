import { Route,Routes, useNavigate } from 'react-router-dom'
import './AppAdmin.css'
import Header from './Header'
import Edit from './componentsAdmin/Edit'
import HomeAd from './Home'
import SideBar from './SideBar'
import List from './componentsAdmin/List'
import Create from './componentsAdmin/Create'
import { useEffect, useState } from 'react'
import Settings from './Settings'
import { axiosClient } from '../../axios'
import Orders from './componentsAdmin/Orders'
import ViewOrder from './componentsAdmin/ViewOrder'
import Customers from './componentsAdmin/Customers'
function AppAdmin(){
  const navigate = useNavigate()
  const [role,setRole]=useState([])
  const [openSideBarToggle,setOpenSideBarToggle]=useState(false)
  const OpenSideBar=()=>{
    setOpenSideBarToggle(!openSideBarToggle)
  }
  const fetchUserRole=async()=>{
    try{
      const response = await axiosClient.get('/api/user');
      setRole(response.data.role_id)
      if(response.data.role_id!==1){
        navigate('/')
      }
    }
    catch(error){
      console.log(error.data)
      navigate('/')
    }
  }
  useEffect(()=>{
    fetchUserRole()
  },[])

  if( role !==1 ){
    return null
  }
 return(
  <>
    <div className="grid-container body">
    <Header OpenSideBar={OpenSideBar}/>
    {/* <Navbar/> */}
    <SideBar OpenSideBar={OpenSideBar} openSideBarToggle={openSideBarToggle}/>
    
    <Routes>
    <Route path='/products' element={<List/>}/>
    <Route path='/Edit/:id' element={<Edit/>}/>
    <Route path='/Create' element={<Create/>}/>
    <Route path='/settings' element={<Settings/>}/>
    <Route path='/' element={<HomeAd/>}/>
    <Route path='/customers' element={<Customers/>}/>
    <Route path='/orders' element={<Orders/>}/>
     <Route path='/orders/vieworder/:ID' element={<ViewOrder/>}/>
       
   
     </Routes>
   </div>

</>
 )
}
export default AppAdmin