import { Editor } from "@tinymce/tinymce-react";
import { useRef } from "react";

export default function CreatePost() {
    const editorRef = useRef(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };

    return (
        <>
            <Editor
                role="textbox"
                data-testid="create-post"
                apiKey="vxpm9czgqse7es5u276n7lqcwkyrcnnksh6xrach1tqulqh1"
                onInit={(_evt, editor) => (editorRef.current = editor)}
                initialValue="<p>This is the initial content of the editor.</p>"
                init={{
                    iframe_aria_text: 'Content editor',
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
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px; aria-hidden: false; display: block, visibility: visible !important}",
                }}
            />
            <button onClick={log}>Log editor content</button>
        </>
    );
}
