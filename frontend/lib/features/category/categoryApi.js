import { apiSlice } from "../api/api";
import { current } from "@reduxjs/toolkit";

export const categoryApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query({
      query: () => "/category",
      // async onQueryStarted(arg, { dispatch, queryFulfilled }) {
      //   try {
      //     const results = await queryFulfilled;
      //     dispatch(
      //       apiSlice.util.updateQueryData(
      //         "getCategories",
      //         undefined,
      //         (draft) => {
      //           results?.data?.map((item) => {
      //             draft[item?._id] = item;
      //           });
      //           console.log("Here");
      //         }
      //       )
      //     );
      //   } catch (err) {}
      // },
      // transformResponse: (response) => {
      //   const data = response?.data?.sort((a, b) => {
      //     return (
      //       new Date(b.createdAt).getTime() < new Date(a.createdAt).getTime()
      //     );
      //   });
      //   return {
      //     ...response,
      //     data,
      //   };
      // },
    }),
    getCategory: builder.query({
      query: (id) => `/category/${id}`,
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/category",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        const result = await queryFulfilled;

        // optimistic update starts
        dispatch(
          apiSlice.util.updateQueryData("getCategories", undefined, (draft) => {
            draft?.data?.push(result?.data?.data);
          })
        );
        // Optimistic update ends
      },
    }),
    updateCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/category/${id}`,
        method: "PATCH",
        body: data,
      }),
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        // Optimistic cache update starts
        const updateCache = dispatch(
          apiSlice.util.updateQueryData("getCategories", undefined, (draft) => {
            const draftCategory = draft?.data?.find((d) => d._id == id);
            draftCategory.name = data.name;
          })
        );
        // Optimistic cache update ends

        queryFulfilled.catch(updateCache.undo());
      },
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} = categoryApi;
