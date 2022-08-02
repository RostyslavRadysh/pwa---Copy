import React, { FunctionComponent } from 'react'
import type { PropsWithChildren } from 'react'

interface MainLayoutProps { }

const MainLayout: FunctionComponent<PropsWithChildren<MainLayoutProps>> = ({ children }: PropsWithChildren<MainLayoutProps>) => {
    return (
        <div>
            <div className='bg-gray-200 w-screen h-screen flex justify-center items-center'>
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                    <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Username
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" placeholder="Username" />
                    </div>
                    <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Password
                    </label>
                    <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" />
                    <p className="text-red-500 text-xs italic">Please choose a password.</p>
                    </div>
                    <div className="flex justify-center items-center">
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                        Sign In
                    </button>
                    </div>
                </form>
                <p className="text-center text-gray-500 text-xs">
                    Copyright &copy; 2001-2022 dir/Active. All rights reserved.
                </p>
            </div>
            </div>
            
        </div>
    )
}

export default MainLayout