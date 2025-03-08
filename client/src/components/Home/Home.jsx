import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch.js";
import GameCard from "./GameCard.jsx";

export default function Home() {
    const { data, isPending, error } = useFetch('http://localhost:3030/data/games?sortBy=_createdOn%20desc&distinct=category')


    return (
        <section id="welcome-world">

            <div className="welcome-message">
                <h2>ALL new games are</h2>
                <h3>Only in GamesPlay</h3>
            </div>
            <img src="./images/four_slider_img01.png" alt="hero" />

            <div id="home-page">
                <h1>Latest Games</h1>

                {/* <!-- Display div: with information about every game (if any) --> */}
                {data &&
                    data.map(game => (
                        < GameCard key={game._id} game={game} />
                    ))}

                {!data && <p className="no-articles">No games yet</p>}

            </div>
        </section>
    );
}