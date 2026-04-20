import { createMemoryRouter, RouterProvider } from "react-router";
import { describe, expect, test } from "vitest";
import routes from "../routes";
import { render, screen } from "@testing-library/react";


describe('test the presence of all components', () => {
    test('should have an editor of Tinymce and a button', () => {
        const router = createMemoryRouter(routes, { initialEntries: ['/posts']})
        render(<RouterProvider router={router}/>)
        expect(screen.getByTestId('create-post')).toBeInTheDocument()
        // expect(screen.getByText('This is the initial content of the editor.')).toBeInTheDocument()
        // expect(screen.getByRole('application')).toBeInTheDocument()
        expect(screen.getByRole('button')).toBeInTheDocument()
    })
})