import { Link, useParams } from "react-router";
import useFetch from "../../hooks/useFetch.js";
import { useAuth } from "../Auth/AuthContext.jsx";

export default function Details() {
    const { id } = useParams();
    const { data: game, isPending, error } = useFetch(`/data/games/${id}`);
    const {userData} = useAuth();
    console.log(userData)
  
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

      {/* <!-- Bonus ( for Guests and Users ) --> */}
      {/* <div className="details-comments">
        <h2>Comments:</h2>
        <ul>
     
          <li className="comment">
            <p>Content: I rate this one quite highly.</p>
          </li>
          <li className="comment">
            <p>Content: The best game.</p>
          </li>
        </ul>
       
        <p className="no-comment">No comments.</p>
      </div> */}

      {/* <!-- Edit/Delete buttons ( Only for creator of this game )  --> */}
      {userData?.id === game?._ownerId && (
          <div className="buttons">
            <Link to={`/games/edit/${game?._id}`} className="button">Edit</Link>
            <Link href="#" className="button">Delete</Link>
          </div>
        )}
     
    </div>

    {/* <!-- Bonus --> */}
    {/* <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) --> */}
    {/* <article className="create-comment">
      <label>Add new comment:</label>
      <form className="form">
        <textarea name="comment" placeholder="Comment......"></textarea>
        <input className="btn submit" type="submit" value="Add Comment" />
      </form>
    </article> */}

  </section>
   );
}