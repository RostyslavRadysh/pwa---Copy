import React, { FunctionComponent,
  useMemo
} from 'react'

const buttons = ['button', 'submit'] as const
export type ButtonType = typeof buttons[number]

const colors = ['blue', 'purple', 'white'] as const
export type ColorType = typeof colors[number]

export interface ButtonProps {
  title?: string
  type?: ButtonType
  color?: ColorType
  onClick?: () => void
}

const Button: FunctionComponent<ButtonProps> = ({ title, type, color, onClick }: ButtonProps) => {
  const styles = useMemo(() => {
    let css: string[] = []
    switch (color) {
      case 'blue': {
        css.push('bg-blue-600 hover:bg-blue-700 focus:bg-blue-700 active:bg-blue-800')
        break
      }
      case 'purple': {
        css.push('bg-purple-600 hover:bg-purple-700 focus:bg-purple-700 active:bg-purple-800')
        break
      }
      case 'white': {
        css.push('bg-gray-200 hover:bg-gray-400 focus:bg-gray-300 active:bg-gray-400')
        break
      }
      default: {
        throw new Error('ButtonComponent: The color is incorrect')
      }
    }
    return css
  }, [color])

  return (
    <div>
        <button className={`px-6 py-3 text-white font-medium text-sm leading-tight rounded shadow-md
          hover:shadow-lg 
          focus:shadow-lg focus:outline-none
          active:shadow-lg 
          ${styles.join(' ')}`}
          type={type}
          onClick={onClick}>
            {title}
        </button>
    </div>
  )
}

Button.defaultProps = {
  type: 'button',
  color: 'blue'
}

export default Button
