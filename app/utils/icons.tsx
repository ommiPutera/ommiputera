import {motion, useReducedMotion} from 'framer-motion'

const BurgerMenu = ({state}: {state: string}) => {
  const shouldReduceMotion = useReducedMotion()
  const transition = shouldReduceMotion
    ? {
        opacity: {duration: shouldReduceMotion ? 0 : 0.2},
        rotate: {duration: shouldReduceMotion ? 0 : 0.5},
        scale: {duration: shouldReduceMotion ? 0 : 0.5},
      }
    : {}

  const topVariants = {
    open: {rotate: 45, y: 7, originX: '16px', originY: '10px'},
    closed: {rotate: 0, y: 0, originX: 0, originY: 0},
  }

  const centerVariants = {
    open: {opacity: 0},
    closed: {opacity: 1},
  }

  const bottomVariants = {
    open: {rotate: -45, y: -5, originX: '16px', originY: '22px'},
    closed: {rotate: 0, y: 0, originX: 0, originY: 0},
  }

  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <motion.rect
        initial={false}
        animate={state}
        variants={topVariants}
        transition={transition}
        x="6"
        y="9"
        width="20"
        height="2"
        rx="1"
        fill="currentColor"
      />
      <motion.rect
        initial={false}
        animate={state}
        variants={centerVariants}
        transition={transition}
        x="6"
        y="15"
        width="20"
        height="2"
        rx="1"
        fill="currentColor"
      />
      <motion.rect
        initial={false}
        animate={state}
        variants={bottomVariants}
        transition={transition}
        x="6"
        y="21"
        width="20"
        height="2"
        rx="1"
        fill="currentColor"
      />
    </svg>
  )
}

export {BurgerMenu}
