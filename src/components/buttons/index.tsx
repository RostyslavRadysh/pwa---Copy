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
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type={type}
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


Button.defaultProps = {
  type: 'button'
}

export default Button