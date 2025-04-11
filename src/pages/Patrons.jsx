import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Typography, Box} from '@mui/material';
import PatronTable from '../components/patrons/PatronTable';

const Patrons = () => {
    const [patrons, setPatrons] = useState([]);

    useEffect(() => {
        console.log('useEffect triggered');
        const token = localStorage.getItem('authToken');
        console.log(token);
        
        axios.get('https://library-app-production-8775.up.railway.app/api/patrons/patrons' , {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        })
            .then(response => {
                console.log(response);
                setPatrons(response.data);
            })
            .catch(error => {
                console.error('Error fetching Patrons', error);
            });
    }, []);

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Patrons
            </Typography>
            <PatronTable
                patrons={patrons}
            />
        </Box>
    );
};

export default Patrons;
