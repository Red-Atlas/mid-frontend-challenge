import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import {
    createProperty,
    getAllProperties,
    updateProperty,
} from "../services/properties.service";
import { showSnackbar } from "../reducers/snackbarSlice";
import { CreatePropertyPayload, Property } from "../interfaces/properties.interface";

export const usePropertyForm = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const propertyData = location.state?.property || null;

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [properties, setProperties] = useState<Property[]>([]);

    const {
        handleSubmit,
        control,
        reset,
        formState: { isValid },
    } = useForm<CreatePropertyPayload>({
        mode: "onChange",
        defaultValues: propertyData || {
            id: "",
            title: "",
            address: "",
            images: "",
            description: "",
            type: "apartment",
            status: "sale",
            price: 0,
            area: 0,
            location: {
                lat: 0,
                lng: 0,
            },
            owner: {
                name: '',
                contact: ''
            }
        },
    });

    const toggleEditMode = () => {
        setIsEditing((prev) => {
            const newEditingState = !prev;
            if (newEditingState) {
                getAllPropertiesForm();
                if (propertyData) {
                    reset({
                        ...propertyData,
                        location: {
                            lat: propertyData.location?.lat || 0,
                            lng: propertyData.location?.lng || 0,
                        },
                    });
                }
            } else {
                reset({
                    id: "",
                    title: "",
                    address: "",
                    images: [''],
                    description: "",
                    type: "apartment",
                    status: "sale",
                    price: 0,
                    area: 0,
                    location: {
                        lat: 0,
                        lng: 0,
                    },
                    owner: {
                        name: '',
                        contact: ''
                    }
                });
            }
            return newEditingState;
        });
    };


    const getAllPropertiesForm = async () => {
        try {
            setLoading(true);
            const fetchedProperties = await getAllProperties();
            setProperties(fetchedProperties.properties);
        } catch (err: any) {
            dispatch(
                showSnackbar({
                    message: err.message,
                    severity: "error",
                    autoHideDuration: 6000
                })
            );
        } finally {
            setLoading(false);
        }
    };

    const updatePropertyForm = async (data: CreatePropertyPayload) => {
        try {
            setLoading(true);
            await updateProperty(data);
            dispatch(
                showSnackbar({
                    message: "Property updated successfully!",
                    severity: "success",
                    autoHideDuration: 6000
                })
            );
        } catch (err: any) {
            dispatch(
                showSnackbar({
                    message: err.message,
                    severity: "error",
                    autoHideDuration: 6000
                })
            );
        } finally {
            setLoading(false);
        }
    };

    const createPropertyForm = async (data: CreatePropertyPayload) => {
        try {
            setLoading(true);
            await createProperty(data);
            dispatch(
                showSnackbar({
                    message: "Property created successfully!",
                    severity: "success",
                    autoHideDuration: 6000
                })
            );
        } catch (err: any) {
            dispatch(
                showSnackbar({
                    message: err.message,
                    severity: "error",
                    autoHideDuration: 6000
                })
            );
        } finally {
            setLoading(false);
        }
    };

    const handlePropertyChange = (id: string) => {
        const selectedProperty = properties.find((property) => property.id === id);
        reset(selectedProperty || propertyData);
    };

    const onSubmit = async (data: CreatePropertyPayload) => {
        if (isEditing) {
            await updatePropertyForm(data);
        } else {
            await createPropertyForm(data);
        }
    };

    const closeDialog = () => navigate("/");

    return {
        control,
        handleSubmit,
        onSubmit,
        properties,
        isEditing,
        toggleEditMode,
        handlePropertyChange,
        loading,
        isValid,
        closeDialog,
    };
};
