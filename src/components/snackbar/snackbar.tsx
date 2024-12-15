import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import SnacbkarProps from "../../interfaces/snackbar.interface";
import { useDispatch } from "react-redux";
import { hideSnackbar } from "../../reducers/snackbarSlice";

function SnackbarComponent({ open, message, severity }: SnacbkarProps) {
  const dispatch = useDispatch();

  const handleClose = (
    event: Event | React.SyntheticEvent<any, Event>,
    reason: string
  ) => {
    if (reason === "clickaway") return;
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose} 
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert severity={severity} variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
}

export default SnackbarComponent;
