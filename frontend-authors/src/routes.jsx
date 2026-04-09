import App from './App'
import Login from './Components/loginPage'
import SignupForm from './Components/signupPage'

const routes = [
    {
        path: '/',
        element: <App/>,
    },
    {
        path: '/signup',
        element: <SignupForm />
    },
    {
        path: '/login',
        element: <Login />
    }
]

export default routes