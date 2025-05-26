const Filter = ({ filterHandler, filterValue }) => {
  return (
    <>
      Filter shown with: <input value={filterValue} onChange={filterHandler} />
    </>
  );
};

export default Filter;
