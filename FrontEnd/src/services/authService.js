import axios from 'axios';
import { API } from '../endpoints/api';

export class AuthService {
    async login(data) {
        return (await axios.post(`${API.URL}/users/login`, data));
    }

    async signup(data) {
        return (await axios.post(`${API.URL}/users/signup`, data));
    }
}