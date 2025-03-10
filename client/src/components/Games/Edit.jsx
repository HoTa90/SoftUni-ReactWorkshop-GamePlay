import { useNavigate, useParams } from "react-router";
import useFetch from "../../hooks/useFetch.js";

export default function Edit() {
  const { id } = useParams()
  const { data: movie, put } = useFetch(`/data/games/${id}`)
  const navigate = useNavigate()


  const ediitHandler = async (formData) => {
    const data = Object.fromEntries(formData)
    
    try {

      await put(`/data/games/${id}`, data)
      navigate(`/games/details/${id}`)
    } catch (err){
      console.log(err.message)
    }
  }


  return (
    <section id="edit-page" className="auth">
      <form action={ediitHandler} id="edit">
        <div className="container">

          <h1>Edit Game</h1>
          <label htmlFor="leg-title">Legendary title:</label>
          <input type="text" id="title" name="title" defaultValue={movie?.title} />

          <label htmlFor="category">Category:</label>
          <input type="text" id="category" name="category" defaultValue={movie?.category} />

          <label htmlFor="levels">MaxLevel:</label>
          <input type="number" id="maxLevel" name="maxLevel" min="1" defaultValue={movie?.maxLevel} />

          <label htmlFor="game-img">Image:</label>
          <input type="text" id="imageUrl" name="imageUrl" defaultValue={movie?.imageUrl} />

          <label htmlFor="summary">Summary:</label>
          <textarea name="summary" id="summary" defaultValue={movie?.summary}></textarea>
          <input className="btn submit" type="submit" defaultValue="Edit Game" />

        </div>
      </form>
    </section>
  );
}