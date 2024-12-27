import React, { useEffect, useState } from "react";
import { axiosClient } from "../../../axios";
import logo from '../../icons/TECH-removebg-preview.png'
import './NavBar2.css'
import { Fetch } from "../Reducers/action";
import WatchIcon from '@mui/icons-material/Watch';
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  GlobeAmericasIcon,
  NewspaperIcon,
  PhoneIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  SunIcon,
  TagIcon,
  UserGroupIcon,
  
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { FaPersonBooth, FaShoppingCart , FaLaptop,FaDesktop, FaHeadphones, FaTabletAlt, FaPhoneSlash, FaOutdent, FaCog, FaSignOutAlt, FaSearch, FaShoppingBasket, FaShoppingBag, FaJediOrder, FaCaretUp, FaCaretDown, FaFirstOrder, FaBox} from "react-icons/fa";
import { BsBag, BsBox, BsBox2Fill, BsCart, BsCart2, BsCart3, BsCart4, BsCartCheckFill, BsCartDash, BsCartFill, BsPersonCircle, BsPhone, BsSearch, BsWatch } from "react-icons/bs";
import SearchBar from "./SearchBar";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Increment } from "../Reducers/action";
import { Shop, Shop2Rounded } from "@mui/icons-material";
import { Box, Card, CardActionArea } from "@mui/material";
import './NavBar2.css'
const navListMenuItems = [
  {
    title: "Laptops",
    description: "Find the perfect solution for your needs.",
    icon: <FaLaptop/>,
    pathLink:'/products/category/pc'
  },{
    title: "Phones",
    description: "Meet and learn about our dedication",
    icon: <BsPhone/>,
    pathLink:'/products/category/telephone'
  },
  
  {
    title: "Tablets",
    description: "Find the perfect solution for your needs.",
    icon: <FaTabletAlt/>,
    pathLink:'/products/category/tablette'
  },
  {
    title: "Desktops",
    description: "Reach out to us for assistance or inquiries",
    icon: <FaDesktop/>,
    pathLink:'/products/category/ordinateur'
  },
  {
    title: "Headphones",
    description: "Learn how we can help you achieve your goals.",
    icon: <FaHeadphones/>,
    pathLink:'/products/category/ecouteurs'
  },
  {
    title: "Smartwatches",
    description: "Find the perfect solution for your needs.",
    icon: <WatchIcon style={{fontSize:'16px'}}/>
    ,
    pathLink:'/products/category/smartwatch'
  },
];

function DropDownProfile({ isVisible, userData  }) {
  const navigate = useNavigate();

  const logout = async () => {
    try {
      
      const response = await axiosClient.post('/api/logout');
      window.location.reload()
      navigate('/')
    } catch (error) {
      console.log('error', error);
    }
  }

  return (
    <div className={`flex flex-col dropDownProfile ${isVisible ? 'visible' : 'hidden'}`}>
      <ul className="flex flex-col gap-2">
        <li>{userData.name}</li>
        <hr style={{ width: '100%', color: 'black' }} />
        <li> <Link to='/orders'> <BsBox2Fill/> My Orders</Link>  </li> 
        <li onClick={logout}> <FaSignOutAlt/> Log out</li>
        {/* <li><FaCog/> Settings</li> */}
      </ul>
    </div>
  );
}

