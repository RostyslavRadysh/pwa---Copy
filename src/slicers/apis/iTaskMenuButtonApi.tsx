import { getCookie } from 'cookies-next'
import { 
    createApi, 
    fetchBaseQuery, 
    BaseQueryFn, 
    FetchArgs, 
    FetchBaseQueryError 
} from '@reduxjs/toolkit/query/react'
import ITaskMenuButton from '@/models/iTaskMenuButton'

const dynamicBaseQuery: BaseQueryFn<string | FetchArgs,
  unknown,
  FetchBaseQueryError> = async (args, WebApi, extraOptions) => {
    const baseUrl = `${getCookie('webServiceUrl')}/api/`
    const rawBaseQuery = fetchBaseQuery({ baseUrl })
    return rawBaseQuery(args, WebApi, extraOptions)
};

const iTaskMenuButtonApi = createApi({
    reducerPath: 'iTaskMenuButtonApi',
    baseQuery: dynamicBaseQuery,
    refetchOnMountOrArgChange: true,
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
