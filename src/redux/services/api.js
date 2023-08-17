import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const api = createApi({
  reducerPath: 'api',
  tagTypes: ['Post', 'Review'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://my-json-server.typicode.com/gitVera/json-server/',
  }),
  endpoints: builder => ({
    getPosts: builder.query({
      query: () => ({
        url: 'posts',
      }),
      providesTags: result =>
        (result || [])
          .map(({id}) => ({type: 'Post', id}))
          .concat({type: 'Post', id: 'LIST1'}),
    }),
    createPost: builder.mutation({
      query: data => ({
        url: 'posts',
        method: 'POST',
        body: JSON.stringify({...data}),
      }),
      invalidatesTags: () => [{type: 'Post', id: 'LIST1'}],
    }),
    deletePost: builder.mutation({
      query: id => ({
        url: `posts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [{type: 'Post', id: 'LIST1'}],
    }),
    updatePost: builder.mutation({
      query: data => {
        const {id, ...body} = data;
        return {
          url: `posts/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: () => [{type: 'Post', id: 'LIST1'}],
    }),
    getReviews: builder.query({
      query: () => ({
        url: 'reviews',
      }),
      providesTags: result =>
        (result || [])
          .map(({id}) => ({type: 'Review', id}))
          .concat({type: 'Review', id: 'LIST'}),
    }),
    createReview: builder.mutation({
      query: data => ({
        url: 'reviews',
        method: 'POST',
        body: JSON.stringify({...data}),
      }),
      invalidatesTags: () => [{type: 'Review', id: 'LIST'}],
    }),
    updateReview: builder.mutation({
      query: data => {
        const {id, ...body} = data;
        return {
          url: `reviews/${id}`,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: result => [{type: 'Review', id: 'LIST'}],
    }),
    deleteReview: builder.mutation({
      query: id => ({
        url: `reviews/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [{type: 'Review', id: 'LIST'}],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useGetReviewsQuery,
  useCreateReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = api;
