import { useState } from "react"
import { useNavigate } from "react-router"

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [messageError, setMessageError] = useState('')
    const navigate = useNavigate()

    function handleUsername(e) {
        setUsername(e.target.value)
    }

    function handlePassword(e) {
        setPassword(e.target.value)
    }

    function handleSubmit() {
        fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({username, password})
        }).then(res => res.json()).then(res => {
            console.log('res:', res)
            if (res.statusCode >= 400) {
                return setMessageError(res.message)
            }  
        })
        navigate('/home')
    }
    return (
        <>
        <ul>
            {messageError && <li>{messageError}</li>}
        </ul>
            <label htmlFor="username">Enter your username:</label>
            <input value={username} onChange={handleUsername} type="text" name="username" id="username" placeholder="your username" />
            <label htmlFor="password">Enter your password:</label>
            <input value={password} onChange={handlePassword} type="password" name="password" id="password" placeholder="your password"/>
            <button onClick={handleSubmit} type="submit">Submit</button>
        </>
    )
}