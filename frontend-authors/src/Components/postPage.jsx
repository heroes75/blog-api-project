import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from "../styles/PostPage.module.css";
import DOMPurify from "dompurify";
import Header from "./Header";

export default function Post() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [userId, setUserId] = useState(null);
  const [postInput, setPostInput] = useState("");
  const [editInput, setEditInput] = useState("");
  const [editId, setEditId] = useState("");
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}`, {
      method: "GET",
      type: "cors",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then(async (res) => {
        return res.json();
      })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(res.message);
        }
        setPost(res.post);

        setUserId(res.userId);
        setComments(res.post.comments);
      })
      .catch((err) => {
        console.log('err:', err)
        setError(err);
      })
      .finally(() => setLoading(false));
  }, [postId]);

  function showEditing(id) {
    setEditId(id);
    setEditInput("");
  }
  function hideEditing() {
    setEditId("");
    setEditInput("");
  }

  function handlePost(e) {
    setPostInput(e.target.value);
  }

  function handleEdit(e) {
    setEditInput(e.target.value);
  }

  function deleteComment(id) {
    const filteredComments = comments.filter((comment) => comment.id !== id);

    setComments(filteredComments);
    fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments/${id}`, {
      method: "DELETE",
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
      .catch((err) => setError(err));
  }

  function postComment(e) {
    e.preventDefault();
    const text = postInput;
    setPostInput("");
    fetch(import.meta.env.VITE_API_URL + "/posts/" + postId + "/comments", {
      method: "POST",
      type: "cors",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ text }),
    })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((res) => {
        setComments((prev) => prev.concat(res.comment));
      })
      .catch((err) => setError(err));
  }

  function editComment(e) {
    e.preventDefault();
    setComments(
      comments.map((comment) => {
        if (comment.id === editId) {
          return { ...comment, text: editInput };
        }
        return comment;
      }),
    );
    setEditId("");
    setEditInput("");
    fetch(`${import.meta.env.VITE_API_URL}/posts/${postId}/comments/${editId}`, {
      method: "put",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ text: editInput }),
    })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .catch((err) => setError(err));
  }

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error.message}</h1>;
  return (
    <>
      <Header isConnected={!!userId} />
      <main className={styles.main}>
        <h1 className={styles.title}>{post.title}</h1>
        <hr />
        <div className={styles.infoBlog}>
          <p className={styles.username}>{post.author.username}</p>
          <p className={styles.createdAt}>
            Created at:{" "}
            {new Date(post.createdAt).toUTCString().replace(/:\d+ GMT/, "")}
          </p>
          {post.createdAt !== post.updatedAt && (
            <p className={styles.updatedAt}>
              Updated at:{" "}
              {new Date(post.updatedAt).toUTCString().replace(/:\d+ GMT/, "")}
            </p>
          )}
        </div>
        <hr />
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.text) }}
        />

        <div className={styles.commentTitle}>
          <h2 className={styles.commentsSection}>Comments</h2>
          <span className={styles.hr}></span>
        </div>
        {userId && (
          <form className={styles.formComment}>
            <label className={styles.label} htmlFor="text-send">
              Enter your comment:
            </label>
            <textarea
              className={styles.textarea}
              onChange={handlePost}
              value={postInput}
              name="text"
              id="text-send"
              cols="20"
              rows="5"
            ></textarea>
            <button
              className={styles.button}
              onClick={postComment}
              type="submit"
            >
              Submit
            </button>
          </form>
        )}
        <div className={styles.commentsContainer}>
          {comments.map((comment) => {
            return (
              <div className={styles.commentBox} key={comment.id}>
                {editId === comment.id ? (
                  <form className={styles.formEdit} action="">
                    <label className={styles.labelEdit} htmlFor="text-edit">
                      Edit your comment
                    </label>
                    <textarea
                      className={styles.textareaEdit}
                      id="text-edit"
                      value={editInput || comment.text}
                      cols="50"
                      rows="2"
                      onChange={handleEdit}
                      name="text"
                    ></textarea>
                    <div className="buttonsContainer">
                      <button
                        className={styles.buttonDelete}
                        onClick={hideEditing}
                      >
                        Cancel
                      </button>{" "}
                      <button
                        className={styles.buttonEdit}
                        onClick={editComment}
                      >
                        Ok
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className={styles.comment}>
                    <span className={styles.commentUsername}>
                      {comment.author.username}
                    </span>
                    <div className={styles.commentText}>{comment.text}</div>
                    <span className={styles.commentDate}>
                      {/* create the:{" "} */}
                      {comment.createdAt.split("T")[0]}
                    </span>
                    {comment.createdAt !== comment.updatedAt && (
                      <span className={styles.modified}>modified</span>
                    )}
                    {userId && (
                      <div className={styles.buttonsContainer}>
                        <button
                          className={styles.editButton}
                          onClick={() => showEditing(comment.id)}
                        >
                          Edit
                        </button>
                        <button
                          className={styles.deleteButton}
                          onClick={() => deleteComment(comment.id)}
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}
