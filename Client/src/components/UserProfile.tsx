import { Box, Paper } from "@mui/material";
import React from "react";

const UserProfile = ({ id, email, role }: any) => {
    return (
        <Box>
            <Paper sx={{ padding: "1rem", margin: "1rem" }} elevation={3}>
                <p>User Profile</p>
                <hr />
                <p>Id: {id}</p>
                <p>Name: {email}</p>
                <p>Role: {role}</p>
            </Paper>
        </Box>
    );
};

export default UserProfile;
