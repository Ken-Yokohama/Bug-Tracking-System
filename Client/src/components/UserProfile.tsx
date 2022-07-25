import { Box, Paper } from '@mui/material';
import React from 'react';

interface props {
    id: string;
    email: string;
    role: string;
    dateRegistered?: string;
    ipAddress?: string;
}

const UserProfile = ({ id, email, role, dateRegistered, ipAddress }: props) => {
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
                        {dateRegistered ? dateRegistered : 'No Date Found'}
                    </span>
                </p>
                <p>
                    Ip: <b>{ipAddress ? ipAddress : 'No Address Found'}</b>
                </p>
            </Paper>
        </Box>
    );
};

export default UserProfile;
