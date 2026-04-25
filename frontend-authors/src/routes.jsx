import App from "./App";
import Login from "./Components/loginPage";
import Post from "./Components/postPage";
import SignupForm from "./Components/signupPage";

const routes = [
  {
    path: "/",
    element: <App />,
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
