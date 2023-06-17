import { Box } from "@mui/material";
import React from "react";
import HomeIcon from "@mui/icons-material/Home";
import ProjectPerformance from "./project-performance";
import TickeDistribution from "./ticket-distribution";
import RecentActivity from "./recent-activity";

const Dashboard = () => {
    return (
        <Box
            sx={{
                "@media(min-width: 700px)": {
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                },
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
            <RecentActivity />
            {/* Bottom Container */}
            {/* Dont forget to Adjust marginBottom & Max Height of Top Container */}
            <Box
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
                <ProjectPerformance />
                <TickeDistribution />
            </Box>
        </Box>
    );
};

export default Dashboard;
