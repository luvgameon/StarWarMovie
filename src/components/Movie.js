import React from 'react';

import classes from './Movie.module.css';
function Movie(props){
  
  const DeleteMovie=()=>{
    console.log('inside movie ',props.id);
    
    props.deleteMovie(props.id);

  }

  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>Release Date: {props.releaseDate}</h3>
      <p>{props.openingText}</p>
      <button style={{background:'grey'}} onClick={DeleteMovie}>Delete Movie</button>
    </li>
  );
};

export default Movie;
