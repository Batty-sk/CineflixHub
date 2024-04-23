import { configureStore } from '@reduxjs/toolkit';
import { tmdbApi } from '../services/Tmdb';
import Cat_Gen_Pgno from '../Slices/Cat_Gen_Pgno';
import Theme from '../Slices/Theme';
import User from '../Slices/User';
const store = configureStore({

  reducer: {
    Cat_Gen_Pgno:Cat_Gen_Pgno,
    Theme:Theme,
    User:User,
    // Other reducers...
    [tmdbApi.reducerPath]: tmdbApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});
export default store