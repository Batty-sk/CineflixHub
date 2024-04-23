import { AppBar,Toolbar,Grid, Drawer, Typography, IconButton, Avatar} from "@mui/material";
import {useMediaQuery} from "@mui/material";
import { Menu } from "@mui/icons-material";
import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import SearchBar from "./SearchBar";
import ThemeChanger from "./ThemeChanger";
import { useSelector } from "react-redux";
import User from "./User";

function Navbar() {
    const isMobile=useMediaQuery('(max-width:640px)')
    const currentTheme = useSelector((store)=>store.Theme.theme)

   const [isSidebarOpen,ToggleSidebar] = useState(false)



  return (
    <>
        <AppBar position="fixed" color="primary"  className={currentTheme?'bg-[#262627] text-white':''}>
          <Toolbar sx={{height:90}} className="flex md:ml-[310px] sm:ml-72 md:justify-between sm:pt-0 pt-32 justify-around flex-wrap-reverse ">
            {isMobile?<IconButton edge="start" onClick={
              ()=>{
                ToggleSidebar(state=>!state)
              }
            }>
            <Menu  sx={{color:'white'}}/>        
            </IconButton>:null}

            <ThemeChanger />
            <SearchBar  />
            <User Theme={currentTheme} />
            </Toolbar>


        </AppBar>

        <div>
          <nav className="bg-gray-300">
            {!isMobile?<Drawer variant="permanent" anchor="left" open>
                   <Sidebar ToggleSidebar={false}/>
                </Drawer>:<Drawer variant="temporary" anchor="right" open={isSidebarOpen} onClose={()=>ToggleSidebar(false)} keepMounted={true} >
                  <Sidebar ToggleSidebar={ToggleSidebar} />
                  </Drawer>}
                
          </nav>
        </div>
    </>
  )
}

export default Navbar