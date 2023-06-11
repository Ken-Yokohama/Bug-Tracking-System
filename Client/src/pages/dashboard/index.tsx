import { Box, Paper } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";

const Dashboard = () => {
    return (
        <Box
            sx={{
                "@media(min-width: 700px)": {
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                },
                backgroundColor: "#EFEFEF",
            }}
        >
            {/* Header */}
            <Box
                sx={{
                    height: "6rem",
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 1rem",
                    justifyContent: "space-between",
                    "@media(max-width: 700px)": {
                        height: "5rem",
                    },
                }}
            >
                <h2
                    style={{
                        color: "#005096",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <HomeIcon sx={{ marginRight: "1rem" }} />
                    Dashboard
                </h2>
            </Box>
            {/* Top Container */}
            <Paper
                sx={{
                    margin: "1rem",
                    // marginBottom: "0",
                    flex: "1",
                    display: "flex",
                    flexDirection: "column",
                    // maxHeight: "50vh",
                    maxWidth: "calc(100vw - 2rem)",
                    "@media(max-width: 700px)": {
                        maxHeight: "70vh",
                    },
                }}
                elevation={3}
            >
                <div style={{ height: "100%" }}>Container Top</div>
            </Paper>
            {/* Bottom Container */}
            {/* Dont forget to Adjust marginBottom & Max Height of Top Container */}
            {/* <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    margin: "1rem",
                    gap: "1rem",
                    "@media(min-width: 700px)": {
                        flexDirection: "row",
                        display: "flex",
                        flex: "1",
                    },
                }}
            >
                <Paper
                    sx={{
                        flex: "1",
                        display: "flex",
                        flexDirection: "column",
                    }}
                    elevation={3}
                >
                    Container Bottom Left
                </Paper>
                <Paper
                    sx={{
                        flex: "1",
                        display: "flex",
                        flexDirection: "column",
                    }}
                    elevation={3}
                >
                    Container Bottom Right
                </Paper>
            </Box> */}
        </Box>
    );
};

export default Dashboard;
