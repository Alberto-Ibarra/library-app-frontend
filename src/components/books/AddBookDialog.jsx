import React from 'react'
import {
    Dialog, DialogTitle, DialogContent, Autocomplete,
    DialogActions, Button, TextField, Select, MenuItem, InputLabel, FormControl
} from '@mui/material';

const AddBookDialog = ({openAddBook, setOpenAddBook, setNewBook, authorOptions, loadingAuthors, authorInput, setAuthorInput, newBook, categories, handleAddBook}) => {
    return (
        <Dialog open={openAddBook} onClose={() => setOpenAddBook(false)} fullWidth maxWidth="sm">
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
                    freeSolo
                    options={authorOptions}
                    getOptionLabel={(option) => typeof option === 'string' ? option : option.name}
                    loading={loadingAuthors}
                    onInputChange={(event, newInputValue) => {
                        setAuthorInput(newInputValue);
                        setNewBook((prev) => ({ ...prev, authorNames: newInputValue }));
                    }}
                    onChange={(event, newValue) => {
                        let authorName = '';

                        if (typeof newValue === 'string') {
                            authorName = newValue;
                        } else if (newValue?.name) {
                            authorName = newValue.name;
                        }

                        setNewBook((prev) => ({
                            ...prev,
                            authorNames: authorName
                        }));
                        setAuthorInput(authorName);
                    }}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Author"
                            variant="outlined"
                            fullWidth
                            sx={{ mb: 2 }}
                            required
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
    )
}

export default AddBookDialog
