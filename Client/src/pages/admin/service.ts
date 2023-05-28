import { request } from "../../utils/api";

export const getUsers = async () => {
    return request("getUsers");
};
