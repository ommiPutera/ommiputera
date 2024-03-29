import {cva} from 'class-variance-authority'
import {cn} from '~/lib/utils'

interface ISectionSpacer {
  withoutBorder?: boolean
  className?: string
  size?: 'xxs' | 'xs' | 'sm' | 'md' | 'default'
}

const sectionSpacerVariants = cva('my-16', {
  variants: {
    variant: {
      default: 'border-b border-gray-100 dark:border-gray-800',
      withoutBorder: 'border-none',
    },
    size: {
      default: 'my-16',
      md: 'my-12',
      sm: 'my-6',
      xs: 'my-4',
      xxs: 'my-0',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

function SectionSpacer({withoutBorder, size, className}: ISectionSpacer) {
  const variant = withoutBorder ? 'withoutBorder' : 'default'
  return (
    <div
      className={cn(sectionSpacerVariants({variant, size, className}))}
    ></div>
  )
}

export {SectionSpacer}
