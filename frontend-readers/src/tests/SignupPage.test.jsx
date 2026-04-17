import { screen, render } from "@testing-library/react";
import { expect, test, describe, vi } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router";
import SignupPage from "../SignupPAge";
import userEvent from "@testing-library/user-event";
import routes from "../routes";


const navigate = vi.fn()
vi.mock(import('react-router'), async (importOriginal) => {
    const act = await importOriginal()
    return {
        ...act,
        useNavigate: () => navigate
    }
})

describe('testing the component of signup page', () => {
    test('should have a form within three inputs and their labels', () => {
        const router = createMemoryRouter(routes, {initialEntries: ['/signup']})
        render(<RouterProvider router={router}/>)
        expect(screen.getByRole('textbox', {name: 'Enter your username:'})).toBeInTheDocument()
        expect(screen.getByLabelText('Enter your username:')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Enter your password')).toBeInTheDocument()
        expect(screen.getByLabelText('Enter your password:')).toBeInTheDocument()
        expect(screen.getByPlaceholderText('Confirm your password')).toBeInTheDocument()
        expect(screen.getByLabelText('Confirm your password:')).toBeInTheDocument()
        expect(screen.getByRole('button', {name: 'Submit'})).toBeInTheDocument()
        expect(screen.getByRole('form')).toBeInTheDocument()
    })
})

describe('testing the constraint validation form', () => {
    test('Enter an empty username and empty password should be display the right error', async () => {
        const arr = [
            'your username must be only alphanumeric',
            'your password must overflow 8 characters',
            'your password contains at least one upper case',
            'your password contains at least one number',
            'your password contains at least non alphanumeric character'
        ]
        window.fetch = vi.fn(() => Promise.resolve({status: 401, json: () => ({message: arr, statusCode: 401})}))
        const router = createMemoryRouter(routes, {initialEntries: ['/signup']})
        render(<RouterProvider router={router}/>)
        // const list = screen.getByRole('list', {name: /list/})
        const button = screen.getByRole('button')
        const user = userEvent.setup()
        await user.click(button)
        const errors = screen.getAllByRole('listitem')
        expect(errors[0].textContent).toBe(arr[0])
        expect(errors[1].textContent).toBe(arr[1])
        expect(errors[2].textContent).toBe(arr[2])
        expect(errors[3].textContent).toBe(arr[3])
        expect(errors[4].textContent).toBe(arr[4])
    });
    test('if user signup useNavigate must be called', async () =>{
        window.fetch = vi.fn(() => Promise.resolve({json: () => ({user: {}})}))
        const router = createMemoryRouter(routes, {initialEntries: ['/signup']})
        render(<RouterProvider router={router}/>)
        const button = screen.getByRole('button')
        const user = userEvent.setup()
        await user.click(button)
        expect(navigate).toHaveBeenCalledExactlyOnceWith('/login')
    })
})