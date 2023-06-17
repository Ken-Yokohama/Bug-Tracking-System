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
        if (err?.response?.data) {
            throw err.response.data;
        }
        if (err?.message) {
            throw err.message;
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
        // Clear Cookies for path /Bug-Tracking-System
        document.cookie =
            name +
            "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/Bug-Tracking-System";
        // Clear Cookies for path /
        document.cookie =
            name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
    }
};

export const clearAllStorage = () => {
    clearCacheData();
    deleteAllCookies();
    localStorage.clear();
    sessionStorage.clear();
};

export const logout = () => {
    clearAllStorage();
    if (!document.cookie) {
        window.location.reload();
    }
};

export const formatDate = (rawDate: Date) => {
    const date = new Date(rawDate);
    const year = date.getFullYear();
    // const month = String(date.getMonth() + 1).padStart(2, "0");
    const month = date.toLocaleDateString(undefined, { month: "short" });
    const day = String(date.getDate()).padStart(2, "0");
    return `${month} ${day} ${year}`;
};

export const countTicketsPerProject = (tickets: any) => {
    const ticketCount: { [key: string]: number } = {};
    const newTicketCount: { [key: string]: number } = {};
    const inProgressCount: { [key: string]: number } = {};
    const resolvedCount: { [key: string]: number } = {};

    for (let i = 0; i < tickets.length; i++) {
        const project = tickets[i].project;

        // Total Ticket Count
        if (ticketCount[project]) {
            ticketCount[project]++;
        } else {
            ticketCount[project] = 1;
        }

        // New Ticket Count
        if (tickets[i].status === "new") {
            if (newTicketCount[project]) {
                newTicketCount[project]++;
            } else {
                newTicketCount[project] = 1;
            }
        }

        // In Progress Count
        if (tickets[i].status === "in progress") {
            if (inProgressCount[project]) {
                inProgressCount[project]++;
            } else {
                inProgressCount[project] = 1;
            }
        }

        // Resolved Count
        if (tickets[i].status === "resolved") {
            if (resolvedCount[project]) {
                resolvedCount[project]++;
            } else {
                resolvedCount[project] = 1;
            }
        }
    }

    const result = [];

    for (const project in ticketCount) {
        result.push({
            id: project,
            label: project,
            value: ticketCount[project],
            tickets: {
                new: newTicketCount[project] || 0,
                inProgress: inProgressCount[project] || 0,
                resolved: resolvedCount[project] || 0,
            },
        });
    }

    return result;
};

interface OutputObject {
    id: string;
    data: { x: string; y: number }[];
}

export const formatTicketDistribution = (input: any): OutputObject[] => {
    const result: OutputObject[] = [];

    // Group objects by project and type
    const groupedData: { [type: string]: { [project: string]: number } } = {};

    for (const obj of input) {
        if (!(obj.type in groupedData)) {
            groupedData[obj.type] = {};
        }

        if (!(obj.project in groupedData[obj.type])) {
            groupedData[obj.type][obj.project] = 0;
        }

        groupedData[obj.type][obj.project]++;
    }

    // Get unique projects
    const projects = input
        .map((obj: any) => obj.project)
        .filter(
            (value: any, index: number, self: any) =>
                self.indexOf(value) === index
        );

    // Transform grouped data into the desired format
    for (const type in groupedData) {
        const data: { x: string; y: number }[] = [];

        for (const project of projects) {
            const count = groupedData[type][project] || 0;
            data.push({ x: project, y: count });
        }

        result.push({ id: type, data: data.reverse() });
    }

    // Calculate total number of tickets per project
    const totalData: { x: string; y: number }[] = [];
    for (const project of projects) {
        const totalCount = input.filter(
            (obj: any) => obj.project === project
        ).length;
        totalData.push({ x: project, y: totalCount });
    }
    // result.unshift({ id: "Total Tickets", data: totalData }); //Add to beginning

    return result.reverse();
};
