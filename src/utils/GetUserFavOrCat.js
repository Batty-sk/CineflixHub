import { Watch } from "@mui/icons-material"
import { useGetUserFavOrCatQuery } from "../services/Tmdb"
import axios from "axios"

async function GetUserFavOrCat(account_id,session_id) {
    try{
        const Favorite = await axios.get(`https://api.themoviedb.org/3/account/${account_id}/favorite/movies?api_key=${process.env.TMDB_API_KEY}&session_id=${session_id}`)
        console.log('faviorites fetch for the particulaar user is',Favorite.data)
        const Watchlists = await axios.get(`https://api.themoviedb.org/3/account/${account_id}/watchlist/movies?api_key=${process.env.TMDB_API_KEY}&session_id=${session_id}`)
        console.log('watchlist movies',Watchlists.data)
        return [Favorite?.data,Watchlists?.data]
    }   
    catch(e)
    {
        console.log('error while fetching favorites and watchlist',e)
        throw e;
    }


}

export default GetUserFavOrCat