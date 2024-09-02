// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

export const getTasks = () => axios.get(API_URL);
export const addTask = (task) => axios.post(API_URL, task);
export const updateTask = (id, task) => axios.patch(`${API_URL}/${id}`, task);
export const deleteTask = (id) => axios.delete(`${API_URL}/${id}`);
