const DeleteButton = ({ handleDelete }) => {
  return <button onClick={handleDelete}>delete</button>;
};

const Numbers = ({ personsToShow, handleDelete }) => {
  return (
    <>
      {personsToShow.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}{' '}
          <DeleteButton
            handleDelete={() => {
              handleDelete(person.id);
            }}
          />
        </li>
      ))}
    </>
  );
};

export default Numbers;
