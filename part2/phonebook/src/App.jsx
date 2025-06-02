import { useState, useEffect } from 'react';
import dbService from './services/dbService';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Numbers from './components/Numbers';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [notification, setNotification] = useState({ message: '', type: '' });

  useEffect(() => {
    dbService
      .getAll()
      .then((res) => {
        setPersons(res.data);
      })
      .catch(() => {
        notificationHandler('Error loading contacts', 'error');
      });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    if (!newName || !newNumber) {
      alert('Please input the name and number');
      return;
    }
    if (persons.find((person) => person.name === newName)) {
      if (window.confirm(`${newName} is already in the phonebook. Do ypu want to update the number?`)) {
        updatePerson({ name: newName, number: newNumber });
      }
      return;
    }
    if (persons.find((person) => person.number === newNumber)) {
      alert(`${newNumber} is already in the phonebook`);
      return;
    }
    const newPerson = { name: newName, number: newNumber };
    dbService
      .createPerson(newPerson)
      .then((res) => {
        setPersons(persons.concat(res.data));
        setNewName('');
        setNewNumber('');
        notificationHandler(`Created ${newName}`, 'success');
      })
      .catch(() => {
        notificationHandler('Error adding to the phonebook', 'error');
      });
  };

  const updatePerson = (newPerson) => {
    const personToUpdate = persons.find((person) => person.name === newPerson.name);
    const updatedPerson = { ...personToUpdate, number: newPerson.number };
    dbService
      .updatePerson(personToUpdate.id, updatedPerson)
      .then((res) => {
        setPersons(persons.map((person) => (person.id !== personToUpdate.id ? person : res.data)));
        notificationHandler(`Updated${newPerson.name}`, 'update');
        setNewName('');
        setNewNumber('');
      })
      .catch(() => {
        notificationHandler(`Error updating ${newPerson.name}`, 'error');
      });
  };

  const notificationHandler = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 5000);
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

  const handleDelete = (personId) => {
    if (window.confirm('Do you want to delete the person?')) {
      dbService
        .deletePerson(personId)
        .then((res) => {
          setPersons(persons.filter((person) => person.id !== res.data.id));
          notificationHandler('Contact deleted', 'success');
        })
        .catch(() => {
          notificationHandler('Error deleting', 'error');
        });
    }
  };

  const personsToShow = newFilter ? persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase())) : persons;

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />
      <div>
        <Filter filterValue={newFilter} filterHandler={handleFilterChange} />
      </div>
      <h3>Add a new</h3>
      <PersonForm numberValue={newNumber} numberHandler={handleNumberChange} nameValue={newName} nameHandler={handleNameChange} addPerson={addPerson} />
      <h3>Numbers</h3>
      <ul>
        <Numbers personsToShow={personsToShow} handleDelete={handleDelete} />
      </ul>
    </div>
  );
};

export default App;
