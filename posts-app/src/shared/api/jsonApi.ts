import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ComType, PostType } from '../types/api';
import { changeLoading } from '../../app/appSlice';

export const jsonApi = createApi({
  reducerPath: 'jsonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://jsonplaceholder.typicode.com',
  }),
  endpoints: (build) => ({
    getAllPosts: build.query<PostType[], string>({
      query: (start = '0', limit = '5') => ({
        url: '/posts',
        params: {
          _start: start,
          _limit: limit,
        },
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(changeLoading());
        await queryFulfilled;
        dispatch(changeLoading());
      },
    }),
    getOnePost: build.query<PostType, string>({
      query: (id = '1') => ({
        url: `/posts/${id}`,
      }),
    }),
    // ---------------------------
    getCommentsForPost: build.query<ComType[], Record<string, unknown>>({
      query: ({ id = '0', startComPageFrom = '0' }) => ({
        url: `/post/${id}/comments`,
        params: {
          _start: startComPageFrom,
          _limit: 1,
        },
      }),
      async onQueryStarted(_args, { dispatch, queryFulfilled }) {
        dispatch(changeLoading());
        await queryFulfilled;
        dispatch(changeLoading());
      },
    }),
  }),
});

export const {
  useGetAllPostsQuery,
  useGetOnePostQuery,
  useGetCommentsForPostQuery,
} = jsonApi;
