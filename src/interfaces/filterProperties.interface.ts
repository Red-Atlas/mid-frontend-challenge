export interface FilterDialogs {
        type: string[];
        status: string[];
        areaMin?: string;
        areaMax?: string;
        priceMin?: string;
        priceMax?: string;
        sort?: string;
}

export interface FilterDialogProps {
        open: boolean;
        onClose: () => void;
        onApplyFilters: (filters: {
            type: string[];
            status: string[];
            areaMin?: string;
            areaMax?: string;
            priceMin?: string;
            priceMax?: string;
        }) => void;
    }