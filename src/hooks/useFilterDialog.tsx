import { useState, useEffect } from "react";
import { FilterDialogs } from "../interfaces/filterProperties.interface";

export const useFilterDialog = (onApplyFilters: (filters: FilterDialogs) => void, onClose: () => void) => {
  const [valueAreaMin, setValueAreaMin] = useState("");
  const [valueAreaMax, setValueAreaMax] = useState("");
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [optionsArea] = useState(["10", "100", "200", "300", "400", "500", "600", "700", "800"]);
  const [optionsPrice] = useState(["1000", "2000", "5000", "10000", "20000", "50000", "100000"]);
  const [activeTagsType, setActiveTagsType] = useState<string[]>([]);
  const [activeTagsStatus, setActiveTagsStatus] = useState<string[]>([]);
  const [isFilterBoolean, setFilterBoolean] = useState(false);

  useEffect(() => {
    setFilterBoolean(
      activeTagsType.length >= 1 ||
        activeTagsStatus.length >= 1 ||
        valueAreaMin.length >= 1 ||
        valueAreaMax.length >= 1 ||
        priceMin.length >= 1 ||
        priceMax.length >= 1
    );
  }, [activeTagsType, activeTagsStatus, valueAreaMin, valueAreaMax, priceMin, priceMax]);

  const handleApply = () => {
    onApplyFilters({
      type: activeTagsType,
      status: activeTagsStatus,
      areaMin: valueAreaMin,
      areaMax: valueAreaMax,
      priceMin: priceMin,
      priceMax: priceMax,
    });
    onClose();
  };

  const handleCancel = () => {
    setValueAreaMin("");
    setValueAreaMax("");
    setPriceMin("");
    setPriceMax("");
    setActiveTagsType([]);
    setActiveTagsStatus([]);
    onApplyFilters({
      type: [],
      status: [],
      areaMin: "",
      areaMax: "",
      priceMin: "",
      priceMax: "",
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

  const handlePriceMinChange = (newMinValue: string) => {
    setPriceMin(newMinValue);
    if (priceMax && parseInt(newMinValue, 10) > parseInt(priceMax, 10)) {
      setPriceMax(newMinValue);
    }
  };

  const handlePriceMaxChange = (newMaxValue: string) => {
    setPriceMax(newMaxValue);
    if (priceMin && parseInt(newMaxValue, 10) < parseInt(priceMin, 10)) {
      setPriceMin(newMaxValue);
    }
  };

  const toggleTag = (tag: string, setActiveTags: React.Dispatch<React.SetStateAction<string[]>>) => {
    setActiveTags((prevTags) =>
      prevTags.includes(tag) ? prevTags.filter((activeTag) => activeTag !== tag) : [...prevTags, tag]
    );
  };

  return {
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
    toggleTagType: (tag: string) => toggleTag(tag, setActiveTagsType),
    toggleTagStatus: (tag: string) => toggleTag(tag, setActiveTagsStatus),
  };
};
