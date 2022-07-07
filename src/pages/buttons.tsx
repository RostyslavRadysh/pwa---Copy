import React, { FunctionComponent } from 'react'
import { useRouter } from 'next/router'
import { getCookie, removeCookies } from 'cookies-next'
import { connector } from '@/utils/propsRedux'
import { useToast } from '@/providers/toastContextProvider'
import { 
    useGetDevicesQuery,
    useDeleteDeviceMutation 
} from '@/slicers/apis/deviceApi'
import { useGetITaskMenusQuery } from '@/slicers/apis/iTaskMenuApi'
import { useGetITaskMenuButtonsQuery } from '@/slicers/apis/iTaskMenuButtonApi'
import axios from 'axios'
import ITaskMenuButton from '@/models/iTaskMenuButton'


const Buttons:  FunctionComponent = () => {
    const { notify } = useToast()
    const router = useRouter()

    const { data: iTaskDevices, refetch: refreshDevices } = useGetDevicesQuery()
    const [deleteDevice] = useDeleteDeviceMutation()

    const { data: iTaskMenus, refetch: refreshITaskMenus } = useGetITaskMenusQuery()

    const { data: iTaskMenuButtons, refetch: refreshITaskMenuButtons } = useGetITaskMenuButtonsQuery()

    const title = getCookie('title')
    var device = iTaskDevices?.entities.find(item => item.title === title)
    var menu = iTaskMenus?.entities.find(item => item.id === device?.iTaskMenuId)
    var buttons = iTaskMenuButtons?.entities.filter(item => item.iTaskMenuId === menu?.id)

    const onHandleRefresh = () => {
        refreshDevices()
        refreshITaskMenus()
        refreshITaskMenuButtons()
    }

    const onHandleCreateTask = (buttonId: number) => {
        const baseUrl = `${getCookie('webServiceUrl')}/api/tasks?iTaskDeviceId=${device?.id}&iTaskMenuButtonId=${buttonId}`
        axios.get(baseUrl)
    }
    const onHandleRemoveDevice = () => {
        var result = deleteDevice({
            id: device?.id as number
        })

        if ('error' in result) {
            notify('Something bad happened')
        } else {
            removeCookies('webServiceUrl')
            removeCookies('title')
            router.push('/')
        }
    }

    var items: ITaskMenuButton[][] = [[]]
    for(var index = 0; index < (menu?.rows ?? 0); index++) {
        const filteredItems = buttons?.filter(item => item.row == (index + 1))
        if(filteredItems) items.push(filteredItems)
    }
    items = items.slice(1)

    console.log(items)
    return (
        <div className="w-screen h-screen">
            <nav className="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
              <div className="px-6 w-full flex flex-wrap items-center justify-between">
                <div className="navbar-collapse collapse grow items-center" id="navbarSupportedContentY">
                  <ul className="navbar-nav mr-auto lg:flex lg:flex-row">
                    <li className="nav-item">
                      <a className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out" href="#!" data-mdb-ripple="true" data-mdb-ripple-color="light" onClick={onHandleRefresh}>Refresh</a>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center lg:ml-auto">
                  <button type="button" className="inline-block px-6 py-2.5 mr-2 bg-transparent text-blue-600 font-medium text-xs leading-tight uppercase rounded hover:text-blue-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none focus:ring-0 active:bg-gray-200 transition duration-150 ease-in-out">Settings</button>
                  <button type="button" className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={onHandleRemoveDevice}>Exit</button>
                </div>
              </div>
            </nav>
        
            <div className="text-center w-full h-full bg-white text-gray-800 p-6">
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">{title}</h1>

              <table className="w-full h-full table-auto">
                    <tbody>
                        {items.map((row, i) => {
                            return (
                                <tr key={i}>
                                    {row.map((column, j) => {
                                        return (
                                            <td className="w-12 h-6"
                                                key={j}>
                                                    <button className="inline-block px-3 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => onHandleCreateTask(column.id as number)}>{column.buttonLabel as string}</button>
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default connector(Buttons)
