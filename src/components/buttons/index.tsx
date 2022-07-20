import React, { FunctionComponent } from 'react'
import Image from 'next/image'

const buttons = ['button', 'submit'] as const
export type ButtonType = typeof buttons[number]

const icons = ['ambulance'] as const
export type IconType = typeof icons[number]

export interface ButtonProps {
  title?: string
  icon?: IconType
  type?: ButtonType
  onClick?: () => void
}

const Button: FunctionComponent<ButtonProps> = ({ title, icon, type, onClick }: ButtonProps) => (
  <div>
      <button
        className="inline-block 
        px-6 
        py-2.5 
        bg-blue-600 
        text-white 
        font-medium 
        text-sm
        leading-tight 
        rounded 
        shadow-md 
        hover:bg-blue-700 hover:shadow-lg 
        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 
        active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        type={type}
        onClick={onClick}>
          <div className="flex flex-col 
            text-white">
              {icon && (
                  <Image className="text-white" src="/icons/icons-ambulance.svg" alt="me" width="64" height="64" />
              )}
              {!icon && title && (
                  `${title}`
              )}
          </div>
      </button>
      <div className="flex flex-row 
          justify-center 
          text-lg">
          {icon && title && (
              `${title}`
          )}
      </div>
  </div>
)


Button.defaultProps = {
  type: 'button'
}

export default Button