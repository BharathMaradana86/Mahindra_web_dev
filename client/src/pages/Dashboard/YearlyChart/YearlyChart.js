import { ResponsiveBar } from '@nivo/bar';
import { useContext } from 'react';
import { ModeContext } from '../../../components/MiniDrawer/MiniDrawer';
import React,{useState,useEffect} from 'react';
import axios from 'axios';

const YearlyChart = ({datayear}) => {
 
  const isSmallScreen= window.innerWidth<616;
  const isMediumScreen=window.innerWidth<1130 && window.innerWidth>900
  
 


 

  
 const keys = Object.keys(datayear[0]);
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

const colors=['#e8c1a0','#f47560','#eed312','#e8a838','#41c0b4','#97e3d5']

const {mode} = useContext(ModeContext);

const customTheme = {
    axis: {
      ticks: {
        text: {
          fill: mode ? 'black' : 'white', // Change the color of tick values on both x and y axes
        },
      },
      
    },
    
   
  };

//   useEffect(() => {
//    if(localStorage.from_year <= localStorage.to_year ){
//     axios.post("http://localhost:8083/api/dashboard/yearlyData",data_set).then((res) => {
     
//       setdata(res.data)
// })
//    }
//    else{
//     alert("from_year can't be greater then to_year")
//    }
//   },[localStorage.from_year,localStorage.to_year,localStorage.Line])
 


  return (
    <>
     <ResponsiveBar
        data={datayear}
        keys={keys1}
        
        indexBy="id"
        theme={customTheme}
        margin={{ top: 50, right: 90, bottom: isSmallScreen ?200 :(isMediumScreen ? 160:110), left: 60 }}
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
            legend: 'FY-Years',
            legendPosition: 'middle',
            legendOffset: 62
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

export default YearlyChart;