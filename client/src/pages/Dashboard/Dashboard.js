import './Dashboard.css'
import { Card, CardContent, Grid, Typography, Paper } from '@mui/material';
import React,{ useState,useEffect } from 'react';
import YearlyChart from './YearlyChart/YearlyChart';
import DailyChart from './DailyChart/DailyChart';
import MonthlyChart from './MonthlyChart/MonthlyChart';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import Loadspinner from '../../components/loadspinner/Loadspinner';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const Dashboard = ({ onTitleChange }) => {
     const [isLoading,setisLoading] = useState(false);
   
   
   const [text,setText] = useState([            {Object: 'Total PPE Incidents' , Count :26}, 
              {Object: 'Helmet Non Adherence', Count:0},
                {Object: 'Apron Non-Adherence', Count:0},
                {Object: 'Hand gloves Non Adherence' , Count:0},
                {Object: 'Goggle Non Adherence' , Count:0},
                {Object: 'Shoes Non Adherence' , Count:0},
                {Object: 'Mobile Detection' , Count:0},
                {Object: 'Person at Robotic Cell' , Count:0}])
   
  const [datamonth,setdatamonth] = useState([ {
    "id": "Jan-2023",
    "Helmet": 104,
    "Apron": 113,
    "Hand-Gloves": 68,
    "Goggle": 74,
    "Mobile": 20,
    "Shoes": 192,
  }])
  useEffect(() => {
   setdatamonth(JSON.parse(localStorage.monthlocaldata));
  },[localStorage.monthlocaldata])
  const [datayear,setdatayear] = useState([  {"id":2023,"helmet_count":71021,"vest_count":70957,"shoes_count":70723,"gloves_count":71315,"goggles_count":70852}])
  useEffect(() => {
          setdatayear(JSON.parse(localStorage.yearlocaldata))
  },[localStorage.yearlocaldata])

  useEffect(() => {
    
    setdatadate(JSON.parse(localStorage.dailydata));
  },[localStorage.dailydata])
   useEffect(() => {
           
           axios.get("http://localhost:8083/api/dashboard/getData").then((res) => {
           setText(res.data);
       
           })
  },[])

    
    const [datadate,setdatadate] = useState([{
      "id": "01-06-2023",
      "Helmet": 104,
      "Apron": 113,
      "Hand-Gloves": 68,
      "Goggle": 74,
      "Mobile": 20,
      "Shoes": 192,
    }])
  const [hoveredIndex,setHoveredIndex] = useState(null)

  const handleMouseEnter = (index) =>{
    setHoveredIndex(index)
  }

  const handleMouseLeave = (index) =>{
    setHoveredIndex(null)
  }

  const [from_year, setfromyear] = useState('');
  const [to_year, setToYear] = useState('');
  const [fromMonth, setFromMonth] = useState('');
  const [toMonth, setToMonth] = useState('');
  const [from_date, setFromDate] = useState('');
  const [to_date, setToDate] = useState('');
  const [from_year_1,setfromyear1] = useState('');
  const [to_year_1,settoyear1] = useState('');
  const handlefrom_yearChange = (year) => {
                   setfromyear(year)
                   const extractedYear = year.getFullYear().toString();
                   localStorage.from_year = extractedYear
                  
                  
  };
  
  const handleToYearChange = (year) => {
    setToYear(year);
    const extractedYear = year.getFullYear().toString();
    settoyear1(extractedYear);
    localStorage.to_year = extractedYear
  };

 
  const handleFromMonthChange = (month) => {
    console.log(month)
    
    setFromMonth(month);
    const month_1 = (month.getMonth() + 1).toString().padStart(2, '0');
    const year = month.getFullYear().toString();
    localStorage.year = year;
    localStorage.from_month = month_1

  };
  
  const handleToMonthChange = (month) => {
    setToMonth(month);
    const month_1 = (month.getMonth() + 1).toString().padStart(2, '0');
    const year = month.getFullYear().toString();
    localStorage.year_1 = year;
    localStorage.to_month = month_1
  };

 
  
  const handleFromDateChange = (event) => {
    setFromDate(event.target.value);
   
    localStorage.from_date = event.target.value

  };
  
  const handleToDateChange = (event) => {
    setToDate(event.target.value);
   
    localStorage.to_date = event.target.value
  };

  
const fetchyearData = () => {
  
    var year_id = document.getElementById("year_data");
    var value = year_id.value;
    localStorage.Line = value
    if(!from_year && !to_year  && !value){
      alert("please enter the dates")   
    }
    const data_set_year ={
      from_year: localStorage.from_year || 2023,
      to_year: localStorage.to_year || 2023,
      Line: value || 1
    }
    console.log(data_set_year)
    if(localStorage.from_year  && localStorage.to_year && localStorage.from_year <= localStorage.to_year){
    axios.post("http://localhost:8083/api/dashboard/yearlyData",data_set_year).then((res) => {
         console.log(res.data);
          setdatayear(res.data);
          const yearlocaldata = JSON.stringify(res.data);
          console.log(yearlocaldata);
          localStorage.yearlocaldata = yearlocaldata
    })
    }
    else{
      alert("please enter valid data");
    }
}

const fetchmonthlyData = () => {
  var monthly_id = document.getElementById("monthly_id");
  var value = monthly_id.value;
  localStorage.monthlyLine = value
 
  const data_set_month = {
 year: localStorage.year || 2023,
 from_month: localStorage.from_month || '01',
 year_1:localStorage.year_1 || 2023,
 to_month: localStorage.to_month || '12',  
 Line : localStorage.monthlyLine || 1
}
axios.post("http://localhost:8083/api/dashboard/monthlyData",data_set_month).then((res) => {
  console.log(res.data)
  setdatamonth(res.data);
  const monthlocaldata = JSON.stringify(res.data);
  localStorage.monthlocaldata = monthlocaldata
})
}
function formatDate(date) {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

const fetchdateData = () => {
  
  alert("month is working")
                var date_id = document.getElementById("date_id");
                var value = date_id;
                localStorage.dateLine = value;
                const data_set_date = {
                  from_date : localStorage.from_date || (formatDate(new Date())),
                  to_date: localStorage.to_date || (formatDate(new Date())),
                  Line: localStorage.dailyLine || '01'
                }
                axios.post("http://localhost:8083/api/dashboard/chooseDate",data_set_date).then((res) => {
                        setdatadate(res.data);
                        console.log(res.data);
                        const result = JSON.stringify(res.data);
                        localStorage.dailydata = result;
                })
}
  return (
    <>
    {
      isLoading ? <Loadspinner/> :<>
    
    { onTitleChange('Dashboard')}
    <Grid container spacing={2} >
      {text && text.map((data,index) => 
        (
        <Grid item xs={12} sm={6} md={3} key={index} >
        <Card onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={() => handleMouseLeave(index)} sx={{ flexBasis: '200px' , display: 'flex', flexDirection: 'column', height: '100%' ,
            transition: 'transform 0.3s',
            transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',}} >
        <CardContent sx={{flexGrow:1 , textAlign:'center'}} >
        <Typography variant="h5" component="div" gutterBottom sx={{ wordBreak: 'break-word' }} >
          {data.Object}
        </Typography>
        <Typography variant='h3' component="div" sx={{ wordBreak: 'break-word' ,color: index === 0 ? '#EF7272' : 'default'  }} >
            {data.Count}
        </Typography>
        </CardContent>
      </Card>
      </Grid>
      )
      )
    }
    </Grid>

    


    
      
    <Grid container spacing={3} sx={{marginTop:'20px'}} >
      <Grid item xs={12} md={6}  >
        <Paper className='paper' >
          <Typography variant='h6' sx={{paddingTop:'10px',display:'inline',}} className='text' >Yearly PPE Incidents</Typography>
          <div className='container'>
          <DatePicker
      selected={from_year}
      onChange={handlefrom_yearChange}
      dateFormat="yyyy"
      showYearPicker
      isClearable
      placeholderText="From Year"
      showPopperArrow={false}
      className='yearpicker'
    />

<DatePicker
      selected={to_year}
      onChange={handleToYearChange}
      dateFormat="yyyy"
      showYearPicker
      isClearable
      placeholderText="To Year"
      showPopperArrow={false}
      className='yearpicker'
      
    />
          <Form.Select aria-label="Default select example" size='sm' className='datepicker' id="year_data"  onChange={() => fetchyearData()}>
            <option value="BSA-LH">Line-1</option>
           
            <option value="BSA-LH">Line 2</option>
            <option value="BSA-LH">Line 3</option>
          </Form.Select>
          <div>
            <button onClick={() => fetchyearData()}>
              REFRESH
            </button>
          </div>
          </div>
       <YearlyChart datayear={datayear}/>
        </Paper>
      </Grid>
      <Grid item xs={12} md={6}>
      <Paper className='paper' >
          <Typography variant='h6' sx={{paddingTop:'10px',display:'inline',}} className='text' >Monthly PPE Incidents</Typography>
          <div className='container'>
          <DatePicker
      selected={fromMonth}
      onChange={handleFromMonthChange}
      dateFormat="MMMM yyyy"
      showMonthYearPicker
      isClearable
      placeholderText="From MM/YYYY"
      showPopperArrow={false}
      className='yearpicker'
    />

<DatePicker
      selected={toMonth}
      onChange={handleToMonthChange}
      dateFormat="MMMM yyyy"
      showMonthYearPicker
      isClearable
      placeholderText="To MM/YYYY"
      showPopperArrow={false}
      className='yearpicker'
    />
          <Form.Select aria-label="Default select example" size='sm' className='datepicker' id="monthly_id"  onChange={() => fetchmonthlyData()}>
            
            <option value="BSA-LH">Line 1</option>
            <option value="BSA-LH">Line 2</option>
            <option value="BSA-LH">Line 3</option>
          </Form.Select>
          <div>
            <button onChange={() => fetchmonthlyData()}>REFRESH</button>
          </div>
          </div>
        <MonthlyChart datamonth ={datamonth}/>
        </Paper>
      </Grid>
      <Grid item xs={12} >
      <Paper className='paper' >
          <Typography variant='h6' sx={{paddingTop:'10px',display:'inline',}} className='text' >Daily PPE Incidents</Typography>
          <div className='container'>
          <input type="date" className="datepicker" value={from_date} onChange={handleFromDateChange} />
         <input type="date" className="datepicker" value={to_date} onChange={handleToDateChange} />
          <Form.Select aria-label="Default select example" size='sm' className='datepicker'  id="daily_id">
           
            <option value="1">Line 1</option>
            <option value="2">Line 2</option>
            <option value="3">Line 3</option>
          </Form.Select>
          <div>
            <button onClick={() => fetchdateData()}>REFRESH</button>
          </div>
          </div>
        <DailyChart  datadate = {datadate}/>
        </Paper>
      </Grid>
    </Grid>
    </>}
    </>
  )
}

export default Dashboard
