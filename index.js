import React from "react";
import reactDom from "react-dom/client";
import App from "./App";
import Main from "./src/components/Main";
import MovieInfo from "./src/components/MovieInfo/MovieInfo";
import { Provider } from "react-redux"
import store from "./src/store/store";
import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import './index.css'
import RenderMovies from "./src/components/RenderMovies/RenderMovies";
import ActorPage from "./src/components/ActorPage/ActorPage";
import Profile from "./src/components/Profile/Profile";

const routes=createBrowserRouter([  
    {
        path:'/',
        element:<App/>,
        children:[
            {
        path:'/',
                element:<RenderMovies />
            },
        {
                    
        path:'movie/:id',
        element:<MovieInfo />
         }
         ,
         {
            path:'cast/:id',
            element:<ActorPage />
         },
        {
            path:'profile/:id',
            element:<Profile/>
        }
                ]
            }
        ]
    
)

const root =  reactDom.createRoot(document.getElementById('root'))
root.render(<Provider store={store}><RouterProvider  router={routes} /> </Provider>)