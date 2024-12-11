import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import SnacbkarProps from '../../interfaces/snackbar.interface';

function SnackbarComponent({
  open,
  message,
  severity
}: SnacbkarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarComponent;