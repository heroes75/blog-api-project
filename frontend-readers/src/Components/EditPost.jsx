import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router";

export default function EditPost() {
    const editorRef = useRef(null);
    const { postId } = useParams();
    const [title, setTitle] = useState("");
    const [ text, setText ] = useState("");

    useEffect(() => {
        fetch("http//:localhost/posts/update/" + postId, {
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
                console.log('res:', res)
                setText(res.post.text);
                setTitle(res.post.title);
            });
    });

    return (
        <>
            <label htmlFor="title">Title:</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" name="title" id="title" />
            <Editor
                apiKey="your-api-key"
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue="<p>This is the initial content of the editor.</p>"
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
            <button>Submit</button>
        </>
    );
}
