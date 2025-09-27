import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronDown, ChevronRight } from "lucide-react"

interface TeamCardProps {
  teamName: string;
  taskCount: string;
  percentage: string;
  color?: string;      // main color for text and arrow
  lightColor?: string; // background for rectangular containers
}

export function TeamCard({
  teamName,
  taskCount,
  percentage,
  color = "text-purple-600",
  lightColor = "bg-purple-100",
}: TeamCardProps) {
  return (
    <Card className="rounded-2xl shadow-sm hover:shadow-md transition-shadow bg-white">
      <CardContent className="py-4 px-6">
        {/* Team Name */}
        <div className="flex justify-between mb-4">
          <h3 className={`text-lg font-semibold ${color}`}>{teamName}</h3>

          {/* Right side: Task Count + Percentage + Arrow */}
          <div className="flex flex-col items-center gap-2">
            {/* Task Count Container */}
            <div className={`px-3 py-2 rounded-lg ${lightColor} flex flex-col items-center`}>
              <p className={`text-lg font-bold ${color}`}>{taskCount}</p>
            </div>

            {/* Percentage */}
            <p className={`text-sm ${color}`}>{percentage}</p>

            {/* Arrow Container */}
            <div className={`p-2 rounded-lg ${lightColor}`}>
              <ChevronDown className={`h-4 w-4 ${color}`} />
            </div>
          </div>
        </div>

        {/* Member Avatars */}
      </CardContent>
    </Card>
  )
}