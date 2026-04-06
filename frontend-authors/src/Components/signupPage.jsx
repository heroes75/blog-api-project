import { useRef, useState } from "react"

export default function SignupForm() {
    const [username, setUsername] = useState('')
    const [passwrd, setPasswrd] = useState('')
    const [confirmPasswrd, setConfirmPasswrd] = useState('')
    const inputUsername = useRef(null)
    const inputPassword = useRef(null)
    const inputConfirmPassword = useRef(null)
    function handleUsername (e) {
        setUsername(e.target.value)
    }
    return (
        <>
            <form role="form" action="" method="post">
                <ul data-testid="message-error"></ul>
                <label htmlFor="username">Enter your username: </label>
                <input value={username} onChange={(e) => handleUsername(e)} ref={inputUsername}  type="text" id="username" name="username" placeholder="your username" />
                <label htmlFor="password">Enter your password: </label>
                <input type="password" id="password" name="password" placeholder="your password" />
                <label htmlFor="confirmPassword">Confirm your password: </label>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="confirm your password" />
                <button>Submit</button>
            </form>
        </>
    )
}