import { useState } from "react"
import supabase from "../supabaseClient"
import { Link, useNavigate } from "react-router-dom";

function Login({ setToken }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password
            })
            if (error) throw error
            setToken(data)
            alert("Succes Sign In!")
            navigate('/')
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div>
            <br />
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button style={{ marginRight: 10 }}>Login</button>

                <span>
                    {/* <br /> */}
                    <span>Dont have an Account?</span> <Link to={'/signup'}>Sign Up</Link>
                </span>
            </form>
        </div>
    )
}

export default Login
