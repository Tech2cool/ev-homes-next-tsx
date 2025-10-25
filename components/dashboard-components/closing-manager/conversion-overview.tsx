import { useData } from "@/providers/dataContext";
import { useUser } from "@/providers/userContext";
import { useEffect } from "react";

type ConversionOverviewProps = {
  leads: number;
  bookings: number;
  visits: number;
};

function clamp01(n: number) {
  if (Number.isNaN(n) || !Number.isFinite(n)) return 0;
  return Math.max(0, Math.min(1, n));
}

function Ring({
  r,
  color,
  progress,
  strokeWidth = 10,
}: {
  r: number;
  color: string;
  progress: number;
  strokeWidth?: number;
}) {
  const C = 2 * Math.PI * r;
  const p = clamp01(progress);
  const dasharray = C;
  const dashoffset = C * (1 - p);

  return (
    <>
      {/* background track */}
      <circle
        cx="112"
        cy="112"
        r={r}
        stroke="#e5e7eb"
        strokeWidth={strokeWidth}
        fill="transparent"
      />
      {/* value arc */}
      <circle
        cx="112"
        cy="112"
        r={r}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="transparent"
        strokeDasharray={dasharray}
        strokeDashoffset={dashoffset}
        strokeLinecap="round"
        className="transition-[stroke-dashoffset] duration-700 ease-out"
      />
    </>
  );
}

export function ConversionOverview({
  leads,
  bookings,
  visits,
}: ConversionOverviewProps) {
  const { dashCount, getClosingManagerDashBoardCount } = useData();
  const { user, loading } = useUser();

  useEffect(() => {
    if (user && !loading) {
      console.log("use effect dashboard");
      getClosingManagerDashBoardCount({ id: user?._id ?? null });
    }
  }, [user, loading]);

  const safeLeads = Math.max(0, leads || 0);
  const safeBookings = Math.max(0, bookings || 0);
  const safeVisits = Math.max(0, visits || 0);

  // Rates relative to leads; capped at 100%
  const bookingRate = safeLeads > 0 ? clamp01(safeBookings / safeLeads) : 0;
  const visitRate = safeLeads > 0 ? clamp01(safeVisits / safeLeads) : 0;

  const safeDivision = (numerator: number, denominator: number): number => {
    if (!denominator || denominator === 0) return 0;
    return +(numerator / denominator).toFixed(1);
  };

  // KPI list for the right side
  const overview = [
     {
      title: "Visits",
      percentage: safeDivision(
        ((dashCount?.lead?.visit1 ?? 0) + (dashCount?.lead?.visit2 ?? 0)) * 100,
        dashCount?.lead?.total ?? 0
      ),

      color: "#06b6d4",
    },
   
    {
      title: "Bookings",
      percentage: safeDivision(
        (dashCount?.lead?.booking ?? 0) * 100,
        (dashCount?.lead?.visit1 ?? 0) + (dashCount?.lead?.visit2 ?? 0)
      ),
      color: "#8b5cf6",
    },
     {
      title: "Overall",
      percentage: safeDivision(
        (dashCount?.lead?.booking ?? 0) * 100,
        dashCount?.lead?.total ?? 0
      ),
      color: "#3b82f6",
    }, 
   
  ];

  return (
    <div className="">
      {/* Title for right */}
      <h2 className="text-xl font-semibold text-foreground mb-6">
        Conversion Overview
      </h2>

      <div className="bg-card text-card-foreground rounded-xl shadow-sm p-2 border">
        <div className="flex flex-col lg:flex-row items-center gap-0">
          {/* Chart */}
          <div className="relative flex-shrink-0">
            <div className="relative w-78 h-78 ml-6 ">
              <svg
                className="absolute inset-0 w-70 h-70 transform -rotate-90"
                viewBox="0 0 224 224"
                role="img"
                aria-label={`Leads ${safeLeads}, Bookings ${safeBookings} (${Math.round(
                  bookingRate * 100
                )}%), Visits ${safeVisits} (${Math.round(visitRate * 100)}%)`}
              >
                {/* Outer: Leads (full circle) */}
                <Ring r={95} color="#3b82f6" progress={1} />

                {/* Middle: Bookings rate vs Leads */}
                <Ring r={75} color="#8b5cf6" progress={bookingRate} />

                {/* Inner: Visits rate vs Leads */}
                <Ring r={55} color="#06b6d4" progress={visitRate} />
              </svg>

              {/* Center text */}
              <div className="absolute inset-0 mb-10 mr-7  flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold ">
                    {safeLeads.toLocaleString()}
                  </div>
                  <div className="text-xs font-medium  mt-0">TOTAL LEADS</div>
                </div>
              </div>
            </div>
          </div>

          {/* Metrics beside chart */}
          <div className="flex-1 space-y-1 mr-3 ml-0">
            {overview.map((kpi, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2"
              >
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: kpi.color }}
                  />
                  <span className="text-xs font-medium  uppercase tracking-wide">
                    {kpi.title}
                  </span>
                </div>
                <span className="text-base ml-5 font-bold ">
                  {kpi.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom badges */}
        <div className="flex flex-wrap gap-3 border-t border-gray-100 pt-3">
          <div className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 rounded-md text-sm">
            <span className="font-bold">{safeLeads.toLocaleString()}</span>
            <span>Leads</span>
          </div>
          <div className="flex items-center gap-1 bg-purple-600 text-white px-3 py-1 rounded-md text-sm">
            <span className="font-bold">{safeBookings.toLocaleString()}</span>
            <span>Bookings</span>
          </div>
          <div className="flex items-center gap-1 bg-cyan-500 text-white px-3 py-1 rounded-md text-sm">
            <span className="font-bold">{safeVisits.toLocaleString()}</span>
            <span>Visits</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConversionOverview;
