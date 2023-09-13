import clsx from 'clsx'
import {AnchorOrLink} from '~/utils/misc'
import {useRootData} from '~/utils/use-root-data'
import {Logo} from './navbar'
import {useLocation} from '@remix-run/react'
import {includes, some} from 'lodash'

const ROUTE_WITHOUT_FOOTER = ['/login', '/personal']

function Footer() {
  const {user} = useRootData()
  const location = useLocation()
  const isShowFooter = some(ROUTE_WITHOUT_FOOTER, el =>
    includes(location.pathname, el),
  )

  if (isShowFooter) return <></>
  return (
    <footer
      className={clsx('z-[2] px-5vw py-9 lg:px-10vw lg:pb-12 lg:pt-24', {
        'dark:bg-gray-900': !user,
      })}
    >
      <div className="grid-rows-max-content relative mx-auto grid max-w-5xl grid-cols-4 gap-x-4 md:grid-cols-8 xl:grid-cols-12 xl:gap-x-6">
        <div className="col-span-full md:col-span-3 xl:row-span-2">
          <AboutSection />
        </div>
        <div className="col-span-2 mt-20 md:col-start-5 md:row-start-1 md:mt-0">
          <ContactSection />
        </div>
        <div className="col-span-2 mt-20 md:col-span-2 md:col-start-7 md:mt-0 xl:col-start-5 xl:row-span-2 xl:row-start-1 xl:ml-56">
          <SitemaptSection />
        </div>
      </div>
    </footer>
  )
}

function FooterLink({
  name,
  href,
  reload,
}: {
  name: string
  href: string
  reload?: boolean
}) {
  return (
    <li className="py-2">
      <AnchorOrLink
        prefetch={href.startsWith('http') ? undefined : 'intent'}
        href={href}
        className="underlined inline-block whitespace-nowrap text-base font-medium text-gray-400 hover:text-black dark:text-gray-300 hover:dark:text-white"
        reload={reload}
      >
        {name}
      </AnchorOrLink>
    </li>
  )
}

function AboutSection() {
  return (
    <div>
      <Logo />
      <ul className="mt-4">
        <li className="pb-4 text-base font-medium text-gray-400 dark:text-gray-300">
          All rights reserved © Ommi Putera 2023
        </li>
        <li className="py-1 text-base font-medium text-gray-400 dark:text-gray-300">
          Helping people make the world a better place through quality software.
        </li>
      </ul>
    </div>
  )
}

function SitemaptSection() {
  return (
    <div>
      <h5 className="whitespace-nowrap text-md font-medium">Sitemap</h5>
      <ul className="mt-4">
        <FooterLink name="Home" href="/" />
        <FooterLink name="About" href="/about" />
        <FooterLink name="Blog" href="/blog" />
        <FooterLink name="Discord" href="/blog" />
        <FooterLink name="Owner" href="/login" />
        <FooterLink name="Admin" href="/admin" />
        <FooterLink name="Personal Finance" href="/personal" />
      </ul>
    </div>
  )
}

function ContactSection() {
  return (
    <div>
      <h5 className="whitespace-nowrap text-md font-medium">Contact</h5>
      <ul className="mt-4">
        <FooterLink name="Email" href="/contact" />
        <FooterLink name="WhatsApp" href="/contact" />
      </ul>
    </div>
  )
}

export default Footer
