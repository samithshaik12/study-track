import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
});

export const assignmentApi = {
  async getAll() {
    const response = await api.get('/assignments');
    return response.data;
  },
  async create(payload) {
    const response = await api.post('/assignments', payload);
    return response.data;
  },
  async update(id, payload) {
    const response = await api.put(`/assignments/${id}`, payload);
    return response.data;
  },
  async remove(id) {
    const response = await api.delete(`/assignments/${id}`);
    return response.data;
  }
};
