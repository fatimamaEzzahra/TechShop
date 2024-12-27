import React from 'react'
import samsung from '../../../icons/samsung.png'
import apple from '../../../icons/apple.png'
import huawei from '../../../icons/huawei.png'
import './Brands.css'
import hp from '../../../icons/hp.png'
import oppo from '../../../icons/oppo.png'
import acer from '../../../icons/acer.png'
import lenovo from '../../../icons/lenovo.png'
import dell from '../../../icons/dell.png'
import { Link } from 'react-router-dom'

const Brands = () => {
  return (
    <div>
      <div className="content ">
     <h2 className='title-main'>BROWSE BY BRAND</h2>
     <div className="logos">
      
     <Link to="brands/samsung"><img src={samsung} alt="" className='brand-logo small-logo' /></Link>
     <Link to="brands/apple"><img src={apple} alt="" className='brand-logo '  /></Link>
     <Link to="brands/oppo"><img src={oppo} alt="" className='brand-logo small-logo' /></Link>
     <Link to="brands/hp"><img src={hp} alt="" className='brand-logo' /></Link>
     <Link to="brands/acer"><img src={acer} alt="" className='brand-logo small-logo' /></Link>
     <Link to="brands/huawei"><img src={huawei} alt="" className='brand-logo ' /></Link>
     <Link to="brands/lenovo"><img src={lenovo} alt="" className='brand-logo small-logo' /></Link>
     <Link to="brands/dell"><img src={dell} alt="" className='brand-logo small-logo' /></Link>
     </div>
    </div>
    </div>
  )
}

export default Brands