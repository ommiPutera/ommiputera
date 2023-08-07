import clsx from 'clsx'
import React from 'react'
import {AnchorOrLink} from '~/utils/misc'

interface ButtonProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'subtle' | 'danger'
  children: React.ReactNode | React.ReactNode[]
  className?: string
}

function Button({
  variant = 'primary',
  size = 'sm',
  children,
  className,
  ...props
}: ButtonProps & JSX.IntrinsicElements['button']) {
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
  className,
}: Pick<ButtonProps, 'children' | 'variant' | 'size' | 'className'>) {
  return (
    <div
      className={clsx(
        'relative flex h-full w-full items-center justify-center whitespace-nowrap rounded-full',
        {
          '': variant === 'subtle',
          'border-gray-200 group-disabled:border-gray-100 dark:border-gray-800':
            variant === 'primary',
          'border-red-200 group-disabled:border-red-700': variant === 'danger',
          'px-2 pb-[5px] pt-1 text-md': size === 'sm',
          'px-5 pb-2 pt-1.5 text-base': size === 'md',
          'px-8 py-3.5 text-lg': size === 'lg',
        },
        className,
      )}
    >
      {children}
    </div>
  )
}

const ButtonLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithRef<typeof AnchorOrLink> & ButtonProps
>(function ButtonLink(
  {variant = 'primary', size = 'sm', children, className, ...props},
  ref,
) {
  return (
    <AnchorOrLink
      ref={ref}
      className={clsx(
        'group relative inline-flex w-min rounded-full font-medium ring-white disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-700',
        {
          '': variant === 'subtle',
          'bg-gray-900 text-white dark:bg-white dark:text-black':
            variant === 'primary',
          'border-red-300 bg-red-100 text-red-800 hover:bg-red-200 disabled:border-red-100':
            variant === 'danger',
        },
      )}
      {...props}
    >
      <Inner variant={variant} size={size} className={clsx(className)}>
        {children}
      </Inner>
    </AnchorOrLink>
  )
})

export {Button, ButtonLink}
