import React from 'react'
import { Link } from 'react-router-dom'
import { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { axiosClient } from '../../../axios'
import './Checkout.css'
import Swal from 'sweetalert2'
import swal from 'sweetalert';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { PayPalScriptProvider,PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { Reset } from '../Reducers/action'
import { useDispatch } from 'react-redux'


const Checkout = () => {
  const [cart,setCart]=useState([])
  const [total,setTotal]=useState(0)
  const [totalPaypal,setTotalPaypal]=useState(0)
 const [show, setShow] = useState(false);

 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);
 const [checkoutInput,setCheckoutInput]= useState({
  firstname: '',
  lastname: '',
  phone: '',
  fulladdress: '',
  city: '',
  zipcode: ''
 })
 
 const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
 const [currency, setCurrency] = useState(options.currency);
 const [errors,setErrors] = useState([]);
 const [loading,setLoading]=useState(true)
 const [shipping_date,setShipping_date]=useState('')
 const navigate =useNavigate()
 const ReducerDispatch = useDispatch()
//  Paypal code
const onCreateOrder = (data, actions) => {
  return actions.order.create({
      purchase_units: [
          {
              amount: {
                  value: totalPaypal.toFixed(2),
              },
          },
      ],
  });
}
const onCurrencyChange = ({ target: { value } }) => {
  setCurrency(value);
if(value === 'USD') {
    setTotalPaypal(total * 0.0991171); 
    dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: value,
            },
        });
    
} else {
    setTotalPaypal(total * 0.0919305);
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: value,
            },
        });
}

  
}
var order_data = {
  firstname: checkoutInput.firstname,
  lastname: checkoutInput.lastname,
  phone: checkoutInput.phone,
  fulladdress: checkoutInput.fulladdress,
  city: checkoutInput.city,
  zipcode: checkoutInput.zipcode,
  payment_mode : 'Paid by PayPal',
  payment_id : ''
};
const onApproveOrder = (data,actions) => {
return actions.order.capture().then((details) => {
  console.log(details);
  order_data.payment_id = details.id;
  try {
    const response =  axiosClient.post("api/placeOrder", data);
    console.log(response)
    setShipping_date(response.data.shipping_date)
    if (response.data.status === 200) {
      ReducerDispatch(Reset())
      Swal.fire({
        title: "You're payment is done successfully!",
        text: `You will recieve your order on ${shipping_date}!`,
        icon: "success"
      });
      navigate("/thanking");
      setErrors({});

    }
    else if(response.data.status === 422){
      setErrors(response.data.errors)
    }
  } catch (error) {
      console.log(error)
  }
const name = details.payer.name.given_name;
alert(`Transaction completed by ${name}`);
});
}
// End Paypal code


 const handleInput = (e) => {
  e.persist(); 
  setCheckoutInput({...checkoutInput,[e.target.name]:e.target.value})
 }



 const submitOrder = async (e,payment_mode_choose) => {
  e.preventDefault();

  const data = {
    firstname: checkoutInput.firstname,
    lastname: checkoutInput.lastname,
    phone: checkoutInput.phone,
    fulladdress: checkoutInput.fulladdress,
    city: checkoutInput.city,
    zipcode: checkoutInput.zipcode,
    payment_mode : payment_mode_choose,
    payment_id : ''
  };
  switch(payment_mode_choose){
    case 'COD':
      try {
        const response = await axiosClient.post("api/placeOrder", data);
        console.log(response)
        setShipping_date(response.data.shipping_date)
        if (response.data.status === 200) {
          ReducerDispatch(Reset())
          Swal.fire({
            title: "You're order is done successfully!",
            text:`You will recieve your order on ${response.data.shipping_date}!`,
            icon: "success"
          });

          navigate("/thanking");
          setErrors({});
        }
        else if(response.data.status === 422){
          setErrors(response.data.errors)
        }
      } catch (error) {
        
          console.log(error)
        
      }
      break;
      case 'payonline':
        try {
          const response = await axiosClient.post("api/validate-order", data);
          console.log(response)
          if (response.data.status === 200) {
            setErrors({});
            handleShow();
          }
          else if(response.data.status === 422){
            setErrors(response.data.errors)
          }
        } catch (error) {
          
            console.log(error)
          
        }
        break;
      default:
        break;
  }
  
};

  const fetchCart=async()=>{
    try{
    const response = await axiosClient.get('/api/Cart')
    setCart(response.data.cart)
    setCart(response.data.cart)
    console.log('cart',cart)
    console.log(response)
    const T = response.data.cart.reduce((t, c) => t + c.product.prix_pr * c.product_qty, 0)
    setTotal(T)
    setTotalPaypal( T * 0.0991171)
    setLoading(false)
    setQuantity(response.data.cart.product_qty)
    }
    catch(error){
     if(error.request.status ===401){
      navigate('/')
     }
    }
   }
  useEffect(()=>{
    fetchCart();
   },[])
   if(loading){
    <div className="loading-container">
    <div className="spinner-border text-secondary loading" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
   }
  return (
    <div>
      <PayPalScriptProvider options={{ components: 'buttons' }}>
      <div className="py-4">
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Pay Online</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h1 className='total total-modal mt-6 mb-8 flex content-center'>Total : {total} MAD</h1>
        {
          isPending ? <p>LOADING...</p> : (
            <>
              <select value={currency} onChange={onCurrencyChange} className='mb-9'>
                <option value="USD" >💵 USD</option>
                <option value="EUR">💶 Euro</option>
              </select>
              <PayPalButtons 
          style={{ layout: "vertical" }}
          createOrder={(data, actions) => onCreateOrder(data, actions)}
          onApprove={(data, actions) => onApproveOrder(data, actions)}
        />
            </>
          )
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" className='bg-secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
        <div class="modal fade" id="payonlineModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalLabel">Online Payment </h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                ...
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>
       <nav aria-label="breadcrumb" className='m-6'>
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><Link to="/">Home</Link></li>
          <li class="breadcrumb-item"><Link to="/cart">Cart</Link></li>
          <li class="breadcrumb-item active" aria-current="page">Checkout</li>
        </ol>
      </nav>
       <div className="container">
        <div className="row">
         <div className="col-md-7">
           <div className="card">
           <div className="card-header title-card">
             <h4>Basic informations</h4>
            </div>
            
            <div className="card-body ">
              <div className="row ">
                
                 <div className="">
                  <div className="col-md-12 flex full-name">
                <div className="form-group mb-7">
                  <label htmlFor="firstname"> First Name</label>
                    <input type="text" name='firstname' onChange={handleInput} value={checkoutInput.firstname} className={`form-control ${errors.firstname ? "border-danger" : "" } `} />
                    <small className='text-danger'>{errors.firstname}</small>
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="lastname"> Last Name</label>
                    <input type="text" name='lastname' onChange={handleInput} value={checkoutInput.lastname} className={`form-control ${errors.lastname ? "border-danger" : "" } `} />
                    <small className='text-danger'>{errors.lastname}</small>
                  </div>
                 </div>
                 <div className=" flex   ml-6">
                  <div className="col-md-4 ">
                <div className="form-group mb-9">
                  <label htmlFor="phone"> Phone Number</label>
                    <input type="tel" name='phone' onChange={handleInput} value={checkoutInput.phone} className={`form-control ${errors.phone ? "border-danger" : "" } `} />
                    <small className='text-danger'>{errors.phone}</small>
                  </div>
              </div>
            </div>
            <div className="full-address col-md-10 ml-6">
              <div className="form-group mb-4">
                    <label htmlFor="fulladdress">Full Address</label>
                    <textarea className={`form-control ${errors.fulladdress ? "border-danger" : "" } `} onChange={handleInput} value={checkoutInput.fulladdress} name='fulladdress' id="exampleFormControlTextarea1" rows="3"></textarea>
                    <small className='text-danger'>{errors.fulladdress}</small>
                </div>
              </div>
              <div className="flex gap-6 ml-7">

              <div className="col-md-4">
                <div className="form-group mb-3">
                  <label htmlFor="city">City</label>
                  <input type="text" name="city" onChange={handleInput} value={checkoutInput.city} className={`form-control ${errors.city ? "border-danger" : "" } `} />
                  <small className='text-danger'>{errors.city}</small>
                </div>
                </div>
              <div className="col-md-4">
                <div className="form-group mb-3">
                  <label htmlFor="zipcode">Zip Code</label>
                  <input type="text" name="zipcode" onChange={handleInput} value={checkoutInput.zipcode} className={`form-control ${errors.zipcode ? "border-danger" : "" } `} />
                  <small className='text-danger'>{errors.zipcode}</small>
                </div>
              </div>
              </div>
              
              <div className="col-md-12">
                <div className="form-group text-end">
                <button className="btn btn-primary mx-1" onClick={(e)=>{submitOrder(e,'COD')}}>Place Order</button>
                  <button className="btn btn-warning mx-1" onClick={(e)=>{submitOrder(e,'payonline')}}>Pay Online</button>
                </div>
              </div>
            </div>
              </div>
            </div>
           </div>
            
         </div>
         <div className="col-md-5 mt-6">
              <table className='table table-bordered'>
                <thead>
                  <tr>
                  <th width='50%'>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((p)=>{
                    return (
                      <tr key={p.id}>
                        <td>{p.product.nom_pr}</td>
                        <td>{p.product.prix_pr} Dhs</td>
                        <td>{p.product_qty}</td>
                        <td>{p.product_qty*p.product.prix_pr} Dhs</td>
                      </tr>
                    )
                  })}
                  <tr>
                  <th colSpan="2">Grand Total</th>
                  <td colSpan="2">{total} Dhs</td>
                  </tr>
                </tbody>
              </table>
            </div>
        </div>
       </div>
      </div>
      </PayPalScriptProvider>
    </div>
  )
}

export default Checkout