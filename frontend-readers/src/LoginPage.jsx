import { useState } from "react"

export default function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [msgError, setMsgError] = useState([])

    function handleSubmit(e) {
        e.preventDefault()
        fetch('http://localhost:8000/login', {
            method: 'POST',
            type: 'cors',
            header: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({username, password, role: 'AUTHOR'})
        }).then( res => {
            if (res.status >= 400 && res.status !== 401) {
                throw new Error(res.statusText)
            }
            return res.json()
        }).then(res => {
            if(res.statusCode === 401) {
                return setMsgError(res.message)
            }
        })
    }

    return(
        <>
            <ul>
                {msgError.map(error => <li key={error}>{error}</li>)}
                {/* <li>invalid username</li> */}
            </ul>
            <form role="form" action="">
                <label htmlFor="username">Enter your username:</label>
                <input value={username} onChange={e => setUsername(e.target.value)} type="text" name="username" id="username" placeholder="username" />
                <label htmlFor="password">Enter your password:</label>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="password" />
                <button onClick={handleSubmit}>Submit</button>
            </form>
        </>
    )
}