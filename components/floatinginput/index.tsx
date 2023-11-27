import React from 'react'
import { Input } from '../ui/input'
import { Label } from '@radix-ui/react-label'
import { cn } from "@/lib/utils"

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

const FloatingInput = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        console.log('floating input props', props)
        return (
            <div className="relative border border-black rounded-sm my-4">
                <Input
                    type={type}
                    className={cn(
                        "block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-red-500 rounded-sm border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
                <Label for="floating_outlined" className="absolute text-sm text-gray-800 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">{props.placeholder}</Label>
            </div>
        )
    });

FloatingInput.displayName = "Floating Input"

export { FloatingInput }
