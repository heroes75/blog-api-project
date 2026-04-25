import { render, screen } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import Header from "../Components/Header";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";

describe("test components", () => {
  test("should have a header, a nav and at least three links, if user is not connected", () => {
    render(
      <MemoryRouter>
        <Header isConnected={false} />
      </MemoryRouter>,
    );
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Signup" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem").length).toEqual(3);
  });
  test("should have a header, a nav and at least link if user connected", () => {
    render(
      <MemoryRouter>
        <Header isConnected={true} />
      </MemoryRouter>,
    );
    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Logout" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem").length).toEqual(2);
  });
});

describe("test logout feature", () => {
  test("if user click on logout he should be deconnected", async () => {
    render(
      <MemoryRouter>
        <Header isConnected={true} />
      </MemoryRouter>,
    );
    const logoutLink = screen.getByRole("link", { name: "Logout" });
    const user = userEvent.setup();
    const local = vi.spyOn(Storage.prototype, "clear");
    await user.click(logoutLink);
    expect(local).toHaveBeenCalledExactlyOnceWith();
  });
});
