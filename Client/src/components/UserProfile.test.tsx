import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserProfile from "./UserProfile";

describe("UserProfile", () => {
    it("Check if User Id Exists", () => {
        render(<UserProfile id="" email="" role="" />);
        const id = screen.getByText(/Id/);
        expect(id).toBeInTheDocument();
    });

    it("Should Render the same User Id passed into id prop", () => {
        const myId = "My Id";
        render(<UserProfile id={myId} email="" role="" />);
        const id = screen.getByText("Id: " + myId);
        expect(id).toBeInTheDocument();
    });

    it("Check if User Email Exists", () => {
        render(<UserProfile id="" email="" role="" />);
        const name = screen.getByText(/Name/);
        expect(name).toBeInTheDocument();
    });

    it("Should Render the same Name passed into email prop", () => {
        const myEmail = "My Name";
        render(<UserProfile id="" email={myEmail} role="" />);
        const name = screen.getByText("Name: " + myEmail);
        expect(name).toBeInTheDocument();
    });
});