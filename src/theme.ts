import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#f60a0f", 
        },
        secondary: {
            main: "#000000", 
        },
        info: {
            main: '#3a3a3a'
        }
    },
    typography: {
        fontFamily: "AvenirNext", 
    },
});

export default theme;
