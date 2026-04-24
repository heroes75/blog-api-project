import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router";
import styles from '../styles/PostPage.module.css'
import DOMPurify from 'dompurify';
import Header from "./Header";


export default function Post() {
    const { postId } = useParams();
    const [post, setPost] = useState({});
    const [userId, setUserId] = useState(null);
    const [postInput, setPostInput] = useState('')
    const [editInput, setEditInput] = useState('')
    const [editId, setEditId] = useState('');
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        fetch(`http://localhost:8000/posts/${postId}`, {
            method: "GET",
            type: "cors",
            headers: {
                "content-type": "application/json",
                authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        })
            .then(async (res) => {
                // console.log("res:1", res);
                return res.json();
            })
            .then((res) => {
                // console.log("res:2", res);
                if (res.status >= 400) {
                    throw new Error(res.message);
                }
                setPost(res.post);
                // console.log('res.userId:', res.userId)
                setUserId(res.userId);
                setComments(res.post.comments);
            })
            .catch((err) => {
                // console.log("err:", err);
                setError(err);
            })
            .finally(() => setLoading(false));
    }, [postId]);

    function showEditing (id) {
        setEditId(id)
        setEditInput('')
    }
    function hideEditing() {
        setEditId('')
        setEditInput('')
    }

    function handlePost(e) {
        setPostInput(e.target.value)
    }

    function handleEdit(e) {
        setEditInput(e.target.value)
    }

    function deleteComment(id) {
        console.log('id delete:', id)
        const filteredComments = comments.filter(comment => comment.id !== id)
        console.log('filteredComments:', filteredComments)
        setComments(filteredComments)
        fetch(`http://localhost:8000/posts/${postId}/comments/${id}`, {
            method: 'DELETE',
            type: 'cors',
            headers: {
                authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            if (res.status >= 400) {
                throw new Error(res.statusText)
            }
            return res.json()
        }).catch(err => setError(err))
    }

    function postComment(e) {
        e.preventDefault()
        const text = postInput
        // setComments(prev => prev.concat(text))
        setPostInput('')
        fetch('http://localhost:8000/posts/' + postId +'/comments', {
            method: 'POST',
            type: 'cors',
            headers: {
                "content-type": 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({text})
        }).then(res => {
            console.log('res:', res)
            if(res.status >= 400) {
                throw new Error(res.statusText)
            }
            return res.json()
        }).then(res => {
            console.log('res:', res)
            setComments(prev => prev.concat(res.comment))
        }).catch(err => setError(err)) 
    }

    function editComment(e) {
        e.preventDefault()
        setComments(comments.map(comment => {
            if (comment.id === editId) {
                return {...comment, text: editInput}
            }
            return comment
        }))
        setEditId('')
        setEditInput('')
        fetch(`http://localhost:8000/posts/${postId}/comments/${editId}`, {
            method: 'put',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({text: editInput})
        }).then(res => {
            if (res.status >= 400) {
                throw new Error(res.statusText)
            }
            return res.json()
        }).catch(err => setError(err))
    }

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>{error.message}</h1>;
    return (
        <>
            <Header isConnected={!!userId}/>
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
                            {new Date(post.updatedAt)
                                .toUTCString()
                                .replace(/:\d+ GMT/, "")}
                        </p>
                    )}
                </div>
                <hr />
                <div className={styles.text} dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(post.text)}}/>

                <h2  className={styles.commentsSection}>Comments</h2>
                {
                    userId &&
                    (
                        <form className={styles.formComment}>
                            <label className={styles.label} htmlFor="text-send">Enter your comment:</label>
                            <textarea className={styles.textarea} onChange={handlePost}  value={postInput} name="text" id="text-send" cols="20" rows="5"></textarea>
                            <button className={styles.button} onClick={postComment} type="submit">Submit</button>
                        </form>
                    )
                }
                {comments.map((comment) => {
                    return (
                        <div className={styles.commentBox} key={comment.id}>
                            {editId === comment.id ? (
                                <form className={styles.formEdit} action="">
                                    <label className={styles.labelEdit} htmlFor="text-edit">Edit your comment</label>
                                    <textarea className={styles.textareaEdit} id="text-edit" value={editInput || comment.text} onChange={handleEdit} name="text"></textarea>
                                    <button className={styles.buttonEdit} onClick={hideEditing}>Cancel</button> <button onClick={editComment}>Ok</button>
                                </form>
                            ) : (
                                <div className={styles.comment}>
                                    <p className={styles.commentUsername}>{comment.author.username}</p>
                                    <div className={styles.commentText}>{comment.text}</div>
                                    <span className={styles.CommentDate}>
                                        create the:{" "}
                                        {comment.createdAt.split("T")[0]}
                                    </span>
                                    {comment.createdAt !== comment.updatedAt && (
                                        <span className={styles.modified}>modified</span>
                                    )}
                                    {userId && (
                                        <div className={styles.buttonsContainer}>
                                            <button className={styles.editButton} onClick={() => showEditing(comment.id)}>Edit</button>
                                            <button className={styles.deleteButton} onClick={() => deleteComment(comment.id)}>Delete</button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </main>
        </>
    );
}
