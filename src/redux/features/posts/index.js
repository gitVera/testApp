import {createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const postsSlice = createSlice({
  name: 'posts',
  initialState: [],
  reducers: {
    deletePostRT(state, action) {
      const idDeleted = action.payload;
      const newState = state.filter(post => post.id !== idDeleted);
      return newState;
    },
    updatePostRT(state, action) {
      const updatedPost = action.payload;
      const newState = state.map(post => {
        if (post.id === updatedPost.id) {
          return updatedPost;
        }
        return post;
      });
      return newState;
    },
  },
  extraReducers: builder => {
    builder
      .addMatcher(api.endpoints.getPosts.matchFulfilled, (state, {payload}) => {
        if (!state?.length > 0) {
          state = payload;
          return state;
        }
      })
      .addMatcher(api.endpoints.createPost.matchFulfilled, (state, res) => {
        const newPost = res.meta.arg.originalArgs;
        state.push(newPost);
      });
    // .addMatcher(api.endpoints.deletePost.matchFulfilled, (state, res) => {
    //   const idDeleted = res.meta.arg.originalArgs;
    //   state.filter(post => post.id !== idDeleted);
    // });
  },
});

export const postsReducer = postsSlice.reducer;

export const {deletePostRT, updatePostRT} = postsSlice.actions;
