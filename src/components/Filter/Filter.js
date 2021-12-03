import React, { useState } from 'react';
import Select from 'react-select';
import styled from 'styled-components';
import './Filter.css';

const options = [
    { value: 'Total Tests', label: 'Total Tests' },
    { value: 'Total Deaths', label: 'Total Deaths' },
    { value: 'Total Cases', label: 'Total Cases' },
];

export const Filter = ({selectedOption, setSelectedOption}) => (
  <FilterContainer>
    <Select
      defaultValue={options[2]}
      onChange={setSelectedOption}
      options={options}
    />
  </FilterContainer>
);


const FilterContainer = styled.div`
    width: 300px;
    align-self: center;
    margin-left: 30px;
`
