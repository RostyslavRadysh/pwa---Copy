import React, { FunctionComponent } from 'react'
import type { ReactNode } from 'react'
import { Button } from '@/models/button'
import Ambulance from '@/components/icons/ambulance'

export interface DataGridProps {
  rows: number
  columns: number
  buttons: Button[] | undefined
  onClick: (id: number) => void
}

const DataGrid: FunctionComponent<DataGridProps> = ({ rows, columns, buttons, onClick }: DataGridProps) => {
    let divs: ReactNode[] = []
    for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
            const button = buttons?.find(button => button.row === (row + 1) && button.column === (column + 1))
            if(button) {
                let icon: JSX.Element | undefined
                switch(button?.icon) {
                    case 1: {
                        icon = <Ambulance />
                    }
                }
                const hex = button.backgroundColor.substring(2)
                divs.push(
                    <div key={column} className="relative w-full h-full">
                        <div className="flex
                            justify-center 
                            items-center
                            w-full
                            h-full">
                            <div className={`flex 
                                w-1/2 
                                h-1/2
                                rounded
                                shadow-md
                                cursor-pointer
                                bg-[#${hex}]`}
                                onClick={() => onClick(button.id)}>
                                {button.icon === 0 && (
                                    <div className="relative w-full h-full">
                                        <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full">
                                            <div className="text-gray-900 text-xl leading-tight font-medium">
                                                {button.label}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {button.icon !== 0 && (
                                    <div className="relative w-full h-full">
                                        <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full">
                                            <div className="absolute w-1/2 fill-black">
                                                {icon}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        {button.icon !== 0 && button.label && (
                            <div className="absolute bottom-0 left-0 w-full h-2/6">
                                <div className="flex justify-center items-center w-full h-full">
                                    <div className=" text-gray-900 text-xl leading-tight font-medium">
                                        {button.label}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )
            }
            else divs.push(<div key={column}></div>)
        }
    }

    return (
        <div className={`grid grid-cols-${columns} gap-4 w-full h-full`}>
            {divs.map((div, index) => <div key={index}>{div}</div>)}
        </div>
    )
}

DataGrid.defaultProps = {
    rows: 0,
    columns: 0
}

export default DataGrid
