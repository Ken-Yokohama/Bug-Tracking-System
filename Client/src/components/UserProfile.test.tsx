import { render, screen } from "@testing-library/react";
import UserProfile from "./UserProfile";

describe("UserProfile", () => {
    it("Check if ID Exists", () => {
        render(<UserProfile id="" email="" role="" />);
        const id = screen.getByText(/Id/);
        expect(id).toBeTruthy();
    });
});
