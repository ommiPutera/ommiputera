import {BookOpen} from 'lucide-react'
import {OutletCenter, OutletRight, WrapperOutlet} from '../_layout'

export default function Index() {
  return (
    <WrapperOutlet>
      <OutletCenter>
        <div className="sticky top-0 z-[99] mb-4 w-full border-b border-gray-100 bg-white/[0.65] px-3 pt-4 backdrop-blur-lg dark:border-gray-800 dark:bg-black/[0.65] dark:backdrop-blur-lg lg:px-6">
          <div className="mb-6 mt-2 flex items-center gap-2.5">
            <BookOpen size={23} strokeWidth={2.5} />
            <h2 className="mt-1 text-left text-xl font-semibold">Panduan</h2>
          </div>
        </div>
      </OutletCenter>
      <OutletRight>Right</OutletRight>
    </WrapperOutlet>
  )
}
