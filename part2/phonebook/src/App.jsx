import { useState } from 'react';
import Filter from './Components/Filter';
import PersonForm from './Components/PersonForm';
import Numbers from './Components/Numbers';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
      id: persons.length > 0 ? Math.max(...persons.map((p) => p.id)) + 1 : 1,
    };

    if (persons.find((person) => person.name === newName)) {
      alert(`${newName} is already added to the phonebook`);
    } else if (persons.find((person) => person.number === newNumber)) {
      alert(`${newNumber} is already added to the phonebook`);
    } else if (newNumber === '' || newName === '') {
      alert('Please add both the name and the phone number');
    } else {
      setPersons(persons.concat(newPerson));
    }
    setNewName('');
    setNewNumber('');
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const personsToShow = newFilter
    ? persons.filter((person) =>
        person.name.toLowerCase().includes(newFilter.toLowerCase()),
      )
    : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter filterValue={newFilter} filterHandler={handleFilterChange} />
      </div>
      <h3>Add a new</h3>
      <PersonForm
        numberValue={newNumber}
        numberHandler={handleNumberChange}
        nameValue={newName}
        nameHandler={handleNameChange}
        addPerson={addPerson}
      />
      <h3>Numbers</h3>
      <ul>
        <Numbers personsToShow={personsToShow} />
      </ul>
    </div>
  );
};

export default App;
