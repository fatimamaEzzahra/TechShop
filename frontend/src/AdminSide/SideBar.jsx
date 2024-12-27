import React from 'react'
import {BsCart3,BsGrid1X2Fill,BsFillArchiveFill,BsFillGrid3X3GapFill,BsPeopleFill,
BsListCheck,BsMenuButtonWideFill,BsFillGearFill} from 'react-icons/bs'
import { FaLaptop,FaTruck,FaTimes ,FaChartBar,FaClipboardList, FaAssistiveListeningSystems, FaSave, FaCog, FaTruckLoading, FaTruckMonster, FaTruckMoving, FaTruckPickup} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';

import logo from '../icons/TECH_admin-removebg-preview.png'
const SideBar = ({openSideBarToggle,OpenSideBar}) => {
  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };
  return (
    <aside id='sidebar' className={openSideBarToggle ? 'sidebar-responsive':""}>
      <div className="sidebar-title">
        <div className="sidebar-brand">
           <img src={logo}  style={{height:'65px',marginLeft:'10px'}}/>
        </div>
        <span className='icon close_icon' onClick={OpenSideBar}><FaTimes/></span>
      </div>
      <hr  />
      <ul className='sidebar-list'>
      <NavLink  to='/admin'  activeClassName={isActive('/admin')} exact>
      <li className={`sidebar-list-item ${isActive('/admin')}`}>
          <FaChartBar className='icon-item' />  Dashboard  
        </li>
        </NavLink >
        <NavLink  to='/admin/products'  activeClassName={isActive('/admin/products')} exact>
      <li className={`sidebar-list-item ${isActive('/admin/products')}`}>
        
          <FaLaptop className='icon-item'/> Produits 
        </li>
        </NavLink > 
        {/* <NavLink  to='/admin/categories'>
      <li className='sidebar-list-item'>
        
          <BsFillGrid3X3GapFill className='icon-item'/> Catégories  
        </li>
        </NavLink > */}
        <NavLink    to='/admin/orders' activeClassName={isActive('/admin/orders')} exact>
        <li className={`sidebar-list-item ${isActive('/admin/orders')}`}>
          
          <FaClipboardList className='icon-item'/> Commandes  
        </li>
        </NavLink >
        <NavLink    to='/admin/customers' activeClassName={isActive('/admin/customers')} exact>
        <li className={`sidebar-list-item ${isActive('/admin/customers')}`}>
        
          <BsPeopleFill className='icon-item'/> Clients 
        </li>
        </NavLink > 
        {/* <NavLink  activeclassname='active'  to='/shipping'>
        <li className='sidebar-list-item'>
          
          <FaTruckPickup className='icon-item'/> Livraison
        </li>
        </NavLink >  */}
        {/* <NavLink   to='/admin/settings'   activeClassName={isActive('/admin/settings')} exact> 
        <li className={`sidebar-list-item ${isActive('/admin/settings')}`}>
          
          <FaCog className='icon-item'/> Paramètres 
        </li>
        </NavLink >  */}
      </ul>
    </aside>
  )
}

export default SideBar