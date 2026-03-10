import Form from "../components/Form"

function Register({ setIsLoggedIn }) {
    return <Form route="/user/register/" method="register" setIsLoggedIn={setIsLoggedIn} />
}

export default Register