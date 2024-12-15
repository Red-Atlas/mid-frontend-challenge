import { Request, Response } from 'express';
import axios from 'axios';
import { Property } from '../interfaces/property.interface';

const BASE_URL = process.env.EXTERNAL_API_URL || 'https://fake-api-listings.vercel.app';
const DEFAULT_LIMIT = 450;


const paginate = (data: Property[], page: number, limit: number) => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return data.slice(startIndex, endIndex);
};


const handleError = (res: Response, error: any, customMessage: string = 'An error occurred') => {
    console.error(customMessage, error.message);
    res.status(error.response?.status || 500).json({ message: customMessage });
};


export const getProperties = async (req: Request, res: Response): Promise<void> => {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const response = await axios.get(`${BASE_URL}/properties?limit=${DEFAULT_LIMIT}`);
        const properties: Property[] = response.data;

        const totalProperties = properties.length;
        const paginatedProperties = paginate(properties, page, limit);

        res.status(200).json({
            total: totalProperties,
            page,
            limit,
            totalPages: Math.ceil(totalProperties / limit),
            properties: paginatedProperties,
        });
    } catch (error: any) {
        handleError(res, error, 'Error fetching properties');
    }
};

export const getAllProperties = async (req: Request, res: Response): Promise<void> => {
    try {
        const response = await axios.get(`${BASE_URL}/properties?limit=${DEFAULT_LIMIT}`);
        const properties: Property[] = response.data;

        const totalProperties = properties.length;

        res.status(200).json({
            total: totalProperties,
            properties: properties,
        });
    } catch (error: any) {
        handleError(res, error, 'Error fetching properties');
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

        const response = await axios.get(`${BASE_URL}/properties?limit=${DEFAULT_LIMIT}`);
        const properties: Property[] = response.data;

        const filteredProperties = properties.filter(
            (property) =>
                property.title.toLowerCase().includes(query) ||
                property.address.toLowerCase().includes(query)
        );

        const totalProperties = filteredProperties.length;
        const paginatedProperties = paginate(filteredProperties, page, limit);

        res.status(200).json({
            total: totalProperties,
            page,
            limit,
            totalPages: Math.ceil(totalProperties / limit),
            properties: paginatedProperties,
        });
    } catch (error: any) {
        handleError(res, error, 'Error searching properties');
    }
};

export const filterProperties = async (req: Request, res: Response): Promise<void> => {
    try {
        const typeQuery = (req.query.type as string)?.toLowerCase().split(",") || [];
        const statusQuery = (req.query.status as string)?.toLowerCase().split(",") || [];
        const areaMin = parseFloat(req.query.areaMin as string) || 0;
        const areaMax = parseFloat(req.query.areaMax as string) || Infinity;
        const priceMin = parseFloat(req.query.priceMin as string) || 0;
        const priceMax = parseFloat(req.query.priceMax as string) || Infinity;
        const sort = req.query.sort as string || '';
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;

        const response = await axios.get(`${BASE_URL}/properties?limit=${DEFAULT_LIMIT}`);
        let properties: Property[] = response.data;

        if (typeQuery.length > 0 && typeQuery[0] !== "") {
            properties = properties.filter((property) =>
                typeQuery.includes(property.type?.toLowerCase())
            );
        }

        if (statusQuery.length > 0 && statusQuery[0] !== "") {
            properties = properties.filter((property) =>
                statusQuery.includes(property.status?.toLowerCase())
            );
        }

        properties = properties.filter((property) => {
            const area = parseFloat(property.area as unknown as string) || 0;
            return area >= areaMin && area <= areaMax;
        });

        properties = properties.filter((property) => {
            const price = parseFloat(property.price as unknown as string) || 0;
            return price >= priceMin && price <= priceMax;
        });

        if (priceMin > 0 || priceMax < Infinity) {
            properties = properties.sort((a, b) => a.price - b.price);
        }

        if (sort === "asc") {
            properties = properties.sort((a, b) => a.price - b.price);
        } else if (sort === "desc") {
            properties = properties.sort((a, b) => b.price - a.price);
        }

        const totalProperties = properties.length;
        const paginatedProperties = paginate(properties, page, limit);

        res.status(200).json({
            total: totalProperties,
            page,
            limit,
            totalPages: Math.ceil(totalProperties / limit),
            properties: paginatedProperties,
        });
    } catch (error: any) {
        handleError(res, error, 'Error filtering properties');
    }
};

