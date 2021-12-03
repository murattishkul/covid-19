import React, {useEffect, useState} from 'react';
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';


export const LineChart = ({worldTimeData, date}) => {
  console.log(worldTimeData)
  const [lineData, setLineData] = useState([]);
  useEffect(() => {
    setLineData(worldTimeData.filter(data => data["Date"] === date.toISOString().slice(0, 10)));
  }, [date, worldTimeData])
  // console.log(lineData)
  return (
    <div style={{width: '100%'}}>

      <ResponsiveContainer width={"100%"} height={400} style={{zIndex: 999, alignSelf: 'center'}}>
        <AreaChart
          width={500}
          data={lineData}
          margin={{top: 10, right: 3, left: 40, bottom: 10}}
        >
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="Country/Region" angle={-15} textAnchor="end"/>
          <YAxis/>
          <Tooltip/>
          <Area type="monotone" dataKey="Deaths" stackId="1" stroke="#8884d8" fill="#8884d8"/>
          <Area type="monotone" dataKey="Recovered" stackId="1" stroke="#82ca9d" fill="#82ca9d"/>
          <Area type="monotone" dataKey="Confirmed" stackId="1" stroke="#ffc658" fill="#ffc658"/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
