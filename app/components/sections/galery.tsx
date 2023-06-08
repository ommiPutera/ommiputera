import React from 'react'
import {Link} from '@remix-run/react'

function GalerySection() {
  return (
    <div className="grid-rows-max-content relative mx-auto grid max-w-[130rem] grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
      <Video projectName="test" to="/">
        <source
          src="https://cdn.dribbble.com/userupload/7114376/file/original-4e1a54b4176f7137414a4d2d7f8a8a6f.mp4"
          type="video/mp4"
        />
      </Video>
      <Video projectName="test" to="/">
        <source
          src="https://cdn.dribbble.com/userupload/2738221/file/original-7cc25a29c78783b6569ba53ff03c0d0d.mp4"
          type="video/mp4"
        />
      </Video>
      <Image src="https://cdn.dribbble.com/users/5084254/screenshots/17966374/media/4fddcde3238a1ddddd79f571c3fcc5ee.jpg?compress=1&resize=1000x750&vertical=top" />
      <Video projectName="test" to="/">
        <source
          src="https://cdn.dribbble.com/users/6008920/screenshots/19998881/media/b51699b5e3dfe0d44f9801259259e114.mp4"
          type="video/mp4"
        />
      </Video>
      <Image src="https://cdn.dribbble.com/users/1756963/screenshots/16199327/media/2574545a2a10397d6bb43b8001ecc585.png?compress=1&resize=1000x750&vertical=top" />
      <Video projectName="test" to="/">
        <source
          src="https://cdn.dribbble.com/users/5324991/screenshots/18799169/media/fed2096939d461bd15b015d70a22da18.mp4"
          type="video/mp4"
        />
      </Video>
    </div>
  )
}

function Video({
  children,
  projectName,
  to,
}: {
  children: React.ReactNode
  projectName: string
  to: string
}) {
  return (
    <div className="group relative">
      <video width="750" height="750" autoPlay muted className="h-full w-full">
        {children}
        Sorry, your browser doesn't support videos.
      </video>
      <Link to={to}>
        <div className="absolute top-0 flex h-full w-full cursor-pointer items-center justify-center opacity-0 transition group-hover:bg-gray-800 group-hover:opacity-100">
          {projectName}
        </div>
      </Link>
    </div>
  )
}

function Image({src}: {src: string}) {
  return <img src={src} alt="" />
}

export {GalerySection}
