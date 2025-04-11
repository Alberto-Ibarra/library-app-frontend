import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Button, Typography, Box} from '@mui/material';
import BookTable from '../components/books/BookTable';
import ConfirmDeleteDialog from '../components/books/ConfirmDeleteDialog';
import AddBookDialog from '../components/books/AddBookDialog';

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
    console.log(books);
    

    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (!authorInput.trim()) return;

        const fetchAuthors = async () => {
            try { 
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

            if (!newBook.title || !newBook.authorNames || !newBook.categoryId) {
                return alert('Please fill in all required fields.');
            }

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

            <BookTable
                books={books}
            />
            <ConfirmDeleteDialog
                confirmDeleteOpen={confirmDeleteOpen}
                setConfirmDeleteOpen={setConfirmDeleteOpen}
                handleDeleteConfirm={handleDeleteConfirm}
            />
            <AddBookDialog
                openAddBook={openAddBook}
                setOpenAddBook={setOpenAddBook}
                newBook={newBook}
                setNewBook={setNewBook}
                authorOptions={authorOptions}
                loadingAuthors={loadingAuthors}
                setAuthorInput={setAuthorInput}
                categories={categories}
                handleAddBook={handleAddBook}
            />
        </Box>
    );
};

export default Books;
