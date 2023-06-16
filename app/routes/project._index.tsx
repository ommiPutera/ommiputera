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
    <div className="relative flex h-full w-full flex-col gap-y-32">
      <div className="">
        <h1 className="text-center text-4xl font-medium leading-tight">
          All projects that have <br /> been completed
        </h1>
      </div>
      <div className="mx-auto max-w-[120rem]">
        {data.projects.map(project => (
          <ProjectSection
            key={project.id}
            {...project}
          />
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
  content
}: {
  name: string,
  description: string,
  type: string,
  heroId: string,
  liveLink: string
  content: string
}) {
  const image = images[heroId as keyof typeof images] || images.placeholder

  return (
    <div className="flex flex-col gap-20">
      <img
        id="about-me"
        className="object-cover"
        {...getImgProps(image, {
          widths: [840, 1100, 1300, 2600, 3984],
          sizes: ['(min-width:1220px) 3984px', '100vw'],
        })}
      />
      <div className="flex items-center gap-32 px-5vw py-9 lg:px-15vw">
        <div className="flex flex-col gap-y-8 lg:w-1/2">
          <h1 className="px-0 text-left text-3xl font-medium leading-tight lg:text-5xl">
            {name}
          </h1>
          <h4 className="px-0 text-left text-xl font-medium text-gray-300 lg:mt-0">
            {description}
          </h4>
        </div>
        <div className="flex flex-col justify-center w-full gap-y-8 lg:w-1/2">
          <div className='w-full mx-auto flex justify-center'>
            <Link target="_blank" to={liveLink}>
              <h1 className="px-0 text-center w-min text-3xl underlined font-medium leading-tight lg:text-3xl">
                {liveLink.replace('https://', '').replace('/', '')}
              </h1>
            </Link>
          </div>
          <div className='mx-auto'>
            <Button className='w-min' size='lg'>More detail</Button>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-32 px-5vw lg:px-15vw">
        <p className='text-xl text-gray-100 font-medium'>{content}</p>
      </div>
    </div>
  )
}
