import { request } from "./utils/api";

export const getAllTickets = async () => {
    return request("getAllTickets");
};

export const pingServer = async () => {
    return request("pingServer");
};

export const verifyIp = async () => {
    const response = await fetch("https://api.ipify.org?format=json");
    const data = await response.json();
    return data;
};

export const userSecurity = async () => {
    return request("userSecurity");
};
