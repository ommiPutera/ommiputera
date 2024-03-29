import * as React from 'react'
import {cva, type VariantProps} from 'class-variance-authority'

import {cn} from '~/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2 py-0.5 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        success:
          'border-green-900 dark:border-green-200 bg-green-900/30 dark:bg-green-100 text-green-900 dark:text-green-900',
        orange:
          'border-orange-900 dark:border-orange-200 bg-orange-300 dark:bg-orange-100 text-orange-900 dark:text-orange-900',
      },
      size: {
        default: 'text-sm px-3 pb-1 pt-0.5',
        xs: 'pt-[1px] pb-[3px] mt-[1px] text-[10px] leading-[11px]',
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
