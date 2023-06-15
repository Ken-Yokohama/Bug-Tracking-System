import {
    Box,
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
import { ProjectsModel } from "../../projects/interface";
import { TicketsModel } from "../interface";
import { formatDate } from "../../../utils/api";

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
                    marginBottom: "0",
                    flex: "1",
                    maxHeight: "42vh",
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "calc(100vw - 2rem)",
                    "@media(max-width: 700px)": {
                        maxHeight: "70vh",
                    },
                }}
                elevation={3}
            >
                {/* Table */}
                <TableContainer>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow
                                sx={{
                                    th: {
                                        backgroundColor: "#01447D",
                                        fontWeight: "bold",
                                        fontSize: "1rem",
                                        color: "white",
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
                                                  sx={{
                                                      cursor: "pointer",
                                                      backgroundColor:
                                                          index % 2 === 0
                                                              ? ""
                                                              : "#EFF4F8",
                                                  }}
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
                                                  <TableCell
                                                      width={100}
                                                      align="right"
                                                  >
                                                      {ticket?.createdAt
                                                          ? formatDate(
                                                                ticket?.createdAt
                                                            )
                                                          : "--"}
                                                  </TableCell>
                                                  <TableCell
                                                      width={75}
                                                      align="right"
                                                  >
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
                                                  sx={{
                                                      cursor: "pointer",
                                                      backgroundColor:
                                                          index % 2 === 0
                                                              ? ""
                                                              : "#EFF4F8",
                                                  }}
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
                                                  <TableCell align="right">
                                                      {ticket.status}
                                                  </TableCell>
                                                  <TableCell
                                                      width={100}
                                                      align="right"
                                                  >
                                                      {ticket?.createdAt
                                                          ? formatDate(
                                                                ticket?.createdAt
                                                            )
                                                          : "--"}
                                                  </TableCell>
                                                  <TableCell
                                                      width={75}
                                                      align="right"
                                                  >
                                                      {ticket.ticketAuthor}
                                                  </TableCell>
                                              </TableRow>
                                          )
                                      )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* Pagination Container */}
                <div
                    style={{
                        minHeight: "3.3rem",
                        marginTop: "auto",
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "1rem",
                        }}
                        onChange={handleResolvedFilter}
                    >
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
                                    "@media(max-width: 700px)": {
                                        display: "none",
                                    },
                                }}
                            >
                                <p
                                    style={{
                                        fontSize: "14px",
                                        fontFamily:
                                            '"Roboto","Helvetica","Arial",sans-serif',
                                    }}
                                >
                                    Show Resolved Tickets:
                                </p>
                                <Checkbox size="small" sx={{ padding: "0" }} />
                            </Box>
                        </Box>
                    </Box>
                    <TablePagination
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
                </div>
            </Paper>
        </>
    );
};

export default TicketTable;
