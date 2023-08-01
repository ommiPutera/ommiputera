import clsx from 'clsx'
import React from 'react'

type InputProps =
  | ({type: 'textarea'} & JSX.IntrinsicElements['textarea'])
  | JSX.IntrinsicElements['input']

function Label({className, ...labelProps}: JSX.IntrinsicElements['label']) {
  return (
    <label
      {...labelProps}
      className={clsx(
        'mb-1 inline-block whitespace-nowrap text-md font-medium text-gray-500 dark:text-gray-100',
        className,
      )}
    />
  )
}

export const inputClassName =
  'dark:disabled:text-slate-500 px-5 font-light tracking-wide w-full text-black disabled:text-gray-400 py-2.5 placeholder:text-md dark:text-white text-md bg-gray-100 dark:bg-transparent focus:border-transparent border border-gray-800 rounded-lg'

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  props,
  ref,
) {
  const className = clsx(inputClassName, props.className)

  if (props.type === 'textarea') {
    return (
      <textarea
        {...(props as JSX.IntrinsicElements['textarea'])}
        className={className}
      />
    )
  }

  return (
    <input
      {...(props as JSX.IntrinsicElements['input'])}
      className={className}
      ref={ref}
    />
  )
})

export {Label, Input}
