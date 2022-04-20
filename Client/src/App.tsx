import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { Navigate, Route, Routes } from "react-router-dom";
import { Main } from "./containers";
import { Loading, Login } from "./pages";

function App() {
    const [cookies, setCookie, removeCookie] = useCookies<any>(["user"]);

    const [serverIsDown, setServerIsDown] = useState<Boolean>(true);

    useEffect(() => {
        const pingServer = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3001/pingServer"
                );
                if (response) {
                    setServerIsDown(false);
                }
            } catch (err) {
                console.log("Server is Down try refreshing");
            }
        };
        pingServer();
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
