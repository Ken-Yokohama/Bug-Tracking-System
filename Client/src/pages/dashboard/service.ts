import { request } from "../../utils/api";

export const getAllProjects = async () => {
    return request("getAllProjects");
};

export const createProject = async (body: object) => {
    return request("createProject", { method: "POST", body });
};
