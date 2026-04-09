export default function Login() {
    return (
        <>
            <label htmlFor="username">Enter your username:</label>
            <input type="text" name="username" id="username" placeholder="your username" />
            <label htmlFor="password">Enter your password:</label>
            <input type="password" name="password" id="password" placeholder="your password"/>
            <button type="submit">Submit</button>
        </>
    )
}