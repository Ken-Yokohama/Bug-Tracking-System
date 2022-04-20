import React, { useState } from "react";
import { Button, Link, Paper, TextField, FormHelperText } from "@mui/material";
import { useCookies } from "react-cookie";
import axios from "axios";

const Login = () => {
    const [toggleLogin, setToggleLogin] = useState<Boolean>(true);

    const handleToggleLogin = () => {
        setToggleLogin((prevValue) => !prevValue);
    };

    const [loginEmail, setLoginEmail] = useState<string>("");
    const [loginPassword, setLoginPassword] = useState<string>("");
    const [loginError, setLoginError] = useState<string>("");

    const [registerEmail, setRegisterEmail] = useState<string>("");
    const [registerPassword, setRegisterPassword] = useState<string>("");
    const [registerError, setRegisterError] = useState<string>("");

    const [cookies, setCookie, removeCookie] = useCookies<any>(["user"]);

    const handleRegister = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3001/register",
                {
                    email: registerEmail,
                    password: registerPassword,
                }
            );

            setCookie("Email", response.data.email);
            setCookie("AuthToken", response.data.token);

            window.location.reload();
        } catch (err: any) {
            if (err?.response?.data) {
                setRegisterError(err.response.data);
            } else {
                setRegisterEmail(err.message);
            }
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post("http://localhost:3001/login", {
                email: loginEmail,
                password: loginPassword,
            });

            setCookie("Email", response.data.email);
            setCookie("AuthToken", response.data.token);

            window.location.reload();
        } catch (err: any) {
            if (err?.response?.data) {
                setLoginError(err.response.data);
            } else {
                setLoginError(err.message);
            }
        }
    };

    return (
        <div
            style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundImage:
                    "url(https://media.istockphoto.com/photos/colorful-background-red-blue-and-yellow-orange-colors-abstract-modern-picture-id1332601848?b=1&k=20&m=1332601848&s=170667a&w=0&h=_zrnj0NBLjjuMfPvSqxEHn2-oVlExHhOPXP9HsOO_eI=)",
                backgroundSize: "cover",
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
                        label="Email / Username"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => {
                            setLoginEmail(e.target.value);
                        }}
                    />
                    <TextField
                        label="Password"
                        variant="outlined"
                        type={"password"}
                        fullWidth
                        onChange={(e) => {
                            setLoginPassword(e.target.value);
                        }}
                    />
                    <Button variant="contained" onClick={handleLogin}>
                        Login
                    </Button>
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
                        label="Email / Username"
                        variant="outlined"
                        fullWidth
                        onChange={(e) => {
                            setRegisterEmail(e.target.value);
                        }}
                    />
                    <TextField
                        label="Password"
                        type={"password"}
                        variant="outlined"
                        fullWidth
                        onChange={(e) => {
                            setRegisterPassword(e.target.value);
                        }}
                    />
                    <Button variant="contained" onClick={handleRegister}>
                        Register
                    </Button>
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
