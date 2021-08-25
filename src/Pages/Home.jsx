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
  if (data === null) console.log(data);
  if (data) {
    console.log(data);
  }

  return (
    <form
      className="home"
      onSubmit={(event) => {
        event.preventDefault();
        getWeather();
        inputRef.current.value = '';
      }}
    >
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
      {data?.getCityByName && !loading && (
        <>
          <div>
            <h1>Name of the city: {data.getCityByName?.name}</h1>
            <h1>
              Actual temperature:
              {data.getCityByName?.weather.temperature.actual}
            </h1>
            <h1>
              Weather descrip.:{' '}
              {data.getCityByName?.weather.summary.description}
            </h1>
            <h1>Wind speed: {data.getCityByName?.weather.wind.speed}</h1>
          </div>
        </>
      )}
    </form>
  );
}

export default Home;
