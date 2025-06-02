import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {
  return axios.get(baseUrl);
};

const createPerson = (newPerson) => {
  return axios.post(baseUrl, newPerson);
};

const deletePerson = (personId) => {
  return axios.delete(`${baseUrl}/${personId}`);
};

const updatePerson = (personId, newPerson) => {
  return axios.put(`${baseUrl}/${personId}`, newPerson);
};

export default { getAll, createPerson, deletePerson, updatePerson };
