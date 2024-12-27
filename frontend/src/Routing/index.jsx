import {createBrowserRouter} from 'react-router-dom'
import AppClient from '../ClientSide/AppClient'
import ClientMain from '../ClientSide/ClientMain'
import { DisplayCategory } from '../ClientSide/components/DisplayCategory'
import AppAdmin from '../AdminSide/AppAdmin'
import List from '../AdminSide/componentsAdmin/List'
import Edit from '../AdminSide/componentsAdmin/Edit'
import Create from '../AdminSide/componentsAdmin/Create'
import HomeAd from '../AdminSide/Home'
export const router = createBrowserRouter(
 [
  {
   element:<AppClient/>,
   children:[
    {
     path:'/',
     element:<ClientMain/>
    },{
     path:'/products/:category',
     element:<DisplayCategory/>
    }
   ]
  },{
   element:<AppAdmin/>,
   children:[
    {
     path:'/admin/products',
     element:<List/>
    },{
     path:'/admin/Edit/:id',
     element:<Edit/>
    },{
     path:'admin/Created',
     element:<Create/>
    },{
     path:'/admin/dashboard',
     element:<HomeAd/>
    }
   ]
   
  }
  
 ]
)