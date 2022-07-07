import { getCookie } from 'cookies-next'
import { 
    createApi, 
    fetchBaseQuery, 
    BaseQueryFn, 
    FetchArgs, 
    FetchBaseQueryError 
} from '@reduxjs/toolkit/query/react'
import Device from '@/models/device'

const dynamicBaseQuery: BaseQueryFn<string | FetchArgs,
  unknown,
  FetchBaseQueryError> = async (args, WebApi, extraOptions) => {
    const baseUrl = `${getCookie('webServiceUrl')}/api/`
    const rawBaseQuery = fetchBaseQuery({ baseUrl })
    return rawBaseQuery(args, WebApi, extraOptions)
}

const deviceApi = createApi({
    reducerPath: 'deviceApi',
    baseQuery: dynamicBaseQuery,
    refetchOnMountOrArgChange: true,
    tagTypes: ['devices'],
    endpoints: (build) => ({
        getDevices: build.query<{ entities: Device[] }, void>({
            query: () => 'itaskdevices',
            providesTags: (result) =>
                result ? [
                    ...result.entities.map(({ id }) => ({ type: 'devices', id } as const)),
                    { type: 'devices', id: 'LIST' }
                ] : [{ type: 'devices', id: 'LIST' }]
        }),
        addDevice: build.mutation<void, Partial<Device>>({
            query: (data) => {
                const { id, ...body } = data
                return {
                    url: 'itaskdevices',
                    method: 'POST',
                    body
                }
            },
            invalidatesTags: [{ type: 'devices', id: 'LIST' }]
        }),
        updateDevice: build.mutation<Device, Partial<Device>>({
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
                return [{ type: 'devices', id }]
            }
        }),
        deleteDevice: build.mutation<{ success: boolean; id: string }, { id: number }>({
            query(data) {
                return {
                    url: `itaskdevices`,
                    method: 'DELETE',
                    data
                }
            },
            invalidatesTags: (result) => {
                var id = result?.id
                return [{ type: 'devices', id }]
            }
        })
    })
})

export const {
    useAddDeviceMutation,
    useGetDevicesQuery,
    useUpdateDeviceMutation,
    useDeleteDeviceMutation
} = deviceApi

export default deviceApi
