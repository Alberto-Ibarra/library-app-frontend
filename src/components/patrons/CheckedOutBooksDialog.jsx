import React from 'react'
import {
    Typography, Dialog, DialogTitle, DialogContent, List, ListItem, ListItemText
} from '@mui/material';

const CheckedOutBooksDialog = ({handleClose, selectedPatron, checkedOutBooks, openDialog}) => {
    return (
        <Dialog open={openDialog} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>Checked Out Books - {selectedPatron?.firstname} {selectedPatron?.lastname}</DialogTitle>
            <DialogContent>
                {checkedOutBooks.length === 0 ? (
                    <Typography>No books currently checked out.</Typography>
                ) : (
                    <List>
                        {checkedOutBooks.map((book) => (
                            <ListItem key={book.bookCopyId}>
                                <ListItemText
                                    primary={book.title}
                                    secondary={`Checked out on: ${new Date(book.checkouttime).toLocaleString()}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </DialogContent>
        </Dialog>
    )
}

export default CheckedOutBooksDialog
