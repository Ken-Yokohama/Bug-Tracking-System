/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Checkbox, Paper, TextField } from "@mui/material";
import React, { useState, useEffect, SyntheticEvent } from "react";
import { useCookies } from "react-cookie";
import Modal from "@mui/material/Modal";
import LoadingButton from "@mui/lab/LoadingButton";
import FormHelperText from "@mui/material/FormHelperText";
import { useDispatch, useSelector } from "react-redux";
import Autocomplete from "@mui/material/Autocomplete";
import { ProjectsModel } from "../../dashboard/interface";
import { TicketsModel } from "../interface";
import { getAllTickets } from "../../../service";
import { createTicket } from "../service";
import { setProjects } from "../../../features/allProjectsSlice";
import { setTickets } from "../../../features/ticketsSlice";
import { getAllProjects } from "../../dashboard/service";
import AddTicketModal from "./add-ticket-modal";

const TicketTable = ({
    setSelectedFilteredTicket,
    setShowFullDescription,
}: any) => {
    const [cookies] = useCookies<any>(["user"]);

    const dispatch = useDispatch();

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

    return (
        <>
            <Paper
                sx={{
                    margin: "1rem",
                    flex: "1",
                    maxHeight: "390px",
                    display: "flex",
                    flexDirection: "column",
                }}
                elevation={3}
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
                <Box
                    sx={{
                        padding: "1rem",
                        backgroundColor: "#D3D3D3",
                        display: "flex",
                        gap: "1rem",
                    }}
                >
                    <p style={{ flex: "1" }}>Ticket Title</p>
                    <Box
                        sx={{
                            flex: "4",
                            display: "flex",
                            justifyContent: "space-between",
                        }}
                    >
                        <p>Description</p>
                        <p>Creator</p>
                    </Box>
                </Box>
                <Box sx={{ height: "100%", overflowY: "scroll" }}>
                    {resolvedFilterOn
                        ? unresolvedTickets.map(
                              (ticket: TicketsModel, index: number) => (
                                  <Box
                                      key={index}
                                      onClick={() => {
                                          setSelectedFilteredTicket(ticket);
                                          setShowFullDescription(false);
                                      }}
                                      sx={{
                                          padding: "1rem",
                                          display: "flex",
                                          gap: "1rem",
                                          ":hover": {
                                              backgroundColor: "#F0F0F0",
                                              cursor: "pointer",
                                          },
                                      }}
                                  >
                                      <p style={{ flex: "1" }}>
                                          {ticket.title}
                                      </p>
                                      <Box
                                          sx={{
                                              flex: "4",
                                              display: "flex",
                                              justifyContent: "space-between",
                                          }}
                                      >
                                          <p
                                              style={{
                                                  wordBreak: "break-word",
                                              }}
                                          >
                                              {ticket.description}
                                          </p>
                                          <p>{ticket.ticketAuthor}</p>
                                      </Box>
                                  </Box>
                              )
                          )
                        : filteredTickets.map(
                              (ticket: TicketsModel, index: number) => (
                                  <Box
                                      key={index}
                                      onClick={() => {
                                          setSelectedFilteredTicket(ticket);
                                      }}
                                      sx={{
                                          padding: "1rem",
                                          display: "flex",
                                          gap: "1rem",
                                          ":hover": {
                                              backgroundColor: "#F0F0F0",
                                              cursor: "pointer",
                                          },
                                      }}
                                  >
                                      <p style={{ flex: "1" }}>
                                          {ticket.title}
                                      </p>
                                      <Box
                                          sx={{
                                              flex: "4",
                                              display: "flex",
                                              justifyContent: "space-between",
                                          }}
                                      >
                                          <p
                                              style={{
                                                  wordBreak: "break-word",
                                              }}
                                          >
                                              {ticket.description}
                                          </p>
                                          <p>{ticket.ticketAuthor}</p>
                                      </Box>
                                  </Box>
                              )
                          )}
                </Box>
            </Paper>
            {/* Modal */}

            <AddTicketModal open={open} setOpen={setOpen} />
        </>
    );
};

export default TicketTable;
