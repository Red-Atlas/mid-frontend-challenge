import axios from 'axios';
import { Property } from '../interfaces/properties.interface';


export const getPropertiesPage = async (actualPage: number): Promise<Property[]> => {
    const response = await axios.get(process.env.REACT_APP_API + '/getPropertiesForPage',{
        params: {
            page: actualPage
        }
    });
    return response.data;
};

export const getAllProperties = async (): Promise<Property[]> => {
    const response = await axios.get(process.env.REACT_APP_API + '/getAllProperties',{
    });
    return response.data;
};

export const searchProperties = async (searchText: string): Promise<Property[]> => {
    const response = await axios.get(process.env.REACT_APP_API + '/search',{
        params: {
            query: searchText
        }
    });
    return response.data;
};