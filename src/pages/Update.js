import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import supabase from "../supabaseClient"

const Update = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [method, setMethod] = useState("")
  const [rating, setRating] = useState("")
  const [formError, setFormError] = useState(null)


  async function handleSubmit(e) {
    e.preventDefault()

    if (!title || !method || !rating) {
      setFormError("Please fill in all the fields correctly")
      return
    }

    const { data, error } = await supabase
      .from("smoothies")
      .update({ title, method, rating })
      // this below means: columnd id equal to const id
      .eq('id', id)
      .select()

    if (error) {
      console.log(error)
      setFormError("please fill all the fields correctly")
    }

    if (data) {
      console.log(data)
      setFormError(null)
      navigate("/")
    }
  }

  useEffect(() => {
    const fetchSmoothie = async () => {
      const { data, error } = await supabase
        .from("smoothies")
        .select()
        // this below means: columnd id equal to const id
        .eq('id', id)
        // this below means: just return single data
        .single()

      if (error) {
        navigate("/", { replace: true })
      }

      if (data) {
        setTitle(data.title)
        setMethod(data.method)
        setRating(data.rating)
        console.log(data)
      }
    }

    fetchSmoothie()
  }, [id, navigate])

  return (
    <div className="page update">
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

        <button>Update Smoothie Recipe</button>
        <br />

        {formError && <p className="error">{formError}</p>}

      </form>
    </div>
  )
}

export default Update