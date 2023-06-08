import clsx from 'clsx'
import React from 'react'

interface IProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary'
  children: React.ReactNode | React.ReactNode[]
}

function Button({
  variant = 'primary',
  size = 'sm',
  children,
  className,
  ...props
}: IProps & JSX.IntrinsicElements['button']) {
  return (
    <button
      {...props}
      className={clsx(
        'relative group inline-flex w-full disabled:text-gray-300 rounded-xl font-medium', {
          'text-primary': variant === 'primary',
        },
        className,
      )}
    >
      <Inner variant={variant} size={size}>
        {children}
      </Inner>
    </button>
  )
}

function Inner({
  children,
  variant,
  size,
}: Pick<IProps, 'children' | 'variant' | 'size'>) {
  return (
    <div
      className={clsx(
        'focus-ring relative flex h-full w-full items-center justify-center whitespace-nowrap rounded-xl border-2 py-4',
        {
          'border-gray-200 group-disabled:border-gray-600': variant === 'primary',
          'text-xl': size === 'lg',
        },
      )}
    >
      {children}
    </div>
  )
}

export {Button}
