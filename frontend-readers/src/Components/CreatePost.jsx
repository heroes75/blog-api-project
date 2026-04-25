import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import Header from "./Header";
import styles from "../styles/CreatePost.module.css";

export default function CreatePost() {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/posts/authors", {
      method: "GET",
      type: "cors",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          navigate("/login");
        }
      })
      .catch((error) => setError(error));
  }, []);

  const handleSubmit = () => {
    fetch("http://localhost:8000/posts/", {
      method: "POST",
      type: "cors",
      headers: {
        "content-type": "application/json",
        authorization: localStorage.getItem("token")
          ? "Bearer " + localStorage.getItem("token")
          : "Bearer noToken",
      },
      body: JSON.stringify({ title, text: editorRef.current.getContent() }),
    })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((res) => {
        setSuccessMessage(
          "your is created at url http://localhost:5174/posts/" + res.post.id,
        );
        setTimeout(() => {
          navigate("/");
        }, 5555);
      })
      .catch((err) => setError(err));
  };

  if (error) return <h1>{error.message}</h1>;

  return (
    <>
      <Header isConnected={true} />
      <main className={styles.main}>
        {successMessage && <p>{successMessage}</p>}
        <div className={styles.titleContainer}>
          <label className={styles.label} htmlFor="title">
            Enter the title
          </label>
          <input
            required
            className={styles.input}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            value={title}
            id="title"
            name="title"
          />
        </div>
        <div data-testid="create-post">
          <Editor
            data-testid="create-post"
            apiKey="vxpm9czgqse7es5u276n7lqcwkyrcnnksh6xrach1tqulqh1"
            onInit={(_evt, editor) => (editorRef.current = editor)}
            textareaName="text"
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "preview",
                "help",
                "wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; aria-hidden: false !important; display: block, visibility: visible !important}",
            }}
          />
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </main>
    </>
  );
}
