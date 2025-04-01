import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
        main: '#2E4E3F', // Sidebar color
        },
        secondary: {
        main: '#D88C3A', // Accent color
        },
        background: {
        default: '#F5F5DC', // Background color
        paper: '#E6EAE4', // Table background
        },
        text: {
        primary: '#2E4E3F', // Dark Green for readability
        secondary: '#C9A227', // Golden Yellow for highlights
        },
    },
});

export default theme;
