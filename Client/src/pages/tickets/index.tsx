/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Box,
    Button,
    Checkbox,
    InputAdornment,
    Paper,
    TextField,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect, SyntheticEvent } from "react";
import { useCookies } from "react-cookie";
import Modal from "@mui/material/Modal";
import LoadingButton from "@mui/lab/LoadingButton";
import FormHelperText from "@mui/material/FormHelperText";
import { useDispatch, useSelector } from "react-redux";
import { setProjects } from "../../features/allProjectsSlice";
import Autocomplete from "@mui/material/Autocomplete";
import { setTickets } from "../../features/ticketsSlice";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { ProjectsModel } from "../dashboard/interface";
import { TicketsModel } from "./interface";
import { getAllTickets } from "../../service";
import { addComment, addDevs, createTicket, updateStatus } from "./service";
import { getAllProjects } from "../dashboard/service";
import PestControlIcon from "@mui/icons-material/PestControl";
import ConstructionIcon from "@mui/icons-material/Construction";
import HardwareIcon from "@mui/icons-material/Hardware";

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
        const response = await getAllTickets();
        dispatch(setTickets(response));
    };

    // Add new Ticket
    const addNewTicket = async () => {
        // Validate All Fields
        if (
            !ticketTitle ||
            !ticketDescription ||
            !ticketProject ||
            !priority ||
            !type ||
            !estimatedTime
        ) {
            setNewTicketErr("Please Complete All Fields");
            return;
        } else {
            setNewTicketErr("");
        }
        setLoadingButton(true);
        try {
            const response = await createTicket({
                title: ticketTitle,
                description: ticketDescription,
                project: ticketProject,
                priority: priority,
                type: type,
                estimatedTime: estimatedTime,
            });
            console.log(response);
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
        const response = await getAllProjects();
        if (response !== "No Documents Found") {
            dispatch(setProjects(response));
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
    const handleClose = () => {
        setOpen(false);
        setTicketProject("");
        setTicketTitle("");
        setTicketDescription("");
        setPriority("");
        setType("");
        setEstimatedTime(0);
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
        const response = await updateStatus({
            id: selectedFilteredTicket?._id,
            status: e.target.value,
        });
        // Update Ticket Obj State
        const updatedStatusObj = {
            ...selectedFilteredTicket,
            status: e.target.value,
        };
        setSelectedFilteredTicket(updatedStatusObj);

        getTickets();

        // console.log(response);
    };

    const [newDev, setNewDev] = useState<string>("");

    const addNewDev = async () => {
        if (selectedFilteredTicket?.assignedDevs?.includes(newDev)) return;
        if (!selectedFilteredTicket._id) return;

        const response = await addDevs({
            id: selectedFilteredTicket?._id,
            newDev: newDev,
        });

        // Update Ticket Obj State
        setSelectedFilteredTicket((prevValue: any) => ({
            ...prevValue,
            assignedDevs: [...prevValue?.assignedDevs, newDev],
        }));

        setNewDev("");
    };

    const [newComment, setNewComment] = useState<string>("");

    const addNewComment = async () => {
        if (!selectedFilteredTicket._id) return;
        console.log(selectedFilteredTicket?.comments);

        const response = await addComment({
            id: selectedFilteredTicket?._id,
            comment: newComment,
        });
        // Update Ticket Obj State
        const updatedStatusObj = {
            ...selectedFilteredTicket,
            comments: [
                ...selectedFilteredTicket?.comments,
                { author: cookies.Email, comment: newComment },
            ],
        };

        setSelectedFilteredTicket(updatedStatusObj);
        setNewComment("");
        getTickets();

        // console.log(response);
    };

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

    const [showFullDescription, setShowFullDescription] =
        useState<boolean>(false);
    const renderDescription = () => {
        if (
            selectedFilteredTicket?.description.length > 45 &&
            !showFullDescription
        ) {
            return (
                <>
                    {selectedFilteredTicket?.description.substring(0, 30)}...
                    <span
                        onClick={() => {
                            setShowFullDescription(true);
                        }}
                        style={{
                            textDecoration: "underline",
                            cursor: "pointer",
                        }}
                    >
                        See More
                    </span>
                </>
            );
        } else {
            return selectedFilteredTicket?.description;
        }
    };

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
                                backgroundColor: "#F0781E",
                                color: "white",
                            }}
                        >
                            <h3>
                                Ticket Info
                                {selectedFilteredTicket?.title &&
                                    ` -  "${selectedFilteredTicket?.title}"`}
                            </h3>
                        </Box>
                        {selectedFilteredTicket?.title && (
                            <Box
                                sx={{
                                    flex: "1",
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "1rem",
                                    padding: "1rem",
                                }}
                            >
                                <Box
                                    sx={{
                                        flex: "1",
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr 1fr",
                                        gap: "0.5rem",
                                    }}
                                >
                                    <Box>
                                        <p>Priority</p>
                                        <TextField
                                            disabled={true}
                                            sx={{
                                                "& input:disabled": {
                                                    height: "1rem",
                                                    // backgroundColor: "#edeceb",
                                                    WebkitTextFillColor:
                                                        selectedFilteredTicket?.priority ===
                                                        "Low"
                                                            ? "Green"
                                                            : selectedFilteredTicket?.priority ===
                                                              "Medium"
                                                            ? "Orange"
                                                            : "Red",
                                                    borderRadius: "4px",
                                                    fontWeight: "bold",
                                                },
                                            }}
                                            size={"small"}
                                            value={
                                                selectedFilteredTicket?.priority
                                            }
                                        />
                                        {/* <b
                                            style={{
                                                color:
                                                    selectedFilteredTicket?.priority ===
                                                    "Low"
                                                        ? "Green"
                                                        : selectedFilteredTicket?.priority ===
                                                          "Medium"
                                                        ? "Orange"
                                                        : "Red",
                                            }}
                                        >
                                            {selectedFilteredTicket?.priority}
                                        </b> */}
                                    </Box>
                                    <Box
                                        sx={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        <p>Author</p>
                                        <TextField
                                            disabled={true}
                                            sx={{
                                                "& input:disabled": {
                                                    height: "1rem",
                                                    // backgroundColor: "#edeceb",
                                                    WebkitTextFillColor: "grey",
                                                    borderRadius: "4px",
                                                },
                                            }}
                                            size={"small"}
                                            value={
                                                selectedFilteredTicket?.ticketAuthor
                                            }
                                        />
                                    </Box>
                                    <Box
                                        sx={{
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                        }}
                                    >
                                        <p>Description</p>
                                        {renderDescription()}
                                    </Box>
                                </Box>
                                <Box
                                    sx={{
                                        flex: "1",
                                        display: "grid",
                                        gridTemplateColumns: "1fr 1fr 1fr",
                                        gap: "0.5rem",
                                    }}
                                >
                                    <Box>
                                        <p>Type</p>
                                        <TextField
                                            disabled={true}
                                            sx={{
                                                "& input:disabled": {
                                                    height: "1rem",
                                                    // backgroundColor: "#edeceb",
                                                    WebkitTextFillColor: "grey",
                                                    borderRadius: "4px",
                                                },
                                            }}
                                            size={"small"}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        {selectedFilteredTicket?.type ===
                                                        "Issue" ? (
                                                            <ConstructionIcon />
                                                        ) : selectedFilteredTicket?.type ===
                                                          "Bug Fix" ? (
                                                            <PestControlIcon />
                                                        ) : (
                                                            <HardwareIcon fontSize="small" />
                                                            // <></>
                                                        )}
                                                    </InputAdornment>
                                                ),
                                            }}
                                            value={selectedFilteredTicket?.type}
                                        />
                                    </Box>
                                    <Box>
                                        <p>Time (hrs)</p>
                                        <TextField
                                            disabled={true}
                                            sx={{
                                                "& input:disabled": {
                                                    height: "1rem",
                                                    // backgroundColor: "#edeceb",
                                                    WebkitTextFillColor: "grey",
                                                    borderRadius: "4px",
                                                },
                                            }}
                                            size={"small"}
                                            value={
                                                selectedFilteredTicket?.estimatedTime
                                            }
                                        />
                                    </Box>
                                    <Box>
                                        <p>Status</p>
                                        <Select
                                            sx={{
                                                width: "100%",
                                                height: "2rem",
                                            }}
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={
                                                selectedFilteredTicket?.status ||
                                                ""
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
                                </Box>
                                <Box sx={{ flex: "1" }}>
                                    <Box sx={{ display: "flex", gap: "1rem" }}>
                                        <p>Assigned Devs:</p>
                                        <Box sx={{ display: "flex" }}>
                                            <input
                                                value={newDev}
                                                type="text"
                                                placeholder="Add Dev"
                                                style={{ width: "100%" }}
                                                onChange={(e) => {
                                                    setNewDev(e.target.value);
                                                }}
                                            />
                                            <button onClick={addNewDev}>
                                                Add
                                            </button>
                                        </Box>
                                    </Box>
                                    {selectedFilteredTicket?.assignedDevs?.map(
                                        (devs: string, index: number) => (
                                            <p key={index}>{devs}</p>
                                        )
                                    )}
                                </Box>
                            </Box>
                        )}
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
                                backgroundColor: "#005096",
                                color: "white",
                            }}
                        >
                            <h3>Comments</h3>
                        </Box>
                        {selectedFilteredTicket?.title && (
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
                                        value={newComment}
                                        onChange={(e) => {
                                            setNewComment(e.target.value);
                                        }}
                                    />
                                    <button onClick={addNewComment}>
                                        Post
                                    </button>
                                </Box>
                                {selectedFilteredTicket?.comments
                                    ?.slice(0)
                                    ?.reverse()
                                    ?.map(
                                        (
                                            comment: {
                                                author: string;
                                                comment: string;
                                            },
                                            index: number
                                        ) => (
                                            <Box key={index} sx={{ p: "1rem" }}>
                                                <p>
                                                    {comment.author} -{" "}
                                                    {comment.comment}
                                                </p>
                                            </Box>
                                        )
                                    )}
                            </Box>
                        )}
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
                        boxShadow: 24,
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <h3 style={{ color: "#005096" }}>Create New Ticket:</h3>
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
                            error={newTicketErr && !ticketTitle}
                            id="standard-basic"
                            label="Ticket Title"
                            variant="standard"
                            inputProps={{ maxLength: 20 }}
                            onChange={(e) => {
                                setTicketTitle(e.target.value);
                            }}
                        />
                        <TextField
                            error={newTicketErr && !ticketDescription}
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
                            onChange={(
                                e: SyntheticEvent,
                                value: null | string
                            ) => {
                                if (value) {
                                    setTicketProject(value);
                                }
                            }}
                            renderInput={(params: object) => (
                                <TextField
                                    {...params}
                                    label="Choose Project"
                                    error={newTicketErr && !ticketProject}
                                />
                            )}
                        />
                        <Autocomplete
                            fullWidth
                            disablePortal
                            id="combo-box-demo"
                            options={priorityOptions}
                            size="small"
                            onChange={(
                                e: React.SyntheticEvent<Element, Event>,
                                value: string | null
                            ) => {
                                if (value) {
                                    setPriority(value);
                                }
                            }}
                            renderInput={(params: object) => (
                                <TextField
                                    {...params}
                                    label="Choose Priority"
                                    error={newTicketErr && !priority}
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
                                <TextField
                                    {...params}
                                    label="Type"
                                    error={newTicketErr && !type}
                                />
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
                                <TextField
                                    {...params}
                                    label="Time Hrs"
                                    error={newTicketErr && !estimatedTime}
                                />
                            )}
                        />
                    </Box>

                    <LoadingButton
                        variant="contained"
                        loading={loadingButton}
                        sx={{
                            marginTop: "0.5rem",
                            backgroundColor: "#005096",
                            ":hover": {
                                backgroundColor: "#01447D",
                            },
                            borderRadius: "0",
                            textTransform: "capitalize",
                            width: "100%",
                            "@media(min-width: 700px)": {
                                alignSelf: "flex-end",
                                marginTop: "1rem",
                                // width: "166px",
                                // width: "50%",
                                height: "50px",
                            },
                        }}
                        onClick={addNewTicket}
                    >
                        + Add Ticket
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
