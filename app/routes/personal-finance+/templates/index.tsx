import { ButtonLink } from '~/components/button'
import { OutletCenter, OutletRight, WrapperOutlet } from '../_layout'
import Default from './default'

export default function Index() {
  return (
    <WrapperOutlet>
      <OutletCenter>
        <div className='px-6 pt-12 pb-6 text-center'>
          <h2 className='text-5xl font-semibold'>Templat Perencanaan</h2>
          <p className='text-base font-medium text-gray-400 dark:text-gray-200'>Build anything with thousands of templates</p>
        </div>
        <Default />
      </OutletCenter>
      <OutletRight>
        <SubmitTemplate />
      </OutletRight>
    </WrapperOutlet>
  )
}

function SubmitTemplate() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col">
        <h1 className="text-lg font-semibold leading-tight mb-2">Submit your template to Community</h1>
        <p className="px-0 text-left text-sm font-normal text-gray-400 dark:text-gray-200">
          A vertically stacked set of interactive headings that each reveal a
          section of content.
        </p>
        <div className="mt-4">
          <ButtonLink
            size="md"
            rounded="md"
            type="button"
            to="/personal-finance/new"
            className="gap-2"
          >
            <p className="text-sm">Submit a template</p>
          </ButtonLink>
        </div>
      </div>
    </div>
  )
}