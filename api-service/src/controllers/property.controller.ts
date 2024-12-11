import { Request, Response } from 'express';
import axios from 'axios';


export const getPropertiesForPage = async (req: Request, res: Response): Promise<void> => {
    try {
        const limit = 10;
        const page = req.query.page;
        const response = await axios.get(
            `${process.env.EXTERNAL_API_URL}/properties?limit=${limit}&page=${page}`
        );
        console.log(response)
        const properties = response.data;
        res.status(200).json(properties);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching properties' });
    }
};

export const getAllProperties = async (req: Request, res: Response): Promise<void> => {
    try {
        const limit = 450;
        const response = await axios.get(`${process.env.EXTERNAL_API_URL}/properties?limit=${limit}`);
        const properties = response.data;
        res.status(200).json(properties);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching properties' });
    }
};

export const searchProperties = async (req: Request, res: Response): Promise<void> => {
    try {
        const query = req.query.query?.toString().toLowerCase();
        if (!query) {
            res.status(400).json({ message: 'Query parameter is required' });
            return;
        }

        const externalApiUrl = process.env.EXTERNAL_API_URL || 'https://fake-api-listings.vercel.app';
        const response = await axios.get(`${externalApiUrl}/properties?limit=450`);
        const properties = response.data;

        const filteredProperties = properties.filter((property: any) => 
            property.title.toLowerCase().includes(query) || 
            property.address.toLowerCase().includes(query)
        );

        res.status(200).json(filteredProperties);
    } catch (error: any) {
        console.error(error.message);
        res.status(500).json({ message: 'Error searching properties' });
    }
};


export const filterProperties = async (req: Request, res: Response): Promise<void> => {
    try {
        const type = req.query.type; 
        const status = req.query.status; 

        const response = await axios.get(`${process.env.EXTERNAL_API_URL}/properties?limit=450`);
        let properties = response.data;


        if (type) {
            properties = properties.filter((property: any) => property.type === type);
        }
        if (status) {
            properties = properties.filter((property: any) => property.status === status);
        }

        res.status(200).json(properties);
    } catch (error: any) {
        console.error(error.message);
        res.status(500).json({ message: 'Error filtering properties' });
    }
};

