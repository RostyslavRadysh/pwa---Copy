import React, { FunctionComponent, useEffect, useState } from 'react'
import { useForm } from '@/providers/formContextProvider'

const inputs = ['text', 'email', 'password'] as const
export type InputType = typeof inputs[number]

const autoCompletes = ['on', 'off'] as const
export type AutoCompleteType = typeof autoCompletes[number]

export interface InputProps {
    type?: InputType
    label?: string
    defaultValue?: string
    placeholder?: string
    errorMessage?: string
    autoComplete?: AutoCompleteType
    required?: boolean
    minLength?: number
    maxLength?: number
    isUrl?: boolean
    onChange?: (value: string | undefined) => void
}

export const Input: FunctionComponent<InputProps> = ({ type, label, defaultValue, placeholder, errorMessage, autoComplete, required, minLength, maxLength, isUrl, onChange }: InputProps) => {
    const { isFormDirty } = useForm()
    const [error, setError] = useState<boolean>(false)
    const [isDirty, setIsDirty] = useState<boolean>(isFormDirty)
    const [value, setValue] = useState<string>(defaultValue ?? '')

    const isValidUrl = (text: string) => {
        try {
          const url = new URL(text)
          return url.protocol === 'http:' || url.protocol === 'https:'
        } catch (error: unknown) {
          return false
        }
    }

    useEffect(() => {
        if (isFormDirty && !isDirty) setIsDirty(true)
    }, [isFormDirty, isDirty])

    useEffect(() => {
        if (isDirty) {
            switch (true) {
                case isUrl && !isValidUrl(value):
                case required && value.length === 0:
                case minLength && value.length < minLength:
                case maxLength && value.length > maxLength: {
                    setError(true)
                    if (onChange) onChange(undefined)
                    break
                }
                default: {
                    setError(false)
                    if (onChange) onChange(value)
                    break
                }
            }
        }
    }, [value, isDirty, required, minLength, maxLength, isUrl, onChange])

    return (
        <div className="flex flex-col">
            {label && (
                <label className="inline-block mb-2 text-gray-700">{label}</label>
            )}
            <input
                className={`border border-solid ${error ? 'border-red-500' : 'border-gray-300'} block w-full px-3 py-1.5 font-normal  text-gray-700 bg-white bg-clip-padding rounded transition ease-in-out m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none`}
                type={type}
                value={value}
                placeholder={placeholder}
                minLength={minLength}
                maxLength={maxLength}
                autoComplete={autoComplete}
                onBlur={() => setIsDirty(true)}
                onChange={event => setValue(event.currentTarget.value)} />
            {error && (
                <div className="mt-1 text-xs text-red-500">{errorMessage}</div>
            )}
        </div>
    )
}

Input.defaultProps = {
    type: 'text',
    autoComplete: 'off'
}

export default Input
