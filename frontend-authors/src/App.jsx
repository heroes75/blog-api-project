import { useEffect, useState } from "react";
import "./App.css";

function App() {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        let ignore = false;

        fetch("http://localhost:8000/")
            .then((res) => {
                return res.json();
            })
            .then((res) => {
                if (!ignore) {
                    setPosts(res.posts);
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
            {!isLoading ? (
                <ul>
                    {posts.map((post) => {
                        return (
                            <div key={post.id}>
                                <h3>{post.title}</h3>
                                <p>{post.text}</p>
                                <p>posted by: {post.createdAt}</p>
                            </div>
                        );
                    })}
                </ul>
            ) : (
                <p>isLoading...</p>
            )}
        </>
    );
}

export default App;
