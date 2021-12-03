import React, { useState, useEffect } from 'react';
import Main from './components/Main/Main';
import Header from './components/Header/Header';
import { LoaderLarge } from './components/Loader/Loader';
import './App.css';
import { csv } from 'd3-fetch';
import styled from 'styled-components';

function App() {
  const [selectedOption, setSelectedOption] = useState({value:'Total Cases', label:'Total Cases'});

  const [usData, setUsData] = useState({});
  const [worldData, setWorldData] = useState([]);
  const [worldTimeData, setWorldTimeData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    csv("/usa_covid_data.csv").then( csvData => setUsData(csvData))
      .finally(() => setIsLoading(false));

    csv("/worldometer_data.csv").then( csvData => {
      delete csvData.columns;
      setWorldData(csvData)
    }).finally(() => setIsLoading(false));

    csv("/covid_19_clean_complete.csv").then( csvData => setWorldTimeData(csvData))
      .finally(() => setIsLoading(false));

  }, []);

  
  return (
    <AppContainer className="App" style={{}}>
      <Header 
        style={{height:'10%'}} 
        selectedOption={selectedOption} 
        setSelectedOption={setSelectedOption} 
      />
      {
        isLoading ? 
        <LoaderLarge /> :
        <Main 
          style={{height:'90%', marginTop: 10}}
          selectedOption={selectedOption}
          usData={usData}
          worldData={worldData}
          worldTimeData={worldTimeData}
        />
      }
      { isLoading && <DummyContainer /> }
    </AppContainer>
  );
}

const AppContainer = styled.div`
  // height: 100vh ;
  display: flex ;
  flex-direction: column ;
  justify-content: ${ props => props.isLoading ? 'space-between' : 'space-evenly'} ;
  align-items: center ;
  margin-left: 30px;
  margin-right: 30px; 
`

const DummyContainer = styled.div`
  height: 30%;
`

export default App;
