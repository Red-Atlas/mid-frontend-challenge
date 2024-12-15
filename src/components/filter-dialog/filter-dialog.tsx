import {
    Autocomplete,
    Dialog,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { useFilterDialog } from "../../hooks/useFilterDialog";
import "./filter-dialog.css";
import { FilterDialogProps } from "../../interfaces/filterProperties.interface";

function FilterDialog({ open, onClose, onApplyFilters }: FilterDialogProps) {
    const {
        valueAreaMin,
        valueAreaMax,
        priceMin,
        priceMax,
        optionsArea,
        optionsPrice,
        activeTagsType,
        activeTagsStatus,
        isFilterBoolean,
        handleApply,
        handleCancel,
        handleMinAreaChange,
        handleMaxAreaChange,
        handlePriceMinChange,
        handlePriceMaxChange,
        toggleTagType,
        toggleTagStatus,
    } = useFilterDialog(onApplyFilters, onClose);

    return (
        <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
            <DialogTitle sx={{ fontWeight: "700" }}>Filters</DialogTitle>
            <DialogContent>
                <div className="flex-filters-dialog">
                    <div>
                        <h4>Type</h4>
                        <div className="tags-filter">
                            {["Apartment", "House", "Office", "Land"].map((tag) => (
                                <button
                                    key={tag}
                                    className={`tag-dialog-filters ${activeTagsType.includes(tag) ? "active" : ""}`}
                                    onClick={() => toggleTagType(tag)}
                                >
                                    {tag}
                                </button>

                            ))}
                        </div>
                    </div>
                    <div>
                        <h4>Status</h4>
                        <div className="tags-filter">
                            {["Sale", "Rent"].map((tag) => (
                                <button
                                    key={tag}
                                    className={`tag-dialog-filters ${activeTagsStatus.includes(tag) ? "active" : ""}`}
                                    onClick={() => toggleTagStatus(tag)}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4>Area size</h4>
                        <div className="flex-selects-dialog">
                            <Autocomplete
                                value={valueAreaMin}
                                className="width-selector"
                                onInputChange={(e, newInputValue) => handleMinAreaChange(newInputValue)}
                                options={optionsArea}
                                renderInput={(params) => <TextField {...params} label="Min. Area" />}
                            />
                            <Autocomplete
                                value={valueAreaMax}
                                className="width-selector"
                                onInputChange={(e, newInputValue) => handleMaxAreaChange(newInputValue)}
                                options={optionsArea}
                                renderInput={(params) => <TextField {...params} label="Max. Area" />}
                            />
                        </div>
                    </div>
                    <div>
                        <h4>Price</h4>
                        <div className="flex-selects-dialog">
                            <Autocomplete
                                value={priceMin}
                                className="width-selector"
                                onInputChange={(e, newInputValue) => handlePriceMinChange(newInputValue)}
                                options={optionsPrice}
                                renderInput={(params) => <TextField {...params} label="Min." />}
                            />
                            <Autocomplete
                                value={priceMax}
                                className="width-selector"
                                onInputChange={(e, newInputValue) => handlePriceMaxChange(newInputValue)}
                                options={optionsPrice}
                                renderInput={(params) => <TextField {...params} label="Max." />}
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>
            <div className="buttons-dialog">
                <button className="button-cancel" onClick={handleCancel}>
                    Clean
                </button>
                <button disabled={!isFilterBoolean} className="button-apply" onClick={handleApply}>
                    Apply
                </button>
            </div>
        </Dialog>
    );
}

export default FilterDialog;
