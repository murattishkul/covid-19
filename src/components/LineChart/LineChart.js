import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const LineChart = ({sortedTimeData}) => {
//   static demoUrl = 'https://codesandbox.io/s/stacked-area-chart-ix341';
    console.log(sortedTimeData)
    return (
      <ResponsiveContainer width="90%" height="90%" style={{zIndex: 999}}>
        <AreaChart
          width={'90%'}
          height={'80%'}
          data={sortedTimeData}
          margin={{
            top: 10,
            right: 3,
            left: 0,
            bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="created_at" angle={-15} textAnchor="end"/>
          <YAxis />
          <Tooltip />
          <Area type="monotone" dataKey="tweet_us" stackId="1" stroke="#8884d8" fill="#8884d8" />
          <Area type="monotone" dataKey="tweet_uk" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          <Area type="monotone" dataKey="tweet_in" stackId="1" stroke="#ffc658" fill="#ffc658" />
        </AreaChart>
      </ResponsiveContainer>
    );
}
