import { Box, Paper } from '@mui/material';
import axios from 'axios';
import React from 'react';
import { useCookies } from 'react-cookie';

interface props {
    id: string;
    email: string;
    role: string;
    dateRegistered?: string;
    ipAddress?: string;
}

const UserProfile = ({ id, email, role, dateRegistered, ipAddress }: props) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cookies, setCookie, removeCookie] = useCookies<any>(['user']);

    const handleBanUser = async () => {
        const response = await axios.post(
            (process.env.REACT_APP_LOCAL_API_URL ||
                'https://ken-yokohama-mern-bug-tracker.onrender.com/') +
                'banUser',
            {
                ip: ipAddress,
            },
            {
                headers: {
                    'x-access-token': cookies.AuthToken,
                    email: cookies.Email,
                },
            }
        );
        console.log(response);
    };

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
                {ipAddress && (
                    <button onClick={handleBanUser}>Ban Ip Address</button>
                )}
            </Paper>
        </Box>
    );
};

export default UserProfile;
