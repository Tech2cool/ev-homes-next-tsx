"use client";

import { Calendar } from "@/components/ui/calendar";

import { OverviewCard } from "@/components/overview-card";
import { ChartCard } from "@/components/chart-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import {
  ArrowRight,
  CalendarCheck,
  DollarSign,
  Users,
  Package,
  LineChartIcon,
  Mail,
  Home,
  ClipboardList,
  CheckCircle,
  XCircle,
  CheckSquare,
} from "lucide-react";
import Link from "next/link";
import { useData } from "@/providers/dataContext";
import { useEffect } from "react";
import { useUser } from "@/providers/userContext";
import { MdOutlineCancel } from "react-icons/md";
import { useRouter } from "next/navigation";

// Dummy data for charts
const overallLeadsData = [
  { name: "Jan", leads: 400, visits: 240, bookings: 100 },
  { name: "Feb", leads: 300, visits: 139, bookings: 120 },
  { name: "Mar", leads: 200, visits: 980, bookings: 200 },
  { name: "Apr", leads: 278, visits: 390, bookings: 150 },
  { name: "May", leads: 189, visits: 480, bookings: 180 },
  { name: "Jun", leads: 239, visits: 380, bookings: 220 },
  { name: "Jul", leads: 349, visits: 430, bookings: 250 },
];

const leadToCpVisitsData = [
  { month: "Jan", leads: 100, cpVisits: 60 },
  { month: "Feb", leads: 120, cpVisits: 70 },
  { month: "Mar", leads: 90, cpVisits: 50 },
  { month: "Apr", leads: 110, cpVisits: 65 },
  { month: "May", leads: 130, cpVisits: 80 },
];

const cpVisitsToBookingsData = [
  { month: "Jan", cpVisits: 60, bookings: 20 },
  { month: "Feb", cpVisits: 70, bookings: 25 },
  { month: "Mar", cpVisits: 50, bookings: 18 },
  { month: "Apr", cpVisits: 65, bookings: 22 },
  { month: "May", cpVisits: 80, bookings: 30 },
];

const leadsToWalkinData = [
  { month: "Jan", leads: 100, walkIns: 15 },
  { month: "Feb", leads: 120, walkIns: 18 },
  { month: "Mar", leads: 90, walkIns: 12 },
  { month: "Apr", leads: 110, walkIns: 16 },
  { month: "May", leads: 130, walkIns: 20 },
];

const walkinToBookingData = [
  { month: "Jan", walkIns: 15, bookings: 5 },
  { month: "Feb", walkIns: 18, bookings: 6 },
  { month: "Mar", walkIns: 12, bookings: 4 },
  { month: "Apr", walkIns: 16, bookings: 5 },
  { month: "May", walkIns: 20, bookings: 7 },
];