export const getPropertyById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        if (!id) {
            res.status(400).json({ message: 'Property ID is required' });
            return;
        }

        const response = await axios.get(`${BASE_URL}/properties/${id}`);

        if (!response.data) {
            res.status(404).json({ message: `Property with ID ${id} not found` });
            return;
        }

        res.status(200).json(response.data);
    } catch (error: any) {
        handleError(res, error, `Error fetching property with ID ${req.params.id}`);
    }
};

export const createProperty = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            address,
            title,
            description,
            type,
            status,
            price,
            area,
            lat,
            lng,
            ownerName,
            ownerContact,
            location,
            owner,
            images,
        } = req.body;

        const property: Property = {
            address,
            title,
            description,
            type,
            status,
            price: Number(price),
            area: Number(area),
            location: location || { lat: Number(lat), lng: Number(lng) },
            owner: owner || { name: ownerName, contact: ownerContact },
            images,
            isActive: true, 
            createdAt: new Date().toISOString(), 
            updatedAt: new Date().toISOString(),
        };

        const missingFields = [];
        if (!property.address) missingFields.push('address');
        if (!property.title) missingFields.push('title');
        if (!property.description) missingFields.push('description');
        if (!property.type) missingFields.push('type');
        if (!property.status) missingFields.push('status');
        if (property.price === undefined) missingFields.push('price');
        if (property.area === undefined) missingFields.push('area');
        if (!property.location || !property.location.lat || !property.location.lng) {
            missingFields.push('location (lat, lng)');
        }
        if (!Array.isArray(images) || images.length === 0) missingFields.push('images');
        if (!property.owner || !property.owner.name || !property.owner.contact) {
            missingFields.push('owner (name, contact)');
        }

        if (missingFields.length > 0) {
            res.status(400).json({
                message: `Missing required fields: ${missingFields.join(', ')}`,
            });
            return;
        }
        const response = await axios.post(`${process.env.EXTERNAL_API_URL}/properties`, property);

        res.status(201).json({
            message: 'Property created successfully',
            property: response.data,
        });
    } catch (error: any) {
        console.error('Error creating property:', error.message);

        if (error.response && error.response.data) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ message: 'Error creating property' });
        }
    }
};

export const updateProperty = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            id,
            address,
            title,
            description,
            type,
            status,
            price,
            area,
            lat,
            lng,
            ownerName,
            ownerContact,
            location,
            owner,
            images,
        } = req.body;

        if (!id) {
            res.status(400).json({ message: 'Property ID is required' });
            return;
        }

        const updatedProperty: Property = {
            id,
            address,
            title,
            description,
            type,
            status,
            price: Number(price),
            area: Number(area),
            location: location || (lat && lng ? { lat: Number(lat), lng: Number(lng) } : undefined),
            owner: owner || (ownerName && ownerContact ? { name: ownerName, contact: ownerContact } : undefined),
            images,
            isActive: true,
            updatedAt: new Date().toISOString(),
        };

        const missingFields = [];
        if (!updatedProperty.address) missingFields.push('address');
        if (!updatedProperty.title) missingFields.push('title');
        if (!updatedProperty.description) missingFields.push('description');
        if (!updatedProperty.type) missingFields.push('type');
        if (!updatedProperty.status) missingFields.push('status');
        if (updatedProperty.price === undefined) missingFields.push('price');
        if (updatedProperty.area === undefined) missingFields.push('area');
        if (
            !updatedProperty.location ||
            !updatedProperty.location.lat ||
            !updatedProperty.location.lng
        ) {
            missingFields.push('location (lat, lng)');
        }
        if (!Array.isArray(images) || images.length === 0) missingFields.push('images');
        if (
            !updatedProperty.owner ||
            !updatedProperty.owner.name ||
            !updatedProperty.owner.contact
        ) {
            missingFields.push('owner (name, contact)');
        }

        if (missingFields.length > 0) {
            res.status(400).json({
                message: `Missing required fields: ${missingFields.join(', ')}`,
            });
            return;
        }

        const response = await axios.put(
            `${process.env.EXTERNAL_API_URL}/properties/${id}`,
            updatedProperty
        );

        res.status(200).json({
            message: 'Property updated successfully',
            property: response.data,
        });
    } catch (error: any) {
        console.error('Error updating property:', error.message);

        if (error.response && error.response.data) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ message: 'Error updating property' });
        }
    }
};
