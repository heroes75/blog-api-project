import App from "./App";
import ErrorPage from "./Components/ErrorPage";
import Login from "./Components/loginPage";
import Post from "./Components/postPage";
import SignupForm from "./Components/signupPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />
  },
  {
    path: "/signup",
    element: <SignupForm />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/posts/:postId",
    element: <Post />,
  },
];

export default routes;
