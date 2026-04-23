import { Link } from "react-router";
import styles from '../styles/Header.module.css'
export default function Header({isConnected}) {
    function handleLogout() {
        localStorage.clear()
    }
    return (
        <>
            <header className={styles.header}>
                <nav>
                    <ul className={styles.ul}>
                        <div className="left-side">
                            <li><Link className={styles.home} to='/'>Home</Link></li>
                        </div>
                        <div className="right-side">
                            {
                                isConnected ?
                                (
                                    <li>
                                        <Link className={styles.logout} onClick={handleLogout} to='/login'>Logout</Link>
                                    </li>
                                ) :
                                (
                                    <div className={styles.signupLogin}>
                                        <li>
                                            <Link to='/login'>Login</Link>
                                        </li>
                                        <li>
                                            <Link to='/signup'>Signup</Link>
                                        </li>
                                    </div>
                                )
                            }
                        </div>
                    </ul>
                </nav>
            </header>
        </>
    )
}