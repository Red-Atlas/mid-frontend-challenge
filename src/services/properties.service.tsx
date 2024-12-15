import axios from 'axios';
import { AllPropertiesResponse, CreatePropertyPayload, Property, PropertyResponse } from '../interfaces/properties.interface';


export const getPropertiesPage = async (actualPage: number): Promise<PropertyResponse> => {
    const response = await axios.get(process.env.REACT_APP_API + '/getPropertiesForPage', {
        params: {
            page: actualPage
        }
    });
    return response.data;
};

export const getAllProperties = async (): Promise<AllPropertiesResponse> => {
    const response = await axios.get(process.env.REACT_APP_API + '/getAllProperties', {
    });
    return response.data;
};

export const searchProperties = async (searchText: string, actualPage: number): Promise<PropertyResponse> => {
    const response = await axios.get(process.env.REACT_APP_API + '/search', {
        params: {
            query: searchText,
            page: actualPage
        }
    });
    return response.data;
};

export const filterProperties = async (typeFilters?: string[], statusFilter?: string[], areaMin?: string, areaMax?: string, priceMin?: string, priceMax?: string, sort?: string, actualPage?: number): Promise<PropertyResponse> => {
    console.log(typeFilters)
    const response = await axios.get(process.env.REACT_APP_API + '/filter', {
        params: {
            type: typeFilters?.join(","),
            status: statusFilter?.join(","),
            areaMin: areaMin,
            areaMax: areaMax,
            priceMin: priceMin,
            priceMax: priceMax,
            sort: sort,
            page: actualPage,
        },
    });
    return response.data;
};

export const getPropertyById = async (id: string): Promise<Property> => {
    const response = await axios.get(`${process.env.REACT_APP_API}/getPropertyById/${id}`);
    return response.data;
};

export const createProperty = async (property: CreatePropertyPayload): Promise<Property> => {
    const response = await axios.post(`${process.env.REACT_APP_API}/createProperty`, property);
    
    return response.data;
};

export const updateProperty = async (property: CreatePropertyPayload): Promise<Property> => {
    const response = await axios.put(`${process.env.REACT_APP_API}/updateProperty`, property);
    
    return response.data;
};


