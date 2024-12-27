import React, { useEffect, useState } from 'react'
import {BsCart3,BsGrid1X2Fill,BsFillArchiveFill,BsFillGrid3X3GapFill,BsPeopleFill,
  BsListCheck,BsMenuButtonWideFill,BsFillGearFill} from 'react-icons/bs'
  import { FaShoppingCart } from 'react-icons/fa';
  import { FaShoppingBasket } from 'react-icons/fa';
  import Calendar from 'react-calendar';
  import { Bar } from 'react-chartjs-2';
  import 'react-calendar/dist/Calendar.css';
  import Orders from './componentsAdmin/Orders'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import { axiosClient } from '../../axios';
import { Link } from 'react-router-dom';
import PieChart from './componentsAdmin/PieChart';
import { CalendarMonth, CalendarMonthOutlined } from '@mui/icons-material';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement 
);
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const HomeAd = () => {
  const [categories,setCategories]=useState([])
  const [totalByCategory,setTotalByCategory]=useState([])
  const [produits,setProduits]=useState(0)
  const [user,setUser]=useState({})
  const [clientsCount,setClientsCount]=useState(0)
  const [ordersCount,setordersCount]=useState(0)
  const [dates,setDates] = useState([])
  const [salesCounts,setSalesCounts]=useState([])
  const [salesAmount,setSalesAmounts]=useState()
  const [totalIncome,setTotalIncome]=useState()
  useEffect(()=>{
    fetchingTotal();
  },[])

  const fetchingTotal=async()=> {
    try{
      const Statistics = await axiosClient.get('api/sales-statistic');
      console.log('sellesStatics',Statistics)
      setordersCount(Statistics.data.ordersAmount)
      setProduits(Statistics.data.productsAmount)
      setUser(Statistics.data.user)
      setClientsCount(Statistics.data.clientsAmount)
      setDates(Statistics.data.salesData.dates)
      setSalesCounts(Statistics.data.salesData.salesCounts)
      setSalesAmounts(Statistics.data.salesAmount)
      setCategories(Statistics.data.ordersByCategory.map(item => item.category_name))
      setTotalByCategory(Statistics.data.ordersByCategory.map(item => item.total_qty))
      setTotalIncome(Statistics.data.totalIncome)
    }
    catch(error){
      alert('error fatching count',error)
      console.log(error)
    }
  }
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: ' Statistiques de ventes',
      },
    },
  };
  const options2 = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' ,
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };
  
  const labels =dates;
  const data2 = {
    labels ,
    datasets: [
      {
        label: 'Ventes ',
        data: [20],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },{
        label: 'Ventes ',
        data: [200],
        backgroundColor: 'rgba(255, 199, 122, 0.9)',
      },{
        label: 'Ventes ',
        data: [400],
        backgroundColor: 'rgba(255, 139, 102, 0.9)',
      },
      {
        label: 'Dataset 2',
        data: [615],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  const data = {
    labels : dates,
    datasets: [
      {
        fill: true,
        label: 'Ventes',
        data:salesCounts,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  
  return (
  <>
      <main className="main-container">
      {/* <h1 className='h4 mb-7 welcoming'>Bonjours {user.name} 👋 </h1> */}
    <div className='main-title mt-7'>
    <h3 className=' flex justify-center'>Dashboard</h3>
    </div>
    <div className="income flex items-center">
    <h4>{totalIncome} Dhs</h4>
    <p  className='  '> de Revenues  </p> 

    </div>
    <div className="main-cards">
    
    <div className="card-home">
      <div className="card-inner">
        <h3>PRODUITS</h3>
        <BsFillArchiveFill className='card_icon'/>
      </div>
      <h1>{produits}{/*products vente*/ }</h1>
    </div>
    <div className="card-home">
      <div className="card-inner">
        <h3>VENTES</h3>
        <FaShoppingCart className='card_icon'/>
      </div>
      <h1>{salesAmount}{/*products vente*/ }</h1>
    </div>
    <div className="card-home">
      <div className="card-inner">
        <h3>CLIENTS</h3>
        <BsPeopleFill className='card_icon'/>
      </div>
      <h1>{clientsCount}{/*products vente*/ }</h1>
    </div>
    <div className="card-home">
      <Link to={'/admin/orders'}>
      <div className="card-inner">
        <h3>Nouvelles Commandes</h3>
      <FaShoppingBasket className='card_icon'/>
      </div>
      </Link>
      
      <h1>{ordersCount}{/*products vente*/ }</h1>
    </div>
    </div>
    <div className="charts">
        <Line
         data={data} 
         options={options} 
         className='chart'/>
        {/* <Bar options={options2} data={data2} /> */}
        <PieChart totalByCategory={totalByCategory} categories={categories}/>
    
    <Calendar className='calender'/>

    </div>
    
    </main>
  
    
    
  </>
  )
}

export default HomeAd