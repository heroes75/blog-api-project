import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, vi, expect, beforeEach } from "vitest";
import SignupForm from "../Components/signupPage";
import userEvent from "@testing-library/user-event";
import {
    MemoryRouter,
    Routes,
    Route,
    RouterProvider,
} from "react-router";
import routes from "../routes";
import { createMemoryRouter } from "react-router";

vi.mock(import("react-router"), async (importOriginal) => {
    const mod = await importOriginal();
    return {
        ...mod,
        useNavigate: () => (string) => string,
    };
});

describe("should be have an input and label username, an input and label password and confirm password and a button and a form", () => {
    test("should be have an input and label username", () => {
        render(
            <MemoryRouter initialEntries={["/signup"]}>
                <Routes>
                    <Route path="/signup" element={<SignupForm />} />
                </Routes>
            </MemoryRouter>,
        );
        const inputUsername = screen.getByPlaceholderText("your username");
        const labelUsername = screen.getByLabelText(/Enter your username:/i);
        const inputPassword = screen.getByPlaceholderText("your password");
        const labelPassword = screen.getByLabelText(/Enter your password:/i);
        const inputConfirmPassword = screen.getByPlaceholderText(
            "Confirm your password",
        );
        const labelConfirmPassword = screen.getByLabelText(
            /Confirm your password:/i,
        );
        const button = screen.getByRole("button");
        const form = screen.getByRole("form");
        expect(form).toBeInTheDocument();
        expect(form).toContainElement(inputUsername);
        expect(form).toContainElement(labelUsername);
        expect(form).toContainElement(inputPassword);
        expect(form).toContainElement(labelPassword);
        expect(form).toContainElement(inputConfirmPassword);
        expect(form).toContainElement(labelConfirmPassword);
        expect(form).toContainElement(button);
    });
});

describe("if user type a wrong input it's should be show the right message error", () => {
    beforeEach(() => {
        const router = createMemoryRouter(routes, {
            initialEntries: ["/signup"],
        });
        window.fetch = vi.fn(() => {});
        render(<RouterProvider router={router} />);
    });
    test('if user type an empty password, username or confirm password it\'s should be show "Please enter.."', async () => {
        const button = screen.getByRole("button");
        const messageError = screen.getByRole("list");
        const user = userEvent.setup();
        await user.click(button);
        expect(messageError).toContainElement(
            screen.getByText("Please enter an username"),
        );
        expect(messageError).toContainElement(
            screen.getByText("Please enter a password"),
        );
        expect(messageError).toContainElement(
            screen.getByText("Please confirm your password"),
        );
    });
    test("if user type a username with a non-alphanumeric character and a password of length < 8 with a different confirm password", async () => {
        const button = screen.getByRole("button");
        const inputUsername = screen.getByPlaceholderText("your username");
        const inputPassword = screen.getByPlaceholderText("your password");
        const inputConfirmPassword = screen.getByPlaceholderText(
            "Confirm your password",
        );
        const messageError = screen.getByRole("list");
        const user = userEvent.setup();
        await user.type(inputUsername, "h1£");
        await user.type(inputPassword, "h1");
        await user.type(inputConfirmPassword, "h");
        await user.click(button);
        expect(messageError).toContainElement(
            screen.getByRole("listitem", {
                name: /your username must be only alphanumeric/i,
            }),
        );
        expect(messageError).toContainElement(
            screen.getByRole("listitem", {
                name: /your password must overflow 8 characters/i,
            }),
        );
        expect(messageError).toContainElement(
            screen.getByRole("listitem", {
                name: /The confirmation of your password must be equal to your password/i,
            }),
        );
    });
    test("if user type a password with no number should display an error", async () => {
        const button = screen.getByRole("button");
        const inputPassword = screen.getByPlaceholderText("your password");
        const messageError = screen.getByRole("list");
        const user = userEvent.setup();
        await user.type(inputPassword, "qwertyqwerty");
        await user.click(button);
        expect(messageError).toContainElement(
            screen.getByRole("listitem", {
                name: /your password must contains at least one number/i,
            }),
        );
    });
    test("if user type a password with no upper case it's should display an error", async () => {
        const button = screen.getByRole("button");
        const inputPassword = screen.getByPlaceholderText("your password");
        const messageError = screen.getByRole("list");
        const user = userEvent.setup();
        await user.type(inputPassword, "qwertyqwerty1");
        await user.click(button);
        expect(messageError).toContainElement(
            screen.getByRole("listitem", {
                name: /your password must contains at least one upper case/i,
            }),
        );
    });
    test("if user type a password with no non-alphanumeric character it's should display an error", async () => {
        const button = screen.getByRole("button");
        const inputPassword = screen.getByPlaceholderText("your password");
        const messageError = screen.getByRole("list");
        const user = userEvent.setup();
        await user.type(inputPassword, "qwertyqwerty1A");
        await user.click(button);
        expect(messageError).toContainElement(
            screen.getByRole("listitem", {
                name: /your password must contains at least one non alphanumeric character/i,
            }),
        );
    });
});

describe("user can send a http form", async () => {
    test("if user type the right input it's should be get a json", async () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ["/signup", "/login"],
            initialIndex: 0,
        });

        window.fetch = vi.fn(
            () =>
                new Promise((resolve) => {
                    return resolve({
                        json: () => ({
                            name: "user",
                            password: "1234",
                            id: "123",
                        }),
                    });
                }),
        );
        render(<RouterProvider router={router} />);
        const button = screen.getByRole("button");
        const inputUsername = screen.getByPlaceholderText("your username");
        const inputPassword = screen.getByPlaceholderText("your password");
        const inputConfirmPassword = screen.getByPlaceholderText(
            "Confirm your password",
        );
        const user = userEvent.setup();
        await user.type(inputUsername, "h1roes75");
        await user.type(inputPassword, "1234567@A");
        await user.type(inputConfirmPassword, "1234567@A");
        await user.click(button);
        await waitFor(() => expect(window.fetch).toHaveBeenCalledOnce());
        // screen.debug();
    });
    test("if user type the right input with an existing username it's should be throw an error", async () => {
        const router = createMemoryRouter(routes, {
            initialEntries: ["/signup"],
        });
        window.fetch = vi.fn(() =>
            Promise.resolve({
                json: () => ({
                    message: ["user with this username already exits"],
                    statusCode: 401,
                }),
            }),
        );
        render(<RouterProvider router={router} />);
        const button = screen.getByRole("button");
        const inputUsername = screen.getByPlaceholderText("your username");
        const inputPassword = screen.getByPlaceholderText("your password");
        const inputConfirmPassword = screen.getByPlaceholderText(
            "Confirm your password",
        );
        const messageError = screen.getByRole("list");
        const user = userEvent.setup();
        await user.type(inputUsername, "h1roes75");
        await user.type(inputPassword, "1234567@A");
        await user.type(inputConfirmPassword, "1234567@A");
        await user.click(button);
        expect(messageError).toContainElement(
            screen.getByRole("listitem", {
                name: "user with this username already exits",
            }),
        );
        // screen.debug();
    });
});
