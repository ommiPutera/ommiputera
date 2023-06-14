import type {V2_MetaFunction} from '@remix-run/react'
import React from 'react'
import {getImgProps, images} from '~/images'

export const meta: V2_MetaFunction = () => {
  return [{title: 'Ommi Putera - Dashboard'}]
}

export default function Index() {
  return (
    <div className="relative flex h-full w-full flex-col gap-y-32">
      <div className="">
        <h1 className="text-center text-4xl font-medium leading-tight">
          All projects that have <br /> been completed{' '}
        </h1>
      </div>
      <div className="mx-auto max-w-[120rem]">
        <NaufalProject />
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
      <div className="flex items-center gap-32 px-5vw py-9 lg:px-15vw">
        <div className="flex flex-col gap-y-8 lg:w-1/2">
          <h1 className="px-0 text-left text-3xl font-medium leading-tight lg:text-5xl">
            Naufal
          </h1>
          <h4 className="px-0 text-left text-xl font-medium text-gray-300 lg:mt-0">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </h4>
        </div>
        <div className="flex flex-col justify-center lg:w-1/2">
          <h1 className="px-0 text-center text-3xl font-medium leading-tight lg:text-4xl">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </h1>
          <button>More detail</button>
        </div>
      </div>
    </div>
  )
}
