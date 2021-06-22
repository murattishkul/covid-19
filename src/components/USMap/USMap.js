import React, { useState, useEffect } from "react";
import { 
    ComposableMap,
    Geographies,
    Geography,
    Marker,
    Annotation
 } from "react-simple-maps";
import { scaleQuantize } from "d3-scale";
import { csv } from "d3-fetch";
import { LoaderLarge } from "../Loader/Loader";
import allStates from "../../data/allStates.json";
import { geoCentroid } from "d3-geo";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const colorScale = scaleQuantize()
  .domain([1, 200])
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

const colorScaleAll = scaleQuantize()
  .domain([1, 25000])
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

const offsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21]
}

export const USMap = ({data, setTooltipContent, selectedOption}) => {
    const [mapData, setMapData] = useState([])
    useEffect(() => {
      let hash = {}
      data.forEach(i => {
        if (selectedOption?.value === 'retweets'){
            hash[i.state] = hash[i.state] ? ( hash[i.state].retweet_count > i.retweet_count ? hash[i.state] : i) : i;
        } else if (selectedOption?.value === 'likes'){
            hash[i.state] = hash[i.state] ? ( hash[i.state].likes > i.likes ? hash[i.state] : i) : i;
        } else {
            hash[i.state] = hash[i.state] ? [...hash[i.state], i]: [i];
        }
      })
      setMapData(hash);
    }, [setMapData, data, selectedOption]);

    // console.log(mapData)
    // console.log(selectedOption)

  return (
    <div>
      {
        mapData !== [] ? 
        <ComposableMap projection="geoAlbersUsa" data-tip="">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>{
            return geographies.map(geo => {
              let convertedData 
              if(selectedOption?.value !== 'all')  convertedData = Object.keys(mapData).map( i => mapData[i]);
              else convertedData = Object.keys(mapData).map( i => ({state: i, tweets: mapData[i].length }));
              const cur = convertedData.find(s => s.state === geo.properties.name );
              return (
                  <>
                    <Geography
                      style={{
                        default: { outline: "none" },
                        hover: { outline: "none" },
                        pressed: { outline: "none" },
                      }}
                      key={geo.rsmKey}
                      geography={geo}
                      fill={
                        (selectedOption?.value === 'retweets' || selectedOption?.value === 'likes') ?
                          colorScale(cur ? parseInt(cur.likes) : "#EEE") :
                          colorScaleAll(cur ? parseInt(cur.tweets) : "#EEE")
                      }
                      onMouseEnter={() => {
                        const { name } = geo.properties;
                        if (selectedOption?.value === 'retweets'){
                          setTooltipContent(`${name} — ${parseInt(cur?.retweet_count)} maximum retweets`);
                        } else if (selectedOption?.value === 'likes'){
                          setTooltipContent(`${name} — ${parseInt(cur?.likes)} maximum likes`);
                        } else {
                          setTooltipContent(`${name} — ${parseInt(cur?.tweets)} total tweets`); 
                        }
                      }}
                      onMouseLeave={() => { setTooltipContent(""); }}
                    />
                    {
                      geographies.map(geo => {
                        const centroid = geoCentroid(geo);
                        const cur = allStates.find(s => s.val === geo.id);
                        return (
                          <g key={geo.rsmKey + "-name"}>
                            {cur &&
                              centroid[0] > -160 &&
                              centroid[0] < -67 &&
                              (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                                <Marker coordinates={centroid}>
                                  <text y="2" fontSize={14} textAnchor="middle">
                                    {cur.id}
                                  </text>
                                </Marker>
                              ) : (
                                <Annotation
                                  subject={centroid}
                                  dx={offsets[cur.id][0]}
                                  dy={offsets[cur.id][1]}
                                >
                                  <text x={4} fontSize={14} alignmentBaseline="middle">
                                    {cur.id}
                                  </text>
                                </Annotation>
                              ))}
                          </g>
                        );
                      })
                    }
                  </>
                );
            })
          }}
        </Geographies>
      </ComposableMap>
      : <LoaderLarge />
    }
    </div>
  );
};
