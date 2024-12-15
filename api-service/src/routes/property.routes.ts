import { Router } from 'express';
import { createProperty, filterProperties, getAllProperties, getProperties, getPropertyById, searchProperties, updateProperty } from '../controllers/property.controller';

const router = Router();

router.get('/getPropertiesForPage', getProperties);

router.get('/getAllProperties', getAllProperties);

router.post('/createProperty', createProperty);

router.put('/updateProperty', updateProperty);

router.get('/getPropertyById/:id', getPropertyById);

router.get('/search', searchProperties);

router.get('/filter', filterProperties);

router.post('/properties', createProperty);


export default router;
