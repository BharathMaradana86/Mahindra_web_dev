import { ResponsiveLine } from '@nivo/line'
import {useContext,useEffect} from 'react'
import {ModeContext} from '../../components/MiniDrawer/MiniDrawer'
const DayWiseChart = ({format,width,handleWidth,data}) => {
  const {mode} = useContext(ModeContext)
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
// Generate formatted time strings for each time
const Time1 = time1.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: format ? 'h23' : 'h11' });
const Time2 = time2.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: format ? 'h23' : 'h11' });
const Time3 = time3.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: format ? 'h23' : 'h11' });
const Time4 = time4.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: format ? 'h23' : 'h11' });
const Time5 = time5.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: format ? 'h23' : 'h11' });
const Time6 = time6.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: format ? 'h23' : 'h11' });
const Time7 = time7.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: format ? 'h23' : 'h11' });
const Time8 = time8.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: format ? 'h23' : 'h11' });
const Time9 = time9.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: format ? 'h23' : 'h11' });
const Time10 = time10.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: format ? 'h23' : 'h11' });
const Time11= time11.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: format ? 'h23' : 'h11' });
const Time12= time12.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hourCycle: format ? 'h23' : 'h11' });
// const data = [
//     {
//       "id": "total",
//       "color": "hsl(288, 70%, 50%)",
//       "data": [
//         {
//           "x": Time1,
//           "y": 296
//         },
//         {
//           "x": Time2,
//           "y": 96
//         },
//         {
//           "x": Time3,
//           "y": 46
//         },
//         {
//           "x": Time4,
//           "y": 8
//         },
//         {
//           "x": Time5,
//           "y": 242
//         },
//         {
//           "x": Time6,
//           "y": 261
//         },
//         {
//           "x": Time7,
//           "y": 186
//         },
//         {
//           "x": Time8,
//           "y": 109
//         },
//         {
//           "x": Time9,
//           "y": 49
//         },
//         {
//           "x": Time10,
//           "y": 201
//         },
//         {
//           "x": Time11,
//           "y": 258
//         },
//         {
//           "x": Time12,
//           "y": 234
//         }
//       ]
//     },
//     {
//       "id": "helmet",
//       "color": "hsl(257, 70%, 50%)",
//       "data": [
//         {
//           "x": Time1,
//           "y": 182
//         },
//         {
//           "x": Time2,
//           "y": 273
//         },
//         {
//           "x": Time3,
//           "y": 166
//         },
//         {
//           "x": Time4,
//           "y": 109
//         },
//         {
//           "x": Time5,
//           "y": 6
//         },
//         {
//           "x": Time6,
//           "y": 125
//         },
//         {
//           "x": Time7,
//           "y": 116
//         },
//         {
//           "x": Time8,
//           "y": 158
//         },
//         {
//           "x": Time9,
//           "y": 89
//         },
//         {
//           "x": Time10,
//           "y": 135
//         },
//         {
//           "x": Time11,
//           "y": 273
//         },
//         {
//           "x": Time12,
//           "y": 276
//         }
//       ]
//     },
//     {
//       "id": "apron",
//       "color": "hsl(52, 70%, 50%)",
//       "data": [
//         {
//           "x": Time1,
//           "y": 116
//         },
//         {
//           "x": Time2,
//           "y": 50
//         },
//         {
//           "x": Time3,
//           "y": 183
//         },
//         {
//           "x": Time4,
//           "y": 205
//         },
//         {
//           "x": Time5,
//           "y": 12
//         },
//         {
//           "x": Time6,
//           "y": 177
//         },
//         {
//           "x": Time7,
//           "y": 100
//         },
//         {
//           "x": Time8,
//           "y": 217
//         },
//         {
//           "x": Time9,
//           "y": 32
//         },
//         {
//           "x": Time10,
//           "y": 1
//         },
//         {
//           "x": Time11,
//           "y": 243
//         },
//         {
//           "x": Time12,
//           "y": 199
//         }
//       ]
//     },
//     {
//       "id": "hand gloves",
//       "color": "hsl(307, 70%, 50%)",
//       "data": [
//         {
//           "x": Time1,
//           "y": 186
//         },
//         {
//           "x": Time2,
//           "y": 112
//         },
//         {
//           "x": Time3,
//           "y": 54
//         },
//         {
//           "x": Time4,
//           "y": 292
//         },
//         {
//           "x": Time5,
//           "y": 297
//         },
//         {
//           "x": Time6,
//           "y": 92
//         },
//         {
//           "x": Time7,
//           "y": 210
//         },
//         {
//           "x": Time8,
//           "y": 82
//         },
//         {
//           "x": Time9,
//           "y": 204
//         },
//         {
//           "x": Time10,
//           "y": 64
//         },
//         {
//           "x": Time11,
//           "y": 62
//         },
//         {
//           "x": Time12,
//           "y": 228
//         }
//       ]
//     },
//     {
//       "id": "goggle",
//       "color": "hsl(252, 70%, 50%)",
//       "data": [
//         {
//           "x": Time1,
//           "y": 183
//         },
//         {
//           "x": Time2,
//           "y": 289
//         },
//         {
//           "x": Time3,
//           "y": 278
//         },
//         {
//           "x": Time4,
//           "y": 169
//         },
//         {
//           "x": Time5,
//           "y": 105
//         },
//         {
//           "x": Time6,
//           "y": 160
//         },
//         {
//           "x": Time7,
//           "y": 33
//         },
//         {
//           "x": Time8,
//           "y": 293
//         },
//         {
//           "x": Time9,
//           "y": 1
//         },
//         {
//           "x": Time10,
//           "y": 147
//         },
//         {
//           "x": Time11,
//           "y": 91
//         },
//         {
//           "x": Time12,
//           "y": 278
//         }
//       ]
//     },
//     {
//       "id": "shoes",
//       "color": "hsl(252, 70%, 50%)",
//       "data": [
//         {
//           "x": Time1,
//           "y": 183
//         },
//         {
//           "x": Time2,
//           "y": 289
//         },
//         {
//           "x": Time3,
//           "y": 278
//         },
//         {
//           "x": Time4,
//           "y": 169
//         },
//         {
//           "x": Time5,
//           "y": 105
//         },
//         {
//           "x": Time6,
//           "y": 160
//         },
//         {
//           "x": Time7,
//           "y": 33
//         },
//         {
//           "x": Time8,
//           "y": 293
//         },
//         {
//           "x": Time9,
//           "y": 1
//         },
//         {
//           "x": Time10,
//           "y": 147
//         },
//         {
//           "x": Time11,
//           "y": 91
//         },
//         {
//           "x": Time12,
//           "y": 278
//         }
//       ]
//     }
//   ]
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
  // const props = {
  //   width: 900,
  // }
  const numTickValues = data[0].data.length;
  // Calculate the desired width based on the number of tick values
  const desiredWidth = numTickValues * 50; // Adjust the factor as needed
  useEffect(() => {
    handleWidth(desiredWidth);
  }, [handleWidth, desiredWidth]);
    return (
    < >
    <ResponsiveLine
        data={data}
        width={width > desiredWidth ? width : desiredWidth}
        // {...props}
        margin={{ top: 3, right: 100, bottom: 130, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        theme={customTheme}
        tooltip={({ point }) => (
          <div style={{ color: mode ? 'white' : 'black', backgroundColor: mode ? '#27293D' : 'white', padding: '3px' }}>
            {point.data.x} - Value: <strong>{point.data.y}</strong>
          </div>
        )}
        enableGridX={false}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -90,
            legend: 'time',
            legendOffset: 56,
            legendPosition: 'middle',
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'count',
            legendOffset: -40,
            legendPosition: 'middle'
        }}
        pointSize={8}
        // pointColor={{ theme: 'background' }}
        pointColor={{ from: 'color', modifiers: [] }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabelYOffset={-12}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                itemTextColor: mode ? 'black' : 'white',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
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
export default DayWiseChart;












