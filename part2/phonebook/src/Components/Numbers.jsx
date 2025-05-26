const Numbers = ({ personsToShow }) => {
  console.log(personsToShow);
  return (
    <>
      {personsToShow.map((person, i) => (
        <li key={i}>
          {person.name} {person.number}
        </li>
      ))}
    </>
  );
};

export default Numbers;
