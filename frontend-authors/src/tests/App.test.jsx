import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import App from '../App'
import { createMemoryRouter, RouterProvider } from "react-router";
import routes from "../routes";

describe('testing test', () => {
    test('render App', async () => {
        const obj = [{
            id: 2,
            title: 'third blog',
            text: 'create third blog',
            createdAt: '2012-12-12T11:11:11.073Z',
            updatedAt: '2012-12-12T11:11:11.073Z',
        }]
        window.fetch = vi.fn(() => Promise.resolve({json: () => ({posts: obj})}))
        const router = createMemoryRouter(routes, { initialEntries: ['/']})
        render(<RouterProvider router={router} />)
        screen.debug()
        const button = await screen.findByText('create third blog')
        expect(button).toBeInTheDocument()
    })
})