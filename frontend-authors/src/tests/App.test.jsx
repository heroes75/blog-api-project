import { render, screen } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import App from '../App'

describe('testing test', () => {
    test('render App', async () => {
        render(<App />)
        // screen.debug()
        const button = await screen.findByText('create third blog')
        expect(button).toBeInTheDocument()
    })
})