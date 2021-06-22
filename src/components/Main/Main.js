import React, { useState } from 'react';
import { USMap } from '../USMap'
import { MyBarChart } from '../BarChart';
import { LineChart } from '../LineChart';
import { MyPieChart } from '../PieChart';
import CardTitle from '../CardTitle/CardTitle';
import styled from 'styled-components';
import ReactTooltip from "react-tooltip";

const Main = ({data, selectedOption, sortedCountries, overseasData, sortedTimeData}) => {
    const [content, setContent] = useState("");

    return (
        <ChartsContainer>

            <USMapCard>
                <CardTitle title="US Election Tweets by States" />
                <USMapContainer>
                    <USMap setTooltipContent={setContent} selectedOption={selectedOption} data={data}/>
                    <ReactTooltip>{content}</ReactTooltip>
                </USMapContainer>
            </USMapCard>

            <RechartsContainer>
                <BarChartCardContainer>
                    <BarChartCard>
                        <CardTitle title="Us Election Tweets By Country" />
                        <BarChartContainer>
                            <MyBarChart overseasData={overseasData} sortedCountries={sortedCountries}/>
                        </BarChartContainer>
                    </BarChartCard>
                </BarChartCardContainer>

                <LinChartCard>
                    <CardTitle title="US Election Tweets of US, UK, India before elections by days" />
                    <LineChartContainer>
                        <LineChart style={{alignSelf:'center'}} sortedTimeData={sortedTimeData}/>
                    </LineChartContainer>
                </LinChartCard>
            </RechartsContainer>

        </ChartsContainer>
    )
}
const BarChartCardContainer = styled.div`
    display: flex; 
    width: 100%; 
    height: 45%; 
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
`
const LineChartContainer = styled.div`
    height: 100%; 
    align-items: center; 
    display: flex; 
    justify-content: center; 
    background:#252525;
`

const ChartsContainer = styled.div`
    display: flex;
    width: 100%;
    height: 95%;
    margin-bottom: 10px;
`

const USMapCard = styled.div`
    width: 40%;
    align-self:center;
    display:flex;
    flex-direction:column;
    justify-content: stretch;
    height:100%;
    border: 1px solid black;
    margin-right: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.7);
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
    height: 100%;
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