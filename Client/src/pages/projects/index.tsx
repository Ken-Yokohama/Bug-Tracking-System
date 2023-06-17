import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow,
    TextField,
} from "@mui/material";
import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import LoadingButton from "@mui/lab/LoadingButton";
import FormHelperText from "@mui/material/FormHelperText";
import { useDispatch, useSelector } from "react-redux";
import { setProjects } from "../../features/allProjectsSlice";
import { setSelectedProject } from "../../features/selectedProjectSlice";
import { useNavigate } from "react-router-dom";
import { ProjectsModel } from "./interface";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { createProject, getAllProjects } from "./service";

const Projects = () => {
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
        // Do Request

        try {
            const response = await createProject({
                title: newProjectTitle,
                description: newProjectDescription,
            });
            console.log(response);
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
        const response = await getAllProjects();
        if (response !== "No Documents Found") {
            dispatch(setProjects(response));
        }
    };

    // Modal Controllers
    const [open, setOpen] = React.useState(false);
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

    // Pagination Controls
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
        <Box>
            <Box
                sx={{
                    height: "6rem",
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                    padding: "0 1rem",
                    justifyContent: "space-between",
                    "@media(max-width: 700px)": {
                        height: "5rem",
                    },
                }}
            >
                <h2
                    style={{
                        color: "#005096",
                        display: "flex",
                        alignItems: "center",
                    }}
                >
                    <AssignmentIcon sx={{ marginRight: "1rem" }} />
                    Projects
                </h2>
                <Button
                    variant="contained"
                    sx={{
                        marginTop: "0.5rem",
                        backgroundColor: "#005096",
                        ":hover": {
                            backgroundColor: "#01447D",
                        },
                        borderRadius: "0",
                        textTransform: "capitalize",
                    }}
                    onClick={() => {
                        setOpen(true);
                    }}
                >
                    + Add Project
                </Button>
            </Box>

            <Paper
                sx={{
                    margin: "1rem",
                    maxWidth: "calc(100vw - 2rem)",
                }}
                elevation={3}
            >
                <TableContainer
                    sx={{
                        height: "calc(100vh - 12rem)",
                        "@media(max-width: 700px)": {
                            height: "calc(100svh - 14rem)",
                        },
                    }}
                >
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
                                <TableCell width={100}>Project Title</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell align="right">Author</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {allProjects
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((project, index) => (
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
                                            handleSelectedProject(
                                                project.title
                                            );
                                        }}
                                    >
                                        <TableCell width={100}>
                                            {project.title}
                                        </TableCell>
                                        <TableCell>
                                            {project.description}
                                        </TableCell>
                                        <TableCell align="right">
                                            {project.creator}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={allProjects.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
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
                            Submit
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

export default Projects;
