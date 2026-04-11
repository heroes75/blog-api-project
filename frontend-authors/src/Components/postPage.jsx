import { useEffect, useState } from "react"
import { useParams } from "react-router"

export default function Post() {
    const {postId} = useParams()
    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    useEffect(() => {
        fetch(`http://localhost:8000/post/${postId}`, {
            method: 'GET',
            type: 'cors',
            headers: {
                'content-type': 'application/json',
                'authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then(res => {
            if (res.status >=400) {
                throw new Error(res.message)
            }
            return res.json()
        }).then(res => {
            setPost(res.post)
        }).catch(err => {
            console.error(err)
            setError(err)
        }).finally(() => setLoading(false))
    }, [postId])

    if (loading) return <h1>Loading...</h1>
    if(error) return <h1>{error}</h1>
    return (
        <> 
            <h1>{post.title}</h1>
            <p>{post.authorId}</p>
            <p>{post.text}</p>
        </>
    )
}