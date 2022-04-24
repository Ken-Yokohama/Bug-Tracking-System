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
    const [cookies, setCookie, removeCookie] = useCookies<any>(["user"]);

    const dispatch = useDispatch();

    const allProjects = useSelector(
        (state: { allProjects: { value: [ProjectsModel] } }) =>
            state.allProjects.value
    );

    // Add New Project
    const addNewProject = async () => {
        setLoadingButton(true);
        try {
            const response = await axios.post(
                "https://ken-yokohama-mern-bug-tracker.herokuapp.com/createProject",
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
        }
    };

    useEffect(() => {
        getProjects();
    }, []);

    // Modal Controllers
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
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
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4,
                        display: "flex",
                        flexDirection: "column",
                    }}
                >
                    <h3 style={{ fontWeight: "100" }}>Create New Project:</h3>
                    <TextField
                        id="standard-basic"
                        label="Title"
                        variant="standard"
                        onChange={(e) => {
                            setNewProjectTitle(e.target.value);
                        }}
                    />
                    <TextField
                        id="standard-basic"
                        label="Description"
                        variant="standard"
                        multiline
                        onChange={(e) => {
                            setNewProjectDescription(e.target.value);
                        }}
                    />
                    <LoadingButton
                        variant="contained"
                        loading={loadingButton}
                        sx={{ marginTop: "0.5rem" }}
                        onClick={addNewProject}
                    >
                        Add Project
                    </LoadingButton>
                    {newProjectErr && (
                        <FormHelperText error>{newProjectErr}</FormHelperText>
                    )}
                </Box>
            </Modal>
        </Box>
    );
};

export default Home;
