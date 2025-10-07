type Metric = {
  label: "Target" | "Booking" | "Registration" | (string & {})
  count: number | string
}

export function ProjectTargets({
  projectName,
  metrics = [
    { label: "Target", count: 0 },
    { label: "Booking", count: 0 },
    { label: "Registration", count: 0 },
  ],
  className = "",
}: {
  projectName: string
  metrics?: Metric[]
  className?: string
}) {
  return (
    <section
      aria-labelledby="project-targets-title"
      className={["relative z-[1] rounded-lg border bg-background p-4 md:p-5", "shadow-sm", className].join(" ")}
    >
      <header className="mb-3">
        {/* <h2 id="project-targets-title" className="text-sm font-medium text-foreground/90 md:text-base">
          Project Targets
        </h2> */}
        <div className="mt-2">
          <span
            className="inline-flex items-center rounded-md bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground"
            aria-label="Project name"
            title={projectName}
          >
            {projectName}
          </span>
        </div>
      </header>

      {/* Tiles: count above name, matching the screenshot intent */}
      <div className="grid grid-cols-3 gap-2 md:gap-3" role="list" aria-label="Project target metrics">
        {metrics.slice(0, 3).map((m) => (
          <div key={m.label} role="listitem" className="rounded-md border bg-card p-3 text-center">
            <div className="text-base font-semibold text-foreground md:text-lg" aria-label={`${m.label} count`}>
              {m.count}
            </div>
            <div className="mt-1 text-xs font-medium text-muted-foreground md:text-sm">{m.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ProjectTargets
