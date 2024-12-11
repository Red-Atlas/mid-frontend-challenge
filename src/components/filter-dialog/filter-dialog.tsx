import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface FilterDialogProps {
    open: boolean;
    onClose: () => void;
}

function FilterDialog({ open, onClose }: FilterDialogProps) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Filtrar Propiedades</DialogTitle>
            <DialogContent>
               Filter buttons
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={onClose} color="primary">
                    Aplicar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default FilterDialog;
