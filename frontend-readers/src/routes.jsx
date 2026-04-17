import App from "./App";
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
    }
]

export default routes