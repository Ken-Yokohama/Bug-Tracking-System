import { Box } from "@mui/material";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { SideNav } from "../components";
import { Administration, Dashboard, Projects, Tickets } from "../pages";

const Main = () => {
    return (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
            }}
        >
            <Box
                id="Container"
                sx={{
                    height: "100%",
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "1fr 4fr",
                    maxWidth: "2200px",
                    "@media(max-width: 700px)": {
                        gridTemplateColumns: "1fr",
                    },
                }}
            >
                <SideNav />
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/tickets" element={<Tickets />} />
                    <Route
                        path="/administration"
                        element={<Administration />}
                    />
                </Routes>
            </Box>
        </Box>
    );
};

export default Main;
