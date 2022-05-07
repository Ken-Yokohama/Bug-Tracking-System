import { Box, Button, Checkbox, Paper, TextField } from "@mui/material";
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
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

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
            "https://ken-yokohama-mern-bug-tracker.herokuapp.com/getAllTickets",
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
                "https://ken-yokohama-mern-bug-tracker.herokuapp.com/createTicket",
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
            "https://ken-yokohama-mern-bug-tracker.herokuapp.com/getAllProjects",
            {
                headers: {
                    "x-access-token": cookies.AuthToken,
                    email: cookies.Email,
                },
            }
        );
        if (response.data != "No Documents Found") {
            dispatch(setProjects(response.data));
            setProjectOptions(
                response.data.map((project: { title: string }) => {
                    return project.title;
                })
            );
        }
    };

    useEffect(() => {
        getProjects();
        if (selectedProject) {
            const projectTicketsFilter = allTickets?.filter(
                (tickets) => tickets.project == selectedProject
            );
            setFilteredTickets(projectTicketsFilter);
        } else {
            const userTicketsFilter = allTickets?.filter(
                (tickets) => tickets.ticketAuthor == cookies.Email
            );
            setFilteredTickets(userTicketsFilter);
        }
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
    const [filteredTickets, setFilteredTickets] = useState([{}]);

    // Selected Ticket Object
    const [selectedFilteredTicket, setSelectedFilteredTicket] = useState<any>(
        {}
    );

    const handleChangeStatus = async (e: { target: { value: string } }) => {
        const response = await axios.post(
            "https://ken-yokohama-mern-bug-tracker.herokuapp.com/updateStatus",
            {
                id: selectedFilteredTicket?._id,
                status: e.target.value,
            },
            {
                headers: {
                    "x-access-token": cookies.AuthToken,
                    email: cookies.Email,
                },
            }
        );
        // Update Ticket Obj State
        const updatedStatusObj = {
            ...selectedFilteredTicket,
            status: e.target.value,
        };
        setSelectedFilteredTicket(updatedStatusObj);

        getTickets();

        // console.log(response?.data);
    };

    const [newDev, setNewDev] = useState<any>("");

    const addNewDev = async () => {
        if (selectedFilteredTicket?.assignedDevs?.includes(newDev)) return;
        if (!selectedFilteredTicket._id) return;

        const response = await axios.post(
            "https://ken-yokohama-mern-bug-tracker.herokuapp.com/addDevs",
            {
                id: selectedFilteredTicket?._id,
                newDev: newDev,
            },
            {
                headers: {
                    "x-access-token": cookies.AuthToken,
                    email: cookies.Email,
                },
            }
        );
        // Update Ticket Obj State
        const updatedStatusObj = {
            ...selectedFilteredTicket,
            assignedDevs: [selectedFilteredTicket?.assignedDevs, newDev],
        };
        setSelectedFilteredTicket(updatedStatusObj);

        getTickets();

        console.log(response?.data);
    };

    const [newComment, setNewComment] = useState<any>("");

    const addNewComment = async () => {
        if (!selectedFilteredTicket._id) return;
        console.log(selectedFilteredTicket?.comments);

        const response = await axios.post(
            "https://ken-yokohama-mern-bug-tracker.herokuapp.com/addComment",
            {
                id: selectedFilteredTicket?._id,
                comment: newComment,
            },
            {
                headers: {
                    "x-access-token": cookies.AuthToken,
                    email: cookies.Email,
                },
            }
        );
        // Update Ticket Obj State
        const updatedStatusObj = {
            ...selectedFilteredTicket,
            comments: [
                ...selectedFilteredTicket?.comments,
                { author: cookies.Email, comment: newComment },
            ],
        };
        setSelectedFilteredTicket(updatedStatusObj);

        getTickets();

        // console.log(response?.data);
    };

    const [resolvedFilterOn, setResolvedFilterOn] = useState<Boolean>(false);

    const handleResolvedFilter = () => {
        setResolvedFilterOn((prevValue) => !prevValue);
    };

    const [unresolvedTickets, setUnresolvedTickets] = useState<any>([]);

    useEffect(() => {
        const onlyUnresolved = filteredTickets?.filter((ticket: any) => {
            return ticket?.status != "resolved";
        });
        setUnresolvedTickets(onlyUnresolved);
    }, [filteredTickets]);

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
            <Box
                sx={{
                    "@media(min-width: 700px)": {
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                    },
                }}
            >
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
                        <h3>Tickets</h3>
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
                                <p>Show Unresolved</p>
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
                                  (ticket: any, index: number) => (
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
                                                  justifyContent:
                                                      "space-between",
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
                                  (ticket: any, index: number) => (
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
                                                  justifyContent:
                                                      "space-between",
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
                <Box
                    sx={{
                        "@media(min-width: 700px)": {
                            display: "flex",
                            flex: "1",
                        },
                    }}
                >
                    <Paper
                        sx={{
                            margin: "1rem",
                            flex: "1",
                            display: "flex",
                            flexDirection: "column",
                        }}
                        elevation={3}
                    >
                        <Box
                            sx={{
                                padding: "1rem",
                                backgroundColor: "orange",
                                color: "white",
                            }}
                        >
                            <h3>Ticket Info</h3>
                        </Box>
                        <Box
                            sx={{
                                flex: "1",
                                display: "flex",
                                flexDirection: "column",
                                gap: "1rem",
                            }}
                        >
                            <Box
                                sx={{
                                    flex: "1",
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr 2fr",
                                }}
                            >
                                <Box>
                                    <p>Title</p>
                                    {selectedFilteredTicket?.title}
                                </Box>
                                <Box>
                                    <p>Author</p>
                                    {selectedFilteredTicket?.ticketAuthor}
                                </Box>
                                <Box>
                                    <p>Description</p>
                                    {selectedFilteredTicket?.description}
                                </Box>
                            </Box>
                            <Box
                                sx={{
                                    flex: "1",
                                    display: "grid",
                                    gridTemplateColumns: "1fr 1fr 1fr 1fr",
                                }}
                            >
                                <Box>
                                    <p>Status</p>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={
                                            selectedFilteredTicket?.status || ""
                                        }
                                        label="Age"
                                        size="small"
                                        onChange={handleChangeStatus}
                                    >
                                        <MenuItem value="new">new</MenuItem>
                                        <MenuItem value={"in progress"}>
                                            in progress
                                        </MenuItem>
                                        <MenuItem value={"resolved"}>
                                            resolved
                                        </MenuItem>
                                    </Select>
                                    {/* {selectedFilteredTicket?.status} */}
                                </Box>
                                <Box>
                                    <p>Priority</p>
                                    {selectedFilteredTicket?.priority}
                                </Box>
                                <Box>
                                    <p>Type</p>
                                    {selectedFilteredTicket?.type}
                                </Box>
                                <Box>
                                    <p>Time (hrs)</p>
                                    {selectedFilteredTicket?.estimatedTime}
                                </Box>
                            </Box>
                            <Box sx={{ flex: "1" }}>
                                <Box sx={{ display: "flex", gap: "1rem" }}>
                                    <p>Assigned Devs:</p>
                                    <Box sx={{ display: "flex" }}>
                                        <input
                                            type="text"
                                            placeholder="Add Dev"
                                            style={{ width: "100%" }}
                                            onChange={(e) => {
                                                setNewDev(e.target.value);
                                            }}
                                        />
                                        <button onClick={addNewDev}>Add</button>
                                    </Box>
                                </Box>
                                {selectedFilteredTicket?.assignedDevs?.map(
                                    (devs: string, index: number) => (
                                        <p key={index}>{devs}</p>
                                    )
                                )}
                            </Box>
                        </Box>
                    </Paper>
                    <Paper
                        sx={{
                            margin: "1rem",
                            flex: "1",
                            display: "flex",
                            flexDirection: "column",
                        }}
                        elevation={3}
                    >
                        <Box
                            sx={{
                                padding: "1rem",
                                backgroundColor: "#0A95FF",
                                color: "white",
                            }}
                        >
                            <h3>Comments</h3>
                        </Box>
                        <Box
                            sx={{
                                flex: "1 1 1px",
                                overflowY: "scroll",
                                "@media(max-width: 700px)": {
                                    flex: "1 1 300px",
                                },
                            }}
                        >
                            <Box sx={{ display: "flex", padding: "1rem" }}>
                                <input
                                    type="text"
                                    placeholder="Add Comment"
                                    style={{ width: "100%" }}
                                    onChange={(e) => {
                                        setNewComment(e.target.value);
                                    }}
                                />
                                <button onClick={addNewComment}>Post</button>
                            </Box>
                            {selectedFilteredTicket?.comments?.map(
                                (
                                    comment: {
                                        author: string;
                                        comment: string;
                                    },
                                    index: number
                                ) => (
                                    <Box key={index} sx={{ p: "1rem" }}>
                                        <p>
                                            {comment.author} - {comment.comment}
                                        </p>
                                    </Box>
                                )
                            )}
                        </Box>
                    </Paper>
                </Box>
            </Box>
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
