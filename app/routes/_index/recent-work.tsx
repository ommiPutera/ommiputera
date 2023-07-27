import type {Project} from '@prisma/client'
import {Link, useLoaderData} from '@remix-run/react'
import clsx from 'clsx'

type LoaderData = {projects: Array<Project>}

export default function RecentWork() {
  const data = useLoaderData<LoaderData>()

  return (
    <div className="mx-auto grid max-w-7xl gap-8 lg:gap-12">
      <div className="flex grid-cols-7 flex-col items-center justify-between gap-5 lg:grid lg:flex-row lg:items-start xl:gap-x-48">
        <h1 className="col-span-4 text-center text-3xl font-normal leading-tight lg:text-left lg:text-5xl">
          I help brands and people with{' '}
          <b className="font-semibold">tailor-made solutions</b>
        </h1>
        <p className="col-span-3 mt-2 text-center text-base font-normal text-gray-200 lg:mt-3 lg:text-left lg:text-xl">
          You can explore my recent work here, or view the complete project
          portfolio at{' '}
          <Link to="/project" prefetch="intent">
            <span className="underlined text-white">/project</span>
          </Link>
        </p>
      </div>
      <div className="flex flex-col gap-2 lg:gap-6">
        <div className="flex items-center justify-between">
          <Link to="/project" prefetch="intent">
            <h3 className="py-4 font-medium text-gray-300 lg:text-xl">
              View All Project
            </h3>
          </Link>
          <h3 className="py-4 text-xl font-medium md:text-2xl lg:text-3xl">
            Recent Work
          </h3>
        </div>
        <div className="rounded-lg bg-gray-800 px-16 py-10 lg:-mx-16">
          {data.projects.map(project => (
            <ProjectSection
              key={project.id}
              title={project.name}
              detailRoute={
                '/project/' + project.name.toLowerCase().replace(' ', '-')
              }
              liveLink={project.liveLink}
              desc={project.description}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectSection({
  title,
  detailRoute = '',
  liveLink = '',
  desc,
}: {
  title: string
  detailRoute: string
  liveLink?: string
  desc: string
}) {
  return (
    <div className="flex flex-col items-center justify-between md:flex-row">
      <p className="mb-4 text-lg font-medium text-gray-300 md:mb-0 lg:text-xl">
        {desc}
      </p>
      <div className="flex flex-col items-center gap-6 md:flex-row md:gap-12">
        <Link
          target="_blank"
          to={liveLink}
          className={clsx(
            liveLink && 'underlined',
            !liveLink && 'pointer-events-none',
          )}
        >
          <h2 className="pb-2 text-3xl font-medium leading-tight md:text-xl lg:text-4xl">
            {title}
          </h2>
        </Link>
        <Link to={detailRoute}>
          <button className="rounded-full bg-gray-700 px-4 py-2 hover:bg-gray-800">
            Detail
          </button>
        </Link>
      </div>
    </div>
  )
}
