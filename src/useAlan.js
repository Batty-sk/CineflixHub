import alanBtn from "@alan-ai/alan-sdk-web";
import { useDispatch } from "react-redux";
import { changeTheme } from "./Slices/Theme";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { updateSearch } from "./Slices/Cat_Gen_Pgno";
import { updateState } from "./Slices/Cat_Gen_Pgno";

function useAlan({navigate,location}) {
  const dispatch = useDispatch();
  useEffect(() => {
    alanBtn({
      key: "2570342b89eb55fffe04538966c8c31e2e956eca572e1d8b807a3e2338fdd0dc/stage",
      enableVoice: true,
      onCommand: ({ command, value }) => {
        if (command === "changeMode") {
          if (value == "dark") {
            dispatch(changeTheme(true));
          } else {
            dispatch(changeTheme(false));
          }
          // Call the client code that will react to the received command
        } 
        
        else if (command === "switch") {
          let corg = null;

          let isItCategory;
          // find if its genre or category
          
          if(typeof value == 'string'){
          isItCategory = ["top rated", "popular", "upcoming"].find(
            (x) => x == value?.toLowerCase()
          );
          }
          if (isItCategory) {
            
            corg = value.toLowerCase() === "top rated" ? "top_rated" : value.toLowerCase();
            dispatch(
              updateState({
                Category: corg,
                Genre: false,
                Pgno: 1,
                Search: "",
              })


            );
          }
           else {
            
            dispatch(
              updateState({
                Category: false,
                Genre: value,
                Pgno: 1,
                Search: "",
              })
            );
          }
          
        if(location.pathname!=='/')
                navigate('/')
          console.log('coming herer in switching')
        }
         else if (command === "search") {

            dispatch(updateSearch(value))


        } else if (command === "login") {


        } else if (command == "logout") {
        }
      },
    });
  }, []);
}

export default useAlan;
