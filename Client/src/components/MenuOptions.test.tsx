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
    it("Check if User Id Exists", () => {
        render(
            <MockMenuOptions
                Icon={HomeTwoToneIcon}
                label=""
                link=""
                setToggleMenu={() => {}}
            />
        );
        const label = screen.getByRole("heading", { level: 3, name: "" });
        expect(label).toBeInTheDocument();
    });
});
