import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [Movies, setMovies] = useState([]);
 const [Isloading, setIsloading] = useState(false);
  async function FetchMovie() {
    setIsloading(true);
    const response = await fetch("https://swapi.dev/api/films");
    const data = await response.json();

    const trasformMovie = data.results.map((i) => {
      return {
        id: i.episode_id,
        title: i.title,
        openingText: i.opening_crawl,
        releaseDate: i.release_date,
      };
    });
    setMovies(trasformMovie);
    setIsloading(false);
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={FetchMovie}>Fetch Movies</button>
      </section>
      <section>
        {!Isloading&&<MoviesList movies={Movies} />}
        {Isloading&&<p>Loading...</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
