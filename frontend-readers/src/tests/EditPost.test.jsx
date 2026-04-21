import { createMemoryRouter, RouterProvider } from "react-router";
import { beforeEach, describe, test } from "vitest";
import routes from "../routes";
import { render } from "@testing-library/react";



beforeEach(() => {
    const router = createMemoryRouter(routes)
    render(<RouterProvider router={router}/>)
})

describe('test the presence of components', () => {
    test('test if the editor and the input title are present', () => {
        
    })
})