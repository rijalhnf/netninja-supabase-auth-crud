import { useState } from "react"
import supabase from "../supabaseClient"
import { Link, useNavigate } from "react-router-dom";

function Signup({ setToken }) {
    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            const { error } = await supabase.auth.signUp({
                email: email,
                password: password,
                options: {
                    data: {
                        full_name: name,
                        phone: phone,
                    }
                }
            })
            if (error) throw error
            alert("Succes Sign Up!")
            navigate('/')
        } catch (error) {
            alert(error.message)
        }
    }

    return (
        <div>
            <br />
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="phone">Phone Number:</label>
                <input
                    type="number"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button style={{ marginRight: 10 }}>Sign Up</button>

                <span>
                    {/* <br /> */}
                    <span>Have an Account?</span> <Link to={'/signin'}>Sign In</Link>
                </span>
            </form>
        </div>
    )
}

export default Signup
