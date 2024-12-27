import React, { useState } from 'react'
import headPhone from '../../../icons/headphhone1-removebg-preview.png'
import './HeroSwiper.css'
import { useTranslation } from "react-i18next";

const HeroSwiper = () => {
  
  const {t} = useTranslation();

 


  return (
     
      <div className="hero-line">
        
     <img src={headPhone} alt="" className="hero-image"/>
     <div className="hero-para" >
      <p>{t("Beats Solo")}</p>
      <h4>{t("Wireless")}</h4>
      <h2>{t("HEADPHONE")}</h2>
     <button>{t("Shop now")}</button>
      </div>
      </div>
     
    
  )
}

export default HeroSwiper