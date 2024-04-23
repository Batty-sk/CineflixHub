
import { useGetMovieInfoQuery,useGetRecommedationsQuery,useGetUserFavOrCatQuery } from "../../services/Tmdb"
import { Link, useParams } from "react-router-dom"
import { Grid,IconButton,Button,Rating,Typography, Container, ListSubheader,ListItem,ListItemText,ListItemIcon,ListItemButton, List, CircularProgress,Box,Modal,Popover } from "@mui/material"
import { sideBaricons } from "../Sidebar/Sidebar"
import { useDispatch } from "react-redux"
import MoviesList from "../RenderMovies/MoviesList"
import { updateState } from "../../Slices/Cat_Gen_Pgno"
import { useEffect, useState } from "react"
import Pagination from "../Pagination/Pagination"
import { WebSharp } from "@mui/icons-material"
import { WatchLater,Favorite } from "@mui/icons-material"
import { Language } from "@mui/icons-material"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import WatchLaterOutlinedIcon from '@mui/icons-material/WatchLaterOutlined';
import axios from "axios"
import { useSelector } from "react-redux"
import { setWatchList,setFavorite,deleteFavorite,deleteWatchList } from "../../Slices/User"


function MovieInfo() {
    const {UserData,isAuthenticated,UserFavorite,UserWatchlist} = useSelector((store)=>store.User)
    const {id}=useParams()
    const dispatch=useDispatch()
    const currentTheme = useSelector((store)=>store.Theme.theme)

    const {data,isFetching,isError}=useGetMovieInfoQuery(id)
    const [Pgno,setPageno]=useState(1)
    const [fav,setFav]=useState(false)
    const [watchlater,setwatchlater]=useState(false)

    const {data:recommedData,isFetching:isLoading,isError:isErrorData}=useGetRecommedationsQuery({id,Pgno})
    const [trailer,setToggleTrailer] = useState(false)
    
    console.log('realoding..',Pgno)
    //image.tmdb.org/t/p/w500$[data ]
    console.log('recommend data',recommedData,isLoading,isErrorData)
    console.log('movie info data',data)

    console.log('user data store in the store', UserData)

 
    const handleSetFavourite = async (movie_id)=>{

        if (isAuthenticated){
        try{

        setFav((state)=>!state)

       const Data= await axios.post(`https://api.themoviedb.org/3/account/${UserData.id}/favorite?api_key=${process.env.TMDB_API_KEY}&session_id=${localStorage.getItem('session_id')}`,{
                media_type:'movie',
                media_id:movie_id,
                favorite:!fav
            })

        console.log('favorite successfully',Data)
        }
        catch(e){
            console.log('error occured while saving to faviorite',e)
            setFav((state)=>!state)
         }
        
         if (!fav)
         {
            dispatch(setFavorite({movie_id:data}))
         }
         else{
            dispatch(deleteFavorite(movie_id))
         }
    
        }
        else{
            console.log('please authenticate yourself before saving movies ')

        }
    }

    const handleSetWatchList=async (movie_id) =>{
        if(isAuthenticated){
            setwatchlater((state)=>!state)

            try{
                const Data= await axios.post(`https://api.themoviedb.org/3/account/${UserData.id}/watchlist?api_key=${process.env.TMDB_API_KEY}&session_id=${localStorage.getItem('session_id')}`,{
                         media_type:'movie',
                         media_id:movie_id,
                         watchlist:!watchlater
                     })
                if (!watchlater)
                     {
                        dispatch(setWatchList({movie_id:data}))
                     }
                     else{
                        dispatch(deleteWatchList(movie_id))
                     }
                 console.log('favorite successfully',Data)
                
                 }
                 catch(e){
                     console.log('error occured while saving to faviorite',e)
                     setwatchlater(state=>!state)
                 }
        }
        else{
        }


    }


 useEffect(()=>{
        setPageno(1)  //pagination logic
            if(UserFavorite[id])
            setFav(state=>true)
            else{
                setFav(state=>false)
            }

        if(UserWatchlist[id])
            setwatchlater(state=>true)
        else{
            setwatchlater(state=>false)
        }

    },[id])


useEffect(()=>{
    if(UserFavorite[id])
        setFav(true)

    if(UserWatchlist[id])
        setwatchlater(true)

},[UserFavorite,UserWatchlist])

    if(isFetching)
        return <div className="h-screen"><CircularProgress size={100}/></div>
  return (
    <Grid container justifyContent={'space-around'} alignItems={'start'}>    

        <Grid item xs={12}  lg={5} className="mb-9 flex justify-center items-center" >
            <img src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`} alt="Poster-Image"  className="rounded-[20px]" style={currentTheme?{boxShadow:'0px 10px 10px white'}:{boxShadow:'5px 20px 20px black'}}/>
        </Grid>
        <Grid item  xs={12} md={12} lg={12} xl={6} justifyContent={'center'} className="sm:pl-2" style={currentTheme?{color:'white'}:{color:'black'}}>
            <Typography variant="h3" textAlign={'center'} marginBottom={5}>
                {data?.title} ({data?.release_date.split('-')[0]})  
            </Typography>
            
            <div className="flex flex-col justify-center">
            <Typography variant="h4" color="initial" className="font-extralight text-center" style={currentTheme?{color:'white'}:{color:'black'}}>
                {data?.tagline}
            </Typography>
            
            <div className="flex flex-row justify-center mt-3 align-middle items-center">
            <Rating readOnly value={data?.vote_average/2} precision={0.1} className="text-3xl"  style={currentTheme?{filter:'invert(1)',color:'blue'}:{padding:''}}/> <Typography variant="h6" color="   " className="font-extralight ml-1">{data?.vote_average.toFixed(1)} / 10</Typography>
            </div>

            <div className="text-center mt-3 ">
                <div className="flex justify-around flex-wrap">
                {data?.genres?.map((item,key)=>(
                    <Link to={'/'} key={item.id} onClick={()=>{dispatch(updateState({Category:false,Genre:item.id,Pgno:1}))}}>
                        <ListItem>
                        <ListItemButton className={`flex justify-around  border border-blue-400 ${currentTheme?'hover:bg-[#242524]':''}`}>
                            <ListItemIcon>
                                <img src={`${sideBaricons[item.name.toLowerCase()]}`} alt={`${item.name}logo`} className='w-12 h-12 '  style={currentTheme?{filter:'invert(1)'}:{color:'black'}}/>
                            </ListItemIcon>
                        <ListItemText primary={item.name}></ListItemText>
                        </ListItemButton>
                    </ListItem>
                    </Link>
                    
                )) }
                </div>

                   
            </div>

            <div className="mt-6 ">
                <Typography variant="h4" color="inherit" className="font-bold mb-2">Overview</Typography>
                <p className="text-[1.3rem]">
                    {data?.overview &&(data.overview) || "No overview" }
                </p>
            </div>
            

            <div className="mt-6 ">
            <Typography variant="h4" color="inherit" className="font-bold mb-2">Top Cast</Typography>
            <div className="flex flex-wrap  sm:justify-start justify-center">
                {data?.credits?.cast?.slice(0,5).map((item,key)=>{
                    if(!item?.profile_path)
                        return
                    return(
                    <Link to={`/cast/${item.id}`} key={item.id} className="text-center">
                        <ListItem >
                        <ListItemButton className={`flex justify-start ${currentTheme?'hover:bg-[#242524]':''}`}>
                            <ListItemIcon>
                                <img src={`https://image.tmdb.org/t/p/w200/${item?.profile_path}`} alt={`${item?.name}`} className='w-24 h-36 rounded-2xl'/>
                            </ListItemIcon>
                        </ListItemButton>
                    </ListItem>
                    <p>{item.name}</p>

                    </Link>
                    )
                    
}) }
                </div>

            </div>

        <div className="mt-10 flex sm:justify-start justify-center" style={currentTheme?{filter:'invert(1)'}:{filter:''}}>
                
              <div className="text-center">
                <Button variant="outlined" href={data?.homepage} startIcon={<WebSharp />} target="_blank">
                        Website
                </Button>
                <Button variant="contained" color={currentTheme?"info":"primary"} href={`https://www.imdb.com/title/${data?.imdb_id}`} startIcon={<Language />} style={{boxShadow:'none'}}>
                    IMDB
                </Button>


                </div>

                <div className="text-center">
               
                <Button variant="outlined" onClick={()=>handleSetFavourite(id)} startIcon={fav?<Favorite style={{color:'darkpink'}}/>:<FavoriteBorderIcon/>} className={`${fav?'invert':''}`}>
                        Favorite
                </Button>
                <Button variant="contained"  onClick={()=>handleSetWatchList(id)} color="primary"  startIcon={watchlater?<WatchLater />:<WatchLaterOutlinedIcon />} style={{boxShadow:'none'}}>
                    WatchList
                </Button>

                </div>



            </div>

           
            </div>

        </Grid>
        
        {data?.videos?.results?.length > 0 &&(
            <Container maxWidth="xl" className="sm:h-[500px] w-[100%] h-60 text-center mt-20 mb-12">
                <Typography variant="h3" color={currentTheme?"white":"initial"} className="mb-5">Trailer</Typography>
                <iframe autoPlay className="w-[100%] h-[100%]"  title="trailer" src={`https://www.youtube.com/embed/${data.videos.results[0].key}`} allow="autoplay"  />
            
                </Container>
                 )}


        {/* <Modal closeAfterTransition
            className="flex items-center justify-center"
            open={trailer}
            onClose={()=>setToggleTrailer(false)}
            >
           l> */}

        <Box justifyContent={"center"} className="mt-20 items-center" >
                {(isLoading &&<div className="h-screen"> <CircularProgress size={100}/></div>) || (isErrorData && <h4>Something Gone Bad :( </h4>) || (recommedData.results.length && <><Typography variant="h3" color={currentTheme?"white":"initial"} textAlign={"center"} className="mb-5"> You May Also Like</Typography>
<MoviesList movies={recommedData.results}/><Pagination Pgno={Pgno} setPage={setPageno} maxPages={recommedData.total_pages}/></>)}

        </Box>

    </Grid>
  )
}

export default MovieInfo