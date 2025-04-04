import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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
            <TableContainer component={Paper} sx={{ width: '100%', mx: 'auto', p: 2}}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#3E6B48', color: '#F5F5F5' }}>
                        <TableCell sx={{ color: '#F5F5F5' }}><strong>Id</strong></TableCell>
                            <TableCell sx={{ color: '#F5F5F5' }}><strong>First Name</strong></TableCell>
                            <TableCell sx={{ color: '#F5F5F5' }}><strong>Last Name</strong></TableCell>
                            <TableCell sx={{ color: '#F5F5F5' }}><strong>First Name</strong></TableCell>
                            <TableCell sx={{ color: '#F5F5F5' }}><strong>Status</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {patrons.map((patron, index) => (
                            <TableRow key={patron.id} sx={{ backgroundColor: index % 2 === 0 ? '#E6EAE4' : '#F8F6F2' }}>
                                <TableCell>{patron.id}</TableCell>
                                <TableCell>{patron.firstname}</TableCell>
                                <TableCell>{patron.lastname}</TableCell>
                                <TableCell>{patron.email}</TableCell>
                                <TableCell>{patron.status}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Patrons;
