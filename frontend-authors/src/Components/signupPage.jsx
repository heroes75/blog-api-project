import { useRef, useState } from "react"
import { useNavigate } from "react-router"

export default function SignupForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errorMessages, setErrorMessages] = useState([])
    const navigate = useNavigate()
    const inputUsername = useRef(null)
    const inputPassword = useRef(null)
    const inputConfirmPassword = useRef(null)
    const form = useRef(null)
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
        setErrorMessages([])
        inputUsername.current.reportValidity()
        inputPassword.current.reportValidity()
        inputConfirmPassword.current.reportValidity()
        console.log(username, password, confirmPassword)
        if(username === '') {
            inputUsername.current.setCustomValidity('Please enter an username')
            setErrorMessages(prevState => prevState.concat('Please enter an username'))
        } else  {
            inputUsername.current.setCustomValidity('')
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
            const msg = 'your password must contains at least one non alphanumeric character'
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
        console.log('!form.current.checkValidity():', !form.current.checkValidity())
        if (!form.current.checkValidity()) {
            console.log('return:')
            return
        }

        fetch('http://localhost:8000/signup', {
            method: 'POST',
            type: 'cors',
            body: JSON.stringify({username: username, password: password}),
            headers: {
                "Content-type": "application/json"
            }
        }).then(res => {
            console.log('res: (1)', res)
            return res.json()
        }).then(res => {
            console.log('res.statusCode:', res.statusCode)
            if (res.statusCode >= 400) {
                console.log('res: (2)', res)
                return setErrorMessages(res.message)
            }
            navigate('/login')
            console.log("res: (3)", res)
        })
        .catch(err => {
            console.error(err)
        }) 
        e.preventDefault()
    }
    return (
        <>
            <form ref={form} role="form" action="" method="post">
                <ul>
                    {errorMessages.map(message => <li aria-label={message} key={message}>{message}</li>)}
                </ul>
                <label htmlFor="username">Enter your username: </label>
                <input  value={username} onChange={(e) => handleUsername(e)} ref={inputUsername}  type="text" id="username" name="username" placeholder="your username"/>
                <label htmlFor="password">Enter your password: </label>
                <input type="password" value={password} ref={inputPassword} onChange={e=> handlePassword(e)} id="password" name="password" placeholder="your password" />
                <label htmlFor="confirmPassword">Confirm your password: </label>
                <input type="password" value={confirmPassword} ref={inputConfirmPassword} onChange={e => handleConfirmPassword(e)} id="confirmPassword" name="confirmPassword" placeholder="Confirm your password" />
                <button type="submit" onClick={e => handleSubmit(e)}>Submit</button>
            </form>
        </>
    )
}