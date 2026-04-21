import App from "./App";
import CreatePost from "./Components/CreatePost";
import EditPost from "./Components/EditPost";
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
    },
    {
        element: <EditPost/>,
        path: '/posts/:postId'
    }
]

export default routes