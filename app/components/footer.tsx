import {AnchorOrLink} from '~/utils/misc'

function Footer() {
  return (
    <footer className="border-t border-gray-600 px-5vw py-9 lg:px-15vw lg:py-12">
      <div className="grid-rows-max-content relative mx-auto grid max-w-8xl grid-cols-4 gap-x-4 md:grid-cols-8 xl:grid-cols-12 xl:gap-x-6">
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
    <li className="py-1">
      <AnchorOrLink
        prefetch={href.startsWith('http') ? undefined : 'intent'}
        href={href}
        className="text-secondary underlined hover:text-team-current focus:text-team-current inline-block whitespace-nowrap text-lg focus:outline-none"
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
      <h2 className="whitespace-nowrap text-xl font-medium">
        Ommi Putera Karunia
      </h2>
      <ul className="mt-4">
        <li className="pb-6 font-medium text-md">
          All rights reserved © Ommi Putera 2023
        </li>
        <li className="text-secondary py-1 text-lg">
          Helping people make the world a better place through quality software.
        </li>
      </ul>
    </div>
  )
}

function SitemaptSection() {
  return (
    <div>
      <h5 className="whitespace-nowrap text-lg font-medium">Sitemap</h5>
      <ul className="mt-4">
        <FooterLink name="Home" href="/" />
        <FooterLink name="About" href="/about" />
        <FooterLink name="Blog" href="/blog" />
        <FooterLink name="Discord" href="/blog" />
        <FooterLink name="Owner" href="/login" />
      </ul>
    </div>
  )
}

function ContactSection() {
  return (
    <div>
      <h5 className="whitespace-nowrap text-lg font-medium">Contact</h5>
      <ul className="mt-4">
        <FooterLink name="Email" href="/contact" />
        <FooterLink name="WhatsApp" href="/contact" />
      </ul>
    </div>
  )
}


export default Footer
