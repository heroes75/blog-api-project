import { describe, it, expect, vi, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
import { createMemoryRouter, RouterProvider } from "react-router";
import routes from "../routes";
import userEvent from "@testing-library/user-event";

const navigate = vi.fn(() => {});
vi.mock(import("react-router"), async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    useNavigate: () => navigate,
  };
});
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

    window.fetch = vi.fn(() =>
      Promise.resolve({ json: () => ({ posts: arr }) }),
    );
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });
    render(<RouterProvider router={router} />);
    const authorsName = await screen.findAllByText(arr[1].author.username);
    const deleteButtons = await screen.findAllByRole("button", {
      name: "Delete",
    });
    const editButtons = await screen.findAllByRole("button", { name: "Edit" });
    expect(await screen.findByText(arr[0].title)).toBeInTheDocument();
    expect(await screen.findByText(arr[1].title)).toBeInTheDocument();
    expect(await screen.findByText(arr[0].text)).toBeInTheDocument();
    expect(await screen.findByText(arr[1].text)).toBeInTheDocument();

    expect(authorsName.length).toEqual(2);
    expect(
      await screen.findByRole("button", { name: "Published" }),
    ).toBeInTheDocument();
    expect(
      await screen.findByRole("button", { name: "Unpublished" }),
    ).toBeInTheDocument();
    expect(deleteButtons.length).toEqual(2);
    expect(editButtons.length).toEqual(2);
  });
});

describe("test the buttons", () => {
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
  window.fetch = vi.fn(() => Promise.resolve({ json: () => ({ posts: arr }) }));
  test("should be capable to delete post", async () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });
    render(<RouterProvider router={router} />);
    const user = userEvent.setup();
    const buttonsDelete = await screen.findAllByRole("button", {
      name: "Delete",
    });
    expect(
      (await screen.findAllByRole("button", { name: "Delete" })).length,
    ).toEqual(2);
    await user.click(buttonsDelete[1]);
    expect(
      (await screen.findAllByRole("button", { name: "Delete" })).length,
    ).toEqual(1);
  });
  test("click on Edit button should call navigate function", async () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });
    render(<RouterProvider router={router} />);
    const user = userEvent.setup();
    const buttonsEdit = await screen.findAllByRole("button", { name: "Edit" });
    await user.click(buttonsEdit[0]);
    expect(navigate).toHaveBeenCalledExactlyOnceWith("/posts/" + arr[0].id);
  });
  test("click on published function should be change it in unpublished", async () => {
    const router = createMemoryRouter(routes, { initialEntries: ["/"] });
    render(<RouterProvider router={router} />);
    const user = userEvent.setup();
    const buttonsPublish = await screen.findAllByTestId("publish");
    expect(buttonsPublish[0].textContent).toEqual("Published");
    await user.click(buttonsPublish[0]);
    expect(buttonsPublish[0].textContent).toEqual("Unpublished");
  });
});
