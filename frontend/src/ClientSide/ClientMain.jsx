import React from 'react'
import { Route } from 'react-router-dom'

import HeroSwiper from './components/HomePage/HeroSwiper'
import Categories from './components/HomePage/Categories'
import Brands from './components/HomePage/Brands'
import IntroBrand from './components/HomePage/IntroBrand'
import Bond1 from './components/HomePage/Bond1'
import BestSellers from './components/HomePage/BestSellers'
const ClientMain = () => {
  return (
    <div>

    <HeroSwiper/>
    <Categories/>
    <Brands/>
    <BestSellers/>
    <IntroBrand/>
    <Bond1/>
    </div>
  )
}

export default ClientMain













