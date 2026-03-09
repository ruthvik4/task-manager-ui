import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tasks';

export const getTasks = (params = {}) =>  axios.get(API_URL,{params});
export const updateTasks = (id,task) => axios.put(`${API_URL}/${id}`,task);
export const deleteTasks = (id) => axios.delete(`${API_URL}/${id}`);

export const createTasks = (task) => axios.post(API_URL,task);

