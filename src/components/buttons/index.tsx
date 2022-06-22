import React, { FunctionComponent, useMemo } from 'react'
import Image from 'next/image'

const buttons = ['button', 'submit'] as const
export type ButtonType = typeof buttons[number]

const colors = ['blue', 'red'] as const
export type ColorType = typeof colors[number]

const sizes = ['default', 'full'] as const
export type SizeType = typeof sizes[number]

const icons = ['ambulance'] as const
export type IconType = typeof icons[number]

export interface ButtonProps {
  title?: string
  icon?: IconType
  type?: ButtonType
  color?: ColorType
  size?: SizeType
  rounded?: boolean
  disabled?: boolean
  onClick?: () => void
}

const Button: FunctionComponent<ButtonProps> = ({ title, icon, type, color, size, rounded, disabled, onClick }: ButtonProps) => {
  const css = useMemo(() => {
    let newCss: string[] = []
    switch (color) {
      case 'blue': {
        newCss.push('bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300')
        break
      }
      case 'red': {
        newCss.push('bg-red-500 hover:bg-red-600 disabled:bg-red-300')
        break
      }
      default: { throw new Error('The color is incorrect') }
    }
    switch (size) {
        case 'default': {
            newCss.push('w-auto h-auto')
            break
        }
        case 'full': {
          newCss.push('w-full h-full')
          break
        }
        default: { throw new Error('The size is incorrect') }
      }
    if (rounded) newCss.push('rounded-md')
    return newCss
  }, [color, size, rounded])

  return (
    <div className={`${size === 'full' ? 'w-5/6 h-5/6' : 'w-auto h-auto'}`}>
        <button
        className={`px-4 py-2 text-lg font-light text-white uppercase disabled:cursor-not-allowed ${css.join(' ')}`}
        type={type}
        disabled={disabled}
        onClick={onClick}>
            <div className="flex flex-col text-white">
                {icon && (
                    <Image className="text-white" src="/icons/icons-ambulance.svg" alt="me" width="64" height="64" />
                )}
                {!icon && title && (
                    `${title}`
                )}
            </div>
        </button>
        <div className="flex flex-row justify-center text-lg">
            {icon && title && (
                `${title}`
            )}
        </div>
    </div>
  )
}


Button.defaultProps = {
  type: 'button',
  color: 'blue',
  size: 'default'
}

export default Button