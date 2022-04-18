import React, { useState } from "react";
import { Button, Link, Paper, TextField, FormHelperText } from "@mui/material";

const Login = () => {
    const [toggleLogin, setToggleLogin] = useState<Boolean>(true);

    const handleToggleLogin = () => {
        setToggleLogin((prevValue) => !prevValue);
    };

    const [loginEmail, setLoginEmail] = useState<string>("");
    const [loginPassword, setLoginPassword] = useState<string>("");
    const [loginError, setLoginError] = useState<string>("loginError");

    const [registerEmail, setRegisterEmail] = useState<string>("");
    const [registerPassword, setRegisterPassword] = useState<string>("");
    const [registerError, setRegisterError] = useState<string>("loginError");

    return (
        <div
            style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {toggleLogin && (
                <Paper
                    elevation={3}
                    sx={{
                        width: "70vw",
                        maxWidth: "300px",
                        height: "60vh",
                        maxHeight: "350px",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        padding: "3rem",
                        gap: "1rem",
                    }}
                >
                    <h3 style={{ fontWeight: "100" }}>Login User</h3>
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        fullWidth
                    />
                    <Button variant="contained">Login</Button>
                    <Link
                        sx={{ cursor: "pointer", textAlign: "center" }}
                        onClick={handleToggleLogin}
                    >
                        Don't yet have an account? Register
                    </Link>
                    {loginError && (
                        <FormHelperText error>{loginError}</FormHelperText>
                    )}
                </Paper>
            )}
            {!toggleLogin && (
                <Paper
                    elevation={3}
                    sx={{
                        width: "70vw",
                        maxWidth: "300px",
                        height: "60vh",
                        maxHeight: "350px",
                        display: "flex",
                        alignItems: "center",
                        flexDirection: "column",
                        padding: "3rem",
                        gap: "1rem",
                    }}
                >
                    <h3 style={{ fontWeight: "100" }}>Register User</h3>
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        fullWidth
                    />
                    <TextField
                        id="outlined-basic"
                        label="Password"
                        variant="outlined"
                        fullWidth
                    />
                    <Button variant="contained">Register</Button>
                    <Link
                        sx={{ cursor: "pointer", textAlign: "center" }}
                        onClick={handleToggleLogin}
                    >
                        Already have an account? Login
                    </Link>
                    {registerError && (
                        <FormHelperText error>{registerError}</FormHelperText>
                    )}
                </Paper>
            )}
        </div>
    );
};

export default Login;
