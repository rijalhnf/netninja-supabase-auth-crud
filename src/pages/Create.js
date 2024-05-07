//Create data to Supabase

import { useState } from "react"
import supabase from "../supabaseClient"
import { useNavigate } from "react-router-dom"

const Create = () => {
  const navigate = useNavigate(); // Added parentheses after useNavigate

  const [title, setTitle] = useState("")
  const [method, setMethod] = useState("")
  const [rating, setRating] = useState("")
  const [formError, setFormError] = useState(null)
  const [notif, setNotif] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()

    if (!title || !method || !rating) {
      setFormError("Please fill in all the fields correctly")
      return
    }

    const { data, error } = await supabase
      .from("smoothies")
      .insert([{ title, method, rating }])
      .select()

    if (error) {
      console.log(error)
      setFormError("Error submitting the form")
    }
    if (data) {
      console.log(data[0])
      setFormError(null)
      setNotif(`Successfully created: ${data[0].title}`)
      navigate("/")
    }
  }

  return (
    <div className="page create">
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="method">Method:</label>
        <textarea
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
        />

        <label htmlFor="rating">Rating:</label>
        <input
          type="number"
          id="rating"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        />

        <button>Create Smoothie Recipe</button>
        <br />

        {formError && <p className="error">{formError}</p>}
        <p>{notif}</p>
      </form>
    </div>
  )
}

export default Create
