import React from 'react'

const LineChart = () => {
    const data = [
        {
          "id": "japan",
          "data": [
            {
              "x": "patient1",
              "y": 203
            },
            {
              "x": "patient2",
              "y": 181
            },
            {
              "x": "patient3",
              "y": 241
            },
            {
              "x": "patient4",
              "y": 36
            },
            {
              "x": "patient5",
              "y": 273
            },
            {
              "x": "patient6",
              "y": 260
            },
          ]
        },
        
      ]
    return (
        <ResponsiveLine
            data={data}
            margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
            xScale={{ type: 'point' }}
            yScale={{
                type: 'linear',
                min: 'auto',
                max: 'auto',
                stacked: true,
                reverse: false
            }}
            yFormat=" >-.2f"
            curve="natural"
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'transportation',
                legendOffset: 36,
                legendPosition: 'middle'
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'speed by minutes',
                legendOffset: -40,
                legendPosition: 'middle'
            }}
            colors={['#3540d8']}
            borderColor='#3540d8'
            pointSize={10}
            pointColor={{ theme: 'background' }}
            pointBorderWidth={2}
            pointBorderColor='#3540d8'
            pointLabelYOffset={-12}
            enableArea={true}
            areaBaselineValue={30}
            areaOpacity={0.15}
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
                    symbolBorderColor: '#3540d8',
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
    )
}

export default LineChart