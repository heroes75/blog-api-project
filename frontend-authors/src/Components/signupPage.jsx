export default function SignupForm() {
    return (
        <>
            <form role="form" action="" method="post">
                <label htmlFor="username">Enter your username: </label>
                <input type="text" id="username" name="username" placeholder="your username" />
                <label htmlFor="password">Enter your password: </label>
                <input type="password" id="password" name="password" placeholder="your password" />
                <label htmlFor="confirmPassword">Confirm your password: </label>
                <input type="password" id="confirmPassword" name="confirmPassword" placeholder="confirm your password" />
                <button>Submit</button>
            </form>
        </>
    )
}