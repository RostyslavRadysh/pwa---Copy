import { getCookie } from 'cookies-next'
import { 
    createApi, 
    fetchBaseQuery, 
    BaseQueryFn, 
    FetchArgs, 
    FetchBaseQueryError 
} from '@reduxjs/toolkit/query/react'
import ITaskDevice from '@/models/iTaskDevice'

const dynamicBaseQuery: BaseQueryFn<string | FetchArgs,
  unknown,
  FetchBaseQueryError> = async (args, WebApi, extraOptions) => {
    const baseUrl = `${getCookie('webServiceUrl')}/api/`
    const rawBaseQuery = fetchBaseQuery({ baseUrl })
    return rawBaseQuery(args, WebApi, extraOptions)
};

const iTaskDeviceApi = createApi({
    reducerPath: 'iTaskDeviceApi',
    baseQuery: dynamicBaseQuery,
    refetchOnMountOrArgChange: true,
    tagTypes: ['ITaskDevices'],
    endpoints: (build) => ({
        getITaskDevices: build.query<{ entities: ITaskDevice[] }, void>({
            query: () => 'itaskdevices',
            providesTags: (result) =>
                result ? [
                    ...result.entities.map(({ id }) => ({ type: 'ITaskDevices', id } as const)),
                    { type: 'ITaskDevices', id: 'LIST' }
                ] : [{ type: 'ITaskDevices', id: 'LIST' }]
        }),
        addITaskDevice: build.mutation<ITaskDevice, Partial<ITaskDevice>>({
            query: (data) => {
                const { id, ...body } = data
                return {
                    url: 'itaskdevices',
                    method: 'POST',
                    body
                }
            },
            invalidatesTags: [{ type: 'ITaskDevices', id: 'LIST' }]
        }),
        updateITaskDevice: build.mutation<ITaskDevice, Partial<ITaskDevice>>({
            query(data) {
                const body = JSON.stringify(data)
                return {
                    url: `itaskdevices`,
                    method: 'PATCH',
                    body
                }
            },
            invalidatesTags: (result) => {
                var id = result?.id
                return [{ type: 'ITaskDevices', id }]
            }
        }),
        deleteITaskDevice: build.mutation<{ success: boolean; id: string }, { id: number }>({
            query(data) {
                return {
                    url: `itaskdevices`,
                    method: 'DELETE',
                    data
                }
            },
            invalidatesTags: (result) => {
                var id = result?.id
                return [{ type: 'ITaskDevices', id }]
            }
        })
    })
})

export const {
    useAddITaskDeviceMutation,
    useGetITaskDevicesQuery,
    useUpdateITaskDeviceMutation,
    useDeleteITaskDeviceMutation
} = iTaskDeviceApi

export default iTaskDeviceApi
