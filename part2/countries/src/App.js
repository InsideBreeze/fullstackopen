import axios from "axios";
import React, { useEffect, useState } from "react";
import Country from "./components/Country";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((result) => {
      setCountries(result.data);
    });
  }, []);

  const filteredCountries =
    countries.length === 0
      ? countries
      : countries.filter((country) =>
          country.name.common.toLowerCase().includes(filter.toLowerCase())
        );

  const parseFilteredCountries = () => {
    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (filteredCountries.length > 1) {
      return filteredCountries.map((country) => (
        <CountryLine key={country.name.common} country={country} />
      ));
    } else if (filteredCountries.length === 1) {
      return <Country country={filteredCountries[0]} />;
    }
  };
  return (
    <div className="">
      <div className="">
        find countries{" "}
        <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      </div>
      {filter && parseFilteredCountries()}
    </div>
  );
};

const CountryLine = ({ country }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      {country.name.common}{" "}
      <button onClick={() => setShow(!show)}>{show ? "hide" : "show"}</button>
      <div className="" style={{ display: `${show ? "" : "none"}` }}>
        <Country country={country} />
      </div>
    </div>
  );
};

export default App;
