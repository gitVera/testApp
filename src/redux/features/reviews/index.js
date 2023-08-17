import {createSlice} from '@reduxjs/toolkit';
import {api} from '../../services/api';

export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: [],
  reducers: {
    createReviewRT(state, action) {
      const newReview = action.payload;
      state.push(newReview);
    },
    deleteReviewRT(state, action) {
      const idDeleted = action.payload;
      const newState = state.filter(review => review.id !== idDeleted);
      return newState;
    },
    updateReviewRT(state, action) {
      const updatedReview = action.payload;
      const newState = state.map(review => {
        if (review.id === updatedReview.id) {
          return updatedReview;
        }
        return review;
      });
      return newState;
    },
  },
  extraReducers: builder => {
    builder.addMatcher(
      api.endpoints.getReviews.matchFulfilled,
      (state, {payload}) => {
        if (!state?.length > 0) {
          state = payload;
          return state;
        }
      },
    );
  },
});

export const reviewsReducer = reviewsSlice.reducer;

export const {deleteReviewRT, updateReviewRT, createReviewRT} =
  reviewsSlice.actions;
