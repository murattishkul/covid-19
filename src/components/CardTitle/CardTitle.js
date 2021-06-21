import React from 'react';

const CardTitle = ({title}) => {
    return (
        <div style={{backgroundColor: '#272727', borderBottom:'1px black solid'}}>
            <p style={{
                // adding: '4px 8px',
                // margin: '0 auto',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                color: '#eee'
            }}>
                {title}
            </p>
        </div>
    )
}

export default CardTitle;