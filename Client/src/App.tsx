import React from "react";
import { useCookies } from "react-cookie";
import { Navigate, Route, Routes } from "react-router-dom";
import { Main } from "./containers";
import { Login } from "./pages";

function App() {
    const [cookies, setCookie, removeCookie] = useCookies<any>(["user"]);

    return (
        <div className="App" style={{ height: "100%" }}>
            <Routes>
                <Route
                    path="/*"
                    element={
                        cookies?.AuthToken ? <Main /> : <Navigate to="/login" />
                    }
                />
                <Route
                    path="/login"
                    element={
                        !cookies?.AuthToken ? <Login /> : <Navigate to="/" />
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
