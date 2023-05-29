function HomeHeroSection() {
  return (
    <div className="text-primary mx-auto grid max-w-8xl gap-16 lg:gap-12">
      <div className="flex flex-col items-center justify-center gap-5 lg:gap-2">
        <img src="/profile.png" alt="" className="h-44 w-44" />
        <div className="text-center">
          <h3 className="text-xl font-medium lg:text-2xl">Hi👋, I'm Ommi</h3>
          <p className="mt-2 font-medium text-gray-300 lg:mt-0">
            Software Engineer
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-center text-3xl font-medium leading-tight lg:w-1/2 lg:text-5xl">
          Helping people make the world a better place through quality software.
        </h1>
        <p className="mt-2 text-center font-medium text-gray-300 lg:mt-4 lg:w-1/2">
          2 years of proven experience in helping to create and maintain a
          better code base for re-usability and best practices. Experience in
          developing projects from concept to launch. Eager to tackle more
          complex problems, and continues to find ways to maximize user
          efficiency
        </p>
      </div>
    </div>
  )
}

export {HomeHeroSection}
