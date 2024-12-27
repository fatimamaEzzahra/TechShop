import React from 'react'

const NavLinks = () => {
 const links = [
  {name:'Produits'},
  {name:'Marques'},
 ]
  return (
    <>
     {
     links.map(l=>(
      <div>
        <div className='px-3 text-left md:cursor-pointer'>
         <h1 className='py-7'>{l.name}</h1>
        </div>
       </div>
      )
      )
     }
    </>
  )
}

export default NavLinks