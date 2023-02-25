import React, { useCallback, useEffect, useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";
import AddMovie from "./components/AddMovie";


function App() {
  const [Movies, setMovies] = useState([]);
 const [Isloading, setIsloading] = useState(false);
 const [Iserror, setIserror] = useState(null);


  const FetchMovie=useCallback(async ()=>{
  
    
    setIserror(null);
    setIsloading(true);
    try {
      
      const response = await fetch("https://swapi.dev/api/films");
      if(!response.ok){
      throw new Error("SomeThing Went Wrong!!! ...Retrying");
      }
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
      
      
    } catch (error) {
      setIserror(error.message);
      
    }
    setIsloading(false);
   
  },[]);
  useEffect(()=>{
    FetchMovie();
   },[FetchMovie]);


  function stop(){
  
console.log('running')
   clearInterval();
  }

  const AddMoviefunction=(movie)=>{
    console.log(movie);
  }
  let content=<h4>No Movies Found Try Fetching some Movies</h4>
  
  if(Iserror)
  {
    
    setInterval(FetchMovie, 5000)

    
    
    
  
      content=<><p>{Iserror} </p>
     <button onClick={stop}>Stop Retrying</button>
      </>
   
      
  }
  
  if(Isloading)
  {
    content=<p>Loading...</p>;
  }
  if(Movies.length>0)
  {
    content=<MoviesList movies={Movies} />
  }
      

  

  return (
    <React.Fragment>
      <section>
       <AddMovie addmovie={AddMoviefunction}/>
      </section>
      <section>
        <button onClick={FetchMovie}>Fetch Movies</button>
      
      </section>
      <section>
       {content}
       
      </section>
    </React.Fragment>
  );
}

export default App;
