import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

interface OverviewCardProps {
  title: string
  value: string | number
  description?: string
  linkHref?: string
  linkText?: string
  icon?: React.ElementType
  iconColorClass?: string
}

export function OverviewCard({
  title,
  value,
  description,
  linkHref,
  linkText,
  icon: Icon,
  iconColorClass,
}: OverviewCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {Icon && <Icon className={`h-4 w-4 text-muted-foreground ${iconColorClass}`} />}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && <p className="text-xs text-muted-foreground">{description}</p>}
        {linkHref && linkText && (
          <Link href={linkHref} className="text-xs text-primary hover:underline mt-1 block">
            {linkText}
          </Link>
        )}
      </CardContent>
    </Card>
  )
}
