import { describe, it, expect, vi } from "vitest";

import { render, screen } from "@testing-library/react";

import App from "../App";
import { createMemoryRouter, RouterProvider } from "react-router";
import routes from "../routes";

describe("App", () => {
    it("the App should render the subsequent posts", async () => {
        const arr = [
            {
                id: "cmnmic8t70000m4udadr71174",
                title: "third blog",
                text: "create third blog",
                createdAt: "2026-04-06T01:24:24.091Z",
                updatedAt: "2026-04-06T01:24:24.093Z",
                published: true,
                authorId: "389ea3f4-ab77-4994-99c7-2c6fd4fe3150",
                author: { username: "johndoe" },
            },
            {
                id: "cmnmic8",
                title: "second blog",
                text: "create second blog",
                createdAt: "2026-04-16T01:24:24.091Z",
                updatedAt: "2026-04-16T01:24:24.093Z",
                published: false,
                authorId: "389ea3f4-ab77-4994-99c7-2c6fd4fe3150",
                author: { username: "johndoe" },
            },
        ];

        window.fetch = vi.fn(() => Promise.resolve({json: () => ({posts: arr})}))
        const router = createMemoryRouter(routes, {initialEntries: ['/']})
        render(<RouterProvider router={router}/>);
        const authorsName = await screen.findAllByText(arr[1].author.username)
        const deleteButtons = await screen.findAllByRole('button', {name: 'Delete'})
        const editButtons = await screen.findAllByRole('button', {name: 'Edit'})
        // screen.debug();

        expect(await screen.findByText(arr[0].title)).toBeInTheDocument()
        expect(await screen.findByText(arr[1].title)).toBeInTheDocument()
        expect(await screen.findByText(arr[0].text)).toBeInTheDocument()
        expect(await screen.findByText(arr[1].text)).toBeInTheDocument()
        // expect(screen.findAllByText(arr[0].author.username)).toBeInTheDocument()
        expect(authorsName.length).toEqual(2)
        expect(await screen.findByRole("button", {name: 'Published'})).toBeInTheDocument()
        expect(await screen.findByRole("button", {name: 'Unpublished'})).toBeInTheDocument()
        expect(deleteButtons.length).toEqual(2)
        expect(editButtons.length).toEqual(2)

        // check if App components renders headline
    });
});
