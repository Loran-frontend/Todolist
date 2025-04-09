import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { BASE_URL } from "../../constants"
import type { RootState } from "../store"

const baseQuery = fetchBaseQuery({
  baseUrl: `${BASE_URL}/api/`,
  prepareHeaders: (headers, { getState }) => {
    const token =
      (getState() as RootState).user.token || localStorage.getItem("token")

    if (token) {
      headers.set("authorization", `Bearer ${token}`)
    }

    return headers
  },
})

export const Api = createApi({
  reducerPath: "todosApi",
  baseQuery: baseQuery,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({}),
})
