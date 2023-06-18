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
import { logout } from "../utils/api";

const Main = () => {
    const dispatch = useDispatch();

    const getTickets = async () => {
        const response = await getAllTickets();
        if (response?.auth === false) {
            logout();
            return;
        }
        if (response !== "No Documents Found") {
            dispatch(setTickets(response));
        }
    };

    const getProjects = async () => {
        const response = await getAllProjects();
        if (response?.auth === false) {
            logout();
            return;
        }
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
                <Box
                    style={{
                        backgroundColor: "#EFEFEF",
                    }}
                >
                    <Box
                        id="Padding for mobile menu-bar"
                        sx={{
                            margin: 0,
                            "@media(max-width: 700px)": {
                                height: "3.1rem",
                            },
                        }}
                    ></Box>
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
        </Box>
    );
};

export default Main;
