import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"


const API_KEY = process.env.TMDB_API_KEY
export const tmdbApi=createApi({
    reducerPath:'tmdbApi',
    baseQuery:fetchBaseQuery({
        baseUrl: `https://api.themoviedb.org/3/`
    }),
    endpoints:(builder)=>({
            //now the endpoints 
        getGenere:builder.query({
            query:()=>`genre/movie/list?api_key=${API_KEY}`
        }),
        getMovies:builder.query({
            query:({Category,Genre,Pgno,Search})=>{
                console.log("tmdb here name, id, pg_no",Category,Genre,Pgno,Search);
                if(Search){
                    return `search/movie?query=${Search}&page=${Pgno}&api_key=${API_KEY}`
                }
                if (Category)
                    return  `movie/${Category.toLowerCase()}?page=${Pgno}&api_key=${API_KEY}`

                if (Genre){
                    return `discover/movie?with_genres=${Genre}&page=${Pgno}&api_key=${API_KEY}`
                }

                return `movie/popular?page=${Pgno}&api_key=${API_KEY}`}
            }),

        getMovieInfo:builder.query({
            query:(id)=>{
                    return `/movie/${id}?append_to_response=videos,credits&api_key=${API_KEY}`
            }
        }),
        getUserFavOrCat:builder.query({
            query:(account_id,session_id,what)=>`https://api.themoviedb.org/3/account/${account_id}/${what}?api_key=${API_KEY}&session_id=${session_id}`
        }),
        getRecommedations:builder.query({

            query:({id,Pgno})=>`movie/${id}/recommendations?page=${Pgno}&api_key=${API_KEY}`
        })
        ,
        getActorDetails:builder.query({
            query:(id)=>`https://api.themoviedb.org/3/person/${id}?api_key=${API_KEY}`
        }),
        getMoviesOfActor:builder.query({
            query:({id,page})=>`https://api.themoviedb.org/3/discover/movie?with_cast=${id}&page=${page}&api_key=${API_KEY}`
        })
    }),
    
    })

export const {useGetMoviesQuery,useGetGenereQuery,useGetMovieInfoQuery,useGetRecommedationsQuery,useGetActorDetailsQuery,useGetMoviesOfActorQuery,useGetUserFavOrCatQuery} = tmdbApi // this will automatically create a hook which will contain the logic to call the api and get the state variables also 