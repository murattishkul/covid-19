import React, {useState, useEffect} from 'react';
import {Bar, BarChart, Brush, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell} from "recharts";
import {scaleQuantize} from "d3-scale";

const colorScaleBar = scaleQuantize()
  .domain([5000, 40000])
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

export const MyBarChart = ({overseasData, sortedCountries, worldData}) => {
  const [barData, setBarData] = useState([])

  useEffect(()=>{
    console.log(worldData)
    if(worldData!={}) setBarData(worldData?.sort((a,b)=>a["Tot Cases/1M pop"] - b["Tot Cases/1M pop"]).slice(100));
  },[worldData])

  console.log(worldData);
    return (barData === [] ? "suka" :
      <ResponsiveContainer width={"100%"} height={400}>
      <BarChart
        width={500}
        data={barData}
        margin={{ top: 5, right: 5, left: 40, bottom: 5,}}
      >
        <CartesianGrid strokeDasharray="3 3"/>
        <YAxis dataKey="Tot Cases/1M pop" domain={[0, 40000]}/>
        <XAxis type="category" dataKey="Country/Region"/>
        <Tooltip/>
        <Brush
          dataKey="Tot Cases/1M pop"
          height={40}
          stroke="#8884d8"
          layout="vertical"
          // startIndex={100}
          // endIndex={120}
        />

        <Bar dataKey="Tot Cases/1M pop">
          { barData?.map( entry  => {
            console.log(entry)
            return <Cell fill={colorScaleBar(entry["Tot Cases/1M pop"])}/>
          } ) }
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}