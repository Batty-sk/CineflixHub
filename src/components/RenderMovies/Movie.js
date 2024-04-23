import React from 'react'
import { Grid,Typography, Grow,Tooltip, Rating} from '@mui/material'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
function Movie({movie,index}) {
  const currentTheme = useSelector((store)=>store.Theme.theme)

  if(!movie?.poster_path)
      return 
  return (
    <Grid item xs={12} sm={12} md={6} lg={4} xl={'auto'}  padding={3}  justifyContent="center" alignItems="center">
        <Grow in timeout={(index+1)*250} >
        <Link to={`/movie/${movie.id}`} key={index} className="flex flex-col items-center">
           <img src={movie.poster_path?`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`:'https://www.fillmurray.com/200/300'} className='h-[320px] rounded-[20px] min-w-fit max-w-fit mb-2 hover:scale-[1.05]' style={{transition:'transform 300ms'}} alt={movie?.title}/>
           <Typography variant="h5" className={`text-center overflow-ellipsis  whitespace-nowrap truncate w-60 ${currentTheme?'text-white':''}`}>{movie?.title}</Typography>
           <Tooltip disableTouchListener title={`${movie.vote_average} / 10`}>
            <div>
          <Rating readOnly value={movie.vote_average/2} precision={0.1} style={ currentTheme?{filter:'invert(1)',color:'blue'}:{padding:0}} />
          </div>
        </Tooltip>
        </Link>
       
        </Grow>
    </Grid>
  )
}

export default Movie