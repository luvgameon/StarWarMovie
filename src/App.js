import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [Movies, setMovies] = useState([]);
  async function FetchMovie() {
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
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={FetchMovie}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={Movies} />
      </section>
    </React.Fragment>
  );
}

export default App;
