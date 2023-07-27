import clsx from 'clsx'
import React from 'react'

interface IProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'danger'
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
        'group relative inline-flex w-full border font-medium ring-white hover:bg-gray-100 disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-200 disabled:text-gray-700 disabled:hover:bg-gray-200',
        {
          'bg-white text-black': variant === 'primary',
          'border-red-300 bg-red-100 text-red-800 hover:bg-red-200 disabled:border-red-100':
            variant === 'danger',
          'rounded-md': size === 'sm',
          'rounded-lg': size === 'md' || size === 'lg',
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
        'relative flex h-full w-full items-center justify-center whitespace-nowrap',
        {
          'border-gray-200 group-disabled:border-gray-600':
            variant === 'primary',
          'border-red-200 group-disabled:border-red-700': variant === 'danger',
          'rounded-md px-3 pb-[5px] pt-1 text-md': size === 'sm',
          'rounded-md px-5 pb-2 pt-1.5 text-base': size === 'md',
          'rounded-lg px-8 py-3.5 text-lg': size === 'lg',
        },
      )}
    >
      {children}
    </div>
  )
}

export { Button }
