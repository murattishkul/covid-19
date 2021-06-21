import React, { useState } from 'react';
import Select from 'react-select';
import './Filter.css';

const options = [
    { value: 'retweets', label: 'Sort by Retweets' },
    { value: 'likes', label: 'Sort by Likes' },
    { value: 'all', label: 'All' },
];

export const Filter = ({selectedOption, setSelectedOption}) => {
    console.log(selectedOption)
    return (
      <div style={{width: 300, alignSelf:'center', marginLeft:30}}>
        <Select
          defaultValue={options[2]}
          onChange={setSelectedOption}
          options={options}
        />
      </div>
    );
}
