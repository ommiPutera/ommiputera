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
        'group relative inline-flex w-full rounded-lg border border-gray-500 font-medium ring-white focus:border-transparent focus:ring-[0.5px] disabled:text-gray-300',
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
        'relative flex h-full w-full items-center justify-center whitespace-nowrap hover:bg-gray-800',
        {
          'border-gray-200 group-disabled:border-gray-700':
            variant === 'primary',
          'px-4 py-2.5 text-sm rounded-lg': size === 'md',
          'px-8 py-3 text-md rounded-xl': size === 'lg',
        },
      )}
    >
      {children}
    </div>
  )
}

export { Button }
