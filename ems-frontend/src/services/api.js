import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:9090',
});

//Attach token automatically to each request if available
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});


export const getInactiveEmployees = () =>
    api.get('/admin/employees/inactive');

export const restoreEmployee = (id) =>
    api.put(`/admin/employees/restore/${id}`);

export const permanentlyDeleteEmployee = (id) =>
  api.delete(`/admin/employees/permanent/${id}`);


export default api;
