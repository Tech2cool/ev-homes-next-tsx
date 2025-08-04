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
} from "lucide-react";
import Link from "next/link";
import { useData } from "@/providers/dataContext";
import { useEffect } from "react";
import { useUser } from "@/providers/userContext";

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

export default function DashboardPage() {
  // Dummy value for admin check. In a real application, this would come from user authentication.
  const isAdmin = true;
  const { user, loading } = useUser();

  const {
    leadInfo,
    fetchSaleExecutiveLeads,
    siteInfo,
    fetchDataAnalyzerVisits,
    dashCount,
    getSalesManagerDashBoardCount,
  } = useData();

  useEffect(() => {
    if (user && !loading) {
      console.log("use effect dashboard");
      fetchSaleExecutiveLeads({ id: user?._id, query: "", page: 1, limit: 10 });
      fetchDataAnalyzerVisits({ query: "", page: 1, limit: 10 });
      getSalesManagerDashBoardCount({  id: user?._id ?? null});


    }
  }, [user, loading]);

  if (loading || !user) {
    return <div>Loading...</div>; // You can customize the loading state
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="flex items-center gap-4">
        <h1 className="font-semibold text-lg md:text-2xl">
          Dashboard Overview
        </h1>
      </div>

      {/* Leads Overview */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Leads Overview</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <OverviewCard
            title="Total Leads"
            value={dashCount?.lead?.total ?? 0}
            description="+20.1% from last month"
            linkHref="/lead-details"
            linkText="View all leads"
            icon={Users}
            iconColorClass="text-blue-500"
          />
          <OverviewCard
            title="CP Visits"
            value={dashCount?.lead?.visit1 ?? 0}
            description="+15% from last month"
            linkHref="/dashboard/leads?status=cp-visits"
            linkText="View CP visits"
            icon={CalendarCheck}
            iconColorClass="text-green-500"
          />
          <OverviewCard
            title="Walk-in Leads"
            value={dashCount?.lead?.visit2 ?? 0}
            description="+5% from last month"
            linkHref="/dashboard/leads?status=walk-in"
            linkText="View walk-ins"
            icon={ArrowRight}
            iconColorClass="text-purple-500"
          />
          <OverviewCard
            title="Internal Leads"
            value={dashCount?.lead?.internalLeadCount ?? 0}
            description="+10% from last month"
            linkHref="/dashboard/leads?status=internal"
            linkText="View internal leads"
            icon={Mail}
            iconColorClass="text-yellow-500"
          />
          <OverviewCard
            title="Bookings"
            value={dashCount?.lead?.booking ?? 0}
            description="+25% from last month"
            linkHref="/dashboard/leads?status=bookings"
            linkText="View bookings"
            icon={DollarSign}
            iconColorClass="text-teal-500"
          />
          <OverviewCard
            title="Bulk Leads"
            value={dashCount?.lead?.bulkCount ?? 0}
            description="New bulk leads this week"
            linkHref="/dashboard/leads?status=bulk"
            linkText="View bulk leads"
            icon={Users}
            iconColorClass="text-orange-500"
          />
        </div>
      </section>

      {/* Visit Overview */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Visit Overview</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <OverviewCard
            title="Total Visits"
            value= {siteInfo?.totalItems?? 0}
            description="+10% from last month"
            linkHref="/dashboard/visits?status=total"
            linkText="View all visits"
            icon={Home}
            iconColorClass="text-indigo-500"
          />
          <OverviewCard
            title="Virtual Meetings"
            value="0"
            description="+8% from last month"
            linkHref="/dashboard/visits?status=virtual"
            linkText="View virtual meetings"
            icon={CalendarCheck}
            iconColorClass="text-pink-500"
          />
          <OverviewCard
            title="Physical Visits"
            value={siteInfo?.visitCount?? 0}
            description="+12% from last month"
            linkHref="/dashboard/visits?status=physical"
            linkText="View physical visits"
            icon={Home}
            iconColorClass="text-cyan-500"
          />
          <OverviewCard 
            title="Revisits"
            value={siteInfo?.revisitCount?? 0}
             description="+7% from last month"
            linkHref="/dashboard/visits?status=revisits"
            linkText="View revisits"
            icon={ArrowRight}
            iconColorClass="text-lime-500"
          />
        </div>
      </section>

      {/* Task Overview */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Task Overview</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <OverviewCard
            title="Total Tasks"
            value={dashCount?.task?.total??0}
            // description="5 new tasks this week"
            linkHref="/dashboard/tasks?status=total"
            linkText="View all tasks"
            icon={ClipboardList}
            iconColorClass="text-gray-500"
          />
          <OverviewCard
            title="Completed Tasks"
            value={dashCount?.task?.completed?? 0}
            // description="80% completion rate"
            linkHref="/dashboard/tasks?status=completed"
            linkText="View completed tasks"
            icon={CheckCircle}
            iconColorClass="text-emerald-500"
          />
          <OverviewCard
            title="Pending Tasks"
            value={dashCount?.task?.pending?? 0}
            // description="Action required"
            linkHref="/dashboard/tasks?status=pending"
            linkText="View pending tasks"
            icon={XCircle}
            iconColorClass="text-red-500"
          />
        </div>
      </section>

      {/* Attention Section (only for admins) */}
      {isAdmin && (
        <section>
          <h2 className="text-xl font-semibold mb-4">Attention Required</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="bg-card text-card-foreground">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base text-wrap">
                  Feedback Pending
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-4xl font-bold text-red-500">5</p>
                <Link
                  href="/dashboard/feedback"
                  className="text-sm text-primary hover:underline mt-2 block"
                >
                  Review feedback
                </Link>
              </CardContent>
            </Card>
            <Card className="bg-card text-card-foreground">
              <CardHeader className="p-4 pb-2">
                <CardTitle className="text-base text-wrap">
                  Assign Pending
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-4xl font-bold text-orange-500">3</p>
                <Link
                  href="/dashboard/assignments"
                  className="text-sm text-primary hover:underline mt-2 block"
                >
                  View assignments
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Quick Access Buttons */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Quick Access</h2>
        <Card>
          <CardContent className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button asChild variant="outline">
              <Link href="/dashboard/inventory">
                <Package className="mr-2 h-4 w-4" /> Inventory
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard/reminders">
                {/* <Calendar className="mr-2 h-4 w-4" /> */}
                My Reminders
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard/reports">
                <LineChartIcon className="mr-2 h-4 w-4" /> Reports
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard/settings">
                <Users className="mr-2 h-4 w-4" /> Team Settings
              </Link>
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Graphs Section */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Leads Analytics</h2>
        <div className="grid gap-6 lg:grid-cols-2">
          <ChartCard
            title="Overall Leads Performance"
            description="Total Leads, Visits, and Bookings over time."
            chartComponent={
              <LineChart data={overallLeadsData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <YAxis />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <Line
                  dataKey="leads"
                  type="monotone"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="visits"
                  type="monotone"
                  stroke="hsl(var(--chart-2))"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  dataKey="bookings"
                  type="monotone"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  dot={false}
                />
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
