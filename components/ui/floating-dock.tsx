"use client";

import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { MenuIcon } from "lucide-react";
import React, { useRef, useState } from "react";

import Link from "next/link";

import { cn } from "~/lib/utils";

type TFloatingDock = {
  items: {
    title: string;
    icon: React.ReactNode;
    href?: string;
    onClick?: () => void;
  }[];
  desktopClassName?: string;
  mobileClassName?: string;
};
const Dock = React.memo(
  ({ items, desktopClassName, mobileClassName }: TFloatingDock) => {
    return (
      <div>
        <div className="block md:hidden">
          <FloatingDockMobile items={items} className={mobileClassName} />
        </div>
        <div className="hidden md:block">
          <FloatingDockDesktop items={items} className={desktopClassName} />
        </div>
      </div>
    );
  },
);

export const FloatingDock = React.cache((props: TFloatingDock) => {
  return <Dock {...props} />;
});
Dock.displayName = "FloatingDock";

const FloatingDockMobile = ({
  items,
  className,
}: {
  items: {
    title: string;
    icon: React.ReactNode;
    href?: string;
    onClick?: () => void;
  }[];
  className?: string;
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div className={cn("relative", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className="absolute bottom-full mb-2 inset-x-0 flex flex-col gap-2"
          >
            {items.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: 10,
                  transition: {
                    delay: idx * 0.05,
                  },
                }}
                transition={{ delay: (items.length - 1 - idx) * 0.05 }}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    key={item.title}
                    className="h-10 w-10 rounded-full border bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center"
                  >
                    <div className="h-4 w-4">{item.icon}</div>
                  </Link>
                ) : (
                  <div
                    onClick={item.onClick}
                    role="button"
                    key={item.title}
                    className="h-10 w-10 rounded-full border bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center"
                  >
                    <div className="h-4 w-4">{item.icon}</div>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="h-10 w-10 rounded-full shadow-md border bg-neutral-50 backdrop-blur-sm dark:bg-neutral-800 flex items-center justify-center"
      >
        <MenuIcon className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: {
    title: string;
    icon: React.ReactNode;
    href?: string;
    onClick?: () => void;
  }[];
  className?: string;
}) => {
  const mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto flex h-16 gap-4 items-end border rounded-2xl bg-neutral-50/60 backdrop-blur-sm dark:bg-neutral-900 px-4 pb-3",
        className,
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
  onClick,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href?: string;
  onClick?: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  const widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  const widthTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20],
  );
  const heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20],
  );

  const width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  const heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  const Comp = () => (
    <motion.div
      ref={ref}
      style={{ width, height }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="aspect-square rounded-full bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center relative"
    >
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 2, x: "-50%" }}
            className="px-2 py-0.5 whitespace-pre rounded-md bg-neutral-50 border dark:bg-neutral-800 dark:border-neutral-900 dark:text-white text-neutral-700 absolute left-1/2 -translate-x-1/2 -top-8 w-fit text-sm"
          >
            {title}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        style={{ width: widthIcon, height: heightIcon }}
        className="flex items-center justify-center"
      >
        {icon}
      </motion.div>
    </motion.div>
  );

  if (href) {
    return (
      <Link href={href}>
        <Comp />
      </Link>
    );
  }

  return (
    <div role="button" onClick={onClick}>
      <Comp />
    </div>
  );
}
