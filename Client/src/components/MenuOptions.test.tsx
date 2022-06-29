import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import MenuOptions from "./MenuOptions";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import { BrowserRouter as Router } from "react-router-dom";

interface props {
    link: string;
    label: string;
    Icon: any;
    setToggleMenu: React.Dispatch<React.SetStateAction<Boolean>>;
}

const MockMenuOptions = ({ link, label, Icon, setToggleMenu }: props) => {
    return (
        <Router>
            <MenuOptions
                link={link}
                label={label}
                Icon={Icon}
                setToggleMenu={setToggleMenu}
            />
        </Router>
    );
};

describe("MenuOptions", () => {
    it("Check if H3 Exists", () => {
        render(
            <MockMenuOptions
                Icon={HomeTwoToneIcon}
                label=""
                link=""
                setToggleMenu={() => {}}
            />
        );
        const label = screen.getByRole("heading", { level: 3, name: "" });
        // screen.debug(label);
        expect(label).toBeInTheDocument();
    });

    it("Should Render the same label passed into label prop", () => {
        const labelProp = "TestLabel1";
        render(
            <MockMenuOptions
                Icon={HomeTwoToneIcon}
                label={labelProp}
                link=""
                setToggleMenu={() => {}}
            />
        );
        const label = screen.getByText(labelProp);
        expect(label).toBeInTheDocument();
    });

    it("Check if Icon Exists", () => {
        render(
            <MockMenuOptions
                Icon={HomeTwoToneIcon}
                label=""
                link=""
                setToggleMenu={() => {}}
            />
        );
        const icon = screen.getByTestId("icon");
        expect(icon).toBeInTheDocument();
    });
});
