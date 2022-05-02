import { Box, Paper } from "@mui/material";
import React from "react";

interface props {
    id: string;
    email: string;
    role: string;
}

const UserProfile = ({ id, email, role }: props) => {
    return (
        <Box>
            <Paper sx={{ padding: "1rem", margin: "1rem" }} elevation={3}>
                <p>Id: {id}</p>
                <hr />
                <p>Name: {email}</p>
                <p>Role: {role}</p>
            </Paper>
        </Box>
    );
};

export default UserProfile;
