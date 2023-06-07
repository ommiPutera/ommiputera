import clsx from "clsx"
import React from "react"

type InputProps =
  | ({ type: 'textarea' } & JSX.IntrinsicElements['textarea'])
  | JSX.IntrinsicElements['input']

function Label({ className, ...labelProps }: JSX.IntrinsicElements['label']) {
  return (
    <label
      {...labelProps}
      className={clsx(
        'inline-block text-lg text-gray-500 dark:text-slate-500',
        className,
      )}
    />
  )
}

export const inputClassName = 'border border-white bg-red-500'

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

export { Label, Input }