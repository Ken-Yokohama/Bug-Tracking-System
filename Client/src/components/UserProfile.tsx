import { Box, Paper } from '@mui/material';
import React from 'react';

interface props {
    id: string;
    email: string;
    role: string;
    dateRegistered?: string;
}

const UserProfile = ({ id, email, role, dateRegistered }: props) => {
    return (
        <Box>
            <Paper sx={{ padding: '1rem', margin: '1rem' }} elevation={3}>
                <p>Id: {id}</p>
                <hr />
                <p>Name: {email}</p>
                <p>Role: {role}</p>
                <p>
                    Registered:{' '}
                    <span style={{ color: 'orange' }}>
                        {dateRegistered ? dateRegistered : 'No Date Saved'}
                    </span>
                </p>
            </Paper>
        </Box>
    );
};

export default UserProfile;
