import { 
    createApi, 
    fetchBaseQuery, 
    BaseQueryFn, 
    FetchArgs, 
    FetchBaseQueryError 
} from '@reduxjs/toolkit/query/react'
import { getCookie } from 'cookies-next'
import Device from '@/models/device'
import DeviceModelType from '@/models/deviceModelType'

const dynamicBaseQuery: BaseQueryFn<string | FetchArgs,
  unknown,
  FetchBaseQueryError> = async (args, WebApi, extraOptions) => {
    const baseUrl = `${getCookie('baseUrl')}/api/`
    const rawBaseQuery = fetchBaseQuery({ baseUrl })
    return rawBaseQuery(args, WebApi, extraOptions)
}

const deviceApi = createApi({
    reducerPath: 'deviceApi',
    baseQuery: dynamicBaseQuery,
    refetchOnMountOrArgChange: true,
    tagTypes: ['devices'],
    endpoints: (build) => ({
        getDevices: build.query<Device[], void>({
            query: () => 'itaskdevices',
            providesTags: (result) =>
                result ? [
                    ...result.map(({ id }) => ({ type: 'devices', id } as const)),
                    { type: 'devices', id: 'list' }
                ] : [{ type: 'devices', id: 'list' }],
            transformResponse: (response: { entities: DeviceModelType[] }) => response.entities.map(entity => {
                console.log('a', entity)
                const device = {
                    id: entity.id,
                    iTaskMenuId: {
                        value: entity.iTaskMenuId,
                        isChanged: false
                    },
                    departmentId: {
                        value: entity.departmentId,
                        isChanged: false
                    },
                    title: {
                        value: entity.title,
                        isChanged: false
                    },
                    key: {
                        value: entity.key,
                        isChanged: false
                    },
                    isPinCode: {
                        value: entity.isPinCode,
                        isChanged: false
                    },
                    pinCode: {
                        value: entity.pinCode,
                        isChanged: false
                    },
                    lastConnection: {
                        value: entity.lastConnection,
                        isChanged: false
                    }
                } as Device
                return device
            })
        }),
        addDevice: build.mutation<void, Partial<DeviceModelType>>({
            query: (data) => {
                const body = JSON.stringify(data)
                return {
                    url: 'itaskdevices',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body
                }
            },
            invalidatesTags: [{ type: 'devices', id: 'list' }]
        }),
        updateDevice: build.mutation<number, Partial<Device>>({
            query(data) {
                const body = JSON.stringify(data)
                return {
                    url: `itaskdevices`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'PATCH',
                    body
                }
            },
            invalidatesTags: (result) => {
                var id = result
                return [{ type: 'devices', id }]
            }
        }),
        deleteDevice: build.mutation<number, Partial<DeviceModelType>>({
            query(data) {
                const body = JSON.stringify(data)
                return {
                    url: `itaskdevices`,
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'DELETE',
                    body
                }
            },
            invalidatesTags: (result) => {
                var id = result
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
