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
                <label className="block text-gray-700 text-sm font-bold mb-2">{label}</label>
            )}
            <input
                className={`${error ? 'border-red-500' : ''} border shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                type={type}
                value={value}
                placeholder={placeholder}
                minLength={minLength}
                maxLength={maxLength}
                autoComplete={autoComplete}
                onBlur={() => setIsDirty(true)}
                onChange={event => setValue(event.currentTarget.value)} />
            {error && (
                <div className="mt-1 text-red-500 text-xs">{errorMessage}</div>
            )}
        </div>
    )
}

Input.defaultProps = {
    type: 'text',
    autoComplete: 'off'
}

export default Input