export default function DataAnalyzerDashboardPage() {
  // Dummy value for admin check. In a real application, this would come from user authentication.
  const isAdmin = true;
  const { user, loading } = useUser();
  const router = useRouter();

  const {
    fetchSearchLeads,
    searchLeadInfo,
    siteInfo,
    closingManager,
    fetchDataAnalyzerVisits,
    fetchAssignFeedbackLeadsCount,
    // fetchAssignFeedbackLeads,
    assignInfo,
    leadsTeamLeaderGraphForDT,
    fetchTeamLeaderGraphForDA,
  } = useData();

  useEffect(() => {
    if (user && !loading) {
      console.log("use effect dashboard");
      fetchSearchLeads({ query: "", page: 1, limit: 10 });
      fetchDataAnalyzerVisits({ query: "", page: 1, limit: 10 });
      // fetchAssignFeedbackLeads({ query: "", page: 1, limit: 10 });
      fetchTeamLeaderGraphForDA({ interval: "monthly" });
      fetchAssignFeedbackLeadsCount({ query: "", page: 1, limit: 10 });
    }
  }, [user, loading]);

  if (loading || !user) {
    return <div>Loading...</div>; // You can customize the loading state
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-lg md:text-2xl">
          Dashboard Overview
        </h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm md:text-base font-medium px-4 py-2 rounded-md"
          onClick={() => router.push("/tagging-form")}
        >
          Client Tagging Form
        </button>
      </div>

      {/* Leads Overview */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Leads Overview</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          <OverviewCard
            title="Total Leads"
            value={searchLeadInfo?.totalItems ?? 0}
            // description="+20.1% from last month"
            linkHref="/lead-details?status=all"
            linkText="View all leads"
            icon={Users}
            iconColorClass="text-blue-500"
          />
          <OverviewCard
            title="Approved"
            value={searchLeadInfo?.approvedCount ?? 0}
            // description="+15% from last month"
            linkHref="/lead-details?status=visit-done"
            linkText="View approved leads"
            icon={CalendarCheck}
            iconColorClass="text-purple-500"
          />
          <OverviewCard
            title="Rejected"
            value={searchLeadInfo?.rejectedCount ?? 0}
            // description="+5% from last month"
            linkHref="/lead-details?status=walk-in"
            linkText="View rejected leads"
            icon={MdOutlineCancel}
            iconColorClass="text-red-500"
          />
          <OverviewCard
            title="Pending"
            value={searchLeadInfo?.pendingCount ?? 0}
            // description="+10% from last month"
            linkHref="/dashboard/leads?status=internal"
            linkText="View pending leads"
            icon={Mail}
            iconColorClass="text-yellow-500"
          />
          <OverviewCard
            title="Bulk Leads"
            value={searchLeadInfo?.bulkCount ?? 0}
            // description="+25% from last month"
            linkHref="/dashboard/leads?status=bookings"
            linkText="View bulk leads"
            icon={Users}
            iconColorClass="text-teal-500"
          />
        </div>
      </section>

      {/* Visit Overview */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Visit Overview</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <OverviewCard
            title="Total Visits"
            value={siteInfo?.totalItems ?? 0}
            // description="+10% from last month"
            linkHref="/visit-details"
            linkText="View all visits"
            icon={Home}
            iconColorClass="text-indigo-500"
          />
          <OverviewCard
            title="Approved"
            value={siteInfo?.approvedCount ?? 0}
            // description="+8% from last month"
            linkHref="/dashboard/visits?status=virtual"
            linkText="View approved visits"
            icon={CalendarCheck}
            iconColorClass="text-pink-500"
          />
          <OverviewCard
            title="Rejected"
            value={siteInfo?.rejectedCount ?? 0}
            // description="+12% from last month"
            linkHref="/dashboard/visits?status=physical"
            linkText="View rejected visits"
            icon={Home}
            iconColorClass="text-cyan-500"
          />
          <OverviewCard
            title="Pending"
            value={siteInfo?.pendingCount ?? 0}
            // description="+7% from last month"
            linkHref="/dashboard/visits?status=revisits"
            linkText="View pending visits"
            icon={ArrowRight}
            iconColorClass="text-lime-500"
          />
        </div>
      </section>

      {/* Attention Section (only for admins) */}
      {isAdmin && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Attention Required</h2>
          <div className="grid gap-4 md:grid-cols-2">
           {closingManager.map((leader) => (
  <Card key={leader.data} className="bg-card text-card-foreground">
    <CardHeader className="p-4 pb-2">
      {/* <CardTitle className="text-base text-wrap">
        {leader.teamLeader.firstName} {leader.teamLeader.lastName}
      </CardTitle> */}
    </CardHeader>
    <CardContent className="p-4 pt-0">
      <p className="text-sm">Feedback Pending:</p>
      <p className="text-2xl font-bold text-red-500">
        {leader.notFollowUpCount}
      </p>
      <p className="text-sm mt-2">Assign Pending:</p>
      <p className="text-2xl font-bold text-orange-500">
        {leader.notAssignedCount}
      </p>
    </CardContent>
  </Card>
))}

          </div>
        </section>
      )}

      {/* Graphs Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Leads Analytics</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartCard
            title="Overall Leads Performance"
            description="Total Leads, Visits, and Bookings over time."
            chartComponent={
              <LineChart data={leadsTeamLeaderGraphForDT}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="teamLeader"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 7)}
                />
                <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Line
                  dataKey="count"
                  type="monotone"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={false}
                />
                {/* <Line
                  dataKey="count"
                  type="monotone"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="count"
                  type="monotone"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  dot={false}
                /> */}
              </LineChart>
            }
          />

          <div className="grid gap-6 md:grid-cols-2">
            <ChartCard
              title="Lead to CP Visits"
              description="Conversion from Leads to CP Visits."
              chartComponent={
                <BarChart data={leadToCpVisitsData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Bar dataKey="leads" fill="hsl(var(--chart-1))" radius={8} />
                  <Bar
                    dataKey="cpVisits"
                    fill="hsl(var(--chart-2))"
                    radius={8}
                  />
                </BarChart>
              }
            />
            <ChartCard
              title="CP Visits to Bookings"
              description="Conversion from CP Visits to Bookings."
              chartComponent={
                <BarChart data={cpVisitsToBookingsData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Bar
                    dataKey="cpVisits"
                    fill="hsl(var(--chart-2))"
                    radius={8}
                  />
                  <Bar
                    dataKey="bookings"
                    fill="hsl(var(--chart-3))"
                    radius={8}
                  />
                </BarChart>
              }
            />
            <ChartCard
              title="Leads to Walk-in"
              description="Conversion from Leads to Walk-in."
              chartComponent={
                <BarChart data={leadsToWalkinData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Bar dataKey="leads" fill="hsl(var(--chart-1))" radius={8} />
                  <Bar
                    dataKey="walkIns"
                    fill="hsl(var(--chart-4))"
                    radius={8}
                  />
                </BarChart>
              }
            />
            <ChartCard
              title="Walk-in to Booking"
              description="Conversion from Walk-in to Booking."
              chartComponent={
                <BarChart data={walkinToBookingData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent />}
                  />
                  <Bar
                    dataKey="walkIns"
                    fill="hsl(var(--chart-4))"
                    radius={8}
                  />
                  <Bar
                    dataKey="bookings"
                    fill="hsl(var(--chart-3))"
                    radius={8}
                  />
                </BarChart>
              }
            />
          </div>
        </div>
      </section>
    </div>
  );
}
