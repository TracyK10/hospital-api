// api.js

import axios from 'axios';

const API_URL = '/api';

export const registerPatient = async (name, email, phone) => {
  const response = await axios.post('/api/register', {
    name, 
    email,
    phone
  });

  return response.data;
}

export const getPatients = async () => {
  const response = await axios.get(`${API_URL}/patients`);
  
  return response.data;
}