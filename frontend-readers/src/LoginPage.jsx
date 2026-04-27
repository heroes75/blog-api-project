import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Header from "./Components/Header";
import styles from "./styles/LoginPage.module.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msgError, setMsgError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://blog-api-project-backend.vercel.app/login", {
      method: "GET",
      type: "cors",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.status === 302) {
        return navigate("/");
      }
      return res.json()
    }).then(res => {
    console.log('res:', res)

    }).catch(err => {
      console.log('err:', err)
    });
  });

  function handleSubmit(e) {
    e.preventDefault();
    fetch(import.meta.env.VITE_API_URL + "/login", {
      method: "POST",
      type: "cors",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ username, password, role: "AUTHOR" }),
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
        localStorage.setItem("token", res.token);
        navigate("/");
      });
  }

  return (
    <>
      <Header isConnected={false} />
      <main className={styles.main}>
        <ul className={styles.ul}>{msgError && <li>{msgError}</li>}</ul>
        <form className={styles.form} role="form" action="">
          <label className={styles.label} htmlFor="username">
            Enter your username:
          </label>
          <input
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            name="username"
            id="username"
            placeholder="username"
          />
          <label className={styles.label} htmlFor="password">
            Enter your password:
          </label>
          <input
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            name="password"
            id="password"
            placeholder="password"
          />
          <button className={styles.button} onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </main>
    </>
  );
}
