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
        inputPassword.current.reportValidity()
        inputConfirmPassword.current.reportValidity()
        console.log('username:', username)
        if(username === '') {
            inputUsername.current.setCustomValidity('Please enter an username')
            setErrorMessages(prevState => prevState.concat('Please enter an username'))
        } else  {
            inputUsername.current.setCustomValidity('your username must be only alphanumeric')
        }

        if (/[\W]/g.test(username)) {
            const msg = 'your username must be only alphanumeric'
            inputUsername.current.setCustomValidity(msg)
            setErrorMessages(prevState => prevState.concat(msg))
        } else {
            inputUsername.current.setCustomValidity('')
        }

        if (password === '') {
            inputPassword.current.setCustomValidity('Please enter a password')
            setErrorMessages(prevState => prevState.concat('Please enter a password'))
        } else if(password.length < 8) {
            const msg = 'your password must overflow 8 characters'
            inputPassword.current.setCustomValidity(msg)
            setErrorMessages(prevState => prevState.concat(msg))
        } else if(!/[\d]+/g.test(password)) {
            const msg = 'your password must contains at least one number'
            inputPassword.current.setCustomValidity(msg)
            setErrorMessages(prevState => prevState.concat(msg))
        } else if(!/[A-Z]+/g.test(password)) {
            const msg = 'your password must contains at least one upper case'
            inputPassword.current.setCustomValidity(msg)
            setErrorMessages(prevState => prevState.concat(msg))
        } else if(!/\W+/g.test(password)) {
            const msg = 'your password must contains at least non alphanumeric character'
            inputPassword.current.setCustomValidity(msg)
            setErrorMessages(prevState => prevState.concat(msg))
        } else {
            inputPassword.current.setCustomValidity('')
        }

        if(confirmPassword === '') {
            inputConfirmPassword.current.setCustomValidity('Please confirm your password')
            setErrorMessages(prevState => prevState.concat('Please confirm your password'))
        } else if(confirmPassword !== password) {
            const msg = 'The confirmation of your password must be equal to your password'
            inputConfirmPassword.current.setCustomValidity(msg)
            setErrorMessages(prevState => prevState.concat(msg))
        } else {
            inputConfirmPassword.current.setCustomValidity('')
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