import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import MenuOptions from "./MenuOptions";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import { BrowserRouter as Router } from "react-router-dom";

describe("MenuOptions", () => {
    it("Check if User Id Exists", () => {
        render(
            <Router>
                <MenuOptions
                    Icon={HomeTwoToneIcon}
                    label=""
                    link=""
                    setToggleMenu={() => {}}
                />
            </Router>
        );
        const label = screen.getByRole("heading");
        expect(label).toBeInTheDocument();
    });
});
