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
        'group relative inline-flex w-full rounded-lg border-2 border-gray-500 font-medium ring-white focus:border-transparent focus:ring-[0.5px] disabled:text-gray-300',
        {
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
        'relative flex h-full w-full items-center justify-center whitespace-nowrap rounded-lg py-3',
        {
          'border-gray-200 group-disabled:border-gray-700':
            variant === 'primary',
          'text-xl': size === 'lg',
        },
      )}
    >
      {children}
    </div>
  )
}

export {Button}
