import { useState } from "react";
import { useNavigate } from "react-router";
import Header from "./Components/Header";
import styles from "./styles/SignupPage.module.css";

export default function SignupPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [msgError, setMsgError] = useState([]);
  const navigate = useNavigate();

  function handleUsername(e) {
    setUsername(e.target.value);
  }

  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function handleConfirmPassword(e) {
    setConfirmPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(import.meta.env.VITE_API_URL + "/signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        role: "AUTHOR",
        confirmPassword,
      }),
    })
      .then((res) => {
        if (res.status >= 400 && res.status !== 401) {
          throw new Error(res.statusText);
        }
        return res.json();
      })
      .then((res) => {
        if (res.statusCode === 401) {
          return setMsgError(res.message);
        }
        navigate("/login");
        return res;
      })
      .catch((err) => setError(err));
  }

  if (error) return <h1>{error.message}</h1>;

  return (
    <>
      <Header isConnected={false} />
      <main className={styles.main}>
        <form className={styles.form} role="form">
          <ul className={styles.ul} aria-label="list">
            {msgError.map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
          <label className={styles.label} htmlFor="username">
            Enter your username:
          </label>
          <input
            className={styles.input}
            value={username}
            onChange={handleUsername}
            type="text"
            name="username"
            id="username"
            placeholder="Enter your username"
          />
          <label className={styles.label} htmlFor="password">
            Enter your password:
          </label>
          <input
            className={styles.input}
            value={password}
            onChange={handlePassword}
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
          />
          <label className={styles.label} htmlFor="confirmPassword">
            Confirm your password:
          </label>
          <input
            className={styles.input}
            value={confirmPassword}
            onChange={handleConfirmPassword}
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm your password"
          />
          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </form>
      </main>
    </>
  );
}
