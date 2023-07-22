import React from 'react'
import { ResponsiveBar } from '@nivo/bar'
import { ModeContext } from '../../components/MiniDrawer/MiniDrawer'
function ZoneWiseChart({width1,handleWidth1,data}) {
    const {mode} = React.useContext(ModeContext)
//  const data=   [
//         {
//           "Zones": "Zone1",
//           // "helmet": 164,
//           // "apron":196,
//           // "goggle":100,
//           // "hand-gloves":50,
//           // "mobile":80,
//           // "shoes":30,
//           "Total":80
//         },
//         {
//           "Zones": "Zone2",
//           // "helmet": 164,
//           // "apron":196,
//           // "goggle":100,
//           // "hand-gloves":50,
//           // "mobile":80,
//           // "shoes":30,
//           "Total":50
//         },
//         {
//           "Zones": "Zone3",
//           // "helmet": 164,
//           // "apron":196,
//           // "goggle":100,
//           // "hand-gloves":50,
//           // "mobile":80,
//           // "shoes":30,
//           "Total":123
//         },
//         {
//           "Zones": "Zone4",
//           // "helmet": 164,
//           // "apron":196,
//           // "goggle":100,
//           // "hand-gloves":50,
//           // "mobile":80,
//           // "shoes":30,
//           "Total":190
//         },
//         {
//           "Zones": "Zone5",
//           // "helmet": 164,
//           // "apron":196,
//           // "goggle":100,
//           // "hand-gloves":50,
//           // "mobile":80,
//           // "shoes":30,
//           "Total":100
//         },
//         {
//           "Zones": "Zone6",
//           // "helmet": 164,
//           // "apron":196,
//           // "goggle":100,
//           // "hand-gloves":50,
//           // "mobile":80,
//           // "shoes":30,
//           "Total":178
//         },
//         {
//           "Zones": "Zone7",
//           // "helmet": 164,
//           // "apron":196,
//           // "goggle":100,
//           // "hand-gloves":50,
//           // "mobile":80,
//           // "shoes":30,
//           "Total":156
//         },
//       ]
      const customTheme = {
        axis: {
          ticks: {
            text: {
              fill: mode ? 'black' : 'white', // Change the color of tick values on both x and y axes
            },
          },
          legend: {
            text: {
              fill: mode ? 'black' : 'white', // Change the color of axis legends
            },
          },
        },
      };
      const numTickValues = data.length;
      // Calculate the desired width based on the number of tick values
      const desiredWidth1 = numTickValues * 80; // Adjust the factor as needed
      React.useEffect(() => {
        handleWidth1(desiredWidth1);
      }, [handleWidth1, desiredWidth1]);
  return (
    <>
    <ResponsiveBar
        data={data}
        // keys={[
        //     'helmet','apron','goggle','hand-gloves','mobile','shoes'
        // ]}
        keys={['count']}
        width={width1 > desiredWidth1 ? width1 : desiredWidth1}
        theme={customTheme}
        indexBy="line"
        margin={{ top: 0, right: 80, bottom: 120, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        tooltip={({ id, value }) => (
            <div style={{color:mode?'white' : 'black',backgroundColor:mode ? '#27293D' : 'white',padding:'3px'}}>
              {id} - Value: <strong> {value} </strong>
            </div>
          )}
          colors={['#E8C1A0',]}
          borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -90,
            legend: 'Zones',
            legendPosition: 'middle',
            legendOffset: 45,
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Count',
            legendPosition: 'middle',
            legendOffset: -40
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        legends={[
            {
                dataFrom: 'keys',
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 120,
                translateY: 0,
                itemsSpacing: 2,
                itemWidth: 100,
                itemHeight: 20,
                itemDirection: 'left-to-right',
                itemTextColor: mode ? 'black' : 'white',
                itemOpacity: 0.85,
                symbolSize: 12,
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
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={e=>e.id+": "+e.formattedValue+" in country: "+e.indexValue}
    />
    </>
  )
}
export default ZoneWiseChart














