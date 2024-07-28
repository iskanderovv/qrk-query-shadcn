import { api } from "./index";

const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: ({ page, limit }) => ({
        url: `/products?offset=${(page - 1) * limit}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["PRODUCTS"],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PRODUCTS"],
    }),
  }),
});

export const { useGetProductsQuery, useDeleteProductMutation } = productApi;
