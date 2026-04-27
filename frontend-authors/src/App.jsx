import { useEffect, useState } from "react";
import styles from "./App.module.css";
import { Link } from "react-router";
import Header from "./Components/Header";

function App() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let ignore = false;

    fetch(import.meta.env.VITE_API_URL, {
      method: "GET",
      type: "cors",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        if (!ignore) {
          setPosts(res.posts);

          setUser(res.user);
        }
        return res;
      })
      .catch((err) => {
        setError(err);
        console.error(err);
      })
      .finally(() => setIsLoading(false));
    return () => {
      ignore = true;
    };
  }, []);

  if (error) {
    return <p>Server Error</p>;
  }

  return (
    <>
      <Header isConnected={!!user} />
      <main className={styles.main}>
        {!isLoading ? (
          <div className={styles.postsContainer}>
            {posts.map((post) => {
              return (
                <div className={styles.post} key={post.id}>
                  <h3 className={styles.title}>{post.title}</h3>
                  <p className={styles.text}>{post.text}</p>
                  <p className={styles.date}>
                    posted by: {post.createdAt.split("T")[0]}
                  </p>
                  <Link className={styles.link} to={`posts/${post.id}`}>
                    see more...
                  </Link>
                </div>
              );
            })}
          </div>
        ) : (
          <h1>isLoading...</h1>
        )}
      </main>
    </>
  );
}

export default App;
