import React, { FunctionComponent } from 'react'
import type { ReactNode } from 'react'
import { Button } from '@/models/button'

export interface DataGridProps {
  rows: number
  columns: number
  buttons: Button[] | undefined
  onClick: (id: number) => void
}

const DataGrid: FunctionComponent<DataGridProps> = ({ rows, columns, buttons, onClick }: DataGridProps) => {
    let trs: ReactNode[][] = []
    for (let row = 0; row < rows; row++) {
        let tds: ReactNode[] = []
        for (let column = 0; column < columns; column++) {
            const button = buttons?.find(button => button.row === (row + 1) && button.column === (column + 1))
            if(button) tds.push(<td key={column}>
                <div className="flex 
                    justify-center 
                    items-center 
                    w-full 
                    h-full">
                    <div className={`flex 
                        w-1/2 
                        h-1/2
                        justify-center 
                        items-center
                        rounded
                        shadow-md
                        cursor-pointer
                        bg-[#${button.backgroundColor}`}
                        onClick={() => onClick(button.id)}>
                        <h5 className="text-gray-900 
                            text-xl 
                            leading-tight 
                            font-medium">{button.label}</h5>
                    </div>
                </div>
            </td>)
            else tds.push(<td key={column}></td>)
        }
        trs.push(tds)
    }

    return (
        <table className="table-fixed 
            w-full 
            h-full">
            <tbody>
                    {trs.map((tr, index) => <tr key={index}>{tr}</tr>)}
            </tbody>
        </table>
    )
}

DataGrid.defaultProps = {
    rows: 0,
    columns: 0
}

export default DataGrid
