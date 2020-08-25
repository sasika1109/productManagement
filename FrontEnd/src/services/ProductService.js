import axios from 'axios';
import { API } from '../endpoints/api';

export class ProductService {
    async getproducts() {
        return (await axios.get(`${API.URL}/products`));
    }

    async getProduct(ID) {
        return (await axios.get(`${API.URL}/products/${ID}`));
    }

    async addProduct(data) {
        return (await axios.post(`${API.URL}/products`, data));
    }

    
    async updateProduct(formData, ID) {
        return (await axios.patch(`${API.URL}/products/${ID}`, formData));
    }

    async deleteProduct(ID) {
        return (await axios.delete(`${API.URL}/products/${ID}`));
    }
}
