import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import ITaskMenuButton from '@/models/iTaskMenuButton'

const iTaskMenuButtonApi = createApi({
    reducerPath: 'iTaskMenuButtonApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api/' }),
    tagTypes: ['iTaskMenuButtons'],
    endpoints: (build) => ({
        getITaskMenuButtons: build.query<{ entities: ITaskMenuButton[] }, void>({
            query: () => 'itaskmenubuttons',
            providesTags: (result) =>
                result ? [
                    ...result.entities.map(({ id }) => ({ type: 'iTaskMenuButtons', id } as const)),
                    { type: 'iTaskMenuButtons', id: 'LIST' }
                ] : [{ type: 'iTaskMenuButtons', id: 'LIST' }]
        })
    })
})

export const {
    useGetITaskMenuButtonsQuery
} = iTaskMenuButtonApi

export default iTaskMenuButtonApi
