import App from './App'
import SignupForm from './Components/signupPage'

const routes = [
    {
        path: '/',
        element: <App/>,
    },
    {
        path: '/signup',
        element: <SignupForm />
    }
]

export default routes