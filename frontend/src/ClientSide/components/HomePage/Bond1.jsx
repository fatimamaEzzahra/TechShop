import React, { useState, useEffect } from 'react';
import headphone from '../../../icons/headphone3.png';
import './Bond1.css';

const Bond1 = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const boundingBox = document.querySelector('.bond1').getBoundingClientRect();
      const isInViewport = boundingBox.top < window.innerHeight && boundingBox.bottom >= 0;
      setIsVisible(isInViewport);
    };

    window.addEventListener('scroll', handleScroll);
    // Clean up the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`bond1 ${isVisible ? 'visible' : ''}`}>
      <div className="bond1-side bond1-left">
        
        <h4>ENJOY YOUR BEATS</h4>
      </div>
      <img src={headphone} alt="" className='headphone-bond' />
      <div className="bond1-side bond1-right">
        <p>Beats Solo Air</p>
        <h6 className='h4'>Summer Sale</h6>
        <p>High Quality Earphones for this summer.</p>
        <button>Shop</button>
      </div>
    </div>
  );
}

export default Bond1;
