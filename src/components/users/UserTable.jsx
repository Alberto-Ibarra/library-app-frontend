import React from 'react'
import { Paper, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Box, Button } from '@mui/material'

const UserTable = ({users, handleEditClick, handleDeleteClick}) => {
    return (
        <TableContainer component={Paper} sx={{ width: '100%', mx: 'auto', p: 2 }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#3E6B48', color: '#F5F5F5' }}>
                        <TableCell sx={{ color: '#F5F5F5' }}><strong>Id</strong></TableCell>
                        <TableCell sx={{ color: '#F5F5F5' }}><strong>Role</strong></TableCell>
                        <TableCell sx={{ color: '#F5F5F5' }}><strong>First Name</strong></TableCell>
                        <TableCell sx={{ color: '#F5F5F5' }}><strong>Last Name</strong></TableCell>
                        <TableCell sx={{ color: '#F5F5F5' }}><strong>Email</strong></TableCell>
                        <TableCell sx={{ color: '#F5F5F5' }}><strong>Actions</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((user, index) => (
                        <TableRow key={user.id || index} sx={{ backgroundColor: index % 2 === 0 ? '#E6EAE4' : '#F8F6F2' }}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{user.firstname}</TableCell>
                            <TableCell>{user.lastname}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <Button variant="contained" color="primary" size="small" onClick={() => handleEditClick(user)}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" color="error" size="small" onClick={() => handleDeleteClick(user)}>
                                        Delete
                                    </Button>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default UserTable
