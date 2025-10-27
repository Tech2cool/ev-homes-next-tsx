"use client";
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import styles from "./reportssection.module.css";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { FaFilter } from "react-icons/fa";
import FunnelCart from "./Funnelcart";
import { useUser } from "@/providers/userContext";
import { useData } from "@/providers/dataContext";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

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

// const teamLeaderData: TeamLeaderData[] = [
//   { name: "Deepak Karki", value: 400 },
//   { name: "Jaspreet Arora", value: 300 },
//   { name: "Vicky MAne", value: 300 },
// ];

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
  const {
    leadsTeamLeaderGraphForDT,
    fetchTeamLeaderGraphForDA,
  } = useData();
  const { user, loading } = useUser();
  const [showFilter, setshowFilter] = useState(false);
  const [leadfilter, setleadfilter] = useState(false);
  const [leaderFilter, setleaderFilter] = useState(false);
  const [selectedFilter, setselectedFilter] = useState("Monthly");
  const [leadfilteSelect, setleadfilteSelect] = useState("Monthly");
  const [leaderSelect, setleaderSelect] = useState("Monthly");
  const [isDesktop, setIsDesktop] = useState(false);

  const [teamLeaderData, setTeamLeaderData] = useState<TeamLeaderData[]>([]);
    const [channelPartnerData, setChannelPartnerData] = useState<ChannelPartnerData[]>([]);
  const [totalLeads, setTotalLeads] = useState<number>(0);
  const [loadingChart, setLoadingChart] = useState<boolean>(true);

  useEffect(() => {
    fetchTeamLeaderData();
  }, []);

  const fetchTeamLeaderData = async (interval: string = "Monthly") => {
    try {
      setLoadingChart(true);
      console.log("Fetching data with interval:", interval);

      const result = await fetchTeamLeaderGraphForDA({
        interval: interval.toLowerCase(),
      });

      console.log("API result:", result);
      console.log("Chart data from context:", leadsTeamLeaderGraphForDT);

      if (result.success) {
        // Check if we have data and transform it
        if (leadsTeamLeaderGraphForDT && leadsTeamLeaderGraphForDT.length > 0) {
          // Log the actual structure of the data
          console.log("Raw API data structure:", leadsTeamLeaderGraphForDT[0]);

          // Try different possible field mappings based on your Flutter model
          const transformedData = leadsTeamLeaderGraphForDT
            .map((item: any, index: number) => {
              // Try different possible field names from the API
              const name =
                item.category ||
                item.name ||
                item.teamLeader ||
                `Team ${index + 1}`;
              const value =
                item.value || item.count || item.leadCount || item.total || 0;

              console.log(`Item ${index}:`, { name, value, rawItem: item });

              return {
                name: name,
                value: value,
              };
            })
            .filter((item) => item.value > 0); // Filter out items with 0 value

          console.log("Transformed data:", transformedData);

          if (transformedData.length > 0) {
            setTeamLeaderData(transformedData);
            const total = transformedData.reduce(
              (sum, item) => sum + item.value,
              0
            );
            setTotalLeads(total);
          } else {
            // If no valid data, use fallback
            useFallbackData();
          }
        } else {
          // If no data from API, use fallback data
          console.log("No data from API, using fallback data");
          useFallbackData();
        }
      } else {
        console.error("Failed to fetch team leader data:", result.message);
        useFallbackData();
      }
    } catch (error) {
      console.error("Error fetching team leader data:", error);
      useFallbackData();
    } finally {
      setLoadingChart(false);
    }
  };

  const useFallbackData = () => {
    setTeamLeaderData([
      { name: "Deepak Karki", value: 400 },
      { name: "Jaspreet Arora", value: 300 },
      { name: "Vicky Mane", value: 300 },
    ]);
    setTotalLeads(1000);
  };

  const leaderFilterChange = async (interval: string) => {
    setleaderFilter(false);
    await fetchTeamLeaderData(interval);
  };

  // Add this useEffect to update when leadsTeamLeaderGraphForDT changes
  useEffect(() => {
    console.log(
      "leadsTeamLeaderGraphForDT updated:",
      leadsTeamLeaderGraphForDT
    );

    if (leadsTeamLeaderGraphForDT && leadsTeamLeaderGraphForDT.length > 0) {
      const transformedData = leadsTeamLeaderGraphForDT
        .map((item: any, index: number) => {
          const name =
            item.category ||
            item.name ||
            item.teamLeader ||
            `Team ${index + 1}`;
          const value =
            item.value || item.count || item.leadCount || item.total || 0;
          return { name, value };
        })
        .filter((item) => item.value > 0);

      if (transformedData.length > 0) {
        setTeamLeaderData(transformedData);
        const total = transformedData.reduce(
          (sum, item) => sum + item.value,
          0
        );
        setTotalLeads(total);
      }
    }
  }, [leadsTeamLeaderGraphForDT]);

  // Debug: Log the current state
  useEffect(() => {
    console.log("Current teamLeaderData:", teamLeaderData);
    console.log(
      "Current leadsTeamLeaderGraphForDT:",
      leadsTeamLeaderGraphForDT
    );
  }, [teamLeaderData, leadsTeamLeaderGraphForDT]);

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
  // const leaderFilterChange = (value: string) => {
  //   setleaderSelect(value);
  //   setleaderFilter(false);
  // };

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
            },
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
            `<div style="color: black; padding: 6px;">Leads: ${series[seriesIndex][dataPointIndex]}</div>`,
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
            formatter: (_, opt) =>
              `${cpNames[opt.dataPointIndex]}: ${cpCounts[opt.dataPointIndex]}`,
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
              <FaFilter
                onClick={() => setleaderFilter(!leaderFilter)}
                style={{ cursor: "pointer" }}
              />
              {leaderFilter && (
                <div className={styles.filterDropdown}>
                  {[
                    "Weekly",
                    "Monthly",
                    "Quarterly",
                    "Semi-Annually",
                    "Annually",
                  ].map((item) => (
                    <div
                      key={item}
                      className={styles.filterOption}
                      onClick={() => leaderFilterChange(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Temporary debug info - remove this in production */}

          {loadingChart ? (
            <div className={styles.loadingState}>Loading chart data...</div>
          ) : teamLeaderData.length > 0 ? (
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
                    label={({ name, value, percent }) => `${value}`}
                  >
                    {teamLeaderData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>

              <div className={styles.legend}>
                <div className={styles.total}>Total : {totalLeads}</div>
                {teamLeaderData.map((item, idx) => (
                  <div className={styles.legendItem} key={idx}>
                    <span
                      className={styles.colorDot}
                      style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                    ></span>
                    <span className={styles.legendText}>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className={styles.noData}>No chart data available</div>
          )}
        </div>
      </div>

      {/* Channel Partner Bar Chart */}
      <div className={styles.secondContainer}>
        <div className={styles.channelPartner}>
          <div className={styles.channelPartnerheading}>
            <span>Channel Partner Report</span>
            <div className={styles.filterWrapper}>
              <FaFilter
                onClick={() => setshowFilter(!showFilter)}
                style={{ cursor: "pointer" }}
              />
              {showFilter && (
                <div className={styles.filterDropdown}>
                  {[
                    "Weekly",
                    "Monthly",
                    "Quarterly",
                    "Semi-Annually",
                    "Annually",
                  ].map((Item) => (
                    <div
                      key={Item}
                      className={styles.filterOption}
                      onClick={() => handleFilterChange(Item)}
                    >
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

        <div>
          <FunnelCart />
        </div>
      </div>
    </div>
  );
};

export default ReportsSection;
