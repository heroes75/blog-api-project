import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { Link, useNavigate } from "react-router";
import Header from "./Components/Header";
// import 'dotenv/config'

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8000/posts/dashboard", {
      method: "GET",
      type: "cors",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.status >= 400) throw new Error(res.statusText);
        return res.json();
      })
      .then((res) => {
        setPosts(res.posts);
        setUser(res.user);
      })
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  function handleDelete(id) {
    confirm("Are you shure ?");
    setPosts(posts.filter((post) => post.id !== id));
    fetch("http://localhost:8000/posts/" + id, {
      method: "DELETE",
      type: "cors",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).catch((err) => setError(err));
  }

  function handleEdit(id) {
    navigate(`/posts/${id}`);
  }

  function handlePublish(id) {
    setPosts(
      posts.map((post) => {
        if (post.id === id) {
          return {
            ...post,
            published: !post.published,
          };
        }
        return post;
      }),
    );
    const post = posts.filter((post) => post.id === id);
    fetch("http://localhost:8000/posts/" + id, {
      method: "PUT",
      type: "cors",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        text: post[0].text,
        title: post[0].title,
        published: !post[0].published,
      }),
    })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((res) => {
        console.log("res.updatedPost", res.updatedPost);
      })
      .catch((err) => setError(err));
  }

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>{error.message}</h1>;

  return (
    <>
      <Header isConnected={!!user} />
      <main className={styles.main}>
        {user && (
          <h1 className={styles.welcome}>{`Welcome ${user.username}`}</h1>
        )}
        <h1 className={styles.posts}>POSTS</h1>
        <div className={styles.postsContainer}>
          {posts.length !== 0 ? (
            posts.map((post) => {
              return (
                <div className={styles.post} key={post.id}>
                  <p className={styles.title}>{post.title}</p>
                  <p className={styles.username}>{post.author.username}</p>
                  <p className={styles.text}>{post.text}</p>
                  <div className={styles.buttonsContainer}>
                    <button
                      style={{
                        backgroundColor: post.published ? "blue" : "red",
                      }}
                      onClick={() => handlePublish(post.id)}
                      data-testid="publish"
                    >
                      {post.published ? "Published" : "Unpublished"}
                    </button>
                    <button onClick={() => handleEdit(post.id)}>Edit</button>
                    <button onClick={() => handleDelete(post.id)}>
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <h2>No posts added yet...</h2>
          )}
        </div>
        <span className={styles.link}>
          <Link to="/posts">Create Post</Link>
        </span>
      </main>
    </>
  );
}

export default App;
