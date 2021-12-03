import React from 'react';
import { Filter } from '../Filter'
import styled from 'styled-components';

const Header = ({selectedOption, setSelectedOption}) => {
    return (
        <HeaderContainer>
            <Filter selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
            <TitleContainer>
                <HeaderText>Covid-19 Data Visualization</HeaderText>
            </TitleContainer>
            <MadeByContainer>
                <MadeBy>{"Made by Murat Tishkul id20162035 "}</MadeBy>
                <MadeBy>{" for Interdisciplinary Project Fall 2021"}</MadeBy>
            </MadeByContainer>
        </HeaderContainer>
    )
}

const HeaderContainer = styled.div`
    width: 100%;
    margin: 20px;
    display: flex;
    justify-content: space-between;
    border: 1px solid black;
    background-color: #252525;
    box-shadow: 0 0 10px rgba(0,0,0,0.7);
`

const HeaderText = styled.p`
    text-overflow: ellipsis ;
    overflow: hidden ;
    white-space: nowrap ;
    color: #eee ;
    font-size: 20px ;
`
const TitleContainer = styled.div`
    justify-content: center;
    align-self: center;
`

const MadeBy = styled.p`
    text-overflow: ellipsis ;
    overflow: hidden ;
    white-space: nowrap ;
    color: #eee ;
    font-size: 13px ;
`
const MadeByContainer = styled.div`
    width: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-top: 5px;
    padding-bottom: 5px;
    p {
      margin: 0;
    }
`

export default Header; 