import { Routes, Route, Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"

// pages
import Home from "./pages/Home"
import Create from "./pages/Create"
import Update from "./pages/Update"
import Login from "./pages/Login"
import Signup from "./pages/Signup"


function App() {
  const [token, setToken] = useState(null)
  const navigate = useNavigate()

  // to always be authenticated, so store it in the local stoage, and manage it with useeffect
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"))
      setToken(data)
    }
  }, [])



  function handleLogout() {
    sessionStorage.removeItem('token')
    alert("Succes Sign Out!")
    setToken(null)
    navigate('/signin')
  }

  return (
    <>
      {token ? <nav>
        < h1 > Supa Smoothies</h1 >
        <Link to="/">Home</Link>
        <Link to="/create">Create New Smoothie</Link>
        <span onClick={handleLogout}>Logout</span>
      </nav > :
        <nav>
          <h1>Supa Smoothies</h1>
          <p>Login First!</p>
        </nav>
      }

      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        {token ? <Route path={'/'} element={<Home token={token} />} /> :
          <Route path={'/'} element={<Login setToken={setToken} />} />}
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
