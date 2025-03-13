'use client';

import React, { useState, FormEvent, useEffect } from 'react';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper 
} from '@mui/material';
import axios from 'axios';

interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
}

export default function CrudPage() {
  // State to hold user list
  const [users, setUsers] = useState<IUser[]>([]);

  // Form fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Track user being edited; null means we're adding a new user
  const [editingUser, setEditingUser] = useState<IUser | null>(null);

  /****************************************
   * FETCH USERS ON MOUNT
   ****************************************/
  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users/fetchAll'); 
      // Assuming the response is { users: IUser[] }
      setUsers(response.data.users);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  /****************************************
   * HANDLE ADD / UPDATE
   ****************************************/
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      if (editingUser) {
        // === UPDATE USER ===
        const updatedUser = {
          ...editingUser,
          username,
          email,
          password,
        };

        // Make a PUT/PATCH request to your update endpoint
        await axios.put(`/api/users/update/${editingUser.id}`, updatedUser);

        // Update state
        setUsers((prev) => prev.map((u) => (u.id === editingUser.id ? updatedUser : u)));

        // Reset editing mode
        setEditingUser(null);
      } else {
        // === CREATE NEW USER ===
        // Make a POST request to your create endpoint
        const response = await axios.post('/api/users/register', {
          username,
          email,
          password,
        });

      
        const newUser: IUser = response.data.user;
     

        setUsers((prev) => [...prev, newUser]);
      }
    } catch (error) {
      console.error('Error saving user:', error);
    }

    // Clear form
    setUsername('');
    setEmail('');
    setPassword('');
  };

  /****************************************
   * HANDLE EDIT
   ****************************************/
  const handleEdit = (user: IUser) => {
    setEditingUser(user);
    setUsername(user.username);
    setEmail(user.email);
    setPassword(user.password);
  };

  /****************************************
   * HANDLE DELETE
   ****************************************/
  const handleDelete = async (id: number) => {
    try {
      // Make a DELETE request to your delete endpoint
      await axios.delete(`/api/users/delete/${id}`);

      // Remove user from local state
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  /****************************************
   * RENDER
   ****************************************/
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        CRUD Example
      </Typography>

      {/* Add / Edit Form */}
      <Box component="form" onSubmit={handleSubmit} sx={{ mb: 3 }}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button type="submit" variant="contained">
          {editingUser ? 'Update' : 'Add'}
        </Button>
      </Box>

      {/* Display List of Users */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>ID</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Username</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Email</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Password</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user: IUser) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.username}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.password}</TableCell>
                <TableCell>
                  <Button 
                    onClick={() => handleEdit(user)} 
                    variant="outlined" 
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button 
                    onClick={() => handleDelete(user.id)} 
                    variant="outlined" 
                    color="error"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
