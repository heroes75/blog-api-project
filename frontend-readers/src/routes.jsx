import App from "./App";
import SignupPage from "./SignupPAge";

const routes = [
    {
        element: <App/>,
        path: '/'
    },
    {
        element: <SignupPage/>,
        path: '/signup'
    }
]

export default routes