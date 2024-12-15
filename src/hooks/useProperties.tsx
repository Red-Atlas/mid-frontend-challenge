import { SelectChangeEvent } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { FilterDialogs } from "../interfaces/filterProperties.interface";
import { Property } from "../interfaces/properties.interface";
import { clearPropertySlice, setPropertySlice } from "../reducers/propertiesSlice";
import { showSnackbar } from "../reducers/snackbarSlice";
import { filterProperties, getPropertiesPage, searchProperties } from "../services/properties.service";
import useIsMobile from "./useIsMobile";


export const useProperties = () => {
    const dispatch = useDispatch();
    const isMobile = useIsMobile()
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(false);
    const [numberPage, setNumberPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isSearching, setIsSearching] = useState(false);
    const [isFiltering, setIsFiltering] = useState(false);
    const [filters, setFilters] = useState<FilterDialogs | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOrder, setSortOrder] = useState<string>("");
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const fetchPropertiesPage = useCallback(async (page: number) => {
        try {
            dispatch(clearPropertySlice());
            setLoading(true);
            const data = await getPropertiesPage(page);
            setProperties(data.properties);
            setNumberPage(data.page);
            setTotalPages(data.totalPages);
            dispatch(setPropertySlice(data.properties));
        } catch (err: any) {
            dispatch(showSnackbar({ message: err.message, severity: "error", autoHideDuration: 6000 }));
        } finally {
            setLoading(false);
        }
    }, [dispatch]);


    const handleSortChange = (event: SelectChangeEvent<string>) => {
        const selectedSort = event.target.value as string;
        setSortOrder(selectedSort);
        setNumberPage(1);
        getSortProperties(selectedSort, 1);
    };

    const getSortProperties = async (order: string, page: number = 1) => {
        try {
            setLoading(true);
            console.log(filters)
            const data = await filterProperties(
                filters?.type,
                filters?.status,
                filters?.areaMin,
                filters?.areaMax,
                filters?.priceMin,
                filters?.priceMax,
                order, 
                page
            );
            setProperties(data.properties);
            setNumberPage(data.page);
            setTotalPages(data.totalPages);
            setIsFiltering(true);
            setIsSearching(false);
            dispatch(setPropertySlice(data.properties));
        } catch (err: any) {
            dispatch(showSnackbar({ message: err.message, severity: "error", autoHideDuration: 6000 }));
        } finally {
            setLoading(false);
        }
    };
    
    const fetchSearchedProperties = useCallback(
        async (text: string, page: number) => {
            try {
                setLoading(true);
                const data = await searchProperties(text, page);
                setProperties(data.properties);
                setNumberPage(data.page);
                setTotalPages(data.totalPages);
                setIsSearching(true);
                setIsFiltering(false);
            } catch (err: any) {
                dispatch(showSnackbar({ message: err.message, severity: "error", autoHideDuration: 6000 }));
            } finally {
                setLoading(false);
            }
        },
        [dispatch]
    );


    const handleSearch = (term: string) => {
        setSearchTerm(term);
        setNumberPage(1);
        if (term.length >= 3) {
            fetchSearchedProperties(term, 1);
        } else if (term.length === 0) {
            setIsSearching(false);
            fetchPropertiesPage(1);
        }
    };

    const fetchFilteredProperties = useCallback(
        async (filters: FilterDialogs, page: number) => {
            try {
                dispatch(clearPropertySlice());
                setLoading(true);
                console.log(sortOrder)
                const data = await filterProperties(
                    filters.type,
                    filters.status,
                    filters.areaMin,
                    filters.areaMax,
                    filters.priceMin,
                    filters.priceMax,
                    filters.sort,
                    page
                );
                setProperties(data.properties);
                setNumberPage(data.page);
                setTotalPages(data.totalPages);
                setIsFiltering(true);
                setIsSearching(false);
                dispatch(setPropertySlice(data.properties));
            } catch (err: any) {
                dispatch(showSnackbar({ message: err.message, severity: "error", autoHideDuration: 6000 }));
            } finally {
                setLoading(false);
            }
        },
        [dispatch]
    );

    const handlePageChange = (page: number) => {
        setNumberPage(page);
    
        if (isSearching) {
            fetchSearchedProperties(searchTerm, page);
        } else if (isFiltering && filters) {
            fetchFilteredProperties({ ...filters, sort: sortOrder }, page);
        } else if (sortOrder) {
            getSortProperties(sortOrder, page);
        } else {
            fetchPropertiesPage(page);
        }
    };
    
    

    const handleApplyFilters = (newFilters: FilterDialogs) => {
        setFilters(newFilters);
        setNumberPage(1);
        fetchFilteredProperties(newFilters, 1);
    };

    useEffect(() => {
        if (!isSearching && !isFiltering) {
            fetchPropertiesPage(numberPage);
        }
    }, [numberPage, isSearching, isFiltering, fetchPropertiesPage]);

    return {
        properties,
        loading,
        numberPage,
        totalPages,
        handlePageChange,
        handleSearch,
        handleApplyFilters,
        searchTerm,
        setSearchTerm,
        open,
        sortOrder,
        handleOpen,
        handleClose,
        handleSortChange,
        isMobile
    };
};
