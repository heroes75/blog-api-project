import { vi, describe, test, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import routes from "../routes";
import userEvent from "@testing-library/user-event";

const navigate = vi.fn()
vi.mock(import("react-router"), async (importOriginal) => {
    const mod = await importOriginal()
    return {
        ...mod,
        useNavigate: () => navigate,
    };
});
beforeEach(() => {
    const router = createMemoryRouter(routes, { initialEntries: ["/login"] });
    render(<RouterProvider router={router} />);
});
describe("test the presence of components", () => {
    test("it's should be have a input Component, password component and a button", () => {
        const inputUsername = screen.getByPlaceholderText("your username");
        const labelUsername = screen.getByLabelText("Enter your username:");
        const labelPassword = screen.getByLabelText("Enter your password:");
        const inputPassword = screen.getByPlaceholderText("your password");
        const button = screen.getByRole("button");
        expect(inputPassword).toBeInTheDocument();
        expect(inputUsername).toBeInTheDocument();
        expect(labelUsername).toBeInTheDocument();
        expect(labelPassword).toBeInTheDocument();
        expect(button).toBeInTheDocument();
    });
});

describe("if user type wrong input it's should be display the message error", () => {
    test("if user type an incorrect username it's should display on message error", async () => {
        window.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => ({
                    message: "incorrect username",
                    statusCode: 401,
                }),
            }),
        );
        const inputUsername = screen.getByPlaceholderText("your username");
        const inputPassword = screen.getByPlaceholderText("your password");
        const button = screen.getByRole("button");
        const user = userEvent.setup();
        await user.type(inputUsername, "qwerty");
        await user.type(inputPassword, "qwerty");
        await user.click(button);
        const listItems = screen.getAllByRole("listitem")
        expect(screen.getAllByRole("listitem").length).toBeGreaterThanOrEqual(3);
        expect(listItems[listItems.length - 1].textContent).toEqual('incorrect username')
    });
    test("if user type an incorrect it's should display an error", async () => {
        window.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => ({
                    message: "incorrect password",
                    statusCode: 401,
                }),
            }),
        );
        const inputUsername = screen.getByPlaceholderText("your username");
        const inputPassword = screen.getByPlaceholderText("your password");
        const button = screen.getByRole("button");
        const user = userEvent.setup();
        await user.type(inputUsername, "qwerty");
        await user.type(inputPassword, "qwerty");
        await user.click(button);
        const listItems = screen.getAllByRole("listitem")
        expect(screen.getAllByRole("listitem").length).toBeGreaterThanOrEqual(3);
        expect(listItems[listItems.length - 1].textContent).toEqual('incorrect password')
    });
});

describe("if user type the right username and password it's should connected", () => {
    test("test connection", async () => {
        window.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => ({
                    user: { username: "", password: "" },
                    token: "token",
                }),
            }),
        );
        const inputUsername = screen.getByPlaceholderText("your username");
        const inputPassword = screen.getByPlaceholderText("your password");
        const button = screen.getByRole("button");
        const user = userEvent.setup();
        const localStorageSpy = vi.spyOn(Storage.prototype, 'setItem')
        await user.type(inputUsername, " ");
        await user.type(inputPassword, " ");
        await user.click(button);
        expect(navigate).toHaveBeenCalledExactlyOnceWith("/");
        expect(localStorageSpy).toHaveBeenCalledExactlyOnceWith('token', 'token');
    });
});
