import { vi, describe, test, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import routes from "../routes";
import Login from "../Components/loginPage";

beforeEach(() => {
    const router = createMemoryRouter(routes, {initialEntries: ['/login']})
    render(<RouterProvider router={router}/>)
})
describe('test the presence of components', () => {
    test('it\'s should be have a input Component, password component and a button', () => {
        const inputUsername = screen.getByPlaceholderText('your username')
        const labelUsername = screen.getByLabelText('Enter your username:')
        const labelPassword = screen.getByLabelText('Enter your password:')
        const inputPassword = screen.getByPlaceholderText('your password')
        const button = screen.getByRole('button')
        expect(inputPassword).toBeInTheDocument()
        expect(inputUsername).toBeInTheDocument()
        expect(labelUsername).toBeInTheDocument()
        expect(labelPassword).toBeInTheDocument()
        expect(button).toBeInTheDocument()
    })
})

describe()