import axios from "axios";
import React, { useEffect, useState } from "react";

const Country = ({ country }) => {
  //   https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${country.capitalInfo?.latlng[0]}&lon=${country.capitalInfo?.latlng[1]}&appid=${process.env.REACT_APP_API_KEY}`
      )
      .then((result) => {
        setWeather(result.data);
      });
  }, [country]);

  return (
    <div className="">
      <h1>{country.name.common}</h1>
      capital {country.capital[0]} <br />
      area {country.area}
      <h2>languages:</h2>
      <ul>
        {Object.values(country.languages).map((lang) => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <img style={{ width: "250px" }} src={country.flags?.png} alt="" />
      <h2>Weather in {country.capital[0]}</h2>
      {weather && (
        <>
          <p>temperature {weather.main.temp}</p>
          <img
            src={`http://openweathermap.org/img/wn/${weather?.weather?.[0]?.icon}@2x.png`}
            alt=""
          />
          <p>wind {weather.wind.speed} m/s</p>
        </>
      )}
    </div>
  );
};

export default Country;
