import {
    Box,
    Button,
    Checkbox,
    Paper,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TableContainer,
    TablePagination,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import { ProjectsModel } from "../../dashboard/interface";
import { TicketsModel } from "../interface";

import AddTicketModal from "./add-ticket-modal";

const TicketTable = ({
    setSelectedFilteredTicket,
    setShowFullDescription,
}: any) => {
    const [cookies] = useCookies<any>(["user"]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const allProjects = useSelector(
        (state: { allProjects: { value: [ProjectsModel] } }) =>
            state.allProjects.value
    );

    const allTickets = useSelector(
        (state: { tickets: { value: [TicketsModel] } }) => state.tickets.value
    );

    const selectedProject = useSelector(
        (state: { selectedProject: { value: string } }) =>
            state.selectedProject.value
    );

    useEffect(() => {
        if (selectedProject) {
            const projectTicketsFilter = allTickets?.filter(
                (tickets) => tickets.project === selectedProject
            );
            setFilteredTickets(projectTicketsFilter);
        } else {
            const userTicketsFilter = allTickets?.filter(
                (tickets) => tickets.ticketAuthor === cookies.Email
            );
            setFilteredTickets(userTicketsFilter);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [allTickets, selectedProject]);

    // Modal Controllers
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);

    // Filtered Ticket State
    const [filteredTickets, setFilteredTickets] = useState([{}]);

    const [resolvedFilterOn, setResolvedFilterOn] = useState<Boolean>(true);

    const handleResolvedFilter = () => {
        setPage(0);
        setResolvedFilterOn((prevValue) => !prevValue);
    };

    const [unresolvedTickets, setUnresolvedTickets] = useState<TicketsModel[]>(
        []
    );

    useEffect(() => {
        const onlyUnresolved = filteredTickets?.filter(
            (ticket: { status?: string }) => {
                return ticket?.status !== "resolved";
            }
        );
        setUnresolvedTickets(onlyUnresolved);
    }, [filteredTickets]);

    // Pagination Controls
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>
            <Paper
                sx={{
                    margin: "1rem",
                    flex: "1",
                    maxHeight: "390px",
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "calc(100vw - 2rem)",
                }}
                elevation={3}
            >
                {/* Header */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "1rem",
                    }}
                    onChange={handleResolvedFilter}
                >
                    <h3>My Tickets</h3>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1rem",
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.25rem",
                            }}
                        >
                            <Checkbox size="small" sx={{ padding: "0" }} />
                            <p>Show Resolved Tickets</p>
                        </Box>
                        <Button size="small" onClick={handleOpen}>
                            Add Ticket
                        </Button>
                    </Box>
                </Box>
                {/* Table */}
                <TableContainer>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow
                                sx={{
                                    th: {
                                        backgroundColor: "#D3D3D3",
                                        fontWeight: "bold",
                                    },
                                }}
                            >
                                <TableCell width={100}>Ticket Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell width={100} align="right">
                                    Status
                                </TableCell>
                                <TableCell align="right">Date</TableCell>
                                <TableCell align="right">Author</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody sx={{ overflowY: "scroll" }}>
                            {resolvedFilterOn
                                ? unresolvedTickets
                                      .slice(
                                          page * rowsPerPage,
                                          page * rowsPerPage + rowsPerPage
                                      )
                                      .map(
                                          (
                                              ticket: TicketsModel,
                                              index: number
                                          ) => (
                                              <TableRow
                                                  hover
                                                  key={index}
                                                  style={{ cursor: "pointer" }}
                                                  onClick={() => {
                                                      setSelectedFilteredTicket(
                                                          ticket
                                                      );
                                                      setShowFullDescription(
                                                          false
                                                      );
                                                  }}
                                              >
                                                  <TableCell>
                                                      {ticket.title}
                                                  </TableCell>
                                                  <TableCell>
                                                      {/* {ticket.description &&
                                                  ticket.description?.length <
                                                      999
                                                      ? ticket.description
                                                      : "long"} */}
                                                      {ticket.description}
                                                  </TableCell>
                                                  <TableCell align="right">
                                                      {ticket.status}
                                                  </TableCell>
                                                  <TableCell align="right">
                                                      DD/MM
                                                  </TableCell>
                                                  <TableCell align="right">
                                                      {ticket.ticketAuthor}
                                                  </TableCell>
                                              </TableRow>
                                          )
                                      )
                                : filteredTickets
                                      .slice(
                                          page * rowsPerPage,
                                          page * rowsPerPage + rowsPerPage
                                      )
                                      .map(
                                          (
                                              ticket: TicketsModel,
                                              index: number
                                          ) => (
                                              <TableRow
                                                  hover
                                                  key={index}
                                                  style={{ cursor: "pointer" }}
                                                  onClick={() => {
                                                      setSelectedFilteredTicket(
                                                          ticket
                                                      );
                                                      setShowFullDescription(
                                                          false
                                                      );
                                                  }}
                                              >
                                                  <TableCell>
                                                      {ticket.title}
                                                  </TableCell>
                                                  <TableCell>
                                                      {ticket.description}
                                                  </TableCell>
                                                  <TableCell>
                                                      {ticket.status}
                                                  </TableCell>
                                                  <TableCell>DD/MM</TableCell>
                                                  <TableCell>
                                                      {ticket.ticketAuthor}
                                                  </TableCell>
                                              </TableRow>
                                          )
                                      )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* Pagination */}
                <TablePagination
                    sx={{
                        minHeight: "3.3rem",
                        marginTop: "auto",
                    }}
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={
                        resolvedFilterOn
                            ? unresolvedTickets.length
                            : filteredTickets.length
                    }
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>

            {/* Modal */}
            <AddTicketModal open={open} setOpen={setOpen} />
        </>
    );
};

export default TicketTable;
