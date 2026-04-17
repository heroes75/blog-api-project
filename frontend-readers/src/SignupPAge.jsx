import { useState } from "react"
import { useNavigate } from "react-router"

export default function SignupPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState(null)
    const [msgError, setMsgError] = useState([])
    const navigate = useNavigate()

    function handleUsername(e) {
        setUsername(e.target.value)
    }

    function handlePassword(e) {
        setPassword(e.target.value)
    }

    function handleConfirmPassword(e) {
        setConfirmPassword(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetch('http://localhost:8000/signup', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({username, password, role: 'AUTHOR', confirmPassword}),
        }).then(res => {
            if (res.status >= 400 && res.status !== 401) {
                throw new Error(res.statusText)
            }
            return res.json()
        }).then(res => {
            // console.log('res:', res)
            if (res.statusCode === 401) {
                // console.log('res.message:', res.message)
                return setMsgError(res.message)
            }
            navigate('/login')
            return res
        })
        .catch(err => setError(err))
    }

    if(error) return <h1>{error.message}</h1>

    return (
        <>
            <ul aria-label="list">
                {msgError.map(err => <li key={err}>{err}</li>)}
                {/* <li>your username must be only alphanumeric</li>
                <li>your password must overflow 8 characters</li>
                <li>your password contains at least one upper case</li>
                <li>your password contains at least one number</li>
                <li>your password contains at least non alphanumeric character</li> */}
            </ul>
            <form  role="form" method="POST">
                <label htmlFor="username">Enter your username:</label>
                <input value={username} onChange={handleUsername} type="text" name="username" id="username" placeholder="Enter your username" />
                <label htmlFor="password">Enter your password:</label>
                <input value={password} onChange={handlePassword} type="password" name="password" id="password" placeholder="Enter your password" />
                <label htmlFor="confirmPassword">Confirm your password:</label>
                <input value={confirmPassword} onChange={handleConfirmPassword} type="password" name="confirmPassword" id="confirmPassword" placeholder="Confirm your password" />
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </>
    )
}