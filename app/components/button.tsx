import clsx from "clsx"
import React from "react"

interface IProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary'
  children: React.ReactNode | React.ReactNode[]
}

function Button({
  variant = "primary",
  size = 'sm',
  children,
  className,
  ...props
}: IProps & JSX.IntrinsicElements['button']) {
  return (
    <button {...props} className={clsx("relative inline-flex font-medium w-full rounded-xl", className)}>
      <Inner variant={variant} size={size}>
        {children}
      </Inner>
    </button>
  )
}

function Inner({ children, variant, size }: Pick<IProps, 'children' | 'variant' | 'size'>) {
  return (
    <div
      className={clsx('relative flex focus-ring h-full w-full border-2 rounded-xl py-4 items-center justify-center whitespace-nowrap', {
        'text-primary border-gray-600': variant === 'primary',
        'text-xl': size === 'lg'
      })}
    >
      {children}
    </div>
  )
}

export { Button }