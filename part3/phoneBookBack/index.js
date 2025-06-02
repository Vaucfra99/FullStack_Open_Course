const express = require('express');
const app = express();
app.use(express.json());

const getTime = () => {
  const iniDate = new Date();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const wDay = weekDays[iniDate.getUTCDay()];
  const monthsList = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = monthsList[iniDate.getUTCMonth()];
  const day = iniDate.getUTCDate();
  const year = iniDate.getUTCFullYear();
  const hour = iniDate.getUTCHours().toString().padStart(2, '0');
  const minutes = iniDate.getUTCMinutes().toString().padStart(2, '0');
  const seconds = iniDate.getUTCSeconds().toString().padStart(2, '0');
  return `${wDay} ${month} ${day} ${year} ${hour}:${minutes}:${seconds} GMT+0000 (UTC)`;
};

const generateId = () => {
  const maxId = persons.length > 0 ? Math.max(...persons.map((p) => p.id)) : 0;
  return maxId + 1;
};

let persons = [
  {
    id: 1,
    name: 'Arto Hellas',
    number: '040-123456',
  },
  {
    id: 2,
    name: 'Ada Lovelace',
    number: '39-44-5323523',
  },
  {
    id: 3,
    name: 'Dan Abramov',
    number: '12-43-234345',
  },
  {
    id: 4,
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
  },
];

app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/api/info', (request, response) => {
  const personsCount = persons.reduce((aux) => aux + 1, 0);
  const time = getTime();
  const res = `<p>Phonebook has information for ${personsCount} people <p/><p>${time}<p/>`;
  response.send(res);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete('/api/persons/:id', (request, response) => {
  let id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

app.post('/api/persons', (request, response) => {
  const body = request.body;
  if (body.name === null || body.number === null) {
    response.status(400).send({ error: 'Content missing' });
  } else if (persons.find((person) => person.name === body.name) || persons.find((person) => person.number === body.number)) {
    response.status(400).send({ error: 'Duplicated content' });
  } else {
    const newPerson = { id: generateId(), ...body };
    response.json(newPerson);
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
