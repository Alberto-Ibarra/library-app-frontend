import React from 'react'
import {
    Dialog, DialogTitle, DialogContent, Autocomplete,
    DialogActions, Button, TextField, 
    FormControlLabel, Checkbox, CircularProgress
} from '@mui/material';

const AddBookCopyDialog = ({addDialogOpen, setAddDialogOpen, availableBooks, loadingBooks, setNewBookData, newBookData, handleAddNewBookCopy}) => {
    const aisles = Array.from({ length: 12 }, (_, i) => `Aisle ${i + 1}`);
    const conditions = ['New', 'Good', 'Fair', 'Poor'];

    return (
        <Dialog open={addDialogOpen} onClose={() => setAddDialogOpen(false)} fullWidth maxWidth="xs">
            <DialogTitle>Add New Book Copy</DialogTitle>
            <DialogContent>
            <Autocomplete
                options={availableBooks}
                getOptionLabel={(option) => option.title || ''}
                loading={loadingBooks}
                onChange={(event, newValue) => {
                    console.log('Selected Book:', newValue);
                    setNewBookData((prevData) => ({
                        ...prevData,
                        bookid: newValue ? newValue.bookid : null
                    }));
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Select Book Title"
                        margin="dense"
                        fullWidth
                        required
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loadingBooks ? <CircularProgress color="inherit" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
            />

                <Autocomplete
                    options={aisles}
                    onChange={(e, newValue) => setNewBookData({ ...newBookData, location: newValue || '' })}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Location (Aisle)"
                            margin="dense"
                            fullWidth
                        />
                    )}
                />
                <Autocomplete
                    options={conditions}
                    onChange={(e, newValue) => setNewBookData({ ...newBookData, bookcondition: newValue || '' })}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Condition"
                            margin="dense"
                            fullWidth
                        />
                    )}
                />
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={newBookData.isavailable}
                            onChange={(e) => setNewBookData({ ...newBookData, isavailable: e.target.checked })}
                        />
                    }
                    label="Available"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setAddDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAddNewBookCopy} variant="contained">Add</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddBookCopyDialog
