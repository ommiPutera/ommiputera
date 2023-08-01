import type { Project } from '@prisma/client'
import type { LoaderFunction } from '@remix-run/node'
import { Link, useLoaderData, type V2_MetaFunction } from '@remix-run/react'
import { Button } from '~/components/button'
import { getImgProps, images } from '~/images'
import { db } from '~/utils/db.server'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Ommi Putera - Dashboard' }]
}

type LoaderData = { projects: Array<Project> }

export const loader: LoaderFunction = async ({ request }) => {
  const owner = await db.user.findMany({ where: { role: 'OWNER' } })
  const projects = await db.project.findMany({ where: { userId: owner[0].id } })
  let data: LoaderData = { projects }
  return data
}

export default function Index() {
  const data = useLoaderData<LoaderData>()
  return (
    <div className="relative flex h-full w-full flex-col gap-y-5 lg:gap-y-32">
      <div className="">
        <h1 className="text-center text-xl font-medium leading-tight tracking-tight lg:text-5xl">
          All projects that have <br /> been completed
        </h1>
      </div>
      <div className="mx-auto lg:max-w-[120rem]">
        {data.projects.map(project => (
          <ProjectSection key={project.id} {...project} />
        ))}
      </div>
    </div>
  )
}

function ProjectSection({
  name,
  description,
  type,
  heroId,
  liveLink,
  content,
}: {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  description: string
  type: string
  heroId: string
  userId: string
  liveLink: string
  content: string | null
  key: string
}) {
  const image = images[heroId as keyof typeof images] || images.placeholder

  return (
    <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-5 py-4 lg:gap-y-16 lg:py-12">
      <img
        className="rounded-lg border border-gray-800 object-cover lg:mx-5vw"
        {...getImgProps(image, {
          widths: [840, 1100, 1300, 2600, 3984],
          sizes: ['(min-width:1220px) 3984px', '100vw'],
        })}
      />
      <div className="flex flex-col items-start gap-y-14 px-0 lg:px-[10rem]">
        <div className="flex w-full flex-col items-center justify-between gap-y-5 lg:flex-row lg:gap-x-2">
          <div className="flex flex-col gap-y-2">
            <h1 className="px-0 text-center text-3xl font-medium leading-tight lg:text-left lg:text-5xl">
              {name}
            </h1>
            <h4 className="px-0 text-center text-lg font-medium text-gray-300 lg:mt-0 lg:text-left">
              {description}
            </h4>
          </div>
          <div className="flex justify-center">
            <Link target="_blank" to={liveLink}>
              <h1 className="underlined w-min px-0 text-center text-3xl font-medium leading-tight lg:text-3xl">
                {liveLink.replace('https://', '').replace('/', '')}
              </h1>
            </Link>
          </div>
        </div>
        <p className="text-lg font-light tracking-wide lg:leading-loose">
          {content}
        </p>
        <div className="mx-auto">
          <Button className="w-min" size="lg">
            More detail
          </Button>
        </div>
      </div>
    </div>
  )
}
