import { ResponsiveBar } from '@nivo/bar';
import { data } from './MonthlyData'
import { ModeContext } from '../../../components/MiniDrawer/MiniDrawer';
import { useContext, useState, useEffect } from 'react';
import axios from 'axios';


const MonthlyChart = ({datamonth}) => {

  const [data,setdata] = useState([
   datamonth
  ])


//   const data_set = {
//     year: localStorage.year || 2023,
//     from_month: localStorage.from_month || '01',
//     year_1:localStorage.year_1 || 2023,
//     to_month: localStorage.to_month || '08',  
//     Line : localStorage.monthlyLine
//   }
//   useEffect(() => {
//     axios.post("http://localhost:8083/api/dashboard/monthlyData",data_set).then((res) => {
//       console.log(res.data);
//       setdata(res.data)
      
// })
//   },[localStorage.year,localStorage.from_month,localStorage.year_1,localStorage.to_month])
 const keys = Object.keys(datamonth[0]);
 const keys1=keys.slice(1)

//   const colors = keys.map((values) => {
//       if(values === 'burger'){
//         return 'violet'
//       }
//       else if(values === 'hot dog'){
//         return 'red'
//       }
//       else if(values === 'sandwich'){
//         return 'blue'
//       }
//       else if(values === 'kebab'){
//         return 'orange'
//       }
//       else if(values === 'fries'){
//         return 'green'
//       }
//       else if(values === 'donut'){
//         return 'pink'
//       }
      

// })
const isSmallScreen= window.innerWidth<616;
const isMediumScreen=window.innerWidth<1130 && window.innerWidth>900

const colors=['#e8c1a0','#f47560','#eed312','#e8a838','#41c0b4','#97e3d5']

const { mode} = useContext(ModeContext);

// const isSmallScreen= window.innerWidth < 768


const customTheme = {
    axis: {
      ticks: {
        text: {
          fill: mode ? 'black' : 'white', // Change the color of tick values on both x and y axes
          // fontSize: isSmallScreen ?  '5px' : 'default'
        },
      },
      
    },
   
  };



  return (
    <>
     <ResponsiveBar
        data={datamonth}
        keys={keys1}
        
        indexBy="id"
        theme={customTheme}
        margin={{ top: 50, right: 90, bottom: isSmallScreen ?210 : (isMediumScreen ? 160:110), left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        tooltip={({ id, value }) => (
            <div style={{color:mode?'white' : 'black',backgroundColor:mode ? '#27293d' : 'white',padding:'3px'}}>
              {id} - Value: <strong> {value} </strong>
            </div>
          )}
        colors={colors}
        groupMode='grouped'
        enableGridX={false}
        enableGridY={false}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -90,
            legend: 'Months',
            legendPosition: 'middle',
            legendOffset: 72
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Count',
            legendPosition: 'middle',
            legendOffset: -40,
            
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={mode ? '#00000000' : '#ffffff00'}
        legends={[
            {
              dataFrom: 'keys',
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 5,
              itemTextColor: mode ? 'black' : 'white',
              itemWidth: 100,
              itemHeight: 10,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 10,
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
       
    />
    </>
  )
}

export default MonthlyChart;