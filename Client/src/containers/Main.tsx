import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { SideNav } from "../components";
import { Administration, Dashboard, Projects, Tickets } from "../pages";
import { getAllProjects } from "../pages/projects/service";
import { setProjects } from "../features/allProjectsSlice";
import { useDispatch } from "react-redux";
import { getAllTickets } from "../service";
import { setTickets } from "../features/ticketsSlice";

const Main = () => {
    const dispatch = useDispatch();

    const getTickets = async () => {
        const response = await getAllTickets();
        if (response !== "No Documents Found") {
            dispatch(setTickets(response));
        }
    };

    const getProjects = async () => {
        const response = await getAllProjects();
        if (response !== "No Documents Found") {
            dispatch(setProjects(response));
        }
    };

    useEffect(() => {
        getProjects();
        getTickets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
