import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import "./filter-dialog.css";
import { act, useEffect, useState } from "react";

interface FilterDialogProps {
  open: boolean;
  onClose: () => void;
  onApplyFilters: (filters: {
    type: string[];
    status: string[];
    areaMin?: string;
    areaMax?: string;
  }) => void;
}

function FilterDialog({ open, onClose, onApplyFilters }: FilterDialogProps) {
  const [valueAreaMin, setValueAreaMin] = useState("");
  const [valueAreaMax, setValueAreaMax] = useState("");
  const [optionsArea, setOptionsArea] = useState([
    "10",
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
  ]);
  const [activeTagsType, setActiveTagsType] = useState<string[]>([]);
  const [activeTagsStatus, setActiveTagsStatus] = useState<string[]>([]);
  const [isFilterBoolean, setFilterBoolean] = useState(false)

  useEffect(() => {
    if(activeTagsType.length >= 1 ) {
      setFilterBoolean(true)
    } else {
      setFilterBoolean(false)
    }
  },[activeTagsType, activeTagsStatus])

  const handleApply = () => {
    onApplyFilters({
      type: activeTagsType,
      status: activeTagsStatus,
      areaMin: valueAreaMin,
      areaMax: valueAreaMax,
    });
    console.log(activeTagsType)
    onClose();
  };

  const handleCancel = () => {
    setValueAreaMin("");
    setValueAreaMax("");
    setActiveTagsType([]);
    setActiveTagsStatus([]);
    onApplyFilters({
      type: [],
      status: [],
    });
    onClose();
  };

  const handleMinAreaChange = (newMinValue: string) => {
    setValueAreaMin(newMinValue);

    if (valueAreaMax && parseInt(newMinValue, 10) > parseInt(valueAreaMax, 10)) {
      setValueAreaMax(newMinValue);
    }
  };

  const handleMaxAreaChange = (newMaxValue: string) => {
    setValueAreaMax(newMaxValue);

    if (valueAreaMin && parseInt(newMaxValue, 10) < parseInt(valueAreaMin, 10)) {
      setValueAreaMin(newMaxValue);
    }
  };

  const toggleTagType = (tag: string) => {
    if (activeTagsType.includes(tag)) {
      activeTagsType.forEach((item, index) => {
        if (item === tag) {
          setActiveTagsType(
            activeTagsType.filter((activeTag) => activeTag !== tag)
          );
        }
      });
    } else {
      setActiveTagsType([...activeTagsType, tag]);
    }
    console.log(activeTagsType);
  };

  const toggleTagStatus = (tag: string) => {
    if (activeTagsStatus.includes(tag)) {
      activeTagsStatus.forEach((item, index) => {
        if (item === tag) {
          setActiveTagsStatus(
            activeTagsStatus.filter((activeTag) => activeTag !== tag)
          );
        }
      });
    } else {
      setActiveTagsStatus([...activeTagsStatus, tag]);
    }
    console.log(activeTagsStatus);
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle sx={{ fontWeight: "700" }}>Filters</DialogTitle>
      <DialogContent>
        <div className="flex-filters-dialog">
          <div>
            <h4>Type</h4>
            <div className="tags-filter">
              <span
                className={`tag-dialog-filters ${
                  activeTagsType.includes("Apartment") ? "apartment-active" : ""
                }`}
                onClick={() => toggleTagType("Apartment")}
              >
                Apartment
              </span>
              <span
                className={`tag-dialog-filters ${
                  activeTagsType.includes("House") ? "house-active" : ""
                }`}
                onClick={() => toggleTagType("House")}
              >
                House
              </span>
              <span
                className={`tag-dialog-filters ${
                  activeTagsType.includes("Office") ? "office-active" : ""
                }`}
                onClick={() => toggleTagType("Office")}
              >
                Office
              </span>
              <span
                className={`tag-dialog-filters ${
                  activeTagsType.includes("Land") ? "land-active" : ""
                }`}
                onClick={() => toggleTagType("Land")}
              >
                Land
              </span>
            </div>
          </div>
          <div>
            <h4>Status</h4>
            <div className="tags-filter">
              <span
                className={`tag-dialog-filters ${
                  activeTagsStatus.includes("Sale") ? "apartment-active" : ""
                }`}
                onClick={() => toggleTagStatus("Sale")}
              >
                Sale
              </span>
              <span
                className={`tag-dialog-filters ${
                  activeTagsStatus.includes("Rent") ? "house-active" : ""
                }`}
                onClick={() => toggleTagStatus("Rent")}
              >
                Rent
              </span>
            </div>
          </div>
          <div>
            <h4>Area size</h4>
            <div className="flex-selects-dialog">
              <Autocomplete
                disablePortal
                value={valueAreaMin}
                onInputChange={(event, newInputValue) => {
                  handleMinAreaChange(newInputValue);
                }}
                options={optionsArea}
                className="width-selector"
                renderInput={(params) => (
                  <TextField {...params} label="Min. Area" />
                )}
              />
              <Autocomplete
                disablePortal
                options={optionsArea}
                value={valueAreaMax}
                onInputChange={(event, newInputValue) => {
                  handleMaxAreaChange(newInputValue);
                }}
                className="width-selector"
                renderInput={(params) => (
                  <TextField {...params} label="Max. Area" />
                )}
              />
            </div>
          </div>
          <div>
            <h4>Price</h4>
            <div className="flex-selects-dialog">
              <Autocomplete
                disablePortal
                value={valueAreaMin}
                onInputChange={(event, newInputValue) => {
                  setValueAreaMin(newInputValue);
                }}
                options={optionsArea}
                className="width-selector"
                renderInput={(params) => <TextField {...params} label="Min." />}
              />
              <Autocomplete
                disablePortal
                options={optionsArea}
                value={valueAreaMax}
                onInputChange={(event, newInputValue) => {
                  setValueAreaMax(newInputValue);
                }}
                className="width-selector"
                renderInput={(params) => <TextField {...params} label="Max." />}
              />
            </div>
          </div>
        </div>
      </DialogContent>
      <div className="buttons-dialog">
        <button className="button-cancel" onClick={handleCancel} color="primary">
          Clean
        </button>
        <button disabled={!isFilterBoolean} className="button-apply" onClick={handleApply} color="primary">
          Apply
        </button>
      </div>
    </Dialog>
  );
}

export default FilterDialog;
