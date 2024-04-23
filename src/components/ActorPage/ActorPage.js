import { Grid,Typography,CircularProgress,Button, Box} from "@mui/material"
import { useGetActorDetailsQuery, useGetMoviesOfActorQuery } from "../../services/Tmdb"
import { Cake,Language,Troubleshoot } from "@mui/icons-material"
import { useEffect, useState } from "react"
import MoviesList from "../RenderMovies/MoviesList"
import Pagination from "../Pagination/Pagination"
import { useSelector } from "react-redux"

import { Link, useParams } from "react-router-dom"
function ActorPage() {

    const {id}= useParams()
    const [page,setPageno]=useState(1)
    const{data,isFetching,isError} = useGetActorDetailsQuery(id)
    const{data:movies,isFetching:checking,isError:error} = useGetMoviesOfActorQuery({id,page})
    const [showFullContent, setShowFullContent] = useState(false);
    const currentTheme = useSelector((store)=>store.Theme.theme)

    console.log(movies,'movies of an actor');

    if (isFetching)
        return <div className="h-screen"><CircularProgress size={100} /></div>
    if (isError)
        return <h2>Sorry.Uable To Fetch The Details </h2>

    console.log('actor details',data)

    const toggleShowFullContent = () => {
        setShowFullContent(!showFullContent);
      };
    const truncateBiography = (biography, maxLength = 1000) => {
        return biography && biography.length > maxLength
          ? `${biography.slice(0, maxLength)}...`
          : biography;
      };
      
    const biographyContent = showFullContent ? data?.biography : truncateBiography(data?.biography);



  return (
    <div className="flex justify-center items-center">
    <Grid container justifyContent={'space-between'} style={currentTheme?{color:'white'}:{color:'black'}}>
            <Grid item xs={12} md={12} lg={5} className="mb-9 flex justify-center items-center" >
                <img src={`https://image.tmdb.org/t/p/w500/${data?.profile_path}`} alt={"name"}  style={currentTheme?{boxShadow:'0px 10px 13px maroon'}:{boxShadow:'0px 15px 13px black'}}/>                   
            </Grid>
            <Grid item  sm={12} md={12} lg={6} xl={7} className="flex flex-col sm:pl-10 p-0">
                    <div>
                        <Typography variant="h3" color="inherit" className="sm:text-start text-start">{data?.name}</Typography>
                        <Typography variant="body1" color="inherit" className="text-[1.3rem] mt-5 sm:text-start text-start">
                                {biographyContent}
                            </Typography>
                            {!showFullContent && (
                                <button onClick={toggleShowFullContent} className="text-blue-500 hover:underline focus:outline-none">
                                Read More
                                </button>
                            )}
                        </div>

                        <Box className="flex flex-wrap  justify-around mt-8">
                            {data?.birthday?
                                <Button variant="contained" color={currentTheme?"error":"primary"} startIcon={<Cake /> } >
                                    {data?.birthday}
                                </Button>
                                :null}

{data?.imdb_id?
                                <Link to={`https://www.imdb.com/name/${data?.imdb_id}`}>
                                <Button variant="contained"  color={currentTheme?"error":"primary"} startIcon={<Language />}>
                                    Imdb

                                </Button>
                                </Link>
:null}
                             
                        </Box>
            </Grid>


            <Grid  item xs={12} className="flex flex-col justify-center mt-16">
                 
                 <Typography variant="h3" color="inherit" textAlign={'center'} className="mb-5">More Movies</Typography>
         
                    {(movies?.results?.length && <><MoviesList  movies={movies.results} /><Pagination Pgno={page} setPage={setPageno} maxPages={movies.total_pages}/> </> ) || (checking && <CircularProgress size={100}/> ) || <div className="flex flex-col justify-center">
                        <Typography variant="h5" color="inherit" textAlign={'center'}></Typography>
                         </div>}

                
            </Grid>
    </Grid>
    </div>

  )
}

export default ActorPage