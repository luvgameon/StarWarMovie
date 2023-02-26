import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";

function App() {
  const [Movies, setMovies] = useState([]);
  const [Isloading, setIsloading] = useState(false);
  const [Iserror, setIserror] = useState(null);

  const FetchMovie = useCallback(async () => {
    setIserror(null);
    setIsloading(true);
     // <----------------------------------------FetchMovie start-------------------------------->
    try {
      const response = await fetch(
        "https://react-http-6410a-default-rtdb.firebaseio.com/movie.jso"
      );
      if (!response.ok) {
        throw new Error("SomeThing Went Wrong!!! ...Retrying");
      }
      const data = await response.json();

      const trasformMovie = [];
      for (const key in data) {
        trasformMovie.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          releaseDate: data[key].releaseDate,
        });
      }
      console.log(trasformMovie);
      setMovies(trasformMovie);
    } catch (error) {
      setIserror(error.message);
    }
    setIsloading(false);
  }, []);



   // <----------------------------------------Automatic Fetching-------------------------------->

  useEffect(() => {
    FetchMovie();
  }, [FetchMovie]);

  
  // <----------------------------------------Add Movie Function startTransition-------------------------------->
  
  const AddMoviefunction = async (movie) => {
    const respose = await fetch(
      "https://react-http-6410a-default-rtdb.firebaseio.com/movie.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        headers: {
          "Content-type": "application/json",
        },
      }
      );
      const data = await respose.json();
      console.log(data);
    };
    
    // <----------------------------------------Delete Movie Function -------------------------------->
    
    const deleteMovie = (id) => {
    axios.delete(
      `https://react-http-6410a-default-rtdb.firebaseio.com/movie/${id}.json`
      );
      console.log("delete done", id);
    };

   // <----------------------------------------Delete Movie Function End-------------------------------->

   let intervalId;
   
   // <----------------------------------------Retry function-------------------------------->
   useEffect(() => {
     if (Iserror) {
       intervalId = setInterval(FetchMovie, 3000);
       
       return () => {
         clearInterval(intervalId);
        };
      }
    });
    
    function stop() {
      console.log("running");
      clearInterval(intervalId);
      setIserror(false);
    }
     // <----------------------------------------Content Changes-------------------------------->


    let content = <h4>No Movies Found Try Fetching some Movies</h4>;
    
  if (Iserror) {
    content = (
      <>
        <p>{Iserror} </p>
        <button onClick={stop}>Stop Retrying</button>
      </>
    );
  }

  if (Isloading) {
    content = <p>Loading...</p>;
  }
  if (Movies.length > 0) {
    content = <MoviesList movies={Movies} deleteMovie={deleteMovie} />;
  }



  

  return (
    <React.Fragment>
      <section>
        <AddMovie addmovie={AddMoviefunction} />
      </section>
      <section>
        <button onClick={FetchMovie}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
