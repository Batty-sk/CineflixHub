import { TextField,InputAdornment } from "@mui/material";
import { useState } from "react";
import { Search as SearchIcon } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateSearch } from "../../Slices/Cat_Gen_Pgno";
import { useLocation } from "react-router-dom";

function SearchBar() {

    const dispatch=useDispatch()
    const location=useLocation()
    const navigate=useNavigate()

    const [movieName,setmovieName] = useState('')
    const handleKeyPress=(event)=>{
        if (event.key == 'Enter'){
            console.log('searching movei',movieName)
            if(location.pathname!='/')
                navigate('/')
            //dispatch the update state action
            dispatch(updateSearch(movieName))
        }
    }
  return (
    <div >
        <TextField
        value={movieName}
        onChange={(x)=>setmovieName(x.currentTarget.value)}
        onKeyPress={handleKeyPress}
        variant="standard"
        InputProps={{
            startAdornment:(
                <InputAdornment position="start">
                    <SearchIcon  />
                </InputAdornment>
            )
        }}
        className='invert'
        />
    </div>
  )
}

export default SearchBar
