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
  .domain([1000, 20000])
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

const colorScaleCases = scaleQuantize()
  .domain([1, 1e6])
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

const colorScaleTests = scaleQuantize()
  .domain([1, 20e6])
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

export const USMap = ({data, setTooltipContent, selectedOption, setPops}) => {

  return (
    <div style={{}}>
      {
        data !== [] ?
        <ComposableMap projection="geoAlbersUsa" data-tip="">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>{
            return geographies.map(geo => {
              const cur = data.find(d => d.State === geo.properties.name)

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
                        (selectedOption?.value === 'Total Deaths') ?
                          colorScale(cur ? parseInt(cur["Total Deaths"]) : "#EEE") :
                          (
                            (selectedOption?.value === 'Total Tests') ?
                              colorScaleTests(cur ? parseInt(cur["Total Tests"]) : "#EEE") :
                              colorScaleCases(cur ? parseInt(cur["Total Cases"]) : "#EEE")
                          )
                      }
                      onMouseEnter={() => {
                        const { name } = geo.properties;
                        let tooltip = ""
                        if (selectedOption?.value === 'Total Deaths' && cur){
                          tooltip+=`${name} — ${parseInt(cur["Total Deaths"])} total deaths`;
                        } else if (selectedOption?.value === 'Total Cases' && cur){
                          tooltip+=`${name} — ${parseInt(cur["Total Cases"])} total Cases`;
                        } else if (selectedOption?.value === 'Total Tests'  && cur){
                          tooltip+=`${name} — ${parseInt(cur["Total Tests"])} total tests`;
                        }
                        setTooltipContent(tooltip);
                        setPops(`Population — ${parseInt(cur["Population"])}`)
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
