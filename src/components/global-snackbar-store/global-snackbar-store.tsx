import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import SnackbarComponent from '../snackbar/snackbar';


export default function GlobalSnackbar() {
  const { open, message, severity } = useSelector((state: RootState) => state.snackbar);


  return (
    <SnackbarComponent
      open={open}
      message={message}
      severity={severity}
      autoHideDuration={6000}
    />
  );
}
