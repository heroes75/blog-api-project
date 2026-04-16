import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

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
            .then((res) => setPosts(res.posts))
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    },[]);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>{error.message}</h1>;

    return (
        <>
            {posts.map((post) => {
                return (
                    <div key={post.id}>
                        <p>{post.title}</p>
                        <p>{post.author.username}</p>
                        <p>{post.text}</p>
                        <button>{post.published ? 'Published' : 'Unpublished'}</button>
                        <button>Edit</button>
                        <button>Delete</button>
                    </div>
                );
            })}
            
        </>
    );
}

export default App;
