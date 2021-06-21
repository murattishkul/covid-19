import React from 'react';
import { Filter } from '../Filter'

const Header = ({selectedOption, setSelectedOption}) => {
    return (
        <div style={{display:'flex',justifyContent:'space-between',border: '1px solid black', width: '100%', margin: 20, backgroundColor: '#252525'
        , boxShadow: '0 0 10px rgba(0,0,0,0.7)'
       }}>
            <Filter selectedOption={selectedOption} setSelectedOption={setSelectedOption}/>
            <div style={{justifyContent: 'center', alignSelf:'center'}}>
                <p style={{textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                color: '#eee',
                fontSize:'20px'}}>
                    US Election 2020 Tweets
                </p>
                
            </div>
            <div style={{width: 300, display:'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
                <p style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', color: '#eee', fontSize:'13px'}}>
                    {"Made by Murat Tishkul id20162035 "}
                </p>
                <p style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', color: '#eee', fontSize:'13px'}}>
                    {" for InvoVis class of Spring 2021"}
                </p>
            </div>
        </div>
    )
}

export default Header; 