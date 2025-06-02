const SearchBar = ({ countryHandler, filterValue }) => {
  return (
    <>
      Find countries: <input value={filterValue} onChange={countryHandler} />
    </>
  );
};

export default SearchBar;
