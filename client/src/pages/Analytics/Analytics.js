import './Analytics.css'
import axios from 'axios'
import { useEffect } from 'react'
import React from 'react'
import DayWiseChart from './DayWiseChart'
import ZoneWiseChart from './ZoneWiseChart'
import MonthWiseChart from './MonthWiseChart'
import YearWiseChart from './YearWiseChart'
import ZoneWisePieChart from './ZoneWisePieChart'
import { ModeContext } from '../../components/MiniDrawer/MiniDrawer';
import { useContext,useState } from 'react';
import Form from 'react-bootstrap/Form';
import { Switch } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';


const Analytics = ( { onTitleChange }) => {

  const {mode} = useContext(ModeContext)


  const [lineChange,setLineChange] = useState('')
  const handleChange = (event) =>{
    setLineChange(event.target.value)
  }

  const [twentyFour,setTwentyFour] =useState(() => {
    const time1 = localStorage.getItem('time1');
    return time1 !== null ? JSON.parse(time1) : true  ;
  });

  const handleTwentyFour = (event) =>{
    const isChecked = event.target.checked;
    setTwentyFour(isChecked)
    localStorage.setItem('time1',JSON.stringify(isChecked))
  }


  const chartContainerRef = React.useRef(null);
  const chartContainerRef1 = React.useRef(null);
  const chartContainerRef2 = React.useRef(null);
  const chartContainerRef3 = React.useRef(null);
  const chartContainerRef4 = React.useRef(null);
  const [chartWidth, setChartWidth] = React.useState(0);
  const [chartWidth1, setChartWidth1] = React.useState(0);
  const [chartWidth2, setChartWidth2] = React.useState(0);
  const [chartWidth3, setChartWidth3] = React.useState(0);
  const [chartWidth4, setChartWidth4] = React.useState(0);
//  const [zoneData,setzoneData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [zoneData,setzoneData] = useState([{
    "line":"1",
    count:2
  }]);
  const fetchZoneData = async (date) => {
    try {
      console.log(date);
      const response = await axios.post('http://localhost:8083/api/analytics/zonewise', { currentDate:date });
      const data = response.data;
      setzoneData(data);
      return data;
    } catch (error) {
      console.error('Error fetching zone data:', error);
      return null;
    }
  };
  
  useEffect(() => {
    if (selectedDate) {
      const fetchData = async () => {
        const zoneData = await fetchZoneData(selectedDate);
        // Update the state or do something with the fetched zoneData
        setzoneData(zoneData);
      };
  
      fetchData();
    }
  }, [selectedDate]);



  /* piechar*/

  const [selectedDate_1, setSelectedDate_1] = useState(null);
  const [pie_line,setpie_line] = useState("1");
  const [zonepieData,setpiezoneData] = useState([ {
    "id": "make",
    "label": "make",
    "value": 306,
    "color": "hsl(211, 70%, 50%)"
  },
  {
    "id": "c",
    "label": "c",
    "value": 43,
    "color": "hsl(294, 70%, 50%)"
  },]);
  const fetchZoneData_1 = async (date,line) => {
    try {
      console.log("something" + date + " " + line);
      const response = await axios.post('http://localhost:8083/api/analytics/zoneselection', { date:date,line:line });
      const data = response.data;
       console.log("nothing" + data[0])
      setpiezoneData(data);
      return data;
    } catch (error) {
      console.error('Error fetching zone data:', error);
      return null;
    }
  };
  
  useEffect(() => {
    if (selectedDate_1) {
      const fetchData = async () => {
      
        const zonepieData = await fetchZoneData_1(selectedDate_1,pie_line);
        // Update the state or do something with the fetched zoneData
        setpiezoneData(zonepieData);
      };
  
      fetchData();
    }
  }, [selectedDate_1,pie_line]);



  /* monthwise */

  const [selectedDate_2, setSelectedDate_2] = useState(null);
  const [month_line,setmonth_line] = useState("1");
  const [zonemonthdata,setzonemonthData] = useState([{
    "id": "total",
    "color": "hsl(288, 70%, 50%)",
    "data": [
      {
        "x": "2023-05-19",
        "y": 0
      },
      {
        "x": "2023-05-19",
        "y": 0
      },
      {
        "x": "2023-05-19",
        "y": 0
      },
      {
        "x": "2023-05-19",
        "y": 0
      },
      {
        "x": "2023-05-19",
        "y": 0
      },
      {
        "x": "2023-05-19",
        "y": 0
      },
      {
        "x": "2023-05-19",
        "y": 0
      },
      {
        "x": "2023-05-19",
        "y": 0
      },
      {
        "x": "2023-05-19",
        "y": 0
      },
      {
        "x": "2023-05-19",
        "y": 0
      },
      {
        "x": "2023-05-19",
        "y": 0
      },
      {
        "x": "2023-05-19",
        "y": 0
      }
    ]
  },
  {
    "id": "helmet",
    "color": "hsl(257, 70%, 50%)",
    "data": [
      {
        "x": "2023-05-19",
        "y": 0
      },
      {
        "x": "2023-05-18",
        "y": 0
      },
      {
        "x": "2023-05-17",
        "y": 0
      },
      {
        "x": "2023-05-16",
        "y": 0
      },
      {
        "x": "2023-05-15",
        "y": 0
      },
      {
        "x": "2023-05-14",
        "y": 0
      },
      {
        "x": "2023-05-13",
        "y": 0
      },
      {
        "x": "2023-05-12",
        "y": 0
      },
      {
        "x": "2023-05-11",
        "y": 0
      },
      {
        "x": "2023-05-10",
        "y": 0
      },
      {
        "x": "2023-05-19",
        "y": 0
      },
      {
        "x": "2023-05-19",
        "y": 0
      }
    ]
  }]);
  const fetchZoneData_2 = async (date,line) => {
    try {
      console.log("something" + date + " " + line);
      const dataobj = new Date(date);
      const month_1 = dataobj.getMonth() + 1;
      const year = dataobj.getFullYear().toString();
      const response = await axios.post('http://localhost:8083/api/analytics/monthlywise', { month:month_1,year:year,line:line });
    console.log(response.data);
       console.log("nothing" + response.data)
      setzonemonthData(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching zone data:', error);
      return null;
    }
  };
  
  useEffect(() => {

    if (selectedDate_2) {
      const fetchData = async () => {
      
        const monthData = await fetchZoneData_2(selectedDate_2,month_line);
        // Update the state or do something with the fetched zoneData
        console.log("something");
        setzonemonthData(monthData);
      };
  
      fetchData();
    }
  }, [selectedDate_2,month_line]);



  /* yearlywise */
  
  const [selectedDate_3, setSelectedDate_3] = useState(null);
  const [year_line,setyear_line] = useState("1");
  const [zoneyeardata,setzoneyearData] = useState([{
        "id": "total",
        "color": "hsl(288, 70%, 50%)",
        "data": [
          {
            "x": "Nov 22",
            "y": 296
          },
          {
            "x": "Dec 22",
            "y": 96
          },
          {
            "x": "Jan 23",
            "y": 46
          },
          {
            "x": "Feb 23",
            "y": 8
          },
          {
            "x": "Mar 23",
            "y": 242
          },
          {
            "x": "Apr 23",
            "y": 261
          },
          {
            "x": "May 23",
            "y": 186
          },
          {
            "x": "Jun 23",
            "y": 109
          },
          {
            "x": "Jul 23",
            "y": 49
          },
          {
            "x": "Aug 23",
            "y": 201
          },
          {
            "x": "Sep 23",
            "y": 258
          },
          {
            "x": "Oct 23",
            "y": 234
          }
        ]
      },
      {
        "id": "helmet",
        "color": "hsl(257, 70%, 50%)",
        "data": [
          {
            "x": "Nov 22",
            "y": 182
          },
          {
            "x": "Dec 22",
            "y": 273
          },
          {
            "x": "Jan 23",
            "y": 166
          },
          {
            "x": "Feb 23",
            "y": 109
          },
          {
            "x": "Mar 23",
            "y": 6
          },
          {
            "x": "Apr 23",
            "y": 125
          },
          {
            "x": "May 23",
            "y": 116
          },
          {
            "x": "Jun 23",
            "y": 158
          },
          {
            "x": "Jul 23",
            "y": 89
          },
          {
            "x": "Aug 23",
            "y": 135
          },
          {
            "x": "Sep 23",
            "y": 273
          },
          {
            "x": "Oct 23",
            "y": 276
          }
        ]
      }
]);
  const fetchZoneData_3 = async (date,line) => {
    try {
      console.log("something" + date + " " + line);
      const dataobj = new Date(date);
      const year = dataobj.getFullYear().toString();
      console.log("year:" + year)
      const response = await axios.post('http://localhost:8083/api/analytics/yearlywise', { year:year,line:line });
    console.log(response.data);
       console.log("nothing" + response.data)
      setzoneyearData(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching zone data:', error);
      return null;
    }
  };
  
  useEffect(() => {

    if (selectedDate_3) {
      const fetchData = async () => {
         console.log(selectedDate_3 + "kjnothgn")
        const monthData = await fetchZoneData_3(selectedDate_3,year_line);
        // Update the state or do something with the fetched zoneData
        
        setzoneyearData(monthData);
      };
  
      fetchData();
    }
  }, [selectedDate_3,year_line]);


/* TIMEWISE */

const time1 = new Date();
time1.setHours(9, 0, 0); // Set time to 09:00:00
const time2 = new Date();
time2.setHours(12, 30, 0); // Set time to 12:30:00
console.log(time2);
const time3 = new Date();
time3.setHours(15, 45, 0); // Set time to 15:45:00
const time4 = new Date();
time4.setHours(18, 15, 0); // Set time to 18:15:00
const time5 = new Date();
time5.setHours(10, 30,0); // Set time to 09:00:00
const time6 = new Date();
time6.setHours(13, 30, 0); // Set time to 12:30:00
const time7 = new Date();
time7.setHours(19, 45, 0); // Set time to 15:45:00
const time8 = new Date();
time8.setHours(22, 15, 0); // Set time to 18:15:00
const time9 = new Date();
time9.setHours(23, 45, 0); // Set time to 09:00:00
const time10 = new Date();
time10.setHours(12, 10, 0); // Set time to 12:30:00
const time11 = new Date();
time11.setHours(8, 45, 0); // Set time to 15:45:00
const time12 = new Date();
time12.setHours(18, 55, 0); // Set time to 18:15:00

// Generate 1ted time strings for each time
const Time1 = time1.toLocaleTimeString([], { hour: '2-digit', 60: '2-digit', hourCycle: 1 ? 'h23' : 'h11' });
const Time2 = time2.toLocaleTimeString([], { hour: '2-digit', 60: '2-digit', hourCycle: 1 ? 'h23' : 'h11' });
const Time3 = time3.toLocaleTimeString([], { hour: '2-digit', 60: '2-digit', hourCycle: 1 ? 'h23' : 'h11' });
const Time4 = time4.toLocaleTimeString([], { hour: '2-digit', 60: '2-digit', hourCycle: 1 ? 'h23' : 'h11' });
const Time5 = time5.toLocaleTimeString([], { hour: '2-digit', 60: '2-digit', hourCycle: 1 ? 'h23' : 'h11' });
const Time6 = time6.toLocaleTimeString([], { hour: '2-digit', 60: '2-digit', hourCycle: 1 ? 'h23' : 'h11' });
const Time7 = time7.toLocaleTimeString([], { hour: '2-digit', 60: '2-digit', hourCycle: 1 ? 'h23' : 'h11' });
const Time8 = time8.toLocaleTimeString([], { hour: '2-digit', 60: '2-digit', hourCycle: 1 ? 'h23' : 'h11' });
const Time9 = time9.toLocaleTimeString([], { hour: '2-digit', 60: '2-digit', hourCycle: 1 ? 'h23' : 'h11' });
const Time10 = time10.toLocaleTimeString([], { hour: '2-digit', 60: '2-digit', hourCycle: 1 ? 'h23' : 'h11' });
const Time11= time11.toLocaleTimeString([], { hour: '2-digit', 60: '2-digit', hourCycle: 1 ? 'h23' : 'h11' });
const Time12= time12.toLocaleTimeString([], { hour: '2-digit', 60: '2-digit', hourCycle: 1 ? 'h23' : 'h11' });

const [selectedDate_4, setSelectedDate_4] = useState(null);
  const [time_line,settime_line] = useState("1");
  const [zonetimedata,setzonetimeData] = useState([ {
    "id": "total",
    "color": "hsl(288, 70%, 50%)",
    "data": [
      {
        "x": Time1,
        "y": 296
      },
      {
        "x": Time2,
        "y": 96
      },
      {
        "x": Time3,
        "y": 46
      },
      {
        "x": Time4,
        "y": 8
      },
      {
        "x": Time5,
        "y": 242
      },
      {
        "x": Time6,
        "y": 261
      },
      {
        "x": Time7,
        "y": 186
      },
      {
        "x": Time8,
        "y": 109
      },
      {
        "x": Time9,
        "y": 49
      },
      {
        "x": Time10,
        "y": 201
      },
      {
        "x": Time11,
        "y": 258
      },
      {
        "x": Time12,
        "y": 234
      }
    ]
  },
  {
    "id": "helmet",
    "color": "hsl(257, 70%, 50%)",
    "data": [
      {
        "x": Time1,
        "y": 182
      },
      {
        "x": Time2,
        "y": 273
      },
      {
        "x": Time3,
        "y": 166
      },
      {
        "x": Time4,
        "y": 109
      },
      {
        "x": Time5,
        "y": 6
      },
      {
        "x": Time6,
        "y": 125
      },
      {
        "x": Time7,
        "y": 116
      },
      {
        "x": Time8,
        "y": 158
      },
      {
        "x": Time9,
        "y": 89
      },
      {
        "x": Time10,
        "y": 135
      },
      {
        "x": Time11,
        "y": 273
      },
      {
        "x": Time12,
        "y": 276
      }
    ]
  },
  {
    "id": "apron",
    "color": "hsl(52, 70%, 50%)",
    "data": [
      {
        "x": Time1,
        "y": 116
      },
      {
        "x": Time2,
        "y": 50
      },
      {
        "x": Time3,
        "y": 183
      },
      {
        "x": Time4,
        "y": 205
      },
      {
        "x": Time5,
        "y": 12
      },
      {
        "x": Time6,
        "y": 177
      },
      {
        "x": Time7,
        "y": 100
      },
      {
        "x": Time8,
        "y": 217
      },
      {
        "x": Time9,
        "y": 32
      },
      {
        "x": Time10,
        "y": 1
      },
      {
        "x": Time11,
        "y": 243
      },
      {
        "x": Time12,
        "y": 199
      }
    ]
  },
  {
    "id": "hand gloves",
    "color": "hsl(307, 70%, 50%)",
    "data": [
      {
        "x": Time1,
        "y": 186
      },
      {
        "x": Time2,
        "y": 112
      },
      {
        "x": Time3,
        "y": 54
      },
      {
        "x": Time4,
        "y": 292
      },
      {
        "x": Time5,
        "y": 297
      },
      {
        "x": Time6,
        "y": 92
      },
      {
        "x": Time7,
        "y": 210
      },
      {
        "x": Time8,
        "y": 82
      },
      {
        "x": Time9,
        "y": 204
      },
      {
        "x": Time10,
        "y": 64
      },
      {
        "x": Time11,
        "y": 62
      },
      {
        "x": Time12,
        "y": 228
      }
    ]
  },
  {
    "id": "goggle",
    "color": "hsl(252, 70%, 50%)",
    "data": [
      {
        "x": Time1,
        "y": 183
      },
      {
        "x": Time2,
        "y": 289
      },
      {
        "x": Time3,
        "y": 278
      },
      {
        "x": Time4,
        "y": 169
      },
      {
        "x": Time5,
        "y": 105
      },
      {
        "x": Time6,
        "y": 160
      },
      {
        "x": Time7,
        "y": 33
      },
      {
        "x": Time8,
        "y": 293
      },
      {
        "x": Time9,
        "y": 1
      },
      {
        "x": Time10,
        "y": 147
      },
      {
        "x": Time11,
        "y": 91
      },
      {
        "x": Time12,
        "y": 278
      }
    ]
  },
  {
    "id": "shoes",
    "color": "hsl(252, 70%, 50%)",
    "data": [
      {
        "x": Time1,
        "y": 183
      },
      {
        "x": Time2,
        "y": 289
      },
      {
        "x": Time3,
        "y": 278
      },
      {
        "x": Time4,
        "y": 169
      },
      {
        "x": Time5,
        "y": 105
      },
      {
        "x": Time6,
        "y": 160
      },
      {
        "x": Time7,
        "y": 33
      },
      {
        "x": Time8,
        "y": 293
      },
      {
        "x": Time9,
        "y": 1
      },
      {
        "x": Time10,
        "y": 147
      },
      {
        "x": Time11,
        "y": 91
      },
      {
        "x": Time12,
        "y": 278
      }
    ]
  }
]);
  const fetchZoneData_4 = async (date,line) => {
    try {
      console.log("something" + date + " " + line);
     
      const response = await axios.post('http://localhost:8083/api/analytics/timewise', { date:date,line:line });
   
       console.log("nothing" + response.data)
      setzonetimeData(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching zone data:', error);
      return null;
    }
  };
  
  useEffect(() => {

    if (selectedDate_4) {
      const fetchData = async () => {
         console.log(selectedDate_4 + "kjnothgn")
        const monthData = await fetchZoneData_4(selectedDate_4,time_line);
        // Update the state or do something with the fetched zoneData
         console.log(monthData)
        setzonetimeData(monthData);
      };
  
      fetchData();
    }
  }, [selectedDate_4,time_line]);

  React.useEffect(() => {
    const updateChartWidth = () => {
      if (chartContainerRef.current) {
        const containerWidth = chartContainerRef.current.offsetWidth;
        setChartWidth(containerWidth);
      }

    };

    updateChartWidth();

    // Update the chart width on window resize
    window.addEventListener('resize', updateChartWidth);

    // Clean up the event listener
    return () => {
      window.removeEventListener('resize', updateChartWidth);
    };
  }, []);


  React.useEffect(() => {
    const updateChartWidth1 = () => {
      if (chartContainerRef1.current) {
        const containerWidth = chartContainerRef1.current.offsetWidth;
        setChartWidth1(containerWidth);
      }

    };

    updateChartWidth1();

    // Update the chart width on window resize
    window.addEventListener('resize', updateChartWidth1);

    // Clean up the event listener
    return () => {
      window.removeEventListener('resize', updateChartWidth1);
    };
  }, []);

  React.useEffect(() => {
    const updateChartWidth2 = () => {
      if (chartContainerRef2.current) {
        const containerWidth = chartContainerRef2.current.offsetWidth;
        setChartWidth2(containerWidth);
      }

    };

    updateChartWidth2();

    // Update the chart width on window resize
    window.addEventListener('resize', updateChartWidth2);

    // Clean up the event listener
    return () => {
      window.removeEventListener('resize', updateChartWidth2);
    };
  }, []);

  React.useEffect(() => {
    const updateChartWidth3 = () => {
      if (chartContainerRef3.current) {
        const containerWidth = chartContainerRef3.current.offsetWidth;
        setChartWidth3(containerWidth);
      }

    };

    updateChartWidth3();

    // Update the chart width on window resize
    window.addEventListener('resize', updateChartWidth3);

    // Clean up the event listener
    return () => {
      window.removeEventListener('resize', updateChartWidth3);
    };
  }, []);

  React.useEffect(() => {
    const updateChartWidth4 = () => {
      if (chartContainerRef4.current) {
        const containerWidth = chartContainerRef4.current.offsetWidth;
        setChartWidth4(containerWidth);
      }

    };

    updateChartWidth4();

    // Update the chart width on window resize
    window.addEventListener('resize', updateChartWidth4);

    // Clean up the event listener
    return () => {
      window.removeEventListener('resize', updateChartWidth4);
    };
  }, []);


  const [menuWidth,setMenuWidth] = React.useState(0)
  const handleMenuWidth = (width) =>{
    setMenuWidth(width)
  }

  const [menuWidth1,setMenuWidth1] = React.useState(0)
  const handleMenuWidth1 = (width) =>{
    setMenuWidth1(width)
  }
  
  const [menuWidth2,setMenuWidth2] = React.useState(0)
  const handleMenuWidth2 = (width) =>{
    setMenuWidth2(width)
  }

  const [menuWidth3,setMenuWidth3] = React.useState(0)
  const handleMenuWidth3 = (width) =>{
    setMenuWidth3(width)
  }




  return (
    <div>
      {onTitleChange('Analytics')}
      <div className='outcon' >
        <div className='con'>
        <div className='chart1 chart'  style={{background:mode?'white':'#034CA1'}} ref={chartContainerRef1}>
            <div className='menu' style={{width : chartWidth1 > menuWidth1 ? chartWidth1 : menuWidth1}}>
              <div className='name'>
                <h4>Zone Wise</h4>
              </div>
              <div className='line' style={{marginTop:'17px'}} >
                <div className='d'>
                  <input type="date" className="datepicker1"    value={selectedDate || ''}
  onChange={(e) => setSelectedDate(e.target.value)}/>
                </div>
              </div>
            </div>
            <ZoneWiseChart width1={chartWidth1} handleWidth1= {handleMenuWidth1} data={zoneData}/>
            
          </div>
          <div className='chart2 chart'  style={{background:mode?'white':'#034CA1'}} ref={chartContainerRef4}>
          <div className='menu'  style={{width : chartWidth4}}>
              <div className='name'>
                <h4>Zone Wise</h4>
              </div>
              <div className='line' style={{marginTop:'17px'}} >
                <div className='d'>
                  <input type="date" className="datepicker1"  value={selectedDate_1 || ''} onChange={(e) => setSelectedDate_1(e.target.value)}/>
                </div>
                <div className='s'>
                <FormControl variant="standard" sx={{width:'70px' }}>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={lineChange}
                  onChange={handleChange}
                  label="Line"
                  displayEmpty
                  renderValue={(lineChange) => {
                    if (!lineChange) {
                      return <em>Line</em>;
                    }
                    return lineChange;
                  }}
                >
                  <MenuItem disabled value="">
                    <em>Line</em>
                  </MenuItem>
                  <MenuItem value="Line 1" onClick={() => setpie_line("1")}>Line 1</MenuItem>
                  <MenuItem value="Line 2" onClick={() => setpie_line("2")}>Line 2</MenuItem>
                  <MenuItem value="Line 3" onClick={() => setpie_line("3")}>Line 3</MenuItem>
                </Select>
              </FormControl>
                </div>
              </div>
              </div>
            <ZoneWisePieChart  data={zonepieData}/>
          </div>
        </div>
        <div className='con1'>
        <div className='chart3 chart' style={{background:mode?'white':'#034CA1'}} ref={chartContainerRef}>
            <div className='menu' style={{width : chartWidth > menuWidth ? chartWidth : menuWidth}}>
              <div className='name'>
                <h4>Day Wise</h4>
              </div>
              <div className='line line3' style={{marginTop:'17px'}} >
                <div className='d'>
                  <input type="date" className="datepicker1"  value={selectedDate_4 || ''} onChange={(e) => setSelectedDate_4(e.target.value)}/>
                </div>
                <div className='d'>
                <FormControl variant="standard" sx={{width:'70px' }}>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={lineChange}
                  onChange={handleChange}
                  label="Line"
                  displayEmpty
                  renderValue={(lineChange) => {
                    if (!lineChange) {
                      return <em>Line</em>;
                    }
                    return lineChange;
                  }}
                >
                  <MenuItem disabled value="">
                    <em>Line</em>
                  </MenuItem>
                  <MenuItem value="Line 1" onClick={() => settime_line("1")}>Line 1</MenuItem>
                  <MenuItem value="Line 2" onClick={() => settime_line("2")}>Line 2</MenuItem>
                  <MenuItem value="Line 3" onClick={(e) => settime_line("3")}>Line 3</MenuItem>
                </Select>
              </FormControl>
                </div>
                <div className='s' style={{marginTop:'1px'}}>
                  12<Switch className='custom-switch' checked={twentyFour} onChange={handleTwentyFour}></Switch>24 
                </div>
              </div>
            </div>
            <DayWiseChart  width={chartWidth} handleWidth= {handleMenuWidth} data={zonetimedata}/>
          </div>
          
          
        </div>
        <div className='con1'>
        
          <div className='chart4 chart' style={{background:mode?'white':'#034CA1'}} ref={chartContainerRef2}>
          <div className='menu' style={{width : chartWidth2 > menuWidth2 ? chartWidth2 : menuWidth2}}>
              <div className='name'  >
                <h4>Monthly Wise</h4>
              </div>
              <div className='line' style={{marginTop:'17px'}}>
                <div className='d'>
                <input type="month" className="datepicker1"  value={selectedDate_2 || ''} onChange={(e) => setSelectedDate_2(e.target.value)}/>
                </div>
               <div className='d'>
              <FormControl variant="standard" sx={{width:'70px' }}>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={lineChange}
                  onChange={handleChange}
                  label="Line"
                  displayEmpty
                  renderValue={(lineChange) => {
                    if (!lineChange) {
                      return <em>Line</em>;
                    }
                    return lineChange;
                  }}
                >
                  <MenuItem disabled value="">
                    <em>Line</em>
                  </MenuItem>
                  <MenuItem value="Line 1" onClick={() => setmonth_line("1")}>Line 1</MenuItem>
                  <MenuItem value="Line 2" onClick={() => setmonth_line("1")}>Line 2</MenuItem>
                  <MenuItem value="Line 3" onClick={() => setmonth_line("1")}>Line 3</MenuItem>
                </Select>
              </FormControl>
              </div>
              </div>
            </div>
            <MonthWiseChart width2={chartWidth2} handleWidth2= {handleMenuWidth2} data={zonemonthdata}/>
          </div>
          
        </div>
        <div className='con1'>
        <div className='chart5 chart' style={{background:mode?'white':'#034CA1'}} ref={chartContainerRef3}>
            
            <div className='menu' style={{width : chartWidth3 > menuWidth3 ? chartWidth3 : menuWidth3}}>
                <div className='name'>
                  <h4>Year Wise</h4>
                  
                </div>
                <div className='line' style={{marginTop:'17px'}}>
                <div className='d'>
                <input type="date" className="datepicker1"  value={selectedDate_3 || ""} onChange={(e) => setSelectedDate_3(e.target.value)} />
                </div>
               <div className='d'>
              <FormControl variant="standard" sx={{width:'70px' }}>
                <Select
                  labelId="demo-simple-select-standard-label"
                  id="demo-simple-select-standard"
                  value={lineChange}
                  onChange={handleChange}
                  label="Line"
                  displayEmpty
                  renderValue={(lineChange) => {
                    if (!lineChange) {
                      return <em>Line</em>;
                    }
                    return lineChange;
                  }}
                >
                  <MenuItem disabled value="">
                    <em>Line</em>
                  </MenuItem>
                  <MenuItem value="Line 1" onClick={(e) => setyear_line("1")}>Line 1</MenuItem>
                  <MenuItem value="Line 2" onClick={(e) => setyear_line("2")}>Line 2</MenuItem>
                  <MenuItem value="Line 3" onClick={(e) => setyear_line("3")}>Line 3</MenuItem>
                </Select> 
              </FormControl>
              </div>
              </div>
              </div>
              <YearWiseChart  width3={chartWidth3} handleWidth3= {handleMenuWidth3} data={zoneyeardata}/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics