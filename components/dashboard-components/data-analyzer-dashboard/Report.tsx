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
    leadsChannelPartnerGraphForDT,
    leadsLineGraphForDT,
    fetchTeamLeaderGraphForDA,
    fetchChannelPartnerGraphForDA,
    fetchLineGraphForDA,
  } = useData();
  const { user, loading } = useUser();
  const [showFilter, setshowFilter] = useState(false);
  const [leadfilter, setleadfilter] = useState(false);
  const [leaderFilter, setleaderFilter] = useState(false);
  const [lineChartFilter, setLineChartFilter] = useState(false);
  const [selectedFilter, setselectedFilter] = useState("Monthly");
  const [leadfilteSelect, setleadfilteSelect] = useState("Monthly");
  const [leaderSelect, setleaderSelect] = useState("Monthly");
  const [lineChartSelect, setLineChartSelect] = useState("Monthly");
  const [isDesktop, setIsDesktop] = useState(false);

  const [teamLeaderData, setTeamLeaderData] = useState<TeamLeaderData[]>([]);
  const [channelPartnerData, setChannelPartnerData] = useState<
    ChannelPartnerData[]
  >([]);
  const [lineChartData, setLineChartData] = useState<LineChartData[]>([]);
  const [totalLeads, setTotalLeads] = useState<number>(0);
  const [totalCPCount, setTotalCPCount] = useState<number>(0);
  const [totalLineChartLeads, setTotalLineChartLeads] = useState<number>(0);

  const [loadingChart, setLoadingChart] = useState<boolean>(true);
  const [loadingCPChart, setLoadingCPChart] = useState<boolean>(true);
  const [loadingLineChart, setLoadingLineChart] = useState<boolean>(true);
    const ALLOWED_TEAM_LEADERS = ["Deepak Karki", "Ranjna Gupta", "Jaspreet Arora"]
  useEffect(() => {
    fetchTeamLeaderData();
    fetchChannelPartnerData();
    fetchLineChartData();
  }, []);

   useEffect(() => {
    if (user && !loading) {
      fetchTeamLeaderGraphForDA({ interval: "monthly" });
      fetchChannelPartnerGraphForDA({ interval: "monthly" });
      fetchLineGraphForDA({ interval: "monthly" });
    }
  }, [user, loading]);

 useEffect(() => {
  if (leadsTeamLeaderGraphForDT?.length > 0) {
    const transformed = leadsTeamLeaderGraphForDT.map((item, i) => ({
      name: item.category || `Team ${i + 1}`, // category = team leader name
      value: item.value ?? 0,                // value = total leads
    })).filter(d => d.value > 0);

    setTeamLeaderData(transformed);
  }
}, [leadsTeamLeaderGraphForDT]);


  // 🔹 Update Channel Partner Chart
 useEffect(() => {
  if (leadsChannelPartnerGraphForDT?.length > 0) {
    const transformed = leadsChannelPartnerGraphForDT
      .map((item, i) => ({
        name: item.category || `Partner ${i + 1}`, // category = partner name
        count: item.value ?? 0,                    // value = lead count
      }))
      .filter(d => d.count > 0)
      .sort((a, b) => b.count - a.count);

    setChannelPartnerData(transformed);
    updateCPChart(transformed);
  }
}, [leadsChannelPartnerGraphForDT]);


  // 🔹 Update Line Chart
  useEffect(() => {
  if (leadsLineGraphForDT?.length > 0) {
    const transformed = leadsLineGraphForDT.map((item, i) => ({
      month: item.category || `Month ${i + 1}`, // category = month label
      leads: item.value ?? 0,                   // value = total leads
    }));

    setLineChartData(transformed);
    updateLineChart(transformed);
  }
}, [leadsLineGraphForDT]);

  // Line Chart data fetching (NEW)
  const fetchLineChartData = async (interval: string = "Monthly") => {
    try {
      setLoadingLineChart(true);
      console.log("Fetching line chart data with interval:", interval);

      const result = await fetchLineGraphForDA({
        interval: interval.toLowerCase(),
      });

      console.log("Line chart API result:", result);
      console.log("Line chart data:", leadsLineGraphForDT);

      if (result.success) {
        if (leadsLineGraphForDT && leadsLineGraphForDT.length > 0) {
          console.log("Raw line chart data structure:", leadsLineGraphForDT[0]);

          const transformedData = leadsLineGraphForDT
            .map((item: any, index: number) => {
              // Map the API response to LineChartData format
              const month =
                item.category ||
                item.name ||
                item.month || // This matches your Flutter mapping
                `Month ${index + 1}`;

              const leads = item.value || item.count || Number(item.value) || 0;

              console.log(`Line Chart Item ${index}:`, {
                month,
                leads,
                rawItem: item,
              });

              return {
                month: month,
                leads: leads,
              };
            })
            .filter((item) => item.leads > 0)
            .sort((a, b) => {
              // Sort by month order if possible, otherwise by count
              const monthOrder = [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
              ];
              const aIndex = monthOrder.indexOf(a.month);
              const bIndex = monthOrder.indexOf(b.month);

              if (aIndex !== -1 && bIndex !== -1) {
                return aIndex - bIndex;
              }
              return a.leads - b.leads;
            });

          console.log("Transformed line chart data:", transformedData);

          if (transformedData.length > 0) {
            setLineChartData(transformedData);
            updateLineChart(transformedData);
          } else {
            useLineChartFallbackData();
          }
        } else {
          console.log("No line chart data from API, using fallback data");
          useLineChartFallbackData();
        }
      } else {
        console.error("Failed to fetch line chart data:", result.message);
        useLineChartFallbackData();
      }
    } catch (error) {
      console.error("Error fetching line chart data:", error);
      useLineChartFallbackData();
    } finally {
      setLoadingLineChart(false);
    }
  };

  const useLineChartFallbackData = () => {
    const fallbackData = [
      { month: "Jan", leads: 2286 },
      { month: "Feb", leads: 2895 },
      { month: "Mar", leads: 3191 },
      { month: "Apr", leads: 3085 },
      { month: "May", leads: 2026 },
    ];
    setLineChartData(fallbackData);
    updateLineChart(fallbackData);
  };

  // Update line chart when data changes
  const updateLineChart = (data: LineChartData[]) => {
    const categories = data.map((item) => item.month);
    const chartData = data.map((item) => item.leads);

    const total = chartData.reduce((sum, leads) => sum + leads, 0);
    setTotalLineChartLeads(total);

    // Check current theme
    const isLightTheme = document.documentElement.classList.contains("light");

    setChartState((prevState) => ({
      ...prevState,
      series: [{ name: "Leads", data: chartData }],
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
          foreColor: isLightTheme ? "#333333" : "#ffffff",
        },
        stroke: {
          width: 3,
          curve: "smooth",
          colors: ["#0088FE"],
        },
        markers: {
          size: 5,
          colors: ["#0088FE"],
          strokeColors: "#fff",
          strokeWidth: 2,
          hover: {
            size: 7,
          },
        },
        xaxis: {
          categories,
          title: { text: "Month" },
          labels: {
            style: {
              colors: isLightTheme ? "#666666" : "#8a8a8a",
            },
          },
        },
        yaxis: {
          title: { text: "Total Leads" },
          labels: {
            style: {
              colors: isLightTheme ? "#666666" : "#8a8a8a",
            },
          },
        },
        title: {
          text: "Leads Over Time",
          align: "left",
          style: {
            fontSize: "15px",
            color: isLightTheme ? "#666666" : "#8a8a8a",
            fontFamily: "inherit",
          },
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
          theme: isLightTheme ? "light" : "dark",
          style: {
            fontSize: "12px",
            fontFamily: "inherit",
          },
          y: {
            formatter: (value: number) => `Leads: ${value}`,
          },
        },
        grid: {
          borderColor: isLightTheme
            ? "rgba(0,0,0,0.1)"
            : "rgba(255,255,255,0.1)",
        },
      },
    }));
  };

  // Line chart filter change handler
  const lineChartFilterChange = async (interval: string) => {
    setLineChartFilter(false);
    setLineChartSelect(interval);
    await fetchLineChartData(interval);
  };

  // Update when line chart data changes
  useEffect(() => {
    console.log("Line chart data updated:", leadsLineGraphForDT);
    if (leadsLineGraphForDT && leadsLineGraphForDT.length > 0) {
      const transformedData = leadsLineGraphForDT
        .map((item: any, index: number) => {
          const month =
            item.category || item.name || item.month || `Month ${index + 1}`;

          const leads = item.value || item.count || Number(item.value) || 0;

          return {
            month: month,
            leads: leads,
          };
        })
        .filter((item) => item.leads > 0)
        .sort((a, b) => {
          const monthOrder = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          const aIndex = monthOrder.indexOf(a.month);
          const bIndex = monthOrder.indexOf(b.month);

          if (aIndex !== -1 && bIndex !== -1) {
            return aIndex - bIndex;
          }
          return a.leads - b.leads;
        });

      if (transformedData.length > 0) {
        setLineChartData(transformedData);
        updateLineChart(transformedData);
      }
    }
  }, [leadsLineGraphForDT]);

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
      const transformedData = leadsTeamLeaderGraphForDT
        .map((item: any, index: number) => {
          const name = item.category || item.name || item.teamLeader || `Team ${index + 1}`
          const value = item.value || item.count || item.leadCount || item.total || 0
          return { name, value }
        })
        .filter((item) => item.value > 0 && ALLOWED_TEAM_LEADERS.includes(item.name))

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

  const channelPartnerFilterChange = async (interval: string) => {
    setshowFilter(false);
    setselectedFilter(interval);
    await fetchChannelPartnerData(interval);
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

  useEffect(() => {
    console.log("Channel partner data updated:", leadsChannelPartnerGraphForDT);
    if (
      leadsChannelPartnerGraphForDT &&
      leadsChannelPartnerGraphForDT.length > 0
    ) {
      const transformedData = leadsChannelPartnerGraphForDT
        .map((item: any, index: number) => {
          const name =
            item.category ||
            item.name ||
            item.channelPartner ||
            `Partner ${index + 1}`;
          const count = item.value || item.count || Number(item.value) || 0;
          return { name, count };
        })
        .filter((item) => item.count > 0)
        .sort((a, b) => b.count - a.count);

      if (transformedData.length > 0) {
        setChannelPartnerData(transformedData);
        updateCPChart(transformedData);
      }
    }
  }, [leadsChannelPartnerGraphForDT]);

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

  const handleFilterChange1 = (value: string) => {
    channelPartnerFilterChange(value);
  };

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
          theme: "dark",
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

  // Channel Partner data fetching (NEW)
  const fetchChannelPartnerData = async (interval: string = "Monthly") => {
    try {
      setLoadingCPChart(true);
      console.log("Fetching channel partner data with interval:", interval);

      const result = await fetchChannelPartnerGraphForDA({
        interval: interval.toLowerCase(),
      });

      console.log("Channel partner API result:", result);
      console.log("Channel partner chart data:", leadsChannelPartnerGraphForDT);

      if (result.success) {
        if (
          leadsChannelPartnerGraphForDT &&
          leadsChannelPartnerGraphForDT.length > 0
        ) {
          console.log(
            "Raw channel partner data structure:",
            leadsChannelPartnerGraphForDT[0]
          );

          const transformedData = leadsChannelPartnerGraphForDT
            .map((item: any, index: number) => {
              // Map the API response to ChannelPartnerData format
              const name =
                item.category ||
                item.name ||
                item.channelPartner || // This matches your Flutter mapping
                `Partner ${index + 1}`;
              const count = item.value || item.count || Number(item.value) || 0;

              console.log(`Channel Partner Item ${index}:`, {
                name,
                count,
                rawItem: item,
              });

              return {
                name: name,
                count: count,
              };
            })
            .filter((item) => item.count > 0)
            .sort((a, b) => b.count - a.count); // Sort by count descending

          console.log("Transformed channel partner data:", transformedData);

          if (transformedData.length > 0) {
            setChannelPartnerData(transformedData);
            updateCPChart(transformedData); // Update the chart with real data
          } else {
            useChannelPartnerFallbackData();
          }
        } else {
          console.log("No channel partner data from API, using fallback data");
          useChannelPartnerFallbackData();
        }
      } else {
        console.error("Failed to fetch channel partner data:", result.message);
        useChannelPartnerFallbackData();
      }
    } catch (error) {
      console.error("Error fetching channel partner data:", error);
      useChannelPartnerFallbackData();
    } finally {
      setLoadingCPChart(false);
    }
  };

  const useChannelPartnerFallbackData = () => {
    const fallbackData = [
      { name: "Partner A", count: 400 },
      { name: "Partner B", count: 98 },
      { name: "Partner C", count: 500 },
      { name: "Partner D", count: 200 },
      { name: "Partner E", count: 300 },
    ];
    setChannelPartnerData(fallbackData);
    updateCPChart(fallbackData);
  };

  // Update channel partner chart when data changes
 const updateCPChart = (data: ChannelPartnerData[]) => {
  const cpNames = data.map((item) => item.name);
  const cpCounts = data.map((item) => item.count);

  const total = cpCounts.reduce((sum, count) => sum + count, 0);
  setTotalCPCount(total);

  setChartState((prevState) => ({
    ...prevState,
    cpChart: {
      series: [{ name: "Count", data: cpCounts }],
      options: {
        ...prevState.cpChart?.options,
        chart: {
          type: "bar",
          height: 300,
          toolbar: { show: false },
        },
        plotOptions: {
          bar: {
            horizontal: true,
            borderRadius: 4,
            dataLabels: { position: "right" },
          },
        },

        // ✅ Make name:count label red on hover
        dataLabels: {
          enabled: true,
          formatter: (val, opt) =>
            `${cpNames[opt.dataPointIndex]}: ${val}`,
          style: {
            fontSize: "10px",
            colors: ["#d2cfcf"]
          }
        },

        // ✅ Remove hover dark overlay + change bar color on hover
        states: {
          normal: {
            filter: {
              type: "none"
            }
          },
          hover: {
            filter: {
              type: "none"
            },
            style: {
              color: "#ff1a1a"  // ✅ Red text
            }
          },
          active: {
            filter: {
              type: "none"
            }
          }
        },

        // ✅ Tooltip also red
        tooltip: {
          theme: "dark",
          style: {
            fontSize: "12px",
            color: "#ff1a1a"
          }
        },

        xaxis: {
          categories: cpNames,
          title: { text: "Count" },
        },
        yaxis: {
          title: { text: "Channel Partners" },
        },
      },
    },
  }));
};


  return (
    <div className={styles.container}>
      {/* Line Chart */}
      <div className={styles.firstContainer}>
        <div className={styles.leadsMonth}>
          <div className={styles.chartHeader}>
            
            <div className={styles.filterWrapper}>
              <FaFilter
                onClick={() => setLineChartFilter(!lineChartFilter)}
                style={{ cursor: "pointer" }}
              />
              {lineChartFilter && (
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
                      onClick={() => lineChartFilterChange(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {loadingLineChart ? (
            <div className={styles.loadingState}>
              Loading line chart data...
            </div>
          ) : chartState.series.length > 0 ? (
            <ReactApexChart
              options={chartState.options}
              series={chartState.series}
              type="line"
              height="100%"
            />
          ) : (
            <div className={styles.noData}>No line chart data available</div>
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
                  ].map((item) => (
                    <div
                      key={item}
                      className={styles.filterOption}
                      onClick={() => handleFilterChange1(item)}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className={styles.channelPartnerheading}>
            Total: {totalCPCount}
          </div>

          {loadingCPChart ? (
            <div className={styles.loadingState}>
              Loading channel partner data...
            </div>
          ) : channelPartnerData.length > 0 ? (
            <div className={styles.chartScrollWrapper}>
              {chartState.cpChart && (
                <ReactApexChart
                  options={chartState.cpChart.options}
                  series={chartState.cpChart.series}
                  type="bar"
                  height={Math.max(channelPartnerData.length * 32, 300)}
                />
              )}
            </div>
          ) : (
            <div className={styles.noData}>
              No channel partner data available
            </div>
          )}
        </div>

        <div>
          <FunnelCart />
        </div>
      </div>
    </div>
  );
};

export default ReportsSection;
