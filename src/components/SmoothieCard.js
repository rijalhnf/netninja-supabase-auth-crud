import { Link } from "react-router-dom"
import supabase from "../supabaseClient"

function SmoothieCard({ smoothie, onDelete }) {
    // const navigate = useNavigate()
    async function handleDelete() {
        // e.preventDefault()

        const { data, error } = await supabase
            .from("smoothies")
            .delete()
            .eq('id', smoothie.id)
            .select()

        if (error) {
            console.log(error)
        }

        if (data) {
            console.log(data)
            onDelete(smoothie.id)
            // navigate("/")
        }
    }

    return (
        <div className="smoothie-card">
            <h3>{smoothie.title}</h3>
            <p>{smoothie.method}</p>
            <div className="rating">{smoothie.rating}</div>
            <div className="button">
                <Link to={"/" + smoothie.id}>edit ✏️</Link>
            </div>
            <div onClick={handleDelete}>
                <Link to={"/"}>delete ⌫</Link>
            </div>
        </div>
    )
}

export default SmoothieCard
