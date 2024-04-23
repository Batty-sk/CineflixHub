import React from 'react'
import { Brightness4,Brightness7 } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { changeTheme } from '../../Slices/Theme';

function ThemeChanger() {
    const dispatch  = useDispatch();
    const currentTheme = useSelector((store)=>store.Theme.theme)
  return (
    <>
    <div onClick={()=>
      currentTheme?dispatch(changeTheme(false)):dispatch(changeTheme(true))} className='cursor-pointer p-3'>
    {currentTheme?<Brightness4 sx={{fontSize:28,color:'yellow'}}/>:<Brightness7 style={{fontSize:28}}/>}
    </div>
    </>
  )
}

export default ThemeChanger