import {configureStore} from '@reduxjs/toolkit';
import {api} from './services/api';
import {postsReducer} from './features/posts';
import { reviewsReducer } from './features/reviews';

// Automatically adds the thunk middleware and the Redux DevTools extension
export const store = configureStore({
  reducer: {
    posts: postsReducer,
    reviews: reviewsReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat([api.middleware]),
});
