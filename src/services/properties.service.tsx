import axios from 'axios';
import { Property, PropertyResponse } from '../interfaces/properties.interface';


export const getPropertiesPage = async (actualPage: number): Promise<PropertyResponse> => {
    const response = await axios.get(process.env.REACT_APP_API + '/getPropertiesForPage',{
        params: {
            page: actualPage
        }
    });
    return response.data;
};

export const getAllProperties = async (): Promise<PropertyResponse> => {
    const response = await axios.get(process.env.REACT_APP_API + '/getAllProperties',{
    });
    return response.data;
};

export const searchProperties = async (searchText: string): Promise<PropertyResponse> => {
    const response = await axios.get(process.env.REACT_APP_API + '/search',{
        params: {
            query: searchText
        }
    });
    return response.data;
};

export const filterProperties = async (typeFilters?: string[], statusFilter?: string[], actualPage?: number): Promise<PropertyResponse> => {
    console.log(typeFilters)
    const response = await axios.get(process.env.REACT_APP_API + '/filter',{
        params: {
            type: typeFilters?.join(","),
            status: statusFilter?.join(","),
            page: actualPage
          },
    });
    return response.data;
};

export const getPropertyById = async (id: string): Promise<Property> => {   
    const response = await axios.get(`${process.env.REACT_APP_API}/getPropertyById/${id}`);
    return response.data;
};
