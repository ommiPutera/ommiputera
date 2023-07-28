import * as React from 'react'
import {Slot} from '@radix-ui/react-slot'
import {cva, type VariantProps} from 'class-variance-authority'

import {cn} from '~/lib/utils'
import {debounce} from 'lodash'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors outline-gray-500 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-white text-gray-600 hover:bg-gray-100',
        subtle: 'bg-transparent',
        danger: 'text-red-800 bg-red-100 border border-red-200',
      },
      size: {
        default: 'h-10',
        sm: 'h-8 rounded-md text-md px-3',
        md: 'h-12 rounded-md px-8 text-base',
        lg: 'h-14 rounded-md px-12 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  hoverChild?: React.ReactNode
}

const UIButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant, size, hoverChild, asChild = false, ...props}, ref) => {
    const [childrenComp, setChildrenComp] = React.useState(props.children)
    const Comp = asChild ? Slot : 'button'
    const handleHoverEnter = debounce(
      () => (hoverChild ? setChildrenComp(hoverChild) : undefined),
      300,
    )
    const handleHoverLeave = () => {
      handleHoverEnter.cancel()
      return hoverChild ? setChildrenComp(props.children) : undefined
    }

    return (
      <Comp
        className={cn(buttonVariants({variant, size, className}))}
        ref={ref}
        onMouseEnter={handleHoverEnter}
        onMouseLeave={handleHoverLeave}
        {...props}
        // hoverChild === true
        children={childrenComp}
      />
    )
  },
)
UIButton.displayName = 'Button'

export {UIButton, buttonVariants}
