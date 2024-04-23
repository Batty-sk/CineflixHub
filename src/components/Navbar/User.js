import { Avatar, Typography, Button } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setAuthentication, setUserData,setFavorite,setWatchList } from "../../Slices/User";
import { useDispatch } from "react-redux";
import GetUserFavOrCat from "../../utils/GetUserFavOrCat";
import { Link } from "react-router-dom";
import store from "../../store/store";
import AvatarLogo from "../../avatarlogo.png"

function User({Theme}) {
  const dispatch = useDispatch();
  const authenticated = useSelector((store) => store.User.isAuthenticated);
  const UserData = useSelector((store)=>store.User.UserData)
  const [generateUserProfile, setgenerateUserProfile] = useState(false);

  const CreateSession = async (req_token) => {
    try {
      const {
        data: { session_id },
      } = await axios.post(
        "https://api.themoviedb.org/3/authentication/session/new",
        {
          request_token: req_token,
        },
        {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
          },
          params: {
            api_key: process.env.TMDB_API_KEY,
          },
        }
      );

      localStorage.setItem("session_id", session_id);
      return session_id;
    } catch (error) {
      console.log("error occureed while creating a session id", error);
      throw error;
    }
  };
  const CreateToken = async () => {
    try {
      const data = await axios.get(
        "https://api.themoviedb.org/3/authentication/token/new",
        {
          params: {
            api_key: process.env.TMDB_API_KEY,
          },
        }
      );
      console.log("creating a token ...");
      const request_token = data.data.request_token;
      localStorage.setItem("request_token", request_token);
      console.log("request token ", request_token);
      console.log("data", data);
      if (data.status == 200)
        location.href = `https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${location.origin}/`;
      CreateSession(request_token);
    } catch (err) {
      console.log("error occured while creating a token", err);
    }
  };

  const handleAuth = async () => {
    if(authenticated)
      return 
    try {
      await CreateToken();
      setgenerateUserProfile((state) => !state);
    } catch (err) {
      console.log("error occured", err);
    }
  }; //handle login

  //useeffect() to check to the user is authenticated or not
  useEffect(() => {
    async function auth() {
      const token = localStorage.getItem("request_token");
      console.log("token", token);
      const session_id = localStorage.getItem("session_id");
      console.log("session id", session_id);
      if (token) {
        if (session_id) {
          //get the profile
          console.log("getting the user infor when session id is present");
          try {
            const { data: userData } = await axios.get(
              `https://api.themoviedb.org/3/account?session_id=${session_id}`,
              {
                params: {
                  api_key: process.env.TMDB_API_KEY,
                },
              }
            );
            console.log("userData ", userData);
            console.log("userid");

           GetUserFavOrCat(userData.id, session_id).then((data)=>{
            dispatch(setFavorite(Object.fromEntries(data[0]?.results.map((fav)=>([fav.id,fav])))))
            dispatch(setWatchList(Object.fromEntries(data[1]?.results.map((watch)=>([watch.id,watch])))))
           }).catch(er=>{console.log('error occured',er)})

          console.log('bruhhhhhhhhh')
            dispatch(setUserData(userData));
    
            dispatch(setAuthentication(true));
            console.log("getting the user infor when session id not present");
          } catch (e) {
            console.log(
              "error while getting the account info with the session id"
            );
          }
        } else {
          //create the session id
          try {
            const session_id = await CreateSession(token);
            const { data: userData } = await axios.get(
              `https://api.themoviedb.org/3/account?session_id=${session_id}`,
              {
                params: {
                  api_key: process.env.TMDB_API_KEY,
                },
              }
            );

            console.log('user Data')
            GetUserFavOrCat(userData.id, session_id).then((data)=>{
              dispatch(setFavorite(Object.fromEntries(data[0]?.results.map((fav)=>([fav.id,fav])))))
              dispatch(setWatchList(Object.fromEntries(data[1]?.results.map((watch)=>([watch.id,watch])))))
             }).catch(er=>{console.log('error occured',er)})
  

            dispatch(setUserData(userData));
            dispatch(setAuthentication(true));
          } catch (error) {
          }
        }
      }
    } // use effects needs a sync function only because it excpets to return a cleanup function which is used to clean up the listeners
    // after the component is unmounted from the screen, and in the case with async we're returning the promise
    // that is the reason why
    auth();
  }, [generateUserProfile]);

  return (
    <Link
      onClick={() => {
        handleAuth();
      }}
      to={authenticated?'/profile/'+UserData.id:''}
      className={`flex flex-row items-center cursor-pointer sm:mt-0 mt-3 ${Theme?'grayscale':'text-black'}`}
    >
      <Typography variant="h6" color={'white'} fontWeight={500} paddingRight={1}>
        {(authenticated && "PROFILE") || "LOGIN"}
      </Typography>
      <Avatar src={AvatarLogo} alt="Avatar" />
    </Link>
  );
}

export default User;
