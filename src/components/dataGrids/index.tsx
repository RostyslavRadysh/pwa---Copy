import React, { FunctionComponent,
    useMemo } from 'react'
import type { ReactNode } from 'react'
import { Button } from '@/models/button'
import Icon0 from '@/icons/icon-0.svg'
import Icon1 from '@/icons/icon-1.svg'
import Icon2 from '@/icons/icon-2.svg'
import Icon3 from '@/icons/icon-3.svg'
import Icon4 from '@/icons/icon-4.svg'
import Icon5 from '@/icons/icon-5.svg'
import Icon6 from '@/icons/icon-6.svg'
import Icon7 from '@/icons/icon-7.svg'
import Icon8 from '@/icons/icon-8.svg'
import Icon9 from '@/icons/icon-9.svg'
import Icon10 from '@/icons/icon-10.svg'
import Icon11 from '@/icons/icon-11.svg'
import Icon12 from '@/icons/icon-12.svg'
import Icon13 from '@/icons/icon-13.svg'
import Icon14 from '@/icons/icon-14.svg'
import Icon15 from '@/icons/icon-15.svg'
import Icon16 from '@/icons/icon-16.svg'
import Icon17 from '@/icons/icon-17.svg'
import Icon18 from '@/icons/icon-18.svg'
import Icon19 from '@/icons/icon-19.svg'
import Icon20 from '@/icons/icon-20.svg'
import Icon21 from '@/icons/icon-21.svg'
import Icon22 from '@/icons/icon-22.svg'
import Icon23 from '@/icons/icon-23.svg'
import Icon24 from '@/icons/icon-24.svg'
import Icon25 from '@/icons/icon-25.svg'
import Icon26 from '@/icons/icon-26.svg'
import Icon27 from '@/icons/icon-27.svg'
import Icon28 from '@/icons/icon-28.svg'
import Icon29 from '@/icons/icon-29.svg'
import Icon30 from '@/icons/icon-30.svg'
import Icon31 from '@/icons/icon-31.svg'
import Icon32 from '@/icons/icon-32.svg'
import Icon33 from '@/icons/icon-33.svg'
import Icon34 from '@/icons/icon-34.svg'
import Icon35 from '@/icons/icon-35.svg'
import Icon36 from '@/icons/icon-36.svg'
import Icon37 from '@/icons/icon-37.svg'
import Icon38 from '@/icons/icon-38.svg'
import Icon39 from '@/icons/icon-39.svg'
import Icon40 from '@/icons/icon-40.svg'
import Icon41 from '@/icons/icon-41.svg'
import Icon42 from '@/icons/icon-42.svg'
import Icon43 from '@/icons/icon-43.svg'
import Icon44 from '@/icons/icon-44.svg'
import Icon45 from '@/icons/icon-45.svg'
import Icon46 from '@/icons/icon-46.svg'
import Icon47 from '@/icons/icon-47.svg'
import Icon48 from '@/icons/icon-48.svg'
import Icon49 from '@/icons/icon-49.svg'
import Icon50 from '@/icons/icon-50.svg'
import Icon51 from '@/icons/icon-51.svg'
import Icon52 from '@/icons/icon-52.svg'
import Icon53 from '@/icons/icon-53.svg'
import Icon54 from '@/icons/icon-54.svg'
import Icon55 from '@/icons/icon-55.svg'
import Icon56 from '@/icons/icon-56.svg'
import Icon57 from '@/icons/icon-57.svg'
import Icon58 from '@/icons/icon-58.svg'
import Icon59 from '@/icons/icon-59.svg'
import Icon60 from '@/icons/icon-60.svg'
import Icon61 from '@/icons/icon-61.svg'
import Icon62 from '@/icons/icon-62.svg'
import Icon63 from '@/icons/icon-63.svg'
import Icon64 from '@/icons/icon-64.svg'
import Icon65 from '@/icons/icon-65.svg'
import Icon66 from '@/icons/icon-66.svg'
import Icon67 from '@/icons/icon-67.svg'
import Icon68 from '@/icons/icon-68.svg'
import Icon69 from '@/icons/icon-69.svg'
import Icon70 from '@/icons/icon-70.svg'
import Icon71 from '@/icons/icon-71.svg'
import Icon72 from '@/icons/icon-72.svg'
import Icon73 from '@/icons/icon-73.svg'
import Icon74 from '@/icons/icon-74.svg'
import Icon75 from '@/icons/icon-75.svg'
import Icon76 from '@/icons/icon-76.svg'
import Icon77 from '@/icons/icon-77.svg'
import Icon78 from '@/icons/icon-78.svg'
import Icon79 from '@/icons/icon-79.svg'
import Icon80 from '@/icons/icon-80.svg'
import Icon81 from '@/icons/icon-81.svg'
import Icon82 from '@/icons/icon-82.svg'
import Icon83 from '@/icons/icon-83.svg'
import Icon84 from '@/icons/icon-84.svg'
import Icon85 from '@/icons/icon-85.svg'
import Icon86 from '@/icons/icon-86.svg'
import Icon87 from '@/icons/icon-87.svg'
import Icon88 from '@/icons/icon-88.svg'
import Icon89 from '@/icons/icon-89.svg'
import Icon90 from '@/icons/icon-90.svg'
import Icon91 from '@/icons/icon-91.svg'
import Icon92 from '@/icons/icon-92.svg'
import Icon93 from '@/icons/icon-93.svg'
import Icon94 from '@/icons/icon-94.svg'
import Icon95 from '@/icons/icon-95.svg'
import Icon96 from '@/icons/icon-96.svg'
import Icon97 from '@/icons/icon-97.svg'
import Icon98 from '@/icons/icon-98.svg'
import Icon99 from '@/icons/icon-99.svg'
import Icon100 from '@/icons/icon-100.svg'
import Icon101 from '@/icons/icon-101.svg'
import Icon102 from '@/icons/icon-102.svg'
import Icon103 from '@/icons/icon-103.svg'
import Icon104 from '@/icons/icon-104.svg'
import Icon105 from '@/icons/icon-105.svg'
import Icon106 from '@/icons/icon-106.svg'
import Icon107 from '@/icons/icon-107.svg'
import Icon108 from '@/icons/icon-108.svg'
import Icon109 from '@/icons/icon-109.svg'
import Icon110 from '@/icons/icon-110.svg'
import Icon111 from '@/icons/icon-111.svg'
import Icon112 from '@/icons/icon-112.svg'
import Icon113 from '@/icons/icon-113.svg'
import Icon114 from '@/icons/icon-114.svg'
import Icon115 from '@/icons/icon-115.svg'
import Icon116 from '@/icons/icon-116.svg'
import Icon117 from '@/icons/icon-117.svg'
import Icon118 from '@/icons/icon-118.svg'
import Icon119 from '@/icons/icon-119.svg'
import Icon120 from '@/icons/icon-120.svg'
import Icon121 from '@/icons/icon-121.svg'
import Icon122 from '@/icons/icon-122.svg'
import Icon123 from '@/icons/icon-123.svg'
import Icon124 from '@/icons/icon-124.svg'
import Icon125 from '@/icons/icon-125.svg'
import Icon126 from '@/icons/icon-126.svg'
import Icon127 from '@/icons/icon-127.svg'


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
                        icon = <Icon1 />
                        break
                    }
                    case 2: {
                        icon = <Icon2 />
                        break
                    }
                    case 3: {
                        icon = <Icon3 />
                        break
                    }
                    case 4: {
                        icon = <Icon4 />
                        break
                    }
                    case 5: {
                        icon = <Icon5 />
                        break
                    }
                    case 6: {
                        icon = <Icon6 />
                        break
                    }
                    case 7: {
                        icon = <Icon7 />
                        break
                    }
                    case 8: {
                        icon = <Icon8 />
                        break
                    }
                    case 9: {
                        icon = <Icon9 />
                        break
                    }
                    case 10: {
                        icon = <Icon10 />
                        break
                    }
                    case 11: {
                        icon = <Icon11 />
                        break
                    }
                    case 12: {
                        icon = <Icon12 />
                        break
                    }
                    case 13: {
                        icon = <Icon13 />
                        break
                    }
                    case 14: {
                        icon = <Icon14 />
                        break
                    }
                    case 15: {
                        icon = <Icon15 />
                        break
                    }
                    case 16: {
                        icon = <Icon16 />
                        break
                    }
                    case 17: {
                        icon = <Icon17 />
                        break
                    }
                    case 18: {
                        icon = <Icon18 />
                        break
                    }
                    case 19: {
                        icon = <Icon19 />
                        break
                    }
                    case 20: {
                        icon = <Icon20 />
                        break
                    }
                    case 21: {
                        icon = <Icon21 />
                        break
                    }
                    case 22: {
                        icon = <Icon22 />
                        break
                    }
                    case 23: {
                        icon = <Icon23 />
                        break
                    }
                    case 24: {
                        icon = <Icon24 />
                        break
                    }
                    case 25: {
                        icon = <Icon25 />
                        break
                    }
                    case 26: {
                        icon = <Icon26 />
                        break
                    }
                    case 27: {
                        icon = <Icon27 />
                        break
                    }
                    case 28: {
                        icon = <Icon28 />
                        break
                    }
                    case 29: {
                        icon = <Icon29 />
                        break
                    }
                    case 30: {
                        icon = <Icon30 />
                        break
                    }
                    case 31: {
                        icon = <Icon31 />
                        break
                    }
                    case 32: {
                        icon = <Icon32 />
                        break
                    }
                    case 33: {
                        icon = <Icon33 />
                        break
                    }
                    case 34: {
                        icon = <Icon34 />
                        break
                    }
                    case 35: {
                        icon = <Icon35 />
                        break
                    }
                    case 36: {
                        icon = <Icon36 />
                        break
                    }
                    case 37: {
                        icon = <Icon37 />
                        break
                    }
                    case 38: {
                        icon = <Icon38 />
                        break
                    }
                    case 39: {
                        icon = <Icon39 />
                        break
                    }
                    case 40: {
                        icon = <Icon40 />
                        break
                    }
                    case 41: {
                        icon = <Icon41 />
                        break
                    }
                    case 42: {
                        icon = <Icon42 />
                        break
                    }
                    case 43: {
                        icon = <Icon43 />
                        break
                    }
                    case 44: {
                        icon = <Icon44 />
                        break
                    }
                    case 45: {
                        icon = <Icon45 />
                        break
                    }
                    case 46: {
                        icon = <Icon46 />
                        break
                    }
                    case 47: {
                        icon = <Icon47 />
                        break
                    }
                    case 48: {
                        icon = <Icon48 />
                        break
                    }
                    case 49: {
                        icon = <Icon49 />
                        break
                    }
                    case 50: {
                        icon = <Icon50 />
                        break
                    }
                    case 51: {
                        icon = <Icon51 />
                        break
                    }
                    case 52: {
                        icon = <Icon52 />
                        break
                    }
                    case 53: {
                        icon = <Icon53 />
                        break
                    }
                    case 54: {
                        icon = <Icon54 />
                        break
                    }
                    case 55: {
                        icon = <Icon55 />
                        break
                    }
                    case 56: {
                        icon = <Icon56 />
                        break
                    }
                    case 57: {
                        icon = <Icon57 />
                        break
                    }
                    case 58: {
                        icon = <Icon58 />
                        break
                    }
                    case 59: {
                        icon = <Icon59 />
                        break
                    }
                    case 60: {
                        icon = <Icon60 />
                        break
                    }
                    case 61: {
                        icon = <Icon61 />
                        break
                    }
                    case 62: {
                        icon = <Icon62 />
                        break
                    }
                    case 63: {
                        icon = <Icon63 />
                        break
                    }
                    case 64: {
                        icon = <Icon64 />
                        break
                    }
                    case 65: {
                        icon = <Icon65 />
                        break
                    }
                    case 66: {
                        icon = <Icon66 />
                        break
                    }
                    case 67: {
                        icon = <Icon67 />
                        break
                    }
                    case 68: {
                        icon = <Icon68 />
                        break
                    }
                    case 69: {
                        icon = <Icon69 />
                        break
                    }
                    case 70: {
                        icon = <Icon70 />
                        break
                    }
                    case 71: {
                        icon = <Icon71 />
                        break
                    }
                    case 72: {
                        icon = <Icon72 />
                        break
                    }
                    case 73: {
                        icon = <Icon73 />
                        break
                    }
                    case 74: {
                        icon = <Icon74 />
                        break
                    }
                    case 75: {
                        icon = <Icon75 />
                        break
                    }
                    case 76: {
                        icon = <Icon76 />
                        break
                    }
                    case 77: {
                        icon = <Icon77 />
                        break
                    }
                    case 78: {
                        icon = <Icon78 />
                        break
                    }
                    case 79: {
                        icon = <Icon79 />
                        break
                    }
                    case 80: {
                        icon = <Icon80 />
                        break
                    }
                    case 81: {
                        icon = <Icon81 />
                        break
                    }
                    case 82: {
                        icon = <Icon82 />
                        break
                    }
                    case 83: {
                        icon = <Icon83 />
                        break
                    }
                    case 84: {
                        icon = <Icon84 />
                        break
                    }
                    case 85: {
                        icon = <Icon85 />
                        break
                    }
                    case 86: {
                        icon = <Icon86 />
                        break
                    }
                    case 87: {
                        icon = <Icon87 />
                        break
                    }
                    case 88: {
                        icon = <Icon88 />
                        break
                    }
                    case 89: {
                        icon = <Icon89 />
                        break
                    }
                    case 90: {
                        icon = <Icon90 />
                        break
                    }
                    case 91: {
                        icon = <Icon91 />
                        break
                    }
                    case 92: {
                        icon = <Icon92 />
                        break
                    }
                    case 93: {
                        icon = <Icon93 />
                        break
                    }
                    case 94: {
                        icon = <Icon94 />
                        break
                    }
                    case 95: {
                        icon = <Icon95 />
                        break
                    }
                    case 96: {
                        icon = <Icon96 />
                        break
                    }
                    case 97: {
                        icon = <Icon97 />
                        break
                    }
                    case 98: {
                        icon = <Icon98 />
                        break
                    }
                    case 99: {
                        icon = <Icon99 />
                        break
                    }
                    case 100: {
                        icon = <Icon100 />
                        break
                    }
                    case 101: {
                        icon = <Icon101 />
                        break
                    }
                    case 102: {
                        icon = <Icon102 />
                        break
                    }
                    case 103: {
                        icon = <Icon103 />
                        break
                    }
                    case 104: {
                        icon = <Icon104 />
                        break
                    }
                    case 105: {
                        icon = <Icon105 />
                        break
                    }
                    case 106: {
                        icon = <Icon106 />
                        break
                    }
                    case 107: {
                        icon = <Icon107 />
                        break
                    }
                    case 108: {
                        icon = <Icon108 />
                        break
                    }
                    case 109: {
                        icon = <Icon109 />
                        break
                    }
                    case 110: {
                        icon = <Icon110 />
                        break
                    }
                    case 111: {
                        icon = <Icon111 />
                        break
                    }
                    case 112: {
                        icon = <Icon112 />
                        break
                    }
                    case 113: {
                        icon = <Icon113 />
                        break
                    }
                    case 114: {
                        icon = <Icon114 />
                        break
                    }
                    case 115: {
                        icon = <Icon115 />
                        break
                    }
                    case 116: {
                        icon = <Icon116 />
                        break
                    }
                    case 117: {
                        icon = <Icon117 />
                        break
                    }
                    case 118: {
                        icon = <Icon118 />
                        break
                    }
                    case 119: {
                        icon = <Icon119 />
                        break
                    }
                    case 120: {
                        icon = <Icon120 />
                        break
                    }
                    case 121: {
                        icon = <Icon121 />
                        break
                    }
                    case 122: {
                        icon = <Icon122 />
                        break
                    }
                    case 123: {
                        icon = <Icon123 />
                        break
                    }
                    case 124: {
                        icon = <Icon124 />
                        break
                    }
                    case 125: {
                        icon = <Icon125 />
                        break
                    }
                    case 126: {
                        icon = <Icon126 />
                        break
                    }
                    case 127: {
                        icon = <Icon127 />
                        break
                    }
                    default: {
                        icon = <Icon0 />
                        break
                    }
                }

                divs.push(
                    <div key={column} className="relative w-full h-full">
                        <div className="flex justify-center items-center w-full h-full z-10">
                            <div className="flex w-1/2 h-1/2 rounded shadow-md cursor-pointer"
                                style={{ backgroundColor: button.backgroundColor }}
                                onClick={() => onClick(button.id)}>
                                {button.icon === 0 && (
                                    <div className="relative w-full h-full">
                                        <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full">
                                            <div className="text-gray-900 text-xl leading-tight font-medium truncate">
                                                {button.label}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {button.icon !== 0 && (
                                    <div className="relative w-full h-full z-0">
                                        <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full">
                                            <div className="absolute w-1/2"
                                                style={{ fill: button.iconColor }}>
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
                                    <div className=" text-gray-900 text-xl leading-tight font-medium truncate w-1/2 text-center">
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

    const styles = useMemo(() => {
        let css: string[] = []
        switch (columns) {
            case 1: {
                css.push('grid grid-cols-1 gap-4')
                break
            }
            case 2: {
                css.push('grid grid-cols-2 gap-4')
                break
            }
            case 3: {
                css.push('grid grid-cols-3 gap-4')
                break
            }
            case 4: {
                css.push('grid grid-cols-4 gap-4')
                break
            }
            case 5: {
                css.push('grid grid-cols-5 gap-4')
                break
            }
            case 6: {
                css.push('grid grid-cols-6 gap-4')
                break
            }
            case 7: {
                css.push('grid grid-cols-7 gap-4')
                break
            }
            case 8: {
                css.push('grid grid-cols-8 gap-4')
                break
            }
            case 9: {
                css.push('grid grid-cols-9 gap-4')
                break
            }
            case 10: {
                css.push('grid grid-cols-10 gap-4')
                break
            }
            case 11: {
                css.push('grid grid-cols-11 gap-4')
                break
            }
            case 12: {
                css.push('grid grid-cols-12 gap-4')
                break
            }
            default: { 
                break
            }
        }
        return css
    }, [columns])

    return (
        <div className={`w-full h-full ${styles.join(' ')}`}>
            {divs.map((div, index) => <div key={index}>{div}</div>)}
        </div>
    )
}

DataGrid.defaultProps = {
    rows: 0,
    columns: 0
}

export default DataGrid
