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
   <div className="flex flex-col items-center justify-center p-10 bg-white rounded-xl shadow-sm border border-gray-100 ">

      {/* Title above the circle */}
      <h3 className="text-sm font-medium text-gray-600 text-center mb-4">
        {title}
      </h3>

      {/* Counts with headings above the circle */}
      <div className="flex justify-between items-center w-full mb-4 px-2">
        <div className="flex flex-col items-center">
          <span className="text-xs font-medium text-gray-500 mb-1">{label1}</span>
          <div className="text-lg font-semibold text-gray-800">{count1.toLocaleString()}</div>
        </div>
        
        <div className="flex flex-col items-center mx-4">
          <span className="text-xs font-medium text-gray-500 mb-1">→</span>
          <div className="text-lg font-semibold text-gray-800 opacity-0">-</div> {/* Spacer for alignment */}
        </div>
        
        <div className="flex flex-col items-center">
          <span className="text-xs font-medium text-gray-500 mb-1">{label2}</span>
          <div className="text-lg font-semibold text-gray-800">{count2.toLocaleString()}</div>
        </div>
      </div>

      {/* Circular progress */}
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
            stroke="#f3f4f6"
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
          <span className="text-2xl font-bold text-gray-800">
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  );
}