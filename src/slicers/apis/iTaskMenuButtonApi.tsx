import { 
    createApi, 
    fetchBaseQuery, 
    BaseQueryFn, 
    FetchArgs, 
    FetchBaseQueryError 
} from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'
import Button from '@/models/button'
import ButtonModelType from '@/models/buttonModelType'

const dynamicBaseQuery: BaseQueryFn<string | FetchArgs,
  unknown,
  FetchBaseQueryError> = async (args, WebApi, extraOptions) => {
    const baseUrl = `${getCookie('baseUrl')}/api/`
    const rawBaseQuery = fetchBaseQuery({ baseUrl })
    return rawBaseQuery(args, WebApi, extraOptions)
}

const buttonApi = createApi({
    reducerPath: 'buttonApi',
    baseQuery: dynamicBaseQuery,
    refetchOnMountOrArgChange: true,
    tagTypes: ['buttons'],
    endpoints: (build) => ({
        getButtons: build.query<Button[], void>({
            query: () => 'itaskmenubuttons',
            providesTags: (result) =>
                result ? [
                    ...result.map(({ id }) => ({ type: 'buttons', id } as const)),
                    { type: 'buttons', id: 'list' }
                ] : [{ type: 'buttons', id: 'list' }],
            transformResponse: (response: { entities: ButtonModelType[] }) => response.entities.map(entity => {
                const menu = {
                    id: entity.id,
                    iTaskMenuId: {
                        value: entity.iTaskMenuId,
                        isChanged: false
                    },
                    taskPresetId: {
                        value: entity.taskPresetId,
                        isChanged: false
                    },
                    row: {
                        value: entity.row,
                        isChanged: false
                    },
                    column: {
                        value: entity.column,
                        isChanged: false
                    },
                    icon: {
                        value: entity.icon,
                        isChanged: false
                    },
                    buttonLabel: {
                        value: entity.buttonLabel,
                        isChanged: false
                    },
                    feedbackTime: {
                        value: entity.feedbackTime,
                        isChanged: false
                    },
                    isAllowUndo: {
                        value: entity.isAllowUndo,
                        isChanged: false
                    }
                } as Button
                return menu
            })
        })
    })
})

export const {
    useGetButtonsQuery
} = buttonApi

export default buttonApi
