import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router";
import Header from "./Header";
import styles from "../styles/EditPost.module.css";

export default function EditPost() {
  const { postId } = useParams();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_URL_API}/posts/update/${postId}`, {
      method: "GET",
      type: "cors",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((res) => {
        setText(res.post.text);
        setTitle(res.post.title);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => setIsLoading(false));
  }, [postId]);

  function handleSubmit() {
    fetch(import.meta.env.VITE_URL_API + "/posts/" + postId, {
      method: "PUT",
      type: "cors",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ text, title }),
    })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((res) => {
        navigate(`/`);
      })
      .catch((err) => {
        setError(err);
      });
  }

  if (isLoading) return <h1>Loading...</h1>;

  if (error) return <h1>{error.message}</h1>;

  return (
    <>
      <Header isConnected={true} />
      <main className={styles.main}>
        <div className={styles.titleContainer}>
          <label className={styles.label} htmlFor="title">
            Title:
          </label>
          <input
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            name="title"
            id="title"
          />
        </div>
        <Editor
          value={text}
          onEditorChange={(newValue, editor) => setText(newValue)}
          apiKey="vxpm9czgqse7es5u276n7lqcwkyrcnnksh6xrach1tqulqh1"
          init={{
            height: 500,
            menubar: false,
            plugins: [
              "advlist",
              "autolink",
              "lists",
              "link",
              "image",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "code",
              "fullscreen",
              "insertdatetime",
              "media",
              "table",
              "code",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | " +
              "bold italic forecolor | alignleft aligncenter " +
              "alignright alignjustify | bullist numlist outdent indent | " +
              "removeformat | help",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </main>
    </>
  );
}
