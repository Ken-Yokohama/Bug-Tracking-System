import { useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Main } from "./containers";
import { Loading, Login } from "./pages";
import { pingServer, userSecurity } from "./service";
import { getCookie } from "./utils/api";

function App() {
    const [serverIsDown, setServerIsDown] = useState<Boolean>(true);

    useEffect(() => {
        const checkServer = async () => {
            try {
                // Check if Server is Up
                const response = await pingServer();
                if (response) {
                    // Check if User Is Banned
                    const credentials = await userSecurity();
                    if (credentials === "Valid Credentials") {
                        // If User is Not Banned, Show the Page
                        setServerIsDown(false);
                    } else {
                        // If User is Banned, Protect the Page
                        setServerIsDown(true);
                    }
                }
            } catch (err) {
                console.log("Server is Down try refreshing");
            }
        };
        checkServer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="App" style={{ height: "100%" }}>
            <Routes>
                <Route
                    path="/*"
                    element={
                        serverIsDown ? (
                            <Loading />
                        ) : getCookie("AuthToken") ? (
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
                        ) : !getCookie("AuthToken") ? (
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
