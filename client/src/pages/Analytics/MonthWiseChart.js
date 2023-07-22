import { ResponsiveLine } from '@nivo/line'
import { useContext,useEffect } from 'react'
import { ModeContext } from '../../components/MiniDrawer/MiniDrawer'
// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const MonthWiseChart = ({width2,handleWidth2,data}) => {
  const {mode} =useContext(ModeContext)
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
  const numTickValues = data[0].data.length;
  // Calculate the desired width based on the number of tick values
  const desiredWidth2 = numTickValues * 50; // Adjust the factor as needed
  useEffect(() => {
    handleWidth2(desiredWidth2);
  }, [handleWidth2, desiredWidth2]);
    return (
    <>
    <ResponsiveLine
        data={data}
        margin={{ top: 3, right: 100, bottom: 130, left: 60 }}
        width={width2 > desiredWidth2 ? width2 : desiredWidth2}
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
            legendPosition: 'middle'
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
                ],
            }
        ]}
    />
    </>
)
}
export default MonthWiseChart;

























