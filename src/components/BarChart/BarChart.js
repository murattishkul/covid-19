import React, { useEffect, useState } from 'react';
import { 
  BarChart,
  Bar,
  Brush,
  ReferenceLine,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
 } from "recharts";
 import { scaleQuantize } from "d3-scale";

 const colorScaleBar = scaleQuantize()
    .domain([1, 20000])
    .range([
      "#ffedea",
      "#ffcec5",
      "#ffad9f",
      "#ff8a75",
      "#ff5533",
      "#e2492d",
      "#be3d26",
      "#9a311f",
      "#782618"
    ]);

export const MyBarChart = ({overseasData, sortedCountries}) => {
    const [barData, setBarData] = useState([])
    useEffect(()=>{
      let s = sortedCountries.map(country => ({ country, tweets: overseasData[country].length })).slice(Math.max(185 - 20, -2));
      setBarData(s);
    },[sortedCountries,overseasData])

    // console.log(barData);

    return (
      <ResponsiveContainer width="100%" height={"98%"}>
      <BarChart
        width={"100%"} height={"100%"} data={barData} layout="vertical"
        margin={{
          top: 5,
          right: 5,
          left: 40,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="tweets"/>
        <YAxis type="category" dataKey="country"/>
        <Tooltip />
        {/* <Legend verticalAlign="bottom" wrapperStyle={{ lineHeight: '-20px' }} /> */}
        <Brush dataKey="tweets" height={20} stroke="#8884d8" layout="vertical"/>
        {/* <Bar dataKey="pv" fill="#8884d8" /> */}
        <Bar dataKey="tweets">
          {
          	barData.map((entry, index) => {
            	// const color = entry.tweets > 4000 ? COLORS[0] : COLORS[1];
              // console.log(entry.tweets)
            	return <Cell fill={colorScaleBar(entry.tweets)} />;
            })
          }
        </Bar>
        {/* <Bar background label dataKey="foo" fill="#8884d8" /> */}
      </BarChart>
    </ResponsiveContainer>
      );
}
