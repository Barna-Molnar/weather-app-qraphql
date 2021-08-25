import React, { useState, useRef } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_WEATHER_QUERY } from '../graphql/Queries';

function Home() {
  const inputRef = useRef();
  const [city, setCity] = useState('');
  const [getWeather, { loading, data, error }] = useLazyQuery(
    GET_WEATHER_QUERY,
    {
      variables: { name: city },
    }
  );

  if (error) return <h1>Error found</h1>;
  if (data) {
    console.log(data);
  }

  return (
    <div className="home">
      <h1>Search for the weather</h1>
      <input
        ref={inputRef}
        type="text"
        placeholder="city name"
        onChange={(event) => {
          setCity(event.target.value);
        }}
      />
      <button
        onClick={() => {
          getWeather();
          inputRef.current.value = '';
          //   console.log(inputRef);
        }}
      >
        search
      </button>
      {data && !loading && (
        <>
          <div>
            <h1>{data.getCityByName.name}</h1>
            <h1>{data.getCityByName.weather.temperature.actual}</h1>
            <h1>{data.getCityByName.weather.summary.description}</h1>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
