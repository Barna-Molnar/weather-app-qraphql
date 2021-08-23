import React from 'react';
import { useLazyQuery } from '@apollo/client';

function Home() {
  return (
    <div className="home">
      <h1>Search for the weather</h1>
      <input type="text" placeholder="city name" />
      <button>search</button>
    </div>
  );
}

export default Home;
