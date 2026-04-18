import { useEffect, useState } from "react";
import "./App.css";
import { Link, useNavigate } from "react-router";

function App() {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()
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
                setUser(res.user)
            })
            .catch((err) => setError(err))
            .finally(() => setLoading(false));
    },[]);

    if (loading) return <h1>Loading...</h1>;
    if (error) return <h1>{error.message}</h1>;

    return (
        <>
            {user && <h1>{`Welcome ${user.username}`}</h1>}
            <h1>POST</h1>
            { posts.length !== 0 ? posts.map((post) => {
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
            }) :
            <h2>No posts added yet...</h2>
        }
            <Link to='/posts'>Create Post</Link>
        </>
    );
}

export default App;
