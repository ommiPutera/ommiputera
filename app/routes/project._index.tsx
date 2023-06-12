import type { V2_MetaFunction } from '@remix-run/react'
import React from 'react'
import { getImgProps, images } from '~/images'

export const meta: V2_MetaFunction = () => {
  return [{ title: 'Ommi Putera - Dashboard' }]
}

export default function Index() {
  return (
    <div className="relative h-full w-full flex flex-col gap-y-32">
      <div className=''>
        <h1 className='text-4xl text-center font-medium leading-tight'>All projects that have <br /> been completed </h1>
      </div>
      <div className='max-w-[120rem] mx-auto'>
        <NaufalProject/>
      </div>
    </div>
  )
}

function NaufalProject() {
  return (
    <div className="flex flex-col gap-20">
      <img
        id="about-me"
        className="object-cover"
        {...getImgProps(images.naufalHero, {
          widths: [840, 1100, 1300, 2600, 3984],
          sizes: ['(min-width:1220px) 3984px', '100vw'],
        })}
      />
      <div className="flex gap-32 px-5vw py-9 items-center lg:px-15vw">
        <div className='lg:w-1/2'>
          <h1 className="px-0 text-left text-3xl font-medium leading-tight lg:text-5xl">
            Naufal
          </h1>
          <h4 className="mt-4 px-0 text-left text-xl font-medium text-gray-300 lg:mt-0">
            2 years of proven experience in helping to create and maintain a
            better code base for re-usability and best practices. Experience in
            developing projects from concept to launch. Eager to tackle more
            complex problems, and continues to find ways to maximize user
            efficiency
          </h4>
        </div>
        <div className='lg:w-1/2 flex flex-col justify-center'>
          <h1 className="px-0 text-center text-3xl font-medium leading-tight lg:text-4xl">
            Kemampuan memukau <br /> yang terjangkau.
          </h1>
          <button>More detail</button>
        </div>
      </div>
    </div>
  )
}