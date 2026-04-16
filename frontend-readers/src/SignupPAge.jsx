import { useState } from "react"

export default function SignupPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    function handleUsername(e) {
        setUsername(e.target.value)
    }

    function handlePassword(e) {
        setPassword(e.target.value)
    }

    function handleConfirmPassword(e) {
        setConfirmPassword(e.target.value)
    }

    return (
        <>
            <ul aria-label="list">
                <li>your username must be only alphanumeric</li>
                <li>your password must overflow 8 characters</li>
                <li>your password contains at least one upper case</li>
                <li>your password contains at least one number</li>
                <li>your password contains at least non alphanumeric character</li>
            </ul>
            <form  role="form" action='' method="POST">
                <label htmlFor="username">Enter your username:</label>
                <input value={username} onChange={setUsername} type="text" name="username" id="username" placeholder="Enter your username" />
                <label htmlFor="password">Enter your password:</label>
                <input value={password} onChange={setPassword} type="text" name="password" id="password" placeholder="Enter your username" />
                <label htmlFor="confirmPassword">Confirm your password:</label>
                <input value={confirmPassword} onChange={setConfirmPassword} type="text" name="confirmPassword" id="confirmPassword" placeholder="Confirm your username" />
                <button>Submit</button>
            </form>
        </>
    )
}