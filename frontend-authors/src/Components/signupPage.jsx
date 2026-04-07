import { useRef, useState } from "react"

export default function SignupForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessages, setErrorMessages] = useState([])
    const inputUsername = useRef(null)
    const inputPassword = useRef(null)
    const inputConfirmPassword = useRef(null)
    function handleUsername (e) {
        setUsername(e.target.value)
    }

    function handlePassword(e) {
        setPassword(e.target.value)
    }

    function handleConfirmPassword(e) {
        setConfirmPassword(e.target.value)
    }

    function handleSubmit(e) {
        const formElement = e.target
        setErrorMessages([])
        console.log('nputUsername.current.ValueMissing:', inputUsername.current.validity.valueMissing)
        inputUsername.current.reportValidity()
        console.log('username:', username)
        if(username === '') {
            inputUsername.current.setCustomValidity('Please enter an username')
            setErrorMessages(prevState => prevState.concat('Please enter an username'))
        } else  {
            inputUsername.current.setCustomValidity('')
            // setErrorMessages(prevState => prevState)
        }

        if (password === '') {
            inputPassword.current.setCustomValidity('Please enter a password')
            setErrorMessages(prevState => prevState.concat('Please enter a password'))
        } else {
            inputPassword.current.setCustomValidity('')
        }

        e.preventDefault()
    }
    return (
        <>
            <form role="form" action="" method="post">
                <ul data-testid="message-error">
                    {errorMessages.map(message => <li key={message}>{message}</li>)}
                </ul>
                <label htmlFor="username">Enter your username: </label>
                <input  value={username} onChange={(e) => handleUsername(e)} ref={inputUsername}  type="text" id="username" name="username" placeholder="your username"/>
                <label htmlFor="password">Enter your password: </label>
                <input type="password" value={password} ref={inputPassword} onChange={e=> handlePassword(e)} id="password" name="password" placeholder="your password" />
                <label htmlFor="confirmPassword">Confirm your password: </label>
                <input type="password" value={confirmPassword} ref={inputConfirmPassword} onChange={e => handleConfirmPassword(e)} id="confirmPassword" name="confirmPassword" placeholder="confirm your password" />
                <button type="submit" onClick={e => handleSubmit(e)}>Submit</button>
            </form>
        </>
    )
}