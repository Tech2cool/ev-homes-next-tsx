import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart" // Assuming this is the shadcn chart container
import type React from "react" // Import React for React.ReactNode type

interface ChartCardProps {
  title: string
  chartComponent: React.ReactNode
  description?: string
}

export function ChartCard({ title, chartComponent, description }: ChartCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="aspect-video">
          {chartComponent}
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
