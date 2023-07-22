
import { ResponsivePie } from '@nivo/pie'
import { ModeContext } from '../../components/MiniDrawer/MiniDrawer'
import React,{useContext,useEffect} from "react";
const ZoneWisePieChart = ({data}) => {
    const { mode} = useContext(ModeContext);
    const isSmallScreen = window.innerWidth<768;
    return (<>
    <ResponsivePie
        data={data}
        margin={{ top: isSmallScreen? 0 : 20, right: isSmallScreen ? 30 : 80, bottom: 160, left: isSmallScreen? 30 :80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        tooltip={({ datum }) => (
            <div style={{color:mode?'white' : 'black',backgroundColor:mode ? '#27293D' : 'white',padding:'5px', borderRadius:'5px'}}>
              {datum.id} : <strong> {datum.value} </strong>
            </div>
          )}
        activeOuterRadiusOffset={8}
        borderWidth={1}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    0.2
                ]
            ]
        }}
        enableArcLinkLabels={false}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    2
                ]
            ]
        }}
        defs={[
            {
                id: 'dots',
                type: 'patternDots',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                size: 4,
                padding: 1,
                stagger: true
            },
            {
                id: 'lines',
                type: 'patternLines',
                background: 'inherit',
                color: 'rgba(255, 255, 255, 0.3)',
                rotation: -45,
                lineWidth: 6,
                spacing: 10
            }
        ]}
        fill={[
            {
                match: {
                    id: 'ruby'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'c'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'go'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'python'
                },
                id: 'dots'
            },
            {
                match: {
                    id: 'scala'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'lisp'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'elixir'
                },
                id: 'lines'
            },
            {
                match: {
                    id: 'javascript'
                },
                id: 'lines'
            }
        ]}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 50,
                translateY: 56,
                itemsSpacing: 5,
                itemWidth: 100,
                itemHeight: 18,
                itemTextColor: mode ? 'black':'white',
                itemDirection: 'left-to-right',
                itemOpacity: 1,
                symbolSize: 12,
                symbolShape: 'circle',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemTextColor: '#000'
                        }
                    }
                ]
            }
        ]}
    />
    </>)
}
export default ZoneWisePieChart;














