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
        'inline-block text-md font-medium whitespace-nowrap text-gray-500 dark:text-white',
        className,
      )}
    />
  )
}

export const inputClassName =
  'dark:disabled:text-slate-500 px-4 w-full text-black disabled:text-gray-400 pt-2 pb-3 dark:text-white text-md font-medium bg-gray-100 dark:bg-transparent focus:border-transparent border-2 border-gray-500 rounded-lg'

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
