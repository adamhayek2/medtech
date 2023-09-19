import React from 'react'
import { ResponsiveLine } from '@nivo/line'

const LineChart = ({data}) => {
    const formattedData = [data]
    return (
        <ResponsiveLine
            data={formattedData}
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
                legend: 'Patients',
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
        />
    )
}

export default LineChart