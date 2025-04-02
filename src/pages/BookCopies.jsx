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

const BookCopies = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        console.log('useEffect triggered');
        const token = localStorage.getItem('authToken');
        console.log(token);
        
        axios.get('https://library-app-production-8775.up.railway.app/api/bookcopies/copies' , {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        })
            .then(response => {
                console.log(response);
                setBooks(response.data);
            })
            .catch(error => {
                console.error('Error fetching book copies', error);
            });
    }, []);

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Book Copies Page
            </Typography>
            <TableContainer component={Paper} sx={{ width: '100%', mx: 'auto', p: 2}}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#3E6B48', color: '#F5F5F5' }}>
                            <TableCell sx={{ color: '#F5F5F5' }}><strong>Title</strong></TableCell>
                            <TableCell sx={{ color: '#F5F5F5' }}><strong>Available</strong></TableCell>
                            <TableCell sx={{ color: '#F5F5F5' }}><strong>Location</strong></TableCell>
                            <TableCell sx={{ color: '#F5F5F5' }}><strong>Condition</strong></TableCell>
                            <TableCell sx={{ color: '#F5F5F5' }}><strong>Year Published</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map((book, index) => (
                            <TableRow key={book.id} sx={{ backgroundColor: index % 2 === 0 ? '#E6EAE4' : '#F8F6F2' }}>
                                <TableCell>{book.title}</TableCell>
                                <TableCell>{book.isavailable ? 'Yes' : 'No'}</TableCell>
                                <TableCell>{book.location}</TableCell>
                                <TableCell>{book.bookcondition}</TableCell>
                                <TableCell>{book.yearpublished}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default BookCopies;
