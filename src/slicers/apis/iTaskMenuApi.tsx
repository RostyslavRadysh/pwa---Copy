import { 
    createApi, 
    fetchBaseQuery, 
    BaseQueryFn, 
    FetchArgs, 
    FetchBaseQueryError 
} from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'
import Menu from '@/models/menu'
import MenuModelType from '@/models/menuModelType'

const dynamicBaseQuery: BaseQueryFn<string | FetchArgs,
  unknown,
  FetchBaseQueryError> = async (args, WebApi, extraOptions) => {
    const baseUrl = `${getCookie('baseUrl')}/api/`
    const rawBaseQuery = fetchBaseQuery({ baseUrl })
    return rawBaseQuery(args, WebApi, extraOptions)
}

const menuApi = createApi({
    reducerPath: 'menuApi',
    baseQuery: dynamicBaseQuery,
    refetchOnMountOrArgChange: true,
    tagTypes: ['menus'],
    endpoints: (build) => ({
        getMenus: build.query<Menu[], void>({
            query: () => 'itaskmenus',
            providesTags: (result) =>
                result ? [
                    ...result.map(({ id }) => ({ type: 'menus', id } as const)),
                    { type: 'menus', id: 'list' }
                ] : [{ type: 'menus', id: 'list' }],
            transformResponse: (response: { entities: MenuModelType[] }) => response.entities.map(entity => {
                const menu = {
                    id: entity.id,
                    title: {
                        value: entity.title,
                        isChanged: false
                    },
                    rows: {
                        value: entity.rows,
                        isChanged: false
                    },
                    columns: {
                        value: entity.columns,
                        isChanged: false
                    }
                } as Menu
                return menu
            })
        })
    })
})

export const {
    useGetMenusQuery
} = menuApi

export default menuApi
