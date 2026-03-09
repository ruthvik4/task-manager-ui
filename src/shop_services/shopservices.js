import axios from "axios";

const API_URL = 'http://localhost:8080/api/tasks';

export const getItems = (params = {}) => axios.get(API_URL,{params});

export const setItems = (item) => axios.post(API_URL,item);

export const deleteItems = (id) => axios.delete(`${API_URL}/${id}`)
