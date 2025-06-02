const SingleCountry = ({ country }) => {
  return (
    <>
      <h1>{country.name.common}</h1>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h2>Languages</h2>
      <ul>
        {Object.entries(country.languages).map(([code, name]) => (
          <li key={code}>{name}</li>
        ))}
      </ul>
      <img src={country.flags.png} />
    </>
  );
};

const Countries = ({ countries, showHandler }) => {
  console.log(countries);
  if (countries.length == 0) {
    return <div>Not a match, try again</div>;
  } else if (countries.length == 1) {
    return (
      <>
        <SingleCountry country={countries[0]} />
      </>
    );
  } else if (countries.length > 10) {
    return <div>Too many matches, specify more filters</div>;
  } else {
    return (
      <ul>
        {countries.map((country) => (
          <li key={country.name.official}>
            {country.name.common} <button onClick={showHandler(country.name.common)}>Show</button>
          </li>
        ))}
      </ul>
    );
  }
};

export default Countries;
