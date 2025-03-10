import { Link, useNavigate, useParams } from "react-router";
import useFetch from "../../hooks/useFetch.js";
import { useAuth } from "../Auth/AuthContext.jsx";
import { useEffect, useState } from "react";

export default function Details() {
  const [comments, setComments] = useState([])
  const { id } = useParams();
  const { data: game, isPending, error, del } = useFetch(`/data/games/${id}`);
  const { post } = useFetch();
  const { userData } = useAuth();
  const navigate = useNavigate()


  useEffect(() => {
    const controller = new AbortController()
    const fetchCommments = async () => {
      try {
        const response = await fetch(`http://localhost:3030/data/comments?where=gameId%3D%22${id}%22`);

        if (!response.ok) {
          throw new Error(`HTTP Error ${response.status}: ${response.statusText}`);
        }

        const commentsData = await response.json();
        setComments(commentsData);
      } catch (err) {
        console.log("Error fetching comments:", err.message);
      }
    };

    fetchCommments()

    return () => {
      controller.abort()
    }

  }, [id])


  const deleteHandler = async (e) => {
    e.preventDefault()
    try {

      await del(`/data/games/${id}`)
      navigate('/games')

    } catch (err) {
      console.log(err.message)
    }
  }


  const formHandler = async (formData) => {
    const { comment } = Object.fromEntries(formData)
    const postData = {
      gameId: id,
      comment
    }

    try {
      const newComment = await post('/data/comments', postData)
      setComments(prevComments => [...prevComments, newComment])

    } catch (err) {
      console.log(err.message)
    }
  }

  return (
    <section id="game-details">
      <h1>Game Details</h1>
      <div className="info-section">

        <div className="game-header">
          <img className="game-img" src={game?.imageUrl} />
          <h1>{game?.title}</h1>
          <span className="levels">MaxLevel: {game?.maxLevel}</span>
          <p className="type">{game?.category}</p>
        </div>

        <p className="text">
          {game?.summary}
        </p>
        <div className="details-comments">
          <h2>Comments:</h2>
          {comments.length > 0 ?
            (<ul>
              {comments.map((c) => (
                <li className="comment" key={c._id}>
                  <p>{c.comment}</p>
                </li>
              ))}

            </ul>)
            :
            <p className="no-comment">No comments.</p>
          }
        </div>

        {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
        {userData?.id === game?._ownerId && (
          <div className="buttons">
            <Link to={`/games/edit/${game?._id}`} className="button">Edit</Link>
            <a onClick={deleteHandler} className="button">Delete</a>
          </div>
        )}

      </div>

      {/* <!-- Bonus --> */}
      {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
      {userData && userData?.id !== game?._ownerId &&
        <article className="create-comment">
          <label>Add new comment:</label>
          <form className="form" action={formHandler}>
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input className="btn submit" type="submit" value="Add Comment" />
          </form>
        </article>}


    </section>
  );
}