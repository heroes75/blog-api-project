import App from "./App";
import CreatePost from "./Components/CreatePost";
import LoginPage from "./LoginPage";
import SignupPage from "./SignupPAge";

const routes = [
    {
        element: <App/>,
        path: '/'
    },
    {
        element: <SignupPage/>,
        path: '/signup'
    },
    {
        element: <LoginPage/>,
        path: '/login',
    },
    {
        element: <CreatePost/>,
        path: '/posts'
    }
]

export default routes