import { useState } from "react";

export default function Home() {
   const [games, setGames] = useState([])
   
   
    return (
    <section id="welcome-world">

    <div class="welcome-message">
      <h2>ALL new games are</h2>
      <h3>Only in GamesPlay</h3>
    </div>
    <img src="./images/four_slider_img01.png" alt="hero" />

    <div id="home-page">
      <h1>Latest Games</h1>

      {/* <!-- Display div: with information about every game (if any) --> */}
      {games.length > 0 ?
    games.map(game => (
        <div class="game" key={game._id}>
        <div class="image-wrap">
          <img src="./images/CoverFire.png" />
        </div>
        <h3>Cover Fire</h3>
        <div class="rating">
          <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
        </div>
        <div class="data-buttons">
          <a href="#" class="btn details-btn">Details</a>
        </div>
      </div>
    ))
    :
  <p class="no-articles">No games yet</p>
    }

    </div>
  </section>
   );
}