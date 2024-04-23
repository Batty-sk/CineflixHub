import React from 'react'
import { Grid } from '@mui/material'
import Movie from './Movie'
 
function MoviesList({movies}) {
  return (
    <>
    <Grid container justifyContent="center">
        {movies.map((movie,index)=><Movie key={index} movie={movie} index={index}/>)}
    </Grid>

    
    </>
  )
}

export default MoviesList