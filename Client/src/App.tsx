import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { Main } from "./containers";
import { setTickets } from "./features/ticketsSlice";
import { Loading, Login } from "./pages";

function App() {
    const [cookies, setCookie, removeCookie] = useCookies<any>(["user"]);

    const [serverIsDown, setServerIsDown] = useState<Boolean>(true);

    const dispatch = useDispatch();

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
        if (response.data != "No Documents Found") {
            dispatch(setTickets(response.data));
        }
    };

    useEffect(() => {
        const pingServer = async () => {
            try {
                const response = await axios.get(
                    "https://ken-yokohama-mern-bug-tracker.herokuapp.com/pingServer"
                );
                if (response) {
                    setServerIsDown(false);
                }
            } catch (err) {
                console.log("Server is Down try refreshing");
            }
        };
        pingServer();
        getTickets();
    }, []);

    return (
        <div className="App" style={{ height: "100%" }}>
            <Routes>
                <Route
                    path="/*"
                    element={
                        serverIsDown ? (
                            <Loading />
                        ) : cookies?.AuthToken ? (
                            <Main />
                        ) : (
                            <Navigate to="/login" />
                        )
                    }
                />
                <Route
                    path="/login"
                    element={
                        serverIsDown ? (
                            <Loading />
                        ) : !cookies?.AuthToken ? (
                            <Login />
                        ) : (
                            <Navigate to="/" />
                        )
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
