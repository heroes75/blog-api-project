import { screen, render, within } from "@testing-library/react";
import { expect, test, describe, vi } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router";
import SignupPage from "../SignupPAge";

describe('testing the component of signup page', () => {
    test('should have a form within three inputs and their labels', () => {
        render(<SignupPage />)
        expect(screen.getByRole('textbox', {name: 'Enter your username:'})).toBeInTheDocument()
        expect(screen.getByLabelText('Enter your username:')).toBeInTheDocument()
        expect(screen.getByRole('textbox', {name: 'Enter your password:'})).toBeInTheDocument()
        expect(screen.getByLabelText('Enter your password:')).toBeInTheDocument()
        expect(screen.getByRole('textbox', {name: 'Confirm your password:'})).toBeInTheDocument()
        expect(screen.getByLabelText('Confirm your password:')).toBeInTheDocument()
        expect(screen.getByRole('button', {name: 'Submit'})).toBeInTheDocument()
        expect(screen.getByRole('form')).toBeInTheDocument()
    })
})

describe('testing the coinstraint validation form', () => {
    test('Enter an empty username and empty password should be display the right error', () => {
        const arr = [
            'your username must be only alphanumeric',
            'your password must overflow 8 characters',
            'your password contains at least one upper case',
            'your password contains at least one number',
            'your password contains at least non alphanumeric character'
        ]
        window.fetch = vi.fn(() => Promise.resolve({json: () => ({messages: arr})}))
        render(<SignupPage />)
        // const list = screen.getByRole('list', {name: /list/})
        const errors = screen.getAllByRole('listitem')
        expect(errors[0].textContent).toBe(arr[0])
        expect(errors[1].textContent).toBe(arr[1])
        expect(errors[2].textContent).toBe(arr[2])
        expect(errors[3].textContent).toBe(arr[3])
        expect(errors[4].textContent).toBe(arr[4])
    })
})