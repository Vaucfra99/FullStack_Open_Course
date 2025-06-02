import { useEffect } from 'react';
import { useState } from 'react';
import dbService from './services/countries';
import Countries from './components/Countries';
import SearchBar from './components/SearchBar';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setFilter] = useState('');

  const countriesToShow = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(newFilter.toLowerCase());
  });

  useEffect(() => {
    dbService
      .getAll()
      .then((response) => {
        setCountries(response);
      })
      .catch((error) => {
        alert(`Something wrong happened :( ${error}`);
      });
  }, []);

  const countryHandler = (event) => {
    setFilter(event.target.value);
  };

  const showHandler = (country) => {
    return () => {
      setFilter(country);
    };
  };

  return (
    <>
      <SearchBar filterValue={newFilter} countryHandler={countryHandler} />
      <Countries countries={countriesToShow} showHandler={showHandler} />
    </>
  );
};

export default App;
