import React from 'react'
import {Avatar, AvatarImage} from '~/components/shadcn/avatar'

export default function Month() {
  return (
    <div className="flex flex-col gap-12">
      <div>
        <h2 className="text-2xl font-semibold">Pencatatan bulanan</h2>
        <p className="text-md font-medium text-gray-400 dark:text-gray-200">
          Build anything with thousands of templates
        </p>
      </div>
      <div>
        <h4 className="mb-4 text-lg font-semibold">Yang disediakan</h4>
        <div className="grid grid-cols-2 gap-4">
          <Card />
          <Card />
          <Card />
        </div>
      </div>
      <div>
        <h4 className="mb-4 text-lg font-semibold">Dari Komunitas</h4>
        <div className="grid grid-cols-2 gap-4">
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  )
}

function Card() {
  return (
    <div className="col-span-1 flex w-full flex-col gap-2">
      <div className="border">content</div>
      <div className="flex items-center gap-2">
        <Avatar className="relative h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        </Avatar>
        <p>title</p>
      </div>
    </div>
  )
}
