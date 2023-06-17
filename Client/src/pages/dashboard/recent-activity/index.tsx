import {
    Box,
    Divider,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { TicketsModel } from "../../tickets/interface";
import StatusCell from "./status-cell";
import LastUpdate from "./last-update-cell";

const RecentActivity = () => {
    const allTickets = useSelector(
        (state: { tickets: { value: [TicketsModel] } }) => state.tickets.value
    );

    const recentTickets = allTickets
        .filter((ticket) => ticket?.updatedAt)
        ?.sort(
            (a: any, b: any) =>
                new Date(a.updatedAt).valueOf() -
                new Date(b.updatedAt).valueOf()
        )
        .slice(-4);

    const resolvedTickets = allTickets.filter(
        (ticket) => ticket.status === "resolved"
    );

    const inProgressTickets = allTickets.filter(
        (ticket) => ticket.status === "in progress"
    );

    return (
        <Paper
            sx={{
                margin: "1rem",
                // marginBottom: "0",
                padding: "2rem",
                flex: "1",
                display: "flex",
                flexDirection: "column",
                // maxHeight: "50vh",
                maxWidth: "calc(100vw - 2rem)",
            }}
            elevation={3}
        >
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: "1rem",
                }}
            >
                <Box>
                    <h1
                        style={{
                            color: "#005096",
                        }}
                    >
                        Recent Activity
                    </h1>
                    <span>
                        <b
                            style={{
                                color: "#005096",
                            }}
                        >
                            {resolvedTickets.length + inProgressTickets.length}{" "}
                            Active,
                        </b>{" "}
                        proceed to resolve them
                    </span>
                </Box>
                <Box
                    sx={{
                        display: "flex",
                        gap: "2rem",
                        alignItems: "center",
                        "@media(max-width: 700px)": {
                            gap: "0.5rem",
                        },
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            color: "#005096",
                        }}
                    >
                        <h1>{resolvedTickets.length}</h1>
                        <h5 style={{ fontWeight: "normal" }}>Resolved</h5>
                    </Box>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            color: "#F0781E",
                        }}
                    >
                        <h1>{inProgressTickets.length}</h1>
                        <h5
                            style={{
                                fontWeight: "normal",
                                whiteSpace: "nowrap",
                            }}
                        >
                            In-Progress
                        </h5>
                    </Box>
                </Box>
            </Box>
            <Divider variant="middle" sx={{ marginTop: "1rem" }} />
            <TableContainer
                sx={{
                    maxWidth: "calc(100vw - 6rem)",
                }}
            >
                <Table>
                    <TableHead>
                        <TableRow
                            sx={{
                                th: {
                                    fontSize: "1rem",
                                    opacity: "0.5",
                                },
                            }}
                        >
                            <TableCell>Project</TableCell>
                            <TableCell>Ticket</TableCell>
                            <TableCell align="right">Type</TableCell>
                            <TableCell align="right">Author</TableCell>
                            <TableCell align="right">Status</TableCell>
                            <TableCell align="right">Last Update</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {recentTickets.map(
                            (ticket: TicketsModel, index: number) => (
                                <TableRow key={index}>
                                    <TableCell>{ticket.project}</TableCell>
                                    <TableCell>{ticket.title}</TableCell>
                                    <TableCell align="right">
                                        {ticket.type}
                                    </TableCell>
                                    <TableCell align="right">
                                        {ticket.ticketAuthor}
                                    </TableCell>
                                    <TableCell align="right">
                                        <StatusCell status={ticket.status!} />
                                    </TableCell>
                                    <TableCell align="right">
                                        <LastUpdate
                                            updatedAt={ticket.updatedAt}
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Paper>
    );
};

export default RecentActivity;
