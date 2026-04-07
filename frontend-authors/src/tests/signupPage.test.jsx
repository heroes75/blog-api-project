import { render, screen, waitFor } from "@testing-library/react";
import { describe, test, vi, expect, beforeEach } from "vitest";
import SignupForm from "../Components/signupPage";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route } from "react-router";

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
            "confirm your password",
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

describe("if user wrong input it's should be show the right message error", () => {
    beforeEach(() => {
        render(<SignupForm />);
    });
    test('if user type empty it\'s should be show "Please enter.."', async () => {
        const button = screen.getByRole("button");
        const messageError = screen.getByTestId("message-error");
        const user = userEvent.setup();
        // await user.type(inputUsername, 'qw')
        // await user.type(inputPassword, '')
        // await user.type(inputConfirmPassword, '')
        await user.click(button);
        // await waitFor(() => {

        // expect(screen.getByText('Please enter a value')).toBeInTheDocument()
        // })
        expect(messageError).toContainHTML("<li>Please enter an username</li>");
        expect(messageError).toContainHTML("<li>Please enter an password</li>");
    });
});
