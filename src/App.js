import React, { useState, useEffect } from 'react';
import Main from './components/Main/Main';
import Header from './components/Header/Header';
import { LoaderLarge } from './components/Loader/Loader';
import './App.css';
import { csv } from 'd3-fetch';

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
      // suka.forEach(i => console.log(i, hash[i].country, hash[i].length));
      setSortedCountries(suka)
      setOverseasData(hash)
      let murat = suka.slice(Math.max(186 - 3, 1)).map( country => (hash[country].sort((a,b)=> new Date(a.created_at) - new Date(b.created_at)))).flat()
      console.log(murat);
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
      // console.log(Object.keys(godata).map(i => godata[i]))
      setSortedTimeData(Object.keys(godata).map(i => godata[i]))
      setWholeData(csvData);
      console.log('end')
    }).finally(()=>setIsLoading(false));
  }, []);

  console.log('this is my data ',overseasData);
  console.log(selectedOption)
  console.log(sortedTimeData)

  /*
    city: ""
    collected_at: "2020-10-21 08:49:42.685150223"
    continent: "North America"
    country: "United States of America"
    created_at: "2020-10-19 14:31:41"
    lat: "36.7014631"
    likes: "0.0"
    long: "-118.75599740000001"
    retweet_count: "0.0"
    source: "Twitter for iPhone"
    state: "California"
    state_code: "CA"
    tweet: "This is complete **BS**\n#Laptop\n#Biden\n#PayToPlay https://t.co/5JdJGy4EGc"
    tweet_id: "1.318198138922922e+18"
    user_description: "Professional, Catholic, Conservative. I need economic prosperity, not a government that wants to trade my freedom for a handout. THE DOGMA LIVES LOUDLY."
    user_followers_count: "596.0"
    user_id: "459018431.0"
    user_join_date: "2012-01-09 06:01:28"
    user_location: "California"
    user_name: "GOPProsperity"
    user_screen_name: "GOPProsperity
  */
  
  return (
    <div className="App" style={{height:'100vh', display: 'flex', flexDirection:'column', justifyContent:`${isLoading ? 'space-between' : 'space-evenly'}`, alignItems:'center', marginLeft: 30, marginRight:30}}>
      <Header style={{height:'10%'}} selectedOption={selectedOption} setSelectedOption={setSelectedOption} />
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
      {
        isLoading &&
        <div style={{height:'30%'}}></div> 
      }
    </div>
  );
}

export default App;
