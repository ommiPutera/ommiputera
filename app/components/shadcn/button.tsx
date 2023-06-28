import * as React from 'react'
import {Slot} from '@radix-ui/react-slot'
import {cva, type VariantProps} from 'class-variance-authority'

import {cn} from '~/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-white text-gray-600 hover:bg-gray-100',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-10 rounded-md px-6',
        md: 'h-12 rounded-md px-8 text-md',
        lg: 'h-14 rounded-md px-12 text-base',
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

    const handleHoverEnter = () =>
      hoverChild ? setChildrenComp(hoverChild) : undefined
    const handleHoverLeave = () =>
      hoverChild ? setChildrenComp(props.children) : undefined

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
