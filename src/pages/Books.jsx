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
import {
    Dialog, DialogTitle, DialogContent, DialogContentText,
    DialogActions, Button, TextField, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
    const [openAddBook, setOpenAddBook] = useState(false);
    const [newBook, setNewBook] = useState({ title: '', authorNames: '', categoryId: '' });
    const [authorOptions, setAuthorOptions] = useState([]);
    const [authorInput, setAuthorInput] = useState('');
    const [loadingAuthors, setLoadingAuthors] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        // Fetch books
        axios.get('https://library-app-production-8775.up.railway.app/api/books/books', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(response => setBooks(response.data))
            .catch(error => console.error('Error fetching books', error));

        // Fetch categories
        axios.get('https://library-app-production-8775.up.railway.app/api/books/categories', {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then(response => setCategories(response.data))
            .catch(error => console.error('Error fetching categories', error));
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (!authorInput.trim()) return;

        const fetchAuthors = async () => {
            try {
                console.log(authorInput);
                
                setLoadingAuthors(true);
                const response = await axios.get(
                    `https://library-app-production-8775.up.railway.app/api/books/authors/search?q=${authorInput}`,
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setAuthorOptions(response.data || []);
            } catch (error) {
                console.error('Error fetching authors:', error);
            } finally {
                setLoadingAuthors(false);
            }
        };

        const delayDebounce = setTimeout(fetchAuthors, 300);

        return () => clearTimeout(delayDebounce);
    }, [authorInput]);

    const handleDeleteClick = (book) => {
        setSelectedBook(book);
        setConfirmDeleteOpen(true);
    };

    const handleDeleteConfirm = async () => {
        try {
            const token = localStorage.getItem('authToken');
            await axios.delete(`https://library-app-production-8775.up.railway.app/api/books/book/${selectedBook.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setBooks((prevBooks) => prevBooks.filter(book => book.id !== selectedBook.id));
            setConfirmDeleteOpen(false);
            setSelectedBook(null);
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    const handleAddBook = async () => {
        try {
            const token = localStorage.getItem('authToken');

            const authorNames = newBook.authorNames
                ? newBook.authorNames.split(',').map(author => author.trim())
                : [];

            const response = await axios.post(
                'https://library-app-production-8775.up.railway.app/api/books/addbook',
                {
                    title: newBook.title,
                    authorNames,
                    categoryId: newBook.categoryId || null
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            setBooks((prevBooks) => [...prevBooks, response.data]);
            setOpenAddBook(false);
            setNewBook({ title: '', authorNames: '', categoryId: '' });
        } catch (error) {
            console.error('Error adding book:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
            }
        }
    };

    return (
        <Box sx={{ p: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h4" gutterBottom>Books</Typography>
                <Button variant="contained" color="primary" onClick={() => setOpenAddBook(true)}>
                    Add Book
                </Button>
            </Box>

            <TableContainer component={Paper} sx={{ width: '100%', mx: 'auto', p: 2 }}>
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

            <Dialog open={confirmDeleteOpen} onClose={() => setConfirmDeleteOpen(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this book?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDeleteOpen(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="error" variant="contained">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openAddBook} onClose={() => setOpenAddBook(false)}>
                <DialogTitle>Add New Book</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Book Title"
                        fullWidth
                        value={newBook.title}
                        onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                        sx={{ mb: 2 }}
                        required
                    />
                    <Autocomplete
                        options={authorOptions}
                        getOptionLabel={(option) => option.name} // <-- this fixes it
                        loading={loadingAuthors}
                        onInputChange={(event, newInputValue) => setAuthorInput(newInputValue)}
                        onChange={(event, newValue) => {
                            setNewBook((prev) => ({
                            ...prev,
                            authorNames: newValue ? newValue.name : ''
                            }));
                        }}
                        renderInput={(params) => (
                            <TextField
                            {...params}
                            label="Author"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            />
                        )}
                    />

                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            value={newBook.categoryId}
                            label="Category"
                            onChange={(e) => setNewBook({ ...newBook, categoryId: e.target.value })}
                            required
                        >
                            {categories.map((cat) => (
                                <MenuItem key={cat.id} value={cat.id}>
                                    {cat.title}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAddBook(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddBook} color="primary" variant="contained">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Books;
