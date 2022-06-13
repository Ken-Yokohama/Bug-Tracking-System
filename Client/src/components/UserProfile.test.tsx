import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import UserProfile from "./UserProfile";

describe("UserProfile", () => {
    it("Check if User Id Exists", () => {
        render(<UserProfile id="" email="" role="" />);
        const id = screen.getByText(/Id/);
        expect(id).toBeTruthy();
    });

    it("Should Render the same User Id passed into id prop", () => {
        const myId = "My Id";
        render(<UserProfile id={myId} email="" role="" />);
        const id = screen.getByText("Id: " + myId);
        expect(id).toBeTruthy();
    });

    // it("Check if User Name Exists", () => {
    //     render(<UserProfile id="" email="" role="" />);
    //     const name = screen.getByRole("")
    // });
});
