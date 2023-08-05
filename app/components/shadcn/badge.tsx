import * as React from 'react'
import {cva, type VariantProps} from 'class-variance-authority'

import {cn} from '~/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        success:
          'border-green-400 dark:border-green-200 bg-green-300 dark:bg-green-100 text-green-800 dark:text-green-900 hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
      },
      size: {
        default: 'text-sm',
        xs: 'text-xs',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({className, variant, size, ...props}: BadgeProps) {
  return (
    <div className={cn(badgeVariants({variant, size}), className)} {...props} />
  )
}

export {Badge, badgeVariants}
