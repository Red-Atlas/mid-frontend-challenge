import { Request, Response } from 'express';
import axios from 'axios';


export const getPropertiesForPage = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const response = await axios.get(
            `${process.env.EXTERNAL_API_URL}/properties?limit=450`
        );
        const properties = response.data;

        const totalProperties = properties.length;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const paginatedProperties = properties.slice(startIndex, endIndex);

        res.status(200).json({
            total: totalProperties,
            page,
            limit,
            totalPages: Math.ceil(totalProperties / limit),
            properties: paginatedProperties,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching properties' });
    }
};


export const getAllProperties = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const response = await axios.get(`${process.env.EXTERNAL_API_URL}/properties?limit=450`);
        const properties = response.data;

        const totalProperties = properties.length;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const paginatedProperties = properties.slice(startIndex, endIndex);

        res.status(200).json({
            total: totalProperties,
            page,
            limit,
            totalPages: Math.ceil(totalProperties / limit),
            properties: paginatedProperties,
        });
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

        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const externalApiUrl = process.env.EXTERNAL_API_URL || 'https://fake-api-listings.vercel.app';
        const response = await axios.get(`${externalApiUrl}/properties?limit=450`);
        const properties = response.data;

        const filteredProperties = properties.filter((property: any) =>
            property.title.toLowerCase().includes(query) ||
            property.address.toLowerCase().includes(query)
        );

        const totalProperties = filteredProperties.length;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;

        const paginatedProperties = filteredProperties.slice(startIndex, endIndex);

        res.status(200).json({
            total: totalProperties,
            page,
            limit,
            totalPages: Math.ceil(totalProperties / limit),
            properties: paginatedProperties,
        });
    } catch (error: any) {
        console.error(error.message);
        res.status(500).json({ message: 'Error searching properties' });
    }
};



export const filterProperties = async (req: Request, res: Response): Promise<void> => {
    try {
        const typeQuery = (req.query.type as string)?.toLowerCase().split(",") || [];
        const statusQuery = (req.query.status as string)?.toLowerCase().split(",") || [];

        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const response = await axios.get(`${process.env.EXTERNAL_API_URL}/properties?limit=450`);
        let properties = response.data;

        if (typeQuery.length > 0 && typeQuery[0] !== "") {
            properties = properties.filter((property: any) =>
                typeQuery.includes(property.type?.toLowerCase())
            );
        }

        if (statusQuery.length > 0 && statusQuery[0] !== "") {
            properties = properties.filter((property: any) =>
                statusQuery.includes(property.status?.toLowerCase())
            );
        }

        const totalProperties = properties.length;
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + limit;
        const paginatedProperties = properties.slice(startIndex, endIndex);

        res.status(200).json({
            total: totalProperties,
            page,
            limit,
            totalPages: Math.ceil(totalProperties / limit),
            properties: paginatedProperties,
        });
    } catch (error: any) {
        console.error("Error filtering properties:", error.message);
        res.status(500).json({ message: 'Error filtering properties' });
    }
};

export const getPropertyById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: 'Property ID is required' });
            return;
        }
        const response = await axios.get(`${process.env.EXTERNAL_API_URL}/properties/${id}`);
        
        if (!response.data) {
            res.status(404).json({ message: `Property with ID ${id} not found` });
            return;
        }
        res.status(200).json(response.data);
    } catch (error: any) {
        console.error(`Error fetching property with ID ${req.params.id}:`, error.message);

        if (error.response && error.response.status === 404) {
            res.status(404).json({ message: `Property with ID ${req.params.id} not found` });
        } else {
            res.status(500).json({ message: 'Error fetching property details' });
        }
    }
};
