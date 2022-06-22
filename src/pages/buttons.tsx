import React, { FunctionComponent } from 'react'
import { getCookie, removeCookies } from 'cookies-next'
import { useRouter } from 'next/router'
import MainLayout from '@/layouts/mains'
import Button from '@/components/buttons'
import ITaskDevice from '@/models/iTaskDevice'
import { 
    useGetITaskDevicesQuery,
    useDeleteITaskDeviceMutation 
} from '@/slicers/apis/iTaskDeviceApi'
import { useGetITaskMenuButtonsQuery } from '@/slicers/apis/iTaskMenuButtonApi'
import axios from 'axios'

const Buttons: FunctionComponent = () => {
    const router = useRouter()

    const { data: iTaskDevices } = useGetITaskDevicesQuery()
    const [deleteITaskDevice, { error }] = useDeleteITaskDeviceMutation()

    const { data: iTaskMenuButtons } = useGetITaskMenuButtonsQuery()

    const click = (itaskmenudi: number) => {
        console.log('a')
        const key = getCookie('key')
        var id = iTaskDevices?.entities.find(iTaskDevice => iTaskDevice.key === key)?.id
        const baseUrl = `${getCookie('webServiceUrl')}/api/task?iTaskDeviceId=${id}&iTaskMenuButtonId=${itaskmenudi}`
        const response = axios.get(baseUrl)
        console.log(response)
    }
    const settings = () => {
        router.push('/settings')
    }
    const exit = () => {
        const key = getCookie('key')
        const iTaskDevice = {
            id: iTaskDevices?.entities.find(iTaskDevice => iTaskDevice.key === key)?.id,
        } as ITaskDevice
        deleteITaskDevice(iTaskDevice)

        if(!error) {
            removeCookies('webServiceUrl')
            removeCookies('title')
            removeCookies('key')

            router.push('/')
        } 
    }

    return (
        <MainLayout>
            <div className="fixed flex justify-center items-center flex-col z-10 p-4 bg-white rounded-lg h-5/6 w-3/4 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="flex flex-row items-center justify-between pt-3 mb-6">
                <div className="text-lg text-left text-gray-900 dark:text-white">
                    {getCookie('title')}
                </div>
                <button
                    onClick={settings}
                    className="mx-4 outline-none cursor-pointer focus:outline-none flex-shrink-0">
                    S
                </button>
                <button
                    onClick={exit}
                    className="mx-4 outline-none cursor-pointer focus:outline-none flex-shrink-0">
                    X
                </button>
            </div>
            <div className="overflow-y-auto w-full h-full p-2">
            <table className="w-full h-full table-auto">
                    <tbody>
                        <tr className="py-4">
                            {iTaskMenuButtons?.entities.map((item, i) => {
                                return (
                                    <td className="px-4" key={i}>
                                        <Button
                                            title={item.buttonLabel.toString()}
                                            onClick={() => click(item.id)}
                                            size="full"
                                            type="submit"
                                            rounded />
                                    </td>
                            )})}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </MainLayout>
    )
}

export default Buttons