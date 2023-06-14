import { Box, Paper } from "@mui/material";
import React, { useState, useEffect } from "react";
import { ResponsivePie } from "@nivo/pie";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import BuildOutlinedIcon from "@mui/icons-material/BuildOutlined";
import DoneOutlineOutlinedIcon from "@mui/icons-material/DoneOutlineOutlined";
import SidePanelOptions from "./side-panel-options";
import { useSelector } from "react-redux";
import { TicketsModel } from "../../tickets/interface";
import { countTicketsPerProject } from "../../../utils/api";

const ProjectPerformance = () => {
    const allTickets = useSelector(
        (state: { tickets: { value: [TicketsModel] } }) => state.tickets.value
    );

    const data = countTicketsPerProject(allTickets);

    const principalProject = data.reduce((maxObject, obj) =>
        obj.value > maxObject.value ? obj : maxObject
    );

    const [selectedProject, setSelectedProject] = useState<string>("");
    const [newTickets, setnewTickets] = useState<number>(0);
    const [inProgress, setInProgress] = useState<number>(0);
    const [resolvedTickets, setResolvedTickets] = useState<number>(0);

    useEffect(() => {
        setnewTickets(principalProject.tickets.new);
        setInProgress(principalProject.tickets.inProgress);
        setResolvedTickets(principalProject.tickets.resolved);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [principalProject.value]);

    return (
        <Paper
            sx={{
                flex: "1",
                display: "flex",
                flexDirection: "column",
                padding: "2rem",
                paddingBottom: "1rem",
            }}
            elevation={3}
        >
            <h3
                style={{
                    color: "#005096",
                }}
            >
                Project Performance
            </h3>
            <Box
                sx={{
                    display: "flex",
                    flex: "1",
                    gap: "1rem",
                    "@media(max-width: 700px)": {
                        flexDirection: "column",
                        alignItems: "center",
                    },
                }}
            >
                <Box
                    sx={{
                        height: "40vh",
                        width: "100%",
                        maxWidth: "calc(100vw - 4rem)",
                        "@media(min-width: 700px)": {
                            maxWidth: "calc(100vw - 40rem)",
                        },
                    }}
                >
                    <ResponsivePie
                        data={data}
                        // margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
                        // margin={{ top: 10, right: 20, bottom: 10, left: 20 }}
                        margin={{ top: 20, bottom: 20 }}
                        innerRadius={0.5}
                        padAngle={4}
                        activeOuterRadiusOffset={8}
                        borderWidth={1}
                        borderColor={{
                            from: "color",
                            modifiers: [["darker", 0.2]],
                        }}
                        // colors={{ scheme: "blues" }}
                        colors={["#F0781E", "#005096"]}
                        enableArcLinkLabels={false}
                        arcLinkLabelsSkipAngle={10}
                        enableArcLabels={false}
                        arcLinkLabelsTextColor="#333333"
                        arcLinkLabelsThickness={2}
                        arcLinkLabelsColor={{ from: "color" }}
                        arcLabelsSkipAngle={10}
                        arcLabelsTextColor={{
                            from: "color",
                            modifiers: [["brighter", 3]],
                        }}
                        defs={[
                            {
                                id: "dots",
                                type: "patternDots",
                                background: "inherit",
                                color: "rgba(255, 255, 255, 0.3)",
                                size: 4,
                                padding: 1,
                                stagger: true,
                            },
                            {
                                id: "lines",
                                type: "patternLines",
                                background: "inherit",
                                color: "rgba(255, 255, 255, 0.3)",
                                rotation: -45,
                                lineWidth: 6,
                                spacing: 10,
                            },
                        ]}
                        // fill={[
                        //     {
                        //         match: {
                        //             id: "Bug Tracker",
                        //         },
                        //         id: "dots",
                        //     },
                        //     {
                        //         match: {
                        //             id: "My Portfolio",
                        //         },
                        //         id: "lines",
                        //     },
                        // ]}
                        legends={[]}
                        onClick={({ data }) => {
                            setSelectedProject(data.label);
                            setnewTickets(data.tickets.new);
                            setInProgress(data.tickets.inProgress);
                            setResolvedTickets(data.tickets.resolved);
                        }}
                    />
                </Box>
                <Box
                    sx={{
                        width: "50%",
                        minWidth: "205px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        gap: "1rem",
                    }}
                >
                    <SidePanelOptions
                        Icon={LeaderboardOutlinedIcon}
                        title={
                            selectedProject
                                ? "Selected Project"
                                : "Principal Project"
                        }
                        data={
                            selectedProject
                                ? selectedProject
                                : `${principalProject.label} - ${Math.round(
                                      (principalProject.value /
                                          allTickets.length) *
                                          100
                                  )}%`
                        }
                    />
                    <SidePanelOptions
                        Icon={AddCircleOutlineOutlinedIcon}
                        title="New Tickets"
                        data={newTickets}
                    />
                    <SidePanelOptions
                        Icon={BuildOutlinedIcon}
                        title="In Progress"
                        data={inProgress}
                    />
                    <SidePanelOptions
                        Icon={DoneOutlineOutlinedIcon}
                        title="Resolved Tickets"
                        data={resolvedTickets}
                    />
                </Box>
            </Box>
        </Paper>
    );
};

export default ProjectPerformance;
