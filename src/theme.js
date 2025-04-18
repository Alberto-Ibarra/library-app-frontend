import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#2E4E3F',
        },
        secondary: {
            main: '#D88C3A',
        },
        background: {
            default: '#F5F5DC',
            paper: '#E6EAE4',
        },
        text: {
            primary: '#2E4E3F',
            secondary: '#C9A227',
        },
    },
    typography: {
        h4: {
            fontStyle: 'italic',
            fontWeight: 'bold',
        },
    },
});

export default theme;
