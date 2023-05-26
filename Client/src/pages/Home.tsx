import { Box, Button, Paper, TextField } from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import Modal from "@mui/material/Modal";
import LoadingButton from "@mui/lab/LoadingButton";
import FormHelperText from "@mui/material/FormHelperText";
import { useDispatch, useSelector } from "react-redux";
import { setProjects } from "../features/allProjectsSlice";
import { setSelectedProject } from "../features/selectedProjectSlice";
import { useNavigate } from "react-router-dom";

interface ProjectsModel {
    title?: String;
    description?: String;
    creator?: String;
}

const Home = () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cookies, setCookie, removeCookie] = useCookies<any>(["user"]);

    const dispatch = useDispatch();

    const allProjects = useSelector(
        (state: { allProjects: { value: [ProjectsModel] } }) =>
            state.allProjects.value
    );

    // Add New Project
    const addNewProject = async () => {
        // Validate All Fields
        if (!newProjectTitle || !newProjectDescription) {
            setNewProjectErr("Please Complete All Fields");
            return;
        } else {
            setNewProjectErr("");
        }
        setLoadingButton(true);
        try {
            const response = await axios.post(
                (process.env.REACT_APP_LOCAL_API_URL ||
                    "https://ken-yokohama-mern-bug-tracker.onrender.com/") +
                    "createProject",
                {
                    title: newProjectTitle,
                    description: newProjectDescription,
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
            getProjects();
            handleClose();
        } catch (err) {
            if (err instanceof Error) {
                setNewProjectErr(err.message);
                setLoadingButton(false);
            } else {
                setNewProjectErr(String(err));
                setLoadingButton(false);
            }
        }
    };

    const getProjects = async () => {
        const response = await axios.get(
            (process.env.REACT_APP_LOCAL_API_URL ||
                "https://ken-yokohama-mern-bug-tracker.onrender.com/") +
                "getAllProjects",
            {
                headers: {
                    "x-access-token": cookies.AuthToken,
                    email: cookies.Email,
                },
            }
        );
        if (response.data !== "No Documents Found") {
            dispatch(setProjects(response.data));
        }
    };

    useEffect(() => {
        getProjects();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Modal Controllers
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setNewProjectTitle("");
        setNewProjectDescription("");
        setNewProjectErr("");
    };

    // New Project States
    const [newProjectTitle, setNewProjectTitle] = useState<String>("");
    const [newProjectDescription, setNewProjectDescription] =
        useState<String>("");
    const [loadingButton, setLoadingButton] = useState<boolean>(false);
    const [newProjectErr, setNewProjectErr] = useState<String>("");

    const navigate = useNavigate();

    const handleSelectedProject = (title: String | undefined) => {
        dispatch(setSelectedProject(title));
        navigate("/tickets");
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
            <Paper sx={{ margin: "1rem" }} elevation={3}>
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "1rem",
                    }}
                >
                    <h3>Projects</h3>
                    <Button size="small" onClick={handleOpen}>
                        Add Project
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
                    <p style={{ minWidth: "83px" }}>Project Title</p>
                    <Box
                        sx={{
                            flex: "1",
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
                        onClick={() => {
                            handleSelectedProject(project.title);
                        }}
                    >
                        <p style={{ minWidth: "83px" }}>{project.title}</p>
                        <Box
                            sx={{
                                flex: "1",
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
                        boxShadow: 24,
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                        "@media(min-width: 700px)": {
                            width: "60%",
                            zIndex: "1",
                        },
                    }}
                >
                    <h3 style={{ color: "#005096" }}>Create New Project:</h3>
                    <TextField
                        sx={{ marginTop: "1rem" }}
                        error={newProjectErr && !newProjectTitle}
                        id="standard-basic"
                        placeholder="Title"
                        variant="standard"
                        inputProps={{ maxLength: 20 }}
                        onChange={(e) => {
                            setNewProjectTitle(e.target.value);
                        }}
                    />
                    <TextField
                        sx={{ marginTop: "1rem" }}
                        error={newProjectErr && !newProjectDescription}
                        id="standard-basic"
                        placeholder="Description"
                        variant="outlined"
                        minRows={3}
                        multiline
                        onChange={(e) => {
                            setNewProjectDescription(e.target.value);
                        }}
                    />
                    <Box
                        sx={{
                            marginTop: "0.5rem",
                            "@media(min-width: 700px)": {
                                marginTop: "1rem",
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: "1rem",
                            },
                        }}
                    >
                        <Button
                            variant="outlined"
                            sx={{
                                ":hover": {
                                    backgroundColor: "#F0781E",
                                    color: "white",
                                    borderColor: "#F0781E",
                                },
                                color: "#F0781E",
                                borderRadius: "0",
                                textTransform: "capitalize",
                                borderColor: "#F0781E",
                                width: "166px",
                                height: "50px",
                                "@media(max-width: 700px)": {
                                    display: "none",
                                },
                            }}
                            onClick={handleClose}
                        >
                            Cancel
                        </Button>
                        <LoadingButton
                            variant="contained"
                            loading={loadingButton}
                            sx={{
                                backgroundColor: "#005096",
                                ":hover": {
                                    backgroundColor: "#01447D",
                                },
                                borderRadius: "0",
                                textTransform: "capitalize",
                                width: "100%",
                                "@media(min-width: 700px)": {
                                    width: "166px",
                                    height: "50px",
                                },
                            }}
                            onClick={addNewProject}
                        >
                            + Add Project
                        </LoadingButton>
                    </Box>
                    {newProjectErr && (
                        <FormHelperText error>{newProjectErr}</FormHelperText>
                    )}
                </Box>
            </Modal>
        </Box>
    );
};

export default Home;
