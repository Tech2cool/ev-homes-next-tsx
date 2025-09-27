import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, TrendingDown } from "lucide-react"
import styles from "./dashboard.module.css";

interface MetricCardProps {
  title: string;
  value: string;
  isPositive: boolean;
  icon: React.ReactNode;
  iconColor: string; // e.g., text-blue-600
  iconBg: string; // e.g., bg-blue-100
  gradientFrom?: string; // optional, for gradient if needed
  gradientTo?: string;
}

export function MetricCard({
  title,
  value,
  icon,
  iconColor,
  iconBg,
  gradientFrom = "from-white",
  gradientTo = "to-white",
}: MetricCardProps) {
  return (
    <Card
      className={`border-border`}
      style={{
        background: `linear-gradient(to bottom right, ${iconBg.replace(
          "bg-",
          ""
        )}33, ${iconBg.replace("bg-", "")}66)`,
      }}
    >
      <CardContent style={{ paddingTop: "0rem", paddingBottom: "0rem" }}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            {/* Icon inside a square box */}
            <div className={`w-10 h-10 flex items-center justify-center rounded-lg ${iconBg}`}>
              <div className={`${iconColor} text-lg`}>{icon}</div>
            </div>
            <span className={styles.metricTitle}>{title}</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className={`text-xl font-bold ${iconColor}`}>{value}</div>
        </div>
      </CardContent>
    </Card>
  );
}
