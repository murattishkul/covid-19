import React, { useState, useEffect } from 'react';
import Main from './components/Main/Main';
import Header from './components/Header/Header';
import { LoaderLarge } from './components/Loader/Loader';
import './App.css';
import { csv } from 'd3-fetch';
import styled from 'styled-components';

function App() {
  const [data, setData] = useState([]);
  const [wholeData, setWholeData] = useState([]);
  const [overseasData, setOverseasData] = useState([]);
  const [sortedCountries, setSortedCountries] = useState([]);
  const [sortedTimeData, setSortedTimeData] = useState([]);
  const [selectedOption, setSelectedOption] = useState({value:'all', label:'All'});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log('start')
    setIsLoading(true);
    csv("/hashtag_joebiden.csv").then(csvData => {
      setData(csvData.filter( i => i.country.indexOf('America') > -1 ));
      let hash = {}
      let overseas = csvData.filter( i => i.country.indexOf('America') === -1 && i.country !== '' );
      overseas.forEach( i => { 
        hash[i.country] = hash[i.country] ? [...hash[i.country], i] : [i];
      })
      let suka = Object.keys(hash);
      suka.sort( (a,b) => hash[a].length - hash[b].length)
      setSortedCountries(suka)
      setOverseasData(hash)
      let murat = suka.slice(Math.max(186 - 3, 1)).map( country => (hash[country].sort((a,b)=> new Date(a.created_at) - new Date(b.created_at)))).flat()
      let godata = {}
      murat.forEach( countryData => { godata[countryData.created_at.substring(0,10)] = { tweet_us: 0, tweet_uk: 0, tweet_in: 0, created_at: countryData.created_at.substring(0,10) }; })
      murat.forEach( (item, index) => {
        if(item.country === "United Kingdom"){
          godata[item.created_at.substring(0,10)].tweet_uk++;
        } else if(item.country === "United States"){ 
          godata[item.created_at.substring(0,10)].tweet_us++;
        } else if(item.country === "India"){
          godata[item.created_at.substring(0,10)].tweet_in++;
        }
      })
      setSortedTimeData(Object.keys(godata).map(i => godata[i]))
      setWholeData(csvData);
      console.log('end')
    }).finally(()=>setIsLoading(false));
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
          data={data} 
          style={{height:'90%', marginTop: 10}} 
          selectedOption={selectedOption}
          sortedCountries={sortedCountries}
          overseasData={overseasData}
          sortedTimeData={sortedTimeData}
        />
      }
      { isLoading && <DummyContainer /> }
    </AppContainer>
  );
}

const AppContainer = styled.div`
  height: 100vh ;
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
