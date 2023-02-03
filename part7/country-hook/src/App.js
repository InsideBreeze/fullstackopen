import { useEffect, useState } from "react";

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then(response => {
        response.json().then(data => {
          if (data.status === 404) {
            setCountry(null);
          } else {
            setCountry(data[0]);
          }
        })
      })
  }, [name])
  return country;
}

const Country = ({ country }) => {
  if (!country) {
    return <p>country not found</p>
  }
  return (
    <>
      <h3>{country.name.common}</h3>
      capital {country.capital[0]} <br />
      population {country.population} <br />
      <img src={country.flags.png} alt={country.name.common} />
    </>
  )
}

function App() {
  const nameInput = useField("text")
  const [search, setSearch] = useState("");
  const country = useCountry(search);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearch(nameInput.value);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input {...nameInput} />
        <button type="submit">find</button>
      </form>
      {
        search !== "" && <Country country={country} />
      }

    </>
  )
}

export default App;
