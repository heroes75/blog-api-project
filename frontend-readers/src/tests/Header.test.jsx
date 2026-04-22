import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import Header from "../Components/Header";



describe('test components', () => {
    test('should have a header, a nav and at least two links, if user is not connected', () => {
        render(<Header user={undefined} />)
        expect(screen.getByRole('banner')).toBeInTheDocument()
        expect(screen.getByRole('navigation')).toBeInTheDocument()
        expect(screen.getByRole('list')).toBeInTheDocument()
        expect(screen.getAllByRole('listitem').length).toBeGreaterThan(1)
    })
})