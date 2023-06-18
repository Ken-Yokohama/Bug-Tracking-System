import React, { useState } from "react";
import { Link, Paper, TextField, FormHelperText } from "@mui/material";
import { useCookies } from "react-cookie";
import { login, register } from "./service";
import { LoadingButton } from "@mui/lab";

const Login = () => {
    const [toggleLogin, setToggleLogin] = useState<Boolean>(true);

    const handleToggleLogin = () => {
        setToggleLogin((prevValue) => !prevValue);
    };

    const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

    const [loginEmail, setLoginEmail] = useState<string>("");
    const [loginPassword, setLoginPassword] = useState<string>("");
    const [loginError, setLoginError] = useState<string>("");

    const [registerEmail, setRegisterEmail] = useState<string>("");
    const [registerPassword, setRegisterPassword] = useState<string>("");
    const [registerError, setRegisterError] = useState<string>("");

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cookies, setCookie, removeCookie] = useCookies<any>(["user"]);

    const handleRegister = async () => {
        setIsButtonLoading(true);
        try {
            // Register User
            const response = await register({
                email: registerEmail,
                password: registerPassword,
            });

            setCookie("Email", response.email, {
                path: "/Bug-Tracking-System",
            });
            setCookie("AuthToken", response.token, {
                path: "/Bug-Tracking-System",
            });

            window.location.reload();
        } catch (err: any) {
            if (err?.response?.data) {
                setRegisterError(err.response.data);
            } else {
                setRegisterEmail(err.message);
            }
        }
        setIsButtonLoading(false);
    };

    const handleLogin = async () => {
        setIsButtonLoading(true);
        try {
            const response = await login({
                email: loginEmail,
                password: loginPassword,
            });

            setCookie("Email", response.email, {
                path: "/Bug-Tracking-System",
            });
            setCookie("AuthToken", response.token, {
                path: "/Bug-Tracking-System",
            });

            window.location.reload();
        } catch (err: any) {
            if (err?.response?.data) {
                setLoginError(err.response.data);
            } else {
                setLoginError(err.message);
            }
        }
        setIsButtonLoading(false);
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
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleLogin();
                            }
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
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleLogin();
                            }
                        }}
                    />
                    <LoadingButton
                        variant="contained"
                        loading={isButtonLoading}
                        sx={{
                            marginTop: "0.5rem",
                            backgroundColor: "#005096",
                            ":hover": {
                                backgroundColor: "#01447D",
                            },
                            borderRadius: "0",
                            textTransform: "capitalize",
                            width: "100%",
                            height: "50px",
                        }}
                        onClick={handleLogin}
                    >
                        LOGIN
                    </LoadingButton>
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
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleRegister();
                            }
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
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleRegister();
                            }
                        }}
                    />
                    <LoadingButton
                        variant="contained"
                        loading={isButtonLoading}
                        sx={{
                            marginTop: "0.5rem",
                            backgroundColor: "#F0781E",
                            ":hover": {
                                backgroundColor: "#d96d1c",
                            },
                            borderRadius: "0",
                            textTransform: "capitalize",
                            width: "100%",
                            height: "50px",
                        }}
                        onClick={handleRegister}
                    >
                        REGISTER
                    </LoadingButton>
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
