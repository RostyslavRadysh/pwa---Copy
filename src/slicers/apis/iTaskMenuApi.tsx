import { getCookie } from 'cookies-next'
import { 
    createApi, 
    fetchBaseQuery, 
    BaseQueryFn, 
    FetchArgs, 
    FetchBaseQueryError 
} from '@reduxjs/toolkit/query/react'
import ITaskMenu from '@/models/iTaskMenu'

const dynamicBaseQuery: BaseQueryFn<string | FetchArgs,
  unknown,
  FetchBaseQueryError> = async (args, WebApi, extraOptions) => {
    const baseUrl = `${getCookie('webServiceUrl')}/api/`
    const rawBaseQuery = fetchBaseQuery({ baseUrl })
    return rawBaseQuery(args, WebApi, extraOptions)
}

const iTaskMenuApi = createApi({
    reducerPath: 'iTaskMenuApi',
    baseQuery: dynamicBaseQuery,
    refetchOnMountOrArgChange: true,
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
