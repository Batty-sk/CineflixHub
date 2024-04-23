import React, { useEffect, useState } from 'react'
import { useGetMoviesQuery } from '../../services/Tmdb';
import { Icon, Skeleton, Typography,CircularProgress } from '@mui/material';
import { useSelector } from 'react-redux';
import MoviesList from './MoviesList'
import Pagination from '../Pagination/Pagination';
import { updatePgno } from '../../Slices/Cat_Gen_Pgno';
import notfound from '../../assets/not_found.png'
import FeaturedMovie from '../FeaturedMovie/FeaturedMovie';

function RenderMovies() {
  const [page,setPage]=useState(1)
    //Subscribing the Category, Genre And Pgno store To Render the Movies Accordingly.
    const subscribedData=useSelector((store)=>store.Cat_Gen_Pgno)
    const {data,isFetching,isError}=useGetMoviesQuery({...subscribedData,Pgno:page});
    console.log('isFetching in render Movies',isFetching)
    console.log('data',data)
    console.log('iserror',isError)

useEffect(()=>{
  setPage(1)
},[subscribedData])
  return (
    <>{/* here we have to render the text according to the selected category or genre and page no */}
{/*     <Typography variant="h4" color="initial" className='text-bold font-mono flex justify-start'>Movies</Typography>
 */}    {
    (isFetching && <div className='h-screen'><CircularProgress  size={100}/> </div>) || (data?.results?.length &&  <> 
    <FeaturedMovie movie={data?.results[0]}/>

    <MoviesList movies={data.results.slice(1,data?.results?.length)}/>
 <Pagination Pgno={page} setPage={setPage} maxPages={data?.total_pages}/>
    </> )
     || <Typography variant='h2' className='text-center font-mono font-bold flex flex-col justify-center text-[#1976D2]'>
         <img src={notfound} alt='Not Found'></img>
       No Movies Found !</Typography>}

    </>
    )
}

export default RenderMovies