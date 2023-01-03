import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Main } from './containers';
import { setTickets } from './features/ticketsSlice';
import { Loading, Login } from './pages';

function App() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [cookies, setCookie, removeCookie] = useCookies<any>(['user']);

    const [serverIsDown, setServerIsDown] = useState<Boolean>(true);

    const dispatch = useDispatch();

    const getTickets = async () => {
        const response = await axios.get(
            (process.env.REACT_APP_LOCAL_API_URL ||
                'https://ken-yokohama-mern-bug-tracker.onrender.com/') +
                'getAllTickets',
            {
                headers: {
                    'x-access-token': cookies.AuthToken,
                    email: cookies.Email,
                },
            }
        );
        if (response.data !== 'No Documents Found') {
            dispatch(setTickets(response.data));
        }
    };

    useEffect(() => {
        const pingServer = async () => {
            try {
                // Check if Server is Up
                const response = await axios.get(
                    (process.env.REACT_APP_LOCAL_API_URL ||
                        'https://ken-yokohama-mern-bug-tracker.onrender.com/') +
                        'pingServer'
                );
                if (response) {
                    // Check if User Is Banned
                    const ipResponse = await fetch(
                        'https://api.ipify.org?format=json'
                    );
                    const ipData = await ipResponse.json();
                    const response = await axios.post(
                        (process.env.REACT_APP_LOCAL_API_URL ||
                            'https://ken-yokohama-mern-bug-tracker.onrender.com/') +
                            'userSecurity',
                        {
                            ip: ipData.ip,
                        }
                    );
                    if (response.data === 'Valid Credentials') {
                        // If User is Not Banned, Show the Page
                        setServerIsDown(false);
                    } else {
                        // If User is Banned, Protect the Page
                        setServerIsDown(true);
                    }
                }
            } catch (err) {
                console.log('Server is Down try refreshing');
            }
        };
        pingServer();
        getTickets();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="App" style={{ height: '100%' }}>
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
