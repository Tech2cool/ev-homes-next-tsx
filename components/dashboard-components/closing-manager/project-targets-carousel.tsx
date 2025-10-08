"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import ProjectTargets from "./project-targets";
import { GrNext, GrPrevious } from "react-icons/gr";

type Metric = {
  label: "Target" | "Booking" | "Registration" | (string & {});
  count: number | string;
};

type ProjectCard = {
  projectName: string;
  metrics: Metric[];
};

interface ProjectTargetsCarouselProps {
  projects: ProjectCard[];
  className?: string;
  showDate?: boolean; // 👈 added this
  setShowDate?: React.Dispatch<React.SetStateAction<boolean>>; // 👈 added this
}

export function ProjectTargetsCarousel({
  projects,
  className = "",
  showDate,
  setShowDate,
}: ProjectTargetsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
  });

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <section className={["absoulte w-full", className].join(" ")}>
      <div className="mb-3 flex flex-row justify-between w-full">
        <h2 className="text-sm font-medium text-foreground/90 md:text-base">
          Project Targets
        </h2>
        <button
          className="text-yellow  border border-blue-600 px-4 py-2 rounded-md font-medium text-sm hover:bg-blue-50  hover:text-black transition-all duration-200"
          onClick={() => setShowDate?.((prev) => !prev)}
        >
          Select Date
        </button>
      </div>

      <div className="relative ">
        {/* Carousel viewport */}
        <div className="overflow-hidden width-full" ref={emblaRef}>
          {/* Carousel container */}
          <div className="flex gap-4  ">
            {projects.map((p) => (
              <div key={p.projectName} className="min-w-[100%] flex-shrink-0">
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
          className="absolute left-[-30px] top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow hover:bg-gray-300 h-7 w-7 flex justify-center items-center  ml-0.5"
        >
          <GrPrevious color="black" />
        </button>

        <button
          onClick={scrollNext}
          className="absolute right-[-30px] top-1/2 -translate-y-1/2 rounded-full bg-white p-2 shadow hover:bg-gray-300 h-7 w-7 flex justify-center items-center "
        >
          <GrNext color="black" />
        </button>
      </div>
    </section>
  );
}

export default ProjectTargetsCarousel;
