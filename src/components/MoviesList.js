import React from 'react';

import Movie from './Movie';
import classes from './MoviesList.module.css';

const MovieList = (props) => {
  
  const deleteMovie=(id)=>{
    console.log('inside movie',id);
    props.deleteMovie(id);
  }
  return (
    <ul className={classes['movies-list']}>
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          id={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
          deleteMovie={deleteMovie}

        />
      ))}
    </ul>
  );
};

export default MovieList;
