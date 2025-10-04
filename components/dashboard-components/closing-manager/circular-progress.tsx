"use client";

interface CircularProgressProps {
  percentage: number;
  color: string;
  title: string;
  count1: number;
  count2: number;
  label1: string;
  label2: string;
  size?: number;
  strokeWidth?: number;
}

export function CircularProgress({
  percentage,
  color,
  title,
  count1,
  count2,
  label1,
  label2,
  size = 120,
  strokeWidth = 8,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-card rounded-xl shadow-sm border text-card-foreground">
      {/* Title above the circle */}
      <h3 className="text-sm font-medium text-muted-foreground text-center mb-3">
        {title}
      </h3>

      {/* Counts with headings - IMPROVED MOBILE LAYOUT */}
      <div className="flex justify-between items-center w-full mb-4 px-1">
        {/* First count with label */}
        <div className="flex flex-col items-center flex-1 min-w-0">
          <span className="text-xs font-medium text-muted-foreground mb-1 text-center leading-tight">
            {label1}
          </span>
          <div className="text-base sm:text-lg font-semibold text-foreground text-center">
            {count1.toLocaleString()}
          </div>
        </div>
        
        {/* Center arrow - PROPERLY CENTERED */}
        <div className="flex flex-col items-center justify-center flex-1 min-w-0">
          <div className="text-xs font-medium text-muted-foreground mb-1">→</div>
          <div className="text-base sm:text-lg font-semibold text-foreground opacity-0">0</div>
        </div>
        
        {/* Second count with label */}
        <div className="flex flex-col items-center flex-1 min-w-0">
          <span className="text-xs font-medium text-muted-foreground mb-1 text-center leading-tight">
            {label2}
          </span>
          <div className="text-base sm:text-lg font-semibold text-foreground text-center">
            {count2.toLocaleString()}
          </div>
        </div>
      </div>

      {/* Circular progress with responsive sizing */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="hsl(var(--muted))"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl sm:text-2xl font-bold text-foreground">
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  );
}