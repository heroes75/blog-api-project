import { render, screen } from "@testing-library/react";
import { describe, test, vi, expect, beforeEach } from "vitest";
import SignupForm from "../Components/signupPage";

describe("should be have an input and label username, an input and label password and confirm password and a button and a form", () => {
    beforeEach(() => {
        render(<SignupForm />)
    })
    test("should be have an input and label username", () => {
        const inputUsername = screen.getByPlaceholderText("your username");
        const labelUsername = screen.getByLabelText(/Enter your username:/i);
        const inputPassword = screen.getByPlaceholderText("your password");
        const labelPassword = screen.getByLabelText(/Enter your password:/i);
        const inputConfirmPassword = screen.getByPlaceholderText("confirm your password");
        const labelConfirmPassword = screen.getByLabelText(/Confirm your password:/i);
        const button = screen.getByRole('button');
        const form = screen.getByRole('form')
        expect(form).toBeInTheDocument()
        expect(form).toContainElement(inputUsername);
        expect(form).toContainElement(labelUsername);
        expect(form).toContainElement(inputPassword);
        expect(form).toContainElement(labelPassword);
        expect(form).toContainElement(inputConfirmPassword);
        expect(form).toContainElement(labelConfirmPassword);
        expect(form).toContainElement(button);
    });
});
