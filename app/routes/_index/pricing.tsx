import { Link } from '@remix-run/react'
import { UIButton } from '~/components/shadcn/button'

export default function Pricing() {
  return (
    <div className="mx-auto grid max-w-7xl gap-8 lg:gap-y-12">
      <div className="flex flex-col items-center justify-between gap-5 lg:gap-x-48">
        <h1 className="text-center text-3xl font-medium leading-tight lg:text-5xl">
          Choose the plan that <br /> fits your needs.
        </h1>
        <p className="col-span-3 mt-2 text-center text-lg ffont-light text-gray-200 lg:mt-3 lg:text-xl">
          I have a talented team that can help me produce high-quality <br />{' '}
          software and provide a range of services.
        </p>
      </div>
      <div className="grid grid-cols-12 gap-x-6 py-4">
        <PricingCard
          title="Personal Website"
          price={18}
          desc="From your imagination to real live."
          directTo="/learn"
          variant="default"
          list={[
            '- 6 Month Maintaince',
            '- Your Website including Your Site CMS',
            '- Maxium 12 module / page',
            '- Free Domain',
          ]}
        />
        <PricingCard
          title="Digital Product"
          price={45}
          desc="From your imagination to real live."
          directTo="/learn"
          variant="default"
          list={[
            '- 6 Month Maintaince',
            '- Your Website including Your Site CMS',
            '- Maxium 10 module / page ',
            '- With design first',
          ]}
        />
        <PricingCard
          title="Custom Website"
          price={35}
          desc="From your imagination to real live."
          directTo="/learn"
          variant="default"
          list={[
            '- 6 Month Maintaince',
            '- Your Website including Your Site CMS',
            '- Maxium 10 module / page ',
            '- With design first',
          ]}
        />
      </div>
    </div>
  )
}

function PricingCard({
  title,
  price,
  desc,
  list,
  directTo,
  variant,
}: {
  title: string
  price: number
  desc: string
  list: Array<string>
  directTo: string
  variant: 'default'
}) {
  return (
    <div className="col-span-4 flex cursor-pointer flex-col rounded-xl border border-gray-800 px-10 py-12 hover:bg-gray-800 lg:gap-y-10">
      <h4 className="w-fit rounded-full border border-red-200 bg-red-100 px-5 py-2.5 text-sm font-medium">
        {title}
      </h4>
      <div>
        <h1 className="leading-none lg:text-2xl xl:text-4xl">
          Start from <br /> Rp. {price}jt
        </h1>
        <p className="mt-6 text-md font-light text-gray-200 lg:text-lg">
          {desc}
        </p>
      </div>
      <ul className="flex flex-col gap-y-4 text-md font-light text-gray-200">
        {list.map(item => (
          <li key={item} className="text-md lg:text-md">
            {item}
          </li>
        ))}
      </ul>
      <Link to={directTo} prefetch="intent">
        <UIButton size="md" variant={variant} className="mt-8 rounded-full">
          Learn More
        </UIButton>
      </Link>
    </div>
  )
}
