import React, {useState} from 'react';
import {USMap} from '../USMap'
import {MyBarChart} from '../BarChart/BarChart';
import {LineChart} from '../LineChart';
import CardTitle from '../CardTitle/CardTitle';
import styled from 'styled-components';
import ReactTooltip from "react-tooltip";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Main = ({selectedOption, usData, worldData, worldTimeData}) => {
  const [content, setContent] = useState("");
  const [pops, setPops] = useState("");
  const [date, setDate] = useState(new Date('2020-07-27'));

  return (
    <ChartsContainer>

      <USMapCard>
        <CardTitle title="US Covid Data by States"/>
        <USMapContainer>
          <USMap
            setPops={setPops}
            setTooltipContent={setContent}
            selectedOption={selectedOption}
            data={usData}
          />
          <ReactTooltip>{content}<br/>{pops}</ReactTooltip>
        </USMapContainer>
      </USMapCard>

      <BarChartCardContainer>
        <BarChartCard>
          <CardTitle title="Total Cases by 1 Million of population By Country"/>
          <BarChartContainer>
            <MyBarChart worldData={worldData}/>
          </BarChartContainer>
        </BarChartCard>
      </BarChartCardContainer>

      {/*<RechartsContainer>*/}
      <LinChartCard>
        <CardTitle title="Covid Data By Country in TimeLine"/>
        <LineChartContainer>
          <div style={{marginTop:10,marginBottom:5}}>
          <DatePicker
            selected={date}
            onChange={(date) => setDate(date)}
            minDate={new Date('2020-01-22')}
            maxDate={new Date('2020-07-27')}
            // style={{width: 100}}
          />
          </div>
          <LineChart
            date={date}
            style={{alignSelf: 'center'}}
            worldTimeData={worldTimeData}
          />
        </LineChartContainer>
      </LinChartCard>
      {/*</RechartsContainer>*/}

    </ChartsContainer>
  )
}
const BarChartCardContainer = styled.div`
    display: flex; 
    width: 100%; 
    // height: 45%; 
    margin-bottom: 10px;
`
const LinChartCard = styled.div`
    height: 55%; 
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
    margin-top: 10px; 
    border: 1px solid black; 
    box-shadow: 0 0 10px rgba(0,0,0,0.7);
`;
const LineChartContainer = styled.div`
    height: 100%; 
    align-items: center; 
    display: flex; 
    flex-direction: column;
    justify-content: center; 
    background: #252525;
`;

const ChartsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    // height: 95%;
    margin-bottom: 10px;
`;

const USMapCard = styled.div`
    // width: 40%;
    align-self:center;
    display:flex;
    flex-direction:column;
    justify-content: stretch;
    height:100%;
    border: 1px solid black;
    margin-right: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.7);
    margin-bottom: 20px;
`

const USMapContainer = styled.div`
    height: 100%;
    background:#252525;
    display: flex;
    flex-direction: column;
    justify-content: center;
`
const BarChartContainer = styled.div`
    height: 100%;
    align-items: center;
    display: flex;
    background: #252525;
`
const BarChartCard = styled.div`
    width: 100%;
    align-self: center;
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    // height: 100%;
    margin-right: 10px;
    border: 1px solid black;
    box-shadow: 0 0 10px rgba(0,0,0,0.7); 
`
const RechartsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 60%;
    height: 100%;
    margin-left: 10px;
`

export default Main;