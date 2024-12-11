import axios from 'axios';
import { Property } from '../interfaces/properties.interface';

export const getProperties = async (): Promise<Property[]> => {
    const response = await axios.get('/properties',{
        params: {
            limit: 60
        }
    });
    return response.data;
};