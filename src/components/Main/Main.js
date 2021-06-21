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
                    <USMap data={data} setTooltipContent={setContent} selectedOption={selectedOption}/>
                    <ReactTooltip>{content}</ReactTooltip>
                </USMapContainer>
            </USMapCard>

            <div style={{display: 'flex', flexDirection: 'column', width:'60%', height:'100%', marginLeft: 10,}}>

                <div style={{display: 'flex', width:'100%', height:'45%', marginBottom: 10}}>

                    <div style={{width:'100%', alignSelf:'center', display:'flex', flexDirection:'column', justifyContent:'stretch', height:'100%', marginRight: 10, border:'1px solid black', boxShadow: '0 0 10px rgba(0,0,0,0.7)' }}>
                        <CardTitle title="Us Election Tweets By Country" />
                        <div style={{ height:'100%', alignItems:'center', display:'flex', background:'#252525'}}>
                            <MyBarChart overseasData={overseasData} sortedCountries={sortedCountries} data={data}/>
                        </div>
                    </div>

                    {/* <div style={{width:'50%', alignSelf:'center', display:'flex', flexDirection:'column', justifyContent:'stretch', height:'100%', marginLeft: 10, border:'1px solid black'}}>
                        <CardTitle title="Car Accidents by Geocoded Location" />
                        <div style={{ height:'100%', alignItems:'center', display:'flex', background:'#252525'}}>
                            <MyPieChart data={data}/>
                        </div>
                    </div> */}

                </div>

                <div style={{height:'55%',  display:'flex', flexDirection:'column', justifyContent:'center', marginTop: 10, border:'1px solid black', boxShadow: '0 0 10px rgba(0,0,0,0.7)'}}>
                    <CardTitle title="US Election Tweets by days and by country (US, UK, India)" />
                    <div style={{ height:'100%', alignItems:'center', display:'flex', justifyContent:'center', background:'#252525'}}>
                        <LineChart  data={data} style={{alignSelf:'center'}} sortedTimeData={sortedTimeData}/>
                    </div>
                </div>
            </div>

        </ChartsContainer>
    )
}

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

export default Main;