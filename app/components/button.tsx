import clsx from 'clsx'
import React from 'react'
import { AnchorOrLink } from '~/utils/misc'

interface ButtonProps {
  size?: 'sm' | 'md' | 'lg'
  rounded?: 'sm' | 'md' | 'lg' | 'full'
  align?: 'center' | 'left' | 'right'
  variant?: 'primary' | 'subtle' | 'danger'
  children: React.ReactNode | React.ReactNode[]
  className?: string
}

function Button({
  variant = 'primary',
  align = 'center',
  size = 'md',
  rounded = 'md',
  children,
  className,
  ...props
}: ButtonProps & JSX.IntrinsicElements['button']) {
  return (
    <button
      {...props}
      className={clsx(
        'group relative inline-flex w-full border font-medium ring-white hover:bg-gray-100 dark:hover:bg-gray-800 disabled:cursor-not-allowed disabled:border-gray-400 disabled:bg-gray-200 disabled:text-gray-700 disabled:hover:bg-gray-200',
        {
          'border-none': variant === 'subtle',
          'bg-white text-black': variant === 'primary',
          'border-red-300 bg-red-100 text-red-800 hover:bg-red-200 disabled:border-red-100':
            variant === 'danger',
          'rounded-md': size === 'sm',
          'rounded-lg': size === 'md' || size === 'lg',
        },
        className,
      )}
    >
      <Inner variant={variant} size={size} rounded={rounded} align={align}>
        {children}
      </Inner>
    </button>
  )
}

function Inner({
  children,
  variant,
  size,
  rounded,
  align,
  className,
}: Pick<
  ButtonProps,
  'children' | 'variant' | 'size' | 'rounded' | 'className' | 'align'
>) {
  return (
    <div
      className={clsx(
        'relative flex h-full w-full items-center whitespace-nowrap font-medium',
        {
          // Align
          'justify-center': align === 'center',
          'justify-start': align === 'left',
          'justify-end': align === 'right',
          // Variant
          '': variant === 'subtle',
          'bg-black text-white dark:bg-white dark:text-black':
            variant === 'primary',
          'border-red-200 group-disabled:border-red-700': variant === 'danger',

          // Size
          'px-2.5 py-0.5 text-sm': size === 'sm',
          'px-3.5 py-1 text-md': size === 'md',
          'text-lg': size === 'lg',

          // Rounded
          'rounded-[4px]': rounded === 'sm',
          'rounded-md': rounded === 'md',
          'rounded-lg': rounded === 'lg',
          'rounded-full': rounded === 'full',
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
  {
    variant = 'primary',
    size,
    rounded = 'md',
    align = 'center',
    children,
    className,
    ...props
  },
  ref,
) {
  return (
    <AnchorOrLink ref={ref} {...props}>
      <Inner
        variant={variant}
        size={size}
        rounded={rounded}
        align={align}
        className={clsx(className)}
      >
        {children}
      </Inner>
    </AnchorOrLink>
  )
})

export { Button, ButtonLink }
