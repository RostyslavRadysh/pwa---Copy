import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import ITaskMenu from '@/models/iTaskMenu'

const iTaskMenuApi = createApi({
    reducerPath: 'iTaskMenuApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
    tagTypes: ['iTaskMenus'],
    endpoints: (build) => ({
        getITaskMenus: build.query<{ entities: ITaskMenu[] }, void>({
            query: () => 'itaskmenus',
            providesTags: (result) =>
                result ? [
                    ...result.entities.map(({ id }) => ({ type: 'iTaskMenus', id } as const)),
                    { type: 'iTaskMenus', id: 'LIST' }
                ] : [{ type: 'iTaskMenus', id: 'LIST' }]
        })
    })
})

export const {
    useGetITaskMenusQuery
} = iTaskMenuApi

export default iTaskMenuApi
