"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import styles from "./reportssection.module.css";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { FaFilter } from "react-icons/fa";
import FunnelCart from "./Funnelcart"

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface TeamLeaderData {
  name: string;
  value: number;
}

interface ChannelPartnerData {
  name: string;
  count: number;
}

interface ChartState {
  series: ApexAxisChartSeries;
  options: ApexCharts.ApexOptions;
  cpChart?: {
    series: ApexAxisChartSeries;
    options: ApexCharts.ApexOptions;
  };
}

// Dummy Data

const teamLeaderData: TeamLeaderData[] = [
  { name: "Deepak Karki", value: 400 },
  { name: "Jaspreet Arora", value: 300 },
  { name: "Vicky MAne", value: 300 },
];

const channelPartnerData: ChannelPartnerData[] = [
  { name: "Partner A", count: 400 },
  { name: "Partner B", count: 98 },
  { name: "Partner C", count: 500 },
  { name: "Partner D", count: 200 },
  { name: "Partner E", count: 300 },
  { name: "Partner F", count: 600 },
  { name: "Partner G", count: 1000 },
  { name: "Partner H", count: 150 },
  { name: "Partner I", count: 460 },
  { name: "Partner J", count: 710 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const ReportsSection: React.FC = () => {
  const [showFilter, setshowFilter] = useState(false);
  const [leadfilter, setleadfilter] = useState(false);
  const [leaderFilter, setleaderFilter] = useState(false);
  const [selectedFilter, setselectedFilter] = useState("Monthly");
  const [leadfilteSelect, setleadfilteSelect] = useState("Monthly");
  const [leaderSelect, setleaderSelect] = useState("Monthly");
  const [isDesktop, setIsDesktop] = useState(false);

  const [chartState, setChartState] = useState<ChartState>({
    series: [],
    options: {},
  });

  useEffect(() => {
    const checkScreenSize = () => setIsDesktop(window.innerWidth > 615);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleFilterChange = (value: string) => {
    setselectedFilter(value);
    setshowFilter(false);
  };
  const leadFilterChange = (value: string) => {
    setleadfilteSelect(value);
    setleadfilter(false);
  };
  const leaderFilterChange = (value: string) => {
    setleaderSelect(value);
    setleaderFilter(false);
  };

  useEffect(() => {
    const monthlyLeadsData = [
      { month: "Jan", leads: 2286 },
      { month: "Feb", leads: 2895 },
      { month: "Mar", leads: 3191 },
      { month: "Apr", leads: 3085 },
      { month: "May", leads: 2026 },
    ];

    const categories = monthlyLeadsData.map((item) => item.month);
    const data = monthlyLeadsData.map((item) => item.leads);

    const sortedChannelPartnerData = [...channelPartnerData].sort(
      (a, b) => b.count - a.count
    );
    const cpNames = sortedChannelPartnerData.map((item) => item.name);
    const cpCounts = sortedChannelPartnerData.map((item) => item.count);

    setChartState({
      series: [{ name: "Leads", data }],
      options: {
        chart: {
          height: 350,
          type: "line",
          toolbar: {
            show: true,
            tools: {
              download: false,
              selection: false,
              zoom: false,
              zoomin: true,
              zoomout: true,
              pan: false,
              reset: false,
            }
          },
        },
        stroke: { width: 3, curve: "smooth" },
        xaxis: { categories, title: { text: "Month" } },
        yaxis: { title: { text: "Total Leads" } },
        title: {
          text: "Leads Over Month",
          align: "left",
          style: { fontSize: "15px", color: "#8a8a8a" },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            gradientToColors: ["#FDD835"],
            shadeIntensity: 1,
            type: "horizontal",
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
          },
        },
        tooltip: {
          custom: ({ series, seriesIndex, dataPointIndex }) =>
            `<div style="color: black; padding: 6px;">Leads: ${series[seriesIndex][dataPointIndex]
            }</div>`,
        },
      },
      cpChart: {
        series: [{ name: "Count", data: cpCounts }],
        options: {
          chart: { type: "bar", height: 300, toolbar: { show: false } },
          plotOptions: {
            bar: {
              horizontal: true,
              borderRadius: 4,
              dataLabels: { position: "right" },
            },
          },
          dataLabels: {
            enabled: true,
            formatter: (_, opt) => `${cpNames[opt.dataPointIndex]}: ${cpCounts[opt.dataPointIndex]}`,
            style: { fontSize: "10px", colors: ["#d2cfcf"] },
          },
          xaxis: { categories: cpNames, title: { text: "Count" } },
          yaxis: { title: { text: "Channel Partners" } },
        },
      },
    });
  }, []);

  return (
    <div className={styles.container}>
      {/* Line Chart */}
      <div className={styles.firstContainer}>
        <div className={styles.leadsMonth}>
          {chartState.series.length > 0 && (
            <ReactApexChart
              options={chartState.options}
              series={chartState.series}
              type="line"
              height="100%"
            />
          )}
        </div>

        {/* Team Leader Pie Chart */}
        <div className={styles.teamLeader}>
          <div className={styles.teamLeaderheading}>
            <span>Team Leader Report</span>
            <div className={styles.filterWrapper}>
              <FaFilter onClick={() => setleaderFilter(!leaderFilter)} style={{ cursor: "pointer" }} />
              {leaderFilter && (
                <div className={styles.filterDropdown}>
                  {["Weekly", "Monthly", "Quarterly", "Semi-Annually", "Annually"].map((Item) => (
                    <div key={Item} className={styles.filterOption} onClick={() => leaderFilterChange(Item)}>
                      {Item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.chartAndLegend}>
            <ResponsiveContainer width="50%" height={isDesktop ? 200 : 150}>
              <PieChart>
                <Pie
                  data={teamLeaderData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={isDesktop ? 45 : 25}
                  outerRadius={isDesktop ? 70 : 40}
                  fill="#8884d8"
                  label
                >
                  {teamLeaderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>

            <div className={styles.legend}>
              <div className={styles.total}>Total : 500</div>
              {teamLeaderData.map((item, idx) => (
                <div className={styles.legendItem} key={idx}>
                  <span className={styles.colorDot} style={{ backgroundColor: COLORS[idx % COLORS.length] }}></span>
                  <span className={styles.legendText}>{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Channel Partner Bar Chart */}
      <div className={styles.secondContainer}>
        <div className={styles.channelPartner}>
          <div className={styles.channelPartnerheading}>
            <span>Channel Partner Report</span>
            <div className={styles.filterWrapper}>
              <FaFilter onClick={() => setshowFilter(!showFilter)} style={{ cursor: "pointer" }} />
              {showFilter && (
                <div className={styles.filterDropdown}>
                  {["Weekly", "Monthly", "Quarterly", "Semi-Annually", "Annually"].map((Item) => (
                    <div key={Item} className={styles.filterOption} onClick={() => handleFilterChange(Item)}>
                      {Item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.chartScrollWrapper}>
            {chartState.cpChart && (
              <ReactApexChart
                options={chartState.cpChart.options}
                series={chartState.cpChart.series}
                type="bar"
                height={channelPartnerData.length * 32}
              />
            )}
          </div>
        </div>

        <div >
          <FunnelCart />
        </div>
      </div>
    </div>
  );
};

export default ReportsSection;
