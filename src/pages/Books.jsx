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

const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        console.log('useEffect triggered');
        const token = localStorage.getItem('authToken');
        console.log(token);
        
        axios.get('https://library-app-production-8775.up.railway.app/api/books/books' , {
            headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
        })
            .then(response => {
                console.log(response);
                setBooks(response.data);
            })
            .catch(error => {
                console.error('Error fetching books', error);
            });
    }, []);

    return (
        <Box sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
                Books
            </Typography>
            <TableContainer component={Paper} sx={{ width: '100%', mx: 'auto', p: 2}}>
                <Table>
                    <TableHead>
                        <TableRow sx={{ backgroundColor: '#3E6B48', color: '#F5F5F5' }}>
                        <TableCell sx={{ color: '#F5F5F5' }}><strong>Id</strong></TableCell>
                            <TableCell sx={{ color: '#F5F5F5' }}><strong>Title</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map((book, index) => (
                            <TableRow key={book.id} sx={{ backgroundColor: index % 2 === 0 ? '#E6EAE4' : '#F8F6F2' }}>
                                <TableCell>{book.id}</TableCell>
                                <TableCell>{book.title}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Books;
