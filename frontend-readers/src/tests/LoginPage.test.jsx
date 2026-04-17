import { vi, expect, test, describe, beforeAll, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import routes from "../routes";
import userEvent from "@testing-library/user-event";


beforeEach(() => {
    const router = createMemoryRouter(routes, {initialEntries: ['/login']})
    render(<RouterProvider router={router}/>)
})

describe('test if login page knows all this components', () => {
    test('login page should have two inputs and it\'s labels, and a form', () => {
        expect(screen.getByRole('textbox', {name: 'Enter your username:'})).toBeInTheDocument()
        expect(screen.getByPlaceholderText('password')).toBeInTheDocument()
        expect(screen.getByLabelText('Enter your password:')).toBeInTheDocument()
        expect(screen.getByRole('button')).toBeInTheDocument()
        expect(screen.getByRole('form')).toBeInTheDocument()
    })
})

describe('test invalid credential', () => {
    test('make an invalid username shows the right error', async () => {
        window.fetch = vi.fn(() => Promise.resolve({status: 401, json: () => ({message: ['invalid username'], statusCode: 401})}))
        const user =  userEvent.setup()
        const button = screen.getByRole('button')
        await user.click(button)
        expect(screen.getByRole('listitem').textContent).toEqual('invalid username')
    })
})