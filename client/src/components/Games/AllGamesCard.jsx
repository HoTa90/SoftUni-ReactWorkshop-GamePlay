import { Link } from "react-router";

export default function AllGamesCard({game}) {
   return (
    <div className="allGames">
    <div className="allGames-info">
      <img src={game.imageUrl} />
      <h6>{game.category}</h6>
      <h2>{game.title}</h2>
      <Link to={`/games/details/${game._id}`} className="details-button">Details</Link>
    </div>

  </div>
   );
}