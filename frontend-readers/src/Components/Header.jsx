import { Link } from "react-router";

export default function Header({isConnected}) {
    function handleLogout() {
        localStorage.clear()
    }
    return (
        <>
            <header>
                <nav>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        {
                            isConnected ?
                            (
                                <li>
                                    <Link onClick={handleLogout} to='/login'>Logout</Link>
                                </li>
                            ) :
                            (
                                <>
                                    <li>
                                        <Link to='/login'>Login</Link>
                                    </li>
                                    <li>
                                        <Link to='/signup'>Signup</Link>
                                    </li>
                                </>
                            )
                        }
                    </ul>
                </nav>
            </header>
        </>
    )
}