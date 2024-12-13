import { Router } from 'express';
import { filterProperties, getAllProperties, getPropertiesForPage, getPropertyById, searchProperties } from '../controllers/property.controller';

const router = Router();

router.get('/getPropertiesForPage', getPropertiesForPage);

router.get('/getAllProperties', getAllProperties);

router.get('/getPropertyById/:id', getPropertyById);

router.get('/search', searchProperties);

router.get('/filter', filterProperties);


export default router;
