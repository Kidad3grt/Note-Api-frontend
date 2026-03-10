import Form from "../components/Form"

function Login({ setIsLoggedIn }) {
    return <Form route="/token/" method="login" setIsLoggedIn={setIsLoggedIn} />
}

export default Login