function NavListMenu() {
 
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(
    ({ icon, title, description , pathLink }, key) => (
      <Link to={pathLink} key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
        
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {/* {" "}
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 text-gray-900 w-6",
            })} */}
            {icon}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              {title}
            </Typography>
           
          </div>
        </MenuItem>
      </Link>
    ),
  );
 
  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
                Categories
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}
function AccountListMenu() {
  const navigate = useNavigate();
  const logout = async () => {

    try {
      const response = await axiosClient.post('/api/logout');
      setUser(response.data);
      navigate('/')
      window.location.reload()
      
    } catch (error) {
      console.log('error', error);
    }
  }
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

 
  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="medium" className="font-medium">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
                <BsPersonCircle style={{fontSize:'25px'}}/> Account 
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">

            <a href="#" >
        <MenuItem className="flex items-center gap-3 rounded-lg">
        <li to='' className="flex items-center gap-3" onClick={logout}>
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            
            <FaSignOutAlt/>
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              Log Out
            </Typography>
          </div>
          </li>
        </MenuItem>
      </a>
      <a href="#">
        <MenuItem className="flex items-center gap-3 rounded-lg">
        {/* <Link to="" className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            
            <FaCog/>
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              Settings
            </Typography>
          </div>
          </Link> */}
        </MenuItem>
      </a>
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
        <li className="flex items-center gap-3">
          
        <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
        <FaBox/>
        </div>
        <div>
          
        <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold">

          My Orders
        </Typography>
        </div>
         </li> 
         </MenuItem>

        <a href="#" >
        <MenuItem className="flex items-center gap-3 rounded-lg">
        <li className="flex items-center gap-3" onClick={logout}>
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            
            <FaSignOutAlt/>
          </div>
          <div>
            
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
              
            >
              Log Out
            </Typography>
          </div>
          </li>
        </MenuItem>
      </a>
      {/* <a href="#">
        <MenuItem className="flex items-center gap-3 rounded-lg">
        <Link to='' className="flex items-center gap-3">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            
            <FaCog/>
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              Settings
            </Typography>
          </div>
          </Link>
        </MenuItem>
      </a> */}
        </Collapse>
      </div>
    </React.Fragment>
  );
}
function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0  lg:mb-0   lg:flex-row lg:p-1 " style={{display:'flex',marginBottom:'14px'}}>
      <Link to="/allproducts">
      <Typography
    
        variant="small"
        color="blue-gray"
        className="font-small"
      >
      <ListItem className="flex items-center gap-2 py-2 pr-4" > All Products </ListItem>
      </Typography>
      </Link>
      <NavListMenu />
      <Link to="/contact">
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-medium"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
         Contact 
        </ListItem>
      </Typography>
      </Link>
    </List>
  );
}
function Account({isLoggedIn, user , loading}){
  if (loading){
    return <div>

    </div>
  }
 
  const dispatch =useDispatch()
  const cart_total = useSelector((state) => state.cart_total);
  const userData=user
  const [visibility,setVisibility]=useState(false);
  const handleVisibility=()=>{
    setVisibility(!visibility);
  }
  const getAmount=async()=>{
    try{
      const response = await axiosClient.get('/api/productAmount');
      dispatch(Fetch(response.data.amount))
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getAmount();
  })
  return (<>
            {isLoggedIn ?
              (
                <div className="hidden gap-4 lg:flex items-center">
                 <div className="account "> 
                 <BsPersonCircle  className="text-blue-gray-900 text-2xl flex pointer" onClick={handleVisibility} />
                 <DropDownProfile isVisible={visibility} userData={userData}/>
                 </div>
                 <div className="acc-cart">
                  
                 <Link to="/cart">
                
                 <span style={{
                            backgroundColor:'red',
                            height:'13px',
                            width:'13px',
                            borderRadius:'10px',
                            display:'flex',
                            justifyContent:'center',alignItems:'center',
                            color:"white",
                            background:'gray',
                            fontSize:'12px',
                            position:'relative',
                            left:'17px',
                            top:'15px'
                            }}>
          {cart_total}
          </span> 
                <BsBag id="bs-bag"/>
              </Link>
          </div>
                </div>):(
          <div className="hidden gap-2 lg:flex md:gap-5">
            <Link to='/login'>
          <Button variant="text" size="sm" className="account-btn" color="blue-gray">
            Log In
          </Button>
          </Link>
          <Link to="/register">
          <Button variant="gradient" className="account-btn" size="sm">
          Sign Up
          </Button>
          </Link>
        </div>
        )

        
        }
        </>
  )
}
export function NavbarWithMegaMenu() {
  const [connection,setConnection]=useState(false)
  const [loading,setLoading]=useState(true)
  const [user,setUser]=useState()
  const [cartTotal,setCartTotal]=useState(0)
  const dispatch =useDispatch()
  const cart_total = useSelector((state)=>state.cart_total)
  const getAmount=async()=>{
    try{
      const response = await axiosClient.get('/api/productAmount');
      setCartTotal(response.data.amount)
      dispatch(Fetch(response.data.amount))
    }catch(error){
      console.log(error)
    }
  }
  useEffect(()=>{
    getAmount();
  })
  const userData = async()=>{
    try{
    const response = await axiosClient.get('/api/user')
    setUser(response.data)
    setConnection(true)
    setLoading(false)
   }
    catch(error){
     console.log('error',error)
     setConnection(false)
     setLoading(false)
    }
   }
   const [visibility,setVisibility]=useState(false);
   const handleVisibility=()=>{
     setVisibility(!visibility);
   }
   
   React.useEffect(()=>{
    userData();
   },[])
  const [openNav, setOpenNav] = React.useState(false);
 
  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);
 
  return (
    <Navbar className="mx-auto max-w-screen px-4 py-2  glassbar" style={{position:'sticky', top: 0,zIndex: 1000,borderRadius:0}}>
      <div className="flex items-center justify-between navv  text-blue-gray-900"  >
        <Typography
          as="a"
          href="/"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2 "
        >
          <img src={logo} style={{height:'50px'}}  alt="" />
        </Typography>
        
        <div className="hidden lg:block">
          <NavList />
        </div>
        <div className="flex right-side-nav">
        
          <SearchBar/>
          <Account isLoggedIn={connection} user={user} loading={loading}/>
          </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList />
        <hr style={{width:'100%',height:'10px',color:'black',margin:'20px'}}/>
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
        {connection ? (
          <div className=" gap-3  items-center acc-cart" >
          <AccountListMenu/>
          <Link to="/cart">
          <FaShoppingCart style={{color:'black'}}className="text-2xl mr-4"/>
         <span style={{backgroundColor:'red',
         height:'13px',
         width:'13px',
         borderRadius:'10px',
         display:'flex',
         justifyContent:'center',alignItems:'center',
         color:"white",
         background:'gray',
         fontSize:'12px',
         position:'relative',
         right:'20px',
         bottom:'4px'
         }}>
          {cart_total}
          </span>
          Cart 
          </Link>
          </div>
          
        ):(
          <div className="flex items-center gap-5 " style={{width:' 85%',marginLeft:'30px'}}>
          <Link to='/login'>
          <Button variant="outlined" size="sm" color="blue-gray" fullWidth>
          Log In
          </Button>
          </Link>
          <Button variant="gradient" size="sm" className="w-100" fullWidth>
          <Link to='register'>Sign Up</Link>
          </Button>
          </div>
        )}
        
        </div>
      </Collapse>
    </Navbar>
  );
}