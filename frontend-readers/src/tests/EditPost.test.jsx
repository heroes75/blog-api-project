import { createMemoryRouter, RouterProvider } from "react-router";
import { beforeEach, describe, expect, test, vi } from "vitest";
import routes from "../routes";
import { render, screen } from "@testing-library/react";
import { Editor } from "@tinymce/tinymce-react";
import userEvent from "@testing-library/user-event";

const navigate = vi.fn();

vi.mock(import("react-router"), async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    useNavigate: () => navigate,
  };
});

vi.mock(import("@tinymce/tinymce-react"), async (importOriginal) => {
  const mod = await importOriginal();
  return {
    ...mod,
    Editor: vi.fn(),
  };
});

const post = {
  id: "cmnmic8t70000m4udadr71174",
  title: "third blog",
  text: "create third blog",
  createdAt: "2026-04-06T01:24:24.091Z",
  updatedAt: "2026-04-06T01:24:24.093Z",
  published: true,
  authorId: "389ea3f4-ab77-4994-99c7-2c6fd4fe3150",
  author: { username: "johndoe" },
};
beforeEach(() => {
  window.fetch = vi.fn((url) => {
    if (url === `http://localhost:8000/posts/update/${post.id}`) {
      return Promise.resolve({ json: () => ({ post }) });
    } else if (url === "http://localhost:8000/posts/" + post.id) {
      return Promise.resolve({
        json: () => ({
          post: { ...post, text: "updated text", title: "updated title" },
        }),
      });
    }
  });
  const router = createMemoryRouter(routes, {
    initialEntries: ["/posts/" + post.id],
  });
  render(<RouterProvider router={router} />);
});

describe("test the presence of components", () => {
  test("test if the editor and the input title are present", async () => {
    const input = await screen.findByRole("textbox", { name: "Title:" });
    const button = await screen.findByRole("button", { name: "Submit" });
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
    expect(Editor).toHaveBeenCalled();
  });
});

describe("test update function", () => {
  test("if user success to update you should redirect to the view page", async () => {
    const submit = await screen.findByRole("button");
    const user = userEvent.setup(submit);
    await user.click(submit);
    expect(navigate).toHaveBeenCalledExactlyOnceWith(`/`);
  });
});
