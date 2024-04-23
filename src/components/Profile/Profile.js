import React from 'react'
import { Typography,Divider, Grid, Button } from '@mui/material'
import Movie from '../RenderMovies/Movie';
import { useSelector } from 'react-redux'

import LogoutIcon from '@mui/icons-material/Logout';

function Profile() {
    const userFav=useSelector(store=>store.User.UserFavorite)
    const currentTheme = useSelector((store)=>store.Theme.theme)

    const UserWatchlist = useSelector(store=>store.User.UserWatchlist)

    console.log('userFavv',userFav)
    console.log('userWatchlist',UserWatchlist)

    const handleLogout = ()=>{
      localStorage.clear()
      location.href='/'
    }

  return (
    <div className='' style={currentTheme?{color:'white'}:{color:'black'}}>
      <div className='flex flex-wrap justify-between mb-12 align-middle'>
        <Typography variant="h2" color="inherit" className='md:text-5xl text-3xl font-extrabold p-5'>My Profile</Typography>
        <Button color="inherit" variant='outlined' startIcon={<LogoutIcon/> } onClick={handleLogout}>
          LOGOUT
         </Button>

        </div>
        <Typography variant="h5" color="inherit">Favorites</Typography>
        <Divider />
        <Grid container justifyContent={'start'} color={'inherit'}>
            {userFav?Object.values(userFav).map((x,i)=><Movie movie={x} index={i} key={i}/>):null}
        </Grid>

        <Typography variant="h5" color="inherit" className='mt-5'>WatchList</Typography>
        <Divider />

        <Grid container justifyContent={'start'} color={'inherit'}>
          {UserWatchlist?Object.values(UserWatchlist).map((x,i)=><Movie movie={x} index={i} key={i}/>):null}
          </Grid>
    </div>
  )
}

export default Profile