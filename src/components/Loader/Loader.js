import React from 'react';
import Loader from 'react-loader-spinner';

export const LoaderLarge = () => (
  <div className="loader">
    <Loader type="ThreeDots" color="#FFFFFF" height={100} width={100} />
    <p style={{fontSize: '30px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', color: '#eee'}}>
        Please wait while awesome data is fetching...
    </p>
    <p style={{fontSize: '30px', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', color: '#eee'}}>
        it may take up to a minute...
    </p>
  </div>
);
