import axios from "axios";

export const getCookie = (name: string) => {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === " ") c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) === 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
};

interface RequestFunction {
    (url: string, options?: { method?: string; body?: object }): Promise<any>;
}

export const request: RequestFunction = async (url: string, options = {}) => {
    let method = "get";
    if (options.method) {
        method = options.method.toLowerCase();
    }

    let body = null;
    if (options.body) {
        body = options.body;
    }

    try {
        // Do Request
        if (method === "get") {
            const response = await axios.get(
                (process.env.REACT_APP_LOCAL_API_URL ||
                    "https://ken-yokohama-mern-bug-tracker.onrender.com/") +
                    url,
                {
                    headers: {
                        "x-access-token": getCookie("AuthToken")!,
                        email: getCookie("Email")!,
                    },
                }
            );
            return response.data;
        }

        if (method === "post") {
            const response = await axios.post(
                (process.env.REACT_APP_LOCAL_API_URL ||
                    "https://ken-yokohama-mern-bug-tracker.onrender.com/") +
                    url,
                body,
                {
                    headers: {
                        "x-access-token": getCookie("AuthToken")!,
                        email: getCookie("Email")!,
                    },
                }
            );
            return response.data;
        }
    } catch (err: any) {
        // handle network error here
        if (err instanceof TypeError) {
            const networkError = `${err}`.toLowerCase();
            if (networkError.indexOf("networkerror") !== -1) {
                throw new Error("Check Internet Connectivity");
            }
        }
        throw JSON.parse(err);
    }
};

const clearCacheData = () => {
    caches.keys().then((names) => {
        names.forEach((name) => {
            caches.delete(name);
        });
    });
};

const deleteAllCookies = () => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
};

export const clearAllStorage = () => {
    clearCacheData();
    deleteAllCookies();
    localStorage.clear();
    sessionStorage.clear();
};
