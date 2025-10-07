"use client"

import React from "react"
import useEmblaCarousel from "embla-carousel-react"
import ProjectTargets from "./project-targets"

type Metric = {
  label: "Target" | "Booking" | "Registration" | (string & {})
  count: number | string
}

type ProjectCard = {
  projectName: string
  metrics: Metric[]
}

export function ProjectTargetsCarousel({
  projects,
  className = "",
}: {
  projects: ProjectCard[]
  className?: string
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false })

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <section className={["relative w-90" , className].join(" ")}>
      <div className="mb-3 flex flex-row justify-between w-full">
        <h2 className="text-sm font-medium text-foreground/90 md:text-base">
          Project Targets
        </h2>
              <button  className="text-blue-600 hover:underline font-medium text-sm">
        Select Date
      </button>
        
      </div>
      


      <div className="relative">
        {/* Carousel viewport */}
        <div className="overflow-hidden" ref={emblaRef}>
          {/* Carousel container */}
          <div className="flex gap-4">
            {projects.map((p) => (
              <div
                key={p.projectName}
                className="min-w-[50%] flex-shrink-0"
              >
                <ProjectTargets
                  projectName={p.projectName}
                  metrics={p.metrics}
                  className="h-full w-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <button
          onClick={scrollPrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-gray-900 p-2 shadow hover:bg-gray-300"
        >
          ‹
        </button>

        <button
          onClick={scrollNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-gray-900 p-2 shadow hover:bg-gray-300"
        >
          ›
        </button>
      </div>
    </section>
  )
}

export default ProjectTargetsCarousel
