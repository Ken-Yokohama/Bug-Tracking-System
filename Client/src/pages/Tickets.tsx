import { Box, Button, Paper, TextField } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Modal from "@mui/material/Modal";
import LoadingButton from "@mui/lab/LoadingButton";
import FormHelperText from "@mui/material/FormHelperText";
import { useDispatch, useSelector } from "react-redux";
import { setProjects } from "../features/allProjectsSlice";
import Autocomplete from "@mui/material/Autocomplete";
import { setTickets } from "../features/ticketsSlice";

interface ProjectsModel {
    title?: String;
    description?: String;
    creator?: String;
}

interface TicketsModel {
    project?: String;
    title?: String;
    description?: String;
    ticketAuthor?: String;
    priority?: String;
    status?: String;
    type?: String;
    estimatedTime?: Number;
    assignedDevs?: [String];
    comments?: [
        {
            author: String;
            comment: String;
        }
    ];
}

const Tickets = () => {
    const [cookies, setCookie, removeCookie] = useCookies<any>(["user"]);

    // const checkAuthenticated = async () => {
    //     const response = await axios.get("http://localhost:3001/isUserAuth", {
    //         headers: {
    //             "x-access-token": cookies.AuthToken,
    //             email: cookies.Email,
    //         },
    //     });
    //     console.log(response.data);
    // };

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

    const getTickets = async () => {
        const response = await axios.get(
            "http://localhost:3001/getAllTickets",
            {
                headers: {
                    "x-access-token": cookies.AuthToken,
                    email: cookies.Email,
                },
            }
        );
        dispatch(setTickets(response.data));
    };

    // Add New Project
    const addNewTicket = async () => {
        setLoadingButton(true);
        try {
            const response = await axios.post(
                "http://localhost:3001/createTicket",
                {
                    title: ticketTitle,
                    description: ticketDescription,
                    project: ticketProject,
                    priority: priority,
                    type: type,
                    estimatedTime: estimatedTime,
                },
                {
                    headers: {
                        "x-access-token": cookies.AuthToken,
                        email: cookies.Email,
                    },
                }
            );
            console.log(response?.data);
            setLoadingButton(false);
            getTickets();
            handleClose();
        } catch (err) {
            if (err instanceof Error) {
                setNewTicketErr(err.message);
                setLoadingButton(false);
            } else {
                setNewTicketErr(String(err));
                setLoadingButton(false);
            }
        }
    };

    const getProjects = async () => {
        const response = await axios.get(
            "http://localhost:3001/getAllProjects",
            {
                headers: {
                    "x-access-token": cookies.AuthToken,
                    email: cookies.Email,
                },
            }
        );
        dispatch(setProjects(response.data));
        setProjectOptions(
            response.data.map((project: any) => {
                return project.title;
            })
        );
    };

    useEffect(() => {
        getProjects();
        const userTicketsFilter = allTickets.filter(
            (tickets) => tickets.ticketAuthor == cookies.Email
        );
        const projectTicketsFilter = allTickets.filter(
            (tickets) => tickets.project == selectedProject
        );
        setUserTickets(userTicketsFilter);
        console.log(projectTicketsFilter);
    }, [allTickets, selectedProject]);

    // Modal Controllers
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setNewTicketErr("");
    };

    // Project Options for AutoComplete
    const [projectOptions, setProjectOptions] = useState([]);

    // Options for Priority
    const priorityOptions = ["Low", "Medium", "High"];

    // Options for Type
    const typeOptions = ["Issue", "Bug Fix", "Feature Request"];

    // Options for Time
    const timeOptions = [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
    ];

    // new Ticket States
    const [ticketProject, setTicketProject] = useState<string>("");
    const [ticketTitle, setTicketTitle] = useState<string>("");
    const [ticketDescription, setTicketDescription] = useState<string>("");
    const [priority, setPriority] = useState<string>("");
    const [type, setType] = useState<string>("");
    const [estimatedTime, setEstimatedTime] = useState<number>(0);

    const [loadingButton, setLoadingButton] = useState<boolean>(false);
    // Rename to newTicketErr
    const [newTicketErr, setNewTicketErr] = useState<String>("");

    // Filtered Ticket State
    const [userTickets, setUserTickets] = useState([{}]);
    const [projectTickets, setProjectTickets] = useState<[TicketsModel]>([{}]);

    return (
        <Box>
            <Box
                id="Padding for Menu"
                sx={{
                    "@media(max-width: 700px)": {
                        height: "3.1rem",
                    },
                }}
            ></Box>
            <Paper sx={{ margin: "1rem" }} elevation={3}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "1rem",
                    }}
                >
                    <h3>Tickets</h3>
                    <Button size="small" onClick={handleOpen}>
                        Add Ticket
                    </Button>
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
                {allProjects.map((project, index) => (
                    <Box
                        key={index}
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
                        <p style={{ flex: "1" }}>{project.title}</p>
                        <Box
                            sx={{
                                flex: "4",
                                display: "flex",
                                justifyContent: "space-between",
                            }}
                        >
                            <p style={{ wordBreak: "break-word" }}>
                                {project.description}
                            </p>
                            <p>{project.creator}</p>
                        </Box>
                    </Box>
                ))}
            </Paper>
            {/* <button onClick={checkAuthenticated}>Test JWT</button> */}
            {/* Modal */}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Box
                    sx={{
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <h3 style={{ fontWeight: "100" }}>Create New Ticket:</h3>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1rem",
                            "@media (min-Width: 700px)": {
                                display: "grid",
                                gridTemplateColumns: "1fr 1fr",
                            },
                        }}
                    >
                        <TextField
                            id="standard-basic"
                            label="Ticket Title"
                            variant="standard"
                            onChange={(e) => {
                                setTicketTitle(e.target.value);
                            }}
                        />
                        <TextField
                            id="standard-basic"
                            label="Ticket Description"
                            variant="standard"
                            multiline
                            onChange={(e) => {
                                setTicketDescription(e.target.value);
                            }}
                        />
                        <Autocomplete
                            disablePortal
                            id="combo-box-demo"
                            size="small"
                            options={projectOptions}
                            onChange={(e: any, value: any) => {
                                setTicketProject(value);
                            }}
                            renderInput={(params: any) => (
                                <TextField {...params} label="Choose Project" />
                            )}
                        />
                        <Autocomplete
                            fullWidth
                            disablePortal
                            id="combo-box-demo"
                            options={priorityOptions}
                            size="small"
                            onChange={(e: any, value: any) => {
                                setPriority(value);
                            }}
                            renderInput={(params: any) => (
                                <TextField
                                    {...params}
                                    label="Choose Priority"
                                />
                            )}
                        />
                        <Autocomplete
                            fullWidth
                            disablePortal
                            id="combo-box-demo"
                            options={typeOptions}
                            size="small"
                            onChange={(e: any, value: any) => {
                                setType(value);
                            }}
                            renderInput={(params: any) => (
                                <TextField {...params} label="Type" />
                            )}
                        />
                        <Autocomplete
                            fullWidth
                            disablePortal
                            id="combo-box-demo"
                            options={timeOptions}
                            size="small"
                            onChange={(e: any, value: any) => {
                                setEstimatedTime(value);
                            }}
                            renderInput={(params: any) => (
                                <TextField {...params} label="Time Hrs" />
                            )}
                        />
                    </Box>

                    <LoadingButton
                        variant="contained"
                        loading={loadingButton}
                        sx={{ marginTop: "0.5rem" }}
                        onClick={addNewTicket}
                    >
                        Add Ticket
                    </LoadingButton>
                    {newTicketErr && (
                        <FormHelperText error>{newTicketErr}</FormHelperText>
                    )}
                </Box>
            </Modal>
        </Box>
    );
};

export default Tickets;
