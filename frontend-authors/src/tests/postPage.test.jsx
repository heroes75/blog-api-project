import { vi, describe, test, expect, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router";
import routes from "../routes";

describe("should be have a heading(h1) for the title, p for author, date and text", () => {
    beforeEach(() => {});
    test("when i type the right url i should have components above", async () => {
        const obj = {
            id: 1,
            authorId: "z1",
            title: "title",
            text: "text",
            createdAt: "2012-12-12T11:11:11.816Z",
            published: true,
            updatedAt: "2012-12-12T11:11:11.816Z",
            comments: []
        };
        window.fetch = vi.fn(() => Promise.resolve({ json: () => ({post: obj}) }));
        const router = createMemoryRouter(routes, {
            initialEntries: ["/posts/1"],
        });
        render(<RouterProvider router={router} />);
        const h1 = await screen.findByRole("heading", { name: "title" });
        const text = await screen.findByText("text");
        const authorName = await screen.findByText("z1");
        await waitFor(() => {
            expect(h1).toBeInTheDocument();
            expect(text).toBeInTheDocument();
            expect(authorName).toBeInTheDocument();
        });
    });
});
