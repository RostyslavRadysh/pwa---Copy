import React, { FunctionComponent,
    useMemo } from 'react'
import type { ReactNode } from 'react'
import { Button } from '@/models/button'
import Ambulance from '@/icons/ambulance.svg'
import Ambulance2 from '@/icons/ambulance2.svg'
import Ambulance3 from '@/icons/ambulance3.svg'
import Arrow from '@/icons/arrow.svg'
import ArrowDown from '@/icons/arrowDown.svg'
import ArrowLeft from '@/icons/arrowLeft.svg'
import ArrowLeft2 from '@/icons/arrowLeft2.svg'
import ArrowLeft3 from '@/icons/arrowLeft3.svg'
import ArrowLeft4 from '@/icons/arrowLeft4.svg'
import ArrowRight from '@/icons/arrowRight.svg'
import ArrowRight2 from '@/icons/arrowRight2.svg'
import ArrowUp from '@/icons/arrowUp.svg'
import Bed from '@/icons/bed.svg'
import Bed2 from '@/icons/bed2.svg'
import Bin from '@/icons/bin.svg'
import Boy from '@/icons/boy.svg'
import Boy2 from '@/icons/boy2.svg'
import Calendar from '@/icons/calendar.svg'
import Case from '@/icons/case.svg'
import Case2 from '@/icons/case2.svg'
import Cleaning from '@/icons/cleaning.svg'
import Cleaning2 from '@/icons/cleaning2.svg'
import Cleaning3 from '@/icons/cleaning3.svg'
import Cleaning4 from '@/icons/cleaning4.svg'
import Cleaning5 from '@/icons/cleaning5.svg'
import Cleaning6 from '@/icons/cleaning6.svg'
import Cleaning7 from '@/icons/cleaning7.svg'
import Cleaning8 from '@/icons/cleaning8.svg'
import Cleaning9 from '@/icons/cleaning9.svg'
import Cleaning10 from '@/icons/cleaning10.svg'
import Cleaning11 from '@/icons/cleaning11.svg'
import Cleaning12 from '@/icons/cleaning12.svg'
import Cleaning13 from '@/icons/cleaning13.svg'
import Cleaning14 from '@/icons/cleaning14.svg'
import Cleaning15 from '@/icons/cleaning15.svg'
import Cleaning16 from '@/icons/cleaning16.svg'
import Clipboard from '@/icons/clipboard.svg'
import Clock from '@/icons/clock.svg'
import Close from '@/icons/close.svg'
import Cross from '@/icons/cross.svg'
import Delivery from '@/icons/delivery.svg'
import Distance from '@/icons/distance.svg'
import Download from '@/icons/download.svg'
import Download2 from '@/icons/download2.svg'
import Download3 from '@/icons/download3.svg'
import Drop from '@/icons/drop.svg'
import Envelope from '@/icons/envelope.svg'
import Hand from '@/icons/hand.svg'
import Hand2 from '@/icons/hand2.svg'
import Hand3 from '@/icons/hand3.svg'
import Hand4 from '@/icons/hand4.svg'
import Heart from '@/icons/heart.svg'
import Heart2 from '@/icons/heart2.svg'
import Heart3 from '@/icons/heart3.svg'
import Heart4 from '@/icons/heart4.svg'
import Heart5 from '@/icons/heart5.svg'
import Home from '@/icons/home.svg'
import Home2 from '@/icons/home2.svg'
import Hospital from '@/icons/hospital.svg'
import Hospital2 from '@/icons/hospital2.svg'
import Hospital3 from '@/icons/hospital3.svg'
import Hospital4 from '@/icons/hospital4.svg'
import Hospital5 from '@/icons/hospital5.svg'
import Hospital6 from '@/icons/hospital6.svg'
import Kitchen from '@/icons/kitchen.svg'
import Loading from '@/icons/loading.svg'
import Loading2 from '@/icons/loading2.svg'
import Location from '@/icons/location.svg'
import Lock from '@/icons/lock.svg'
import Lock2 from '@/icons/lock2.svg'
import Lungs from '@/icons/lungs.svg'
import Mask from '@/icons/mask.svg'
import Monitor from '@/icons/monitor.svg'
import Monitor2 from '@/icons/monitor2.svg'
import Nose from '@/icons/nose.svg'
import Nose2 from '@/icons/nose2.svg'
import Nurse from '@/icons/nurse.svg'
import Nurse2 from '@/icons/nurse2.svg'
import Nurse3 from '@/icons/nurse3.svg'
import Off from '@/icons/off.svg'
import Off2 from '@/icons/off2.svg'
import Ok from '@/icons/ok.svg'
import Ok2 from '@/icons/ok2.svg'
import Package from '@/icons/package.svg'
import Package2 from '@/icons/package2.svg'
import Paper from '@/icons/paper.svg'
import People from '@/icons/people.svg'
import Phone from '@/icons/phone.svg'
import Phone2 from '@/icons/phone2.svg'
import Phone3 from '@/icons/phone3.svg'
import Photo from '@/icons/photo.svg'
import Pills from '@/icons/pills.svg'
import Plunger from '@/icons/plunger.svg'
import Printer from '@/icons/printer.svg'
import Question from '@/icons/question.svg'
import Scan from '@/icons/scan.svg'
import Search from '@/icons/search.svg'
import Settings from '@/icons/settings.svg'
import Settings2 from '@/icons/settings2.svg'
import Share from '@/icons/share.svg'
import Stretcher from '@/icons/stretcher.svg'
import Transport from '@/icons/transport.svg'
import Transport2 from '@/icons/transport2.svg'
import Transport3 from '@/icons/transport3.svg'
import Transport4 from '@/icons/transport4.svg'
import Troley from '@/icons/troley.svg'
import Upload from '@/icons/upload.svg'
import Upload2 from '@/icons/upload2.svg'
import Upload3 from '@/icons/upload3.svg'
import Virus from '@/icons/virus.svg'
import Virus2 from '@/icons/virus2.svg'
import Virus3 from '@/icons/virus3.svg'
import Virus4 from '@/icons/virus4.svg'
import Virus5 from '@/icons/virus5.svg'
import Wheelchair from '@/icons/wheelchair.svg'
import Wheelchair2 from '@/icons/wheelchair2.svg'
import None from '@/icons/none.svg'



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
                        break
                    }
                    case 2: {
                        icon = <Ambulance2 />
                        break
                    }
                    case 3: {
                        icon = <Ambulance3 />
                        break
                    }
                    case 4: {
                        icon = <Arrow />
                        break
                    }
                    case 5: {
                        icon = <ArrowDown />
                        break
                    }
                    case 6: {
                        icon = <ArrowLeft />
                        break
                    }
                    case 7: {
                        icon = <ArrowLeft2 />
                        break
                    }
                    case 8: {
                        icon = <ArrowLeft3 />
                        break
                    }
                    case 9: {
                        icon = <ArrowLeft4 />
                        break
                    }
                    case 10: {
                        icon = <ArrowRight />
                        break
                    }
                    case 11: {
                        icon = <ArrowRight2 />
                        break
                    }
                    case 12: {
                        icon = <ArrowUp />
                        break
                    }
                    case 13: {
                        icon = <Bed />
                        break
                    }
                    case 14: {
                        icon = <Bed2 />
                        break
                    }
                    case 15: {
                        icon = <Bin />
                        break
                    }
                    case 16: {
                        icon = <Boy />
                        break
                    }
                    case 17: {
                        icon = <Boy2 />
                        break
                    }
                    case 18: {
                        icon = <Calendar />
                        break
                    }
                    case 19: {
                        icon = <Case />
                        break
                    }
                    case 20: {
                        icon = <Case2 />
                        break
                    }
                    case 21: {
                        icon = <Cleaning />
                        break
                    }
                    case 22: {
                        icon = <Cleaning2 />
                        break
                    }
                    case 23: {
                        icon = <Cleaning3 />
                        break
                    }
                    case 24: {
                        icon = <Cleaning4 />
                        break
                    }
                    case 25: {
                        icon = <Cleaning5 />
                        break
                    }
                    case 26: {
                        icon = <Cleaning6 />
                        break
                    }
                    case 27: {
                        icon = <Cleaning7 />
                        break
                    }
                    case 28: {
                        icon = <Cleaning8 />
                        break
                    }
                    case 29: {
                        icon = <Cleaning9 />
                        break
                    }
                    case 30: {
                        icon = <Cleaning10 />
                        break
                    }
                    case 31: {
                        icon = <Cleaning11 />
                        break
                    }
                    case 32: {
                        icon = <Cleaning12 />
                        break
                    }
                    case 33: {
                        icon = <Cleaning13 />
                        break
                    }
                    case 34: {
                        icon = <Cleaning14 />
                        break
                    }
                    case 35: {
                        icon = <Cleaning15 />
                        break
                    }
                    case 36: {
                        icon = <Cleaning16 />
                        break
                    }
                    case 37: {
                        icon = <Clipboard />
                        break
                    }
                    case 38: {
                        icon = <Clock />
                        break
                    }
                    case 39: {
                        icon = <Close />
                        break
                    }
                    case 40: {
                        icon = <Cross />
                        break
                    }
                    case 41: {
                        icon = <Delivery />
                        break
                    }
                    case 42: {
                        icon = <Distance />
                        break
                    }
                    case 43: {
                        icon = <Download />
                        break
                    }
                    case 44: {
                        icon = <Download2 />
                        break
                    }
                    case 45: {
                        icon = <Download3 />
                        break
                    }
                    case 46: {
                        icon = <Drop />
                        break
                    }
                    case 47: {
                        icon = <Envelope />
                        break
                    }
                    case 48: {
                        icon = <Hand />
                        break
                    }
                    case 49: {
                        icon = <Hand2 />
                        break
                    }
                    case 50: {
                        icon = <Hand3 />
                        break
                    }
                    case 51: {
                        icon = <Hand4 />
                        break
                    }
                    case 52: {
                        icon = <Heart />
                        break
                    }
                    case 53: {
                        icon = <Heart2 />
                        break
                    }
                    case 54: {
                        icon = <Heart3 />
                        break
                    }
                    case 55: {
                        icon = <Heart4 />
                        break
                    }
                    case 56: {
                        icon = <Heart5 />
                        break
                    }
                    case 57: {
                        icon = <Home />
                        break
                    }
                    case 58: {
                        icon = <Home2 />
                        break
                    }
                    case 59: {
                        icon = <Hospital />
                        break
                    }
                    case 60: {
                        icon = <Hospital2 />
                        break
                    }
                    case 61: {
                        icon = <Hospital3 />
                        break
                    }
                    case 62: {
                        icon = <Hospital4 />
                        break
                    }
                    case 63: {
                        icon = <Hospital5 />
                        break
                    }
                    case 64: {
                        icon = <Hospital6 />
                        break
                    }
                    case 65: {
                        icon = <Kitchen />
                        break
                    }
                    case 66: {
                        icon = <Loading />
                        break
                    }
                    case 67: {
                        icon = <Loading2 />
                        break
                    }
                    case 68: {
                        icon = <Location />
                        break
                    }
                    case 69: {
                        icon = <Lock />
                        break
                    }
                    case 70: {
                        icon = <Lock2 />
                        break
                    }
                    case 71: {
                        icon = <Lungs />
                        break
                    }
                    case 72: {
                        icon = <Mask />
                        break
                    }
                    case 73: {
                        icon = <Monitor />
                        break
                    }
                    case 74: {
                        icon = <Monitor2 />
                        break
                    }
                    case 75: {
                        icon = <Nose />
                        break
                    }
                    case 76: {
                        icon = <Nose2 />
                        break
                    }
                    case 77: {
                        icon = <Nurse />
                        break
                    }
                    case 78: {
                        icon = <Nurse2 />
                        break
                    }
                    case 79: {
                        icon = <Nurse3 />
                        break
                    }
                    case 80: {
                        icon = <Off />
                        break
                    }
                    case 81: {
                        icon = <Off2 />
                        break
                    }
                    case 82: {
                        icon = <Ok />
                        break
                    }
                    case 83: {
                        icon = <Ok2 />
                        break
                    }
                    case 84: {
                        icon = <Package />
                        break
                    }
                    case 85: {
                        icon = <Package2 />
                        break
                    }
                    case 86: {
                        icon = <Paper />
                        break
                    }
                    case 87: {
                        icon = <People />
                        break
                    }
                    case 88: {
                        icon = <Phone />
                        break
                    }
                    case 89: {
                        icon = <Phone2 />
                        break
                    }
                    case 90: {
                        icon = <Phone3 />
                        break
                    }
                    case 91: {
                        icon = <Photo />
                        break
                    }
                    case 92: {
                        icon = <Pills />
                        break
                    }
                    case 93: {
                        icon = <Plunger />
                        break
                    }
                    case 94: {
                        icon = <Printer />
                        break
                    }
                    case 95: {
                        icon = <Question />
                        break
                    }
                    case 96: {
                        icon = <Scan />
                        break
                    }
                    case 97: {
                        icon = <Search />
                        break
                    }
                    case 98: {
                        icon = <Settings />
                        break
                    }
                    case 99: {
                        icon = <Settings2 />
                        break
                    }
                    case 100: {
                        icon = <Share />
                        break
                    }
                    case 101: {
                        icon = <Stretcher />
                        break
                    }
                    case 102: {
                        icon = <Transport />
                        break
                    }
                    case 103: {
                        icon = <Transport2 />
                        break
                    }
                    case 104: {
                        icon = <Transport3 />
                        break
                    }
                    case 105: {
                        icon = <Transport4 />
                        break
                    }
                    case 106: {
                        icon = <Troley />
                        break
                    }
                    case 107: {
                        icon = <Upload />
                        break
                    }
                    case 108: {
                        icon = <Upload2 />
                        break
                    }
                    case 109: {
                        icon = <Upload3 />
                        break
                    }
                    case 110: {
                        icon = <Virus />
                        break
                    }
                    case 111: {
                        icon = <Virus2 />
                        break
                    }
                    case 112: {
                        icon = <Virus3 />
                        break
                    }
                    case 113: {
                        icon = <Virus4 />
                        break
                    }
                    case 114: {
                        icon = <Virus5 />
                        break
                    }
                    case 115: {
                        icon = <Wheelchair />
                        break
                    }
                    case 116: {
                        icon = <Wheelchair2 />
                        break
                    }
                    default: {
                        icon = <None />
                        break
                    }
                }

                divs.push(
                    <div key={column} className="relative w-full h-full">
                        <div className="flex justify-center items-center w-full h-full">
                            <div className="flex w-1/2 h-1/2 rounded shadow-md cursor-pointer"
                                style={{ backgroundColor: button.backgroundColor }}
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
