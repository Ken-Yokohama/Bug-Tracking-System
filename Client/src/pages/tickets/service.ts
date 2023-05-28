import { request } from "../../utils/api";

export const createTicket = async (body: object) => {
    return request("createTicket", { method: "POST", body });
};

export const updateStatus = async (body: object) => {
    return request("updateStatus", { method: "POST", body });
};

export const addDevs = async (body: object) => {
    return request("addDevs", { method: "POST", body });
};

export const addComment = async (body: object) => {
    return request("addComment", { method: "POST", body });
};
