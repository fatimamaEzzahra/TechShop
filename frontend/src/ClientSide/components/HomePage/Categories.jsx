import React from 'react'
import { Link } from 'react-router-dom'
import headphone from '../../../icons/headphone2.png'
import laptop from '../../../icons/laptop.png'
import tablet from '../../../icons/tablet.png'
import smartphone from '../../../icons/smartphone2.png'
import desktop from '../../../icons/desktop.png'
import smartwatch from '../../../icons/smartwatch.png'
import './Categories.css'
const Categories = () => {
  return (
    <div className='content'>
     <h2 className='title-main'>BROWSE BY CATEGORY </h2>
     <div className="categories">
      <div className="category-first-row">
      <div className="category-item large-item" id='first'>
        <div className="para">
          <p>Trend</p>
          <h4>Devices</h4>
          <h2>LAPTOP</h2>
          <Link to='products/category/pc'><button>Browse</button></Link>
          </div>
          <img src={laptop} alt="" className='laptop-image'  />
      </div>
      <div className="category-item" id='second'>
    <div className="para">
      <p>New</p>
      <h4>Smart</h4>
      <h2>PHONES</h2>
          <Link to='products/category/telephone'><button>Browse</button></Link>
    </div>
    <img src={smartphone} alt="" className='smartphone-image'/>
      </div>
      <div className="category-item" id='third'>
      <div className="para">
          <p>Enjoy</p>
          <h4>With</h4>
          <h2>HEADPHONES</h2>
          <Link to='products/category/ecouteurs'><button>Browse</button></Link>
        </div>
        <img src={headphone} alt="" className='headphone-image'/>
      </div>
      </div>
      <div className="category-second-row">
      <div className="category-item large-item" id='fourth'>
        <div className="para">
          <p>Best</p>
          <h4>Interactive</h4>
          <h2>TABLETS</h2>
          <Link to='products/category/tablette'><button>Browse</button></Link>
          </div>
          <img src={tablet} alt="" className='tablet-image'  />
      </div>
      <div className="category-item" id='fifth'>
    <div className="para">
      <p>Discover</p>
      <h4>SMARTt</h4>
      <h2>WATCHES</h2>
      <Link to='products/category/smartwatch'><button>Browse</button></Link>
    </div>
    <img src={smartwatch} alt="" className='smartwatch-image'/>
      </div>
      <div className="category-item" id='sixth'>
      <div className="para">
          <p>Latest</p>
          <h4>Professional</h4>
          <h2>DESKTOPS</h2>
          <Link to='products/category/ordinateur'><button>Browse</button></Link>
        </div>
        <img src={desktop} alt="" className='desktop-image'/>
      </div>
      
      </div>
     </div>
    </div>
  )
}

export default Categories