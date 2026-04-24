import { useState } from "react"
import { useNavigate } from "react-router"
import Header from "./Header"
import styles from '../styles/LoginPage.module.css'

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

    function handleSubmit(e) {
        e.preventDefault()
        fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({username, password, role: 'READER'})
        }).then(res => res.json()).then(res => {
            if (res.statusCode >= 400) {
                return setMessageError(res.message)
            }
            localStorage.setItem('token', res.token)
            navigate("/")
        })
    }
    return (
        <>
        <Header isConnected={false}/>
        <main className={styles.main}>
            <ul className={styles.ul}>
                {messageError && <li>{messageError}</li>}
            </ul>
                <form className={styles.form} action="">
                    <label className={styles.label} htmlFor="username">Enter your username:</label>
                    <input className={styles.input} value={username} onChange={handleUsername} type="text" name="username" id="username" placeholder="your username" />
                    <label className={styles.label} htmlFor="password">Enter your password:</label>
                    <input className={styles.input} value={password} onChange={handlePassword} type="password" name="password" id="password" placeholder="your password"/>
                    <button className={styles.button} onClick={handleSubmit} type="submit">Submit</button>
                </form>
        </main>
        </>
    )
}