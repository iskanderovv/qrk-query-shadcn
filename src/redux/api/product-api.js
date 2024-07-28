import { api } from "./index";

const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProducts: build.query({
      query: ({ page, limit }) => ({
        url: `/products?offset=${(page - 1) * parseInt(limit)}&limit=${limit}`,
        method: "GET",
      }),
      providesTags: ["PRODUCTS"],
    }),
    getAllProducts: build.query({
      query: () => ({
        url: `/products`,
        method: "GET",
      }),
      providesTags: ["PRODUCTS"],
    }),
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PRODUCTS"],
    }),
    updateProduct: build.mutation({
      query: ({ id, productData }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body: productData,
      }),
      invalidatesTags: ["PRODUCTS"],
    }),
    addProduct: build.mutation({
      query: (productData) => ({
        url: `/products/`,
        method: "POST",
        body: productData,
      }),
      invalidatesTags: ["PRODUCTS"],
    }),
  }),
});

export const { useGetProductsQuery, useDeleteProductMutation, useUpdateProductMutation, useAddProductMutation, useGetAllProductsQuery } = productApi;
