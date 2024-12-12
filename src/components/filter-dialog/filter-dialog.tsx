import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import "./filter-dialog.css"
import { useEffect, useState } from 'react';

interface FilterDialogProps {
    open: boolean;
    onClose: () => void;
}


function FilterDialog({ open, onClose }: FilterDialogProps) {
    const [valueAreaMin, setValueAreaMin] = useState('');
    const [valueAreaMax, setValueAreaMax] = useState('');
    const [optionsArea, setOptionsArea] = useState(['10', '100', '200', '300', '400', '500', '600', '700', '800']);
    const [optionsArea, setOptionsArea] = useState(['10', '100', '200', '300', '400', '500', '600', '700', '800']);
    const [optionsArea, setOptionsArea] = useState(['10', '100', '200', '300', '400', '500', '600', '700', '800']);
    const [optionsArea, setOptionsArea] = useState(['10', '100', '200', '300', '400', '500', '600', '700', '800']);
    const [optionsArea, setOptionsArea] = useState(['10', '100', '200', '300', '400', '500', '600', '700', '800']);


    useEffect(() => {
        if (valueAreaMin.trim() !== '') {
            console.log(valueAreaMin)
            let optionsAreaFiltered: any = []
            optionsArea.forEach(p => {
                if (valueAreaMin <= p) {
                    optionsAreaFiltered.push(p)
                }
            })

            setOptionsArea(optionsAreaFiltered)
        } else {
            setOptionsArea(['10', '100', '200', '300', '400', '500', '600', '700', '800'])
        }
    }, [valueAreaMin, valueAreaMax])
    
    const filterTypes = (idType: number) => {
        console.log(idType)
    }

    return (
        <Dialog open={open} onClose={onClose} fullWidth
            maxWidth="lg">
            <DialogTitle sx={{ fontWeight: '700' }}>Filters</DialogTitle>
            <DialogContent>
                <div className='flex-filters-dialog'>
                    <div>
                        <h4>Type</h4>
                        <div className="tags-filter">
                            <span className="tag" onClick={() => filterTypes(1)}>Apartment</span>
                            <span className="tag" onClick={() => filterTypes(2)}>House</span>
                            <span className="tag" onClick={() => filterTypes(3)}>Office</span>
                            <span className="tag" onClick={() => filterTypes(4)}>Land</span>
                        </div>
                    </div>
                    <div>
                        <h4>Status</h4>
                    </div>
                    <div>
                        <h4>Area size</h4>
                        <div className='flex-selects-dialog'>
                            <Autocomplete
                                disablePortal
                                value={valueAreaMin}
                                onInputChange={(event, newInputValue) => {
                                    setValueAreaMin(newInputValue);
                                }}
                                options={optionsArea}
                                className='width-selector'
                                renderInput={(params) => <TextField {...params} label="Min. Area" />}
                            />
                            <Autocomplete
                                disablePortal
                                options={optionsArea}
                                value={valueAreaMax}
                                onInputChange={(event, newInputValue) => {
                                    setValueAreaMax(newInputValue);
                                }}
                                className='width-selector'
                                renderInput={(params) => <TextField {...params} label="Max. Area" />}
                            />
                        </div>
                    </div>
                    <div>
                        <h4>Price</h4>
                        <div className='flex-selects-dialog'>
                            <Autocomplete
                                disablePortal
                                value={valueAreaMin}
                                onInputChange={(event, newInputValue) => {
                                    setValueAreaMin(newInputValue);
                                }}
                                options={optionsArea}
                                className='width-selector'
                                renderInput={(params) => <TextField {...params} label="Min." />}
                            />
                            <Autocomplete
                                disablePortal
                                options={optionsArea}
                                value={valueAreaMax}
                                onInputChange={(event, newInputValue) => {
                                    setValueAreaMax(newInputValue);
                                }}
                                className='width-selector'
                                renderInput={(params) => <TextField {...params} label="Max." />}
                            />
                        </div>
                    </div>
                </div>
            </DialogContent>
            <div className='buttons-dialog'>
                <button className='button-cancel' onClick={onClose} color="primary">
                    Clean
                </button>
                <button className='button-apply' onClick={onClose} color="primary">
                    Apply
                </button>
            </div>
        </Dialog>
    );
}

export default FilterDialog;
