import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import React, { FunctionComponent,
    useState,
    useEffect } from 'react'
import { getCookie } from 'cookies-next'
import axios from 'axios'
import { withAuth } from '@/utils/auth'
import type { GetDevicesResponse } from '@/models/getDevicesResponse'
import type { GetButtonsResponse } from '@/models/getButtonsResponse'
import type { GetMenusResponse } from '@/models/getMenusResponse'
import type { PutDeviceRequest } from '@/models/putDeviceRequest'

const Index: FunctionComponent = () => {
    const router = useRouter()

    const [devices, setDevices] = useState<GetDevicesResponse>()
    const [buttons, setButtons] = useState<GetButtonsResponse>()
    const [menus, setMenus] = useState<GetMenusResponse>()

    const key = Number(getCookie('key'))
    const device = devices?.entities.find(device => device.id === key)
    const menu = menus?.entities.find(menu => menu.id === device?.iTaskMenuId)
    const filteredButtons = buttons?.entities.filter(button => button.iTaskMenuId === menu?.id)

    useEffect(() => {
        let timer = setTimeout(async () => {
            if ('wakeLock' in navigator) {
                await navigator.wakeLock.request('screen');
            }

            const baseUrl = `${getCookie('baseUrl')}`

            const { data: devices } = await axios.get<GetDevicesResponse>(`${baseUrl}/api/itaskdevices`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })
            const { data: buttons } = await axios.get<GetButtonsResponse>(`${baseUrl}/api/itaskmenubuttons`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })
            const { data: menus } = await axios.get<GetMenusResponse>(`${baseUrl}/api/itaskmenus`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })
            
            setDevices(devices)
            setButtons(buttons)
            setMenus(menus)
        }, 1000)
    
        return () => {
            clearTimeout(timer)
        }
    }, [])

    useEffect(() => {
        let timer = setInterval(async () => {
            const baseUrl = `${getCookie('baseUrl')}`

            const date = (new Date()).toJSON()
            await axios.patch<number>(`${baseUrl}/api/itaskdevices`, {
                id: device?.id,
                iTaskMenuId: {
                    value: device?.iTaskMenuId,
                    isChanged: false
                },
                departmentId: {
                    value: device?.departmentId,
                    isChanged: false
                },
                title: {
                    value: device?.title,
                    isChanged: false
                },
                isPinCode: {
                    value: device?.isPinCode,
                    isChanged: false
                },
                pinCode: {
                    value: device?.pinCode,
                    isChanged: false
                },
                lastConnection: {
                    value: date,
                    isChanged: true
                }
            } as PutDeviceRequest, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })

            const { data: devices } = await axios.get<GetDevicesResponse>(`${baseUrl}/api/itaskdevices`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })
            const { data: buttons } = await axios.get<GetButtonsResponse>(`${baseUrl}/api/itaskmenubuttons`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })
            const { data: menus } = await axios.get<GetMenusResponse>(`${baseUrl}/api/itaskmenus`, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                }
            })
            
            setDevices(devices)
            setButtons(buttons)
            setMenus(menus)
        }, 10000)
    
        return () => {
            clearInterval(timer)
        }
    }, [])

    const createTask = async (buttonId: number) => {
        const baseUrl = `${getCookie('baseUrl')}`

        const date = (new Date()).toJSON()
        await axios.patch<number>(`${baseUrl}/api/itaskdevices`, {
            id: device?.id,
            iTaskMenuId: {
                value: device?.iTaskMenuId,
                isChanged: false
            },
            departmentId: {
                value: device?.departmentId,
                isChanged: false
            },
            title: {
                value: device?.title,
                isChanged: false
            },
            isPinCode: {
                value: device?.isPinCode,
                isChanged: false
            },
            pinCode: {
                value: device?.pinCode,
                isChanged: false
            },
            lastConnection: {
                value: date,
                isChanged: true
            }
        } as PutDeviceRequest, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })

        const { data: devices } = await axios.get<GetDevicesResponse>(`${baseUrl}/api/itaskdevices`, {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        })
        
        setDevices(devices)

        await axios.get(`${baseUrl}/api/tasks?iTaskDeviceId=${device?.id}&iTaskMenuButtonId=${buttonId}`)
    }

    return (
        <div className="w-screen h-screen">
            <nav className="navbar navbar-expand-lg shadow-md py-2 bg-white relative flex items-center w-full justify-between">
            <div className="px-6 w-full flex flex-wrap items-center justify-between">
                <div className="navbar-collapse collapse grow items-center" id="navbarSupportedContentY">
                <ul className="navbar-nav mr-auto lg:flex lg:flex-row">
                    <li className="nav-item">
                        <button className="nav-link block pr-2 lg:px-2 py-2 text-gray-600 hover:text-gray-700 focus:text-gray-700 transition duration-150 ease-in-out" onClick={() => router.push('/settings')}>Settings</button>
                    </li>
                </ul>
                </div>
            </div>
            </nav>
        
            <div className="text-center w-full h-full bg-white text-gray-800 p-6">
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">{key}</h1>

            <table className="w-full h-full table-auto">
                    <tbody>
                        <tr>
                            {filteredButtons?.map((filteredButton, j) => {
                                return (
                                    <td className="w-12 h-6"
                                        key={j}>
                                            <button className="inline-block px-3 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out" onClick={() => createTask(filteredButton.id)}>{filteredButton.buttonLabel}</button>
                                    </td>
                                )
                            })}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Index

export const getServerSideProps: GetServerSideProps = withAuth
