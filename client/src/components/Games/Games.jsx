import useFetch from "../../hooks/useFetch.js";
import AllGamesCard from "./AllGamesCard.jsx";

export default function Games() {
    
    const {data:games, isPending, error} = useFetch('http://localhost:3030/data/games?sortBy=_createdOn%20desc')
    console.log(games)

  
    return (
    <section id="catalog-page">
    <h1>All Games</h1>
        {games && games.map(game => (
            <AllGamesCard key={game._id} game={game}/>
        ))}

        {!games &&  <h3 className="no-articles">No articles yet</h3>}

   
  </section>
   );
}