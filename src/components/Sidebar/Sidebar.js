import React from "react";
import Typography from "@mui/material/Typography";
import logo from "../../cine.png";
import logodark from '../../cinedark.png'
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListSubheader,
  ListItemText,
  CircularProgress,
} from "@mui/material";
import { useGetGenereQuery } from "../../services/Tmdb";
import { Link } from "react-router-dom";

import action from "../../assets/action.png";
import adventure from "../../assets/adventure.png";
import animation from "../../assets/animation.png";
import comedy from "../../assets/comedy.png";
import crime from "../../assets/crime.png";
import documentary from "../../assets/documentary.png";
import drama from "../../assets/drama.png";
import family from "../../assets/family.png";
import fantasy from "../../assets/fantasy.png";
import history from "../../assets/history.png";
import horror from "../../assets/horror.png";
import music from "../../assets/music.png";
import mystery from "../../assets/mystery.png";
import popular from "../../assets/popular.png";
import romance from "../../assets/romance.png";
import scienceFiction from "../../assets/science fiction.png";
import thriller from "../../assets/thriller.png";
import topRated from "../../assets/top rated.png";
import upcoming from "../../assets/upcoming.png";
import war from "../../assets/war.png";
import western from "../../assets/western.png";
import tvmovie from "../../assets/tv movie.png";
import { updateState } from "../../Slices/Cat_Gen_Pgno";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const sideBaricons = {
  action,
  adventure,
  animation,
  comedy,
  crime,
  documentary,
  drama,
  family,
  fantasy,
  history,
  horror,
  music,
  mystery,
  popular,
  romance,
  "science fiction": scienceFiction,
  thriller,
  "top rated": topRated,
  "tv movie": tvmovie,
  upcoming,
  war,
  western,
};

const categories = ["Popular", "Top rated", "Upcoming"];

function Sidebar({ ToggleSidebar }) {
  const currentTheme = useSelector((store)=>store.Theme.theme)
  const Dispatch = useDispatch();
  const { data, isFetching, isError } = useGetGenereQuery();
  console.log("data", data);
  console.log("isFetching", isFetching);
  console.log("isError", isError);
  console.log("sidebar icons", sideBaricons);

  console.log('Toggle Side Bar',ToggleSidebar)

  return (
    <div
    style={currentTheme?{backgroundColor:'#121313',color:'white'}:{backgroundColor:'white'}}
      className={`w-[250px] sm:w-[19rem]  flex justify-center flex-col`}
      onClick={() => {
       if(!ToggleSidebar)
          return
        else{
          ToggleSidebar(false)
        }
      }}
      
    >
      <Link to={"/"} className="">
          <img src={currentTheme?logodark:logo} alt="cineflex" className="sm:w-[100%] sm:h-[180px] md:max-h-60 max-h-36 " style={{width:'100%',maxWidth:'18rem'}}/> 
      </Link>
      <Divider  style={currentTheme?{backgroundColor:'#2E2F2E',color:'white'}:{backgroundColor:'white'}} />

      <List >
        <ListSubheader style={currentTheme?{backgroundColor:'#121313',color:'#858181'}:{backgroundColor:'white'}}>Categories</ListSubheader>
        {categories.map((item, i) => (
          <Link
            key={i}
            onClick={() => {
              Dispatch(
                updateState({
                  Category: item == "Top rated" ? "top_rated" : item,
                  Genre: false,
                  Pgno: 1,
                  Search: "",
                })
              );
            }}
          >
            <ListItem>
              <ListItemButton className={`flex justify-between  ${currentTheme?'hover:bg-[#242524]':''}`}>
                <ListItemIcon>
                  <img
                    src={`${sideBaricons[item?.toLowerCase()]}`}
                    alt={`${item}logo`}
                    className={`sm:w-11 sm:h-11 h-10 w-10`}
                    style={currentTheme?{filter:'invert(1)', maxWidth: 44, maxHeight: 44 }:{maxWidth:44,maxHeight:44}}

                  />
                </ListItemIcon>
                <ListItemText ><Typography variant="body1" style={{fontSize:'1.4rem'}}>{item}</Typography></ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>

      <Divider  style={currentTheme?{backgroundColor:'#2E2F2E',color:'white'}:{backgroundColor:'white'}}  />
      {isFetching?<CircularProgress  size={50}/>:
      <List>
        <ListSubheader  style={currentTheme?{backgroundColor:'#121313',color:'#858181'}:{backgroundColor:'white'}} >Genres</ListSubheader>
        {data?.genres?.map((item, i) => (
          <Link
            key={item?.id}
            onClick={() => {
              Dispatch(
                updateState({
                  Category: false,
                  Genre: item?.id,
                  Pgno: 1,
                  Search: "",
                })
              );
            }}
          >
            <ListItem>
              <ListItemButton className={`flex justify-between ${currentTheme?'hover:bg-[#242524]':''}`}>
                <ListItemIcon>
                  <img
                    src={`${sideBaricons[item?.name?.toLowerCase()]}`}
                    alt={`${item?.name}logo`}
                    className={`sm:w-11 sm:h-11 h-10 w-10`}
                    style={currentTheme?{filter:'invert(1)', maxWidth: 44, maxHeight: 44 }:{maxWidth:44,maxHeight:44}}
                  />
                </ListItemIcon>

                <ListItemText ><Typography variant="body1" style={{fontSize:'1.4rem'}} >{item?.name}</Typography> </ListItemText>
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>}
    </div>
  );
}

export default Sidebar;
