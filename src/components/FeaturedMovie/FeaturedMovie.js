import { Box,Card,CardMedia,CardContent,Typography } from "@mui/material";
import { Link } from "react-router-dom";

function FeaturedMovie({movie}) {

    console.log('feature movie',movie)
  return (
   <Link className="sm:h-[490px] h-[400px] w-[100%] sm:w-[100%] flex justify-center items-center" to={`/movie/${movie?.id}`}  >
        <Card className="h-[100%] w-[100%] relative" >

            <CardMedia 
            media='picture'
            alt={movie.title}
            image={`https://image.tmdb.org/t/p/original${movie?.backdrop_path}`}
            title={movie?.title}
            sx={{backgroundColor:'rgba(0,0,0,0.575)', backgroundBlendMode:'darken',height:'100%',width:'100%',display:'absolute',top:0,bottom:0}}
            />
        <div className="absolute bottom-5 left-5 text-white">
        <Typography variant="h3" color="white" className="z-10 mb-8 md:text-6xl text-3xl">{movie?.title}</Typography>  
        <Typography variant="body2" color="white" className="text-[1.1rem] max-h-20 h-14 overflow-auto mb-5">{movie?.overview}</Typography>
        </div>
    

        </Card>
   </Link>
  )
}

export default FeaturedMovie