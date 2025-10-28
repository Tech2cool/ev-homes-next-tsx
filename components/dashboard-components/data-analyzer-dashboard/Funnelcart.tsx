"use client";
import React, { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import styles from "./reportssection.module.css";
import { useData } from "@/providers/dataContext";

const STAGE_COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#FF6347",
  "#FF4500",
  "#9370DB",
  "#32CD32",
  "#FF69B4",
];

const funnelStages = [
  { stage: "Site Visits", count: 2000, color: "#0088FE" },
  { stage: "Visited", count: 800, color: "#00C49F" },
  { stage: "Revisited", count: 600, color: "#FFBB28" },
  { stage: "Approved", count: 300, color: "#FF8042" },
  { stage: "Booked", count: 30, color: "#FF6347" },
  { stage: "Rejected", count: 10, color: "#FF4500" },
];

const filterOptions = [
  "Weekly",
  "Monthly",
  "Quarterly",
  "Semi-Annually",
  "Annually",
];

const FunnelChart: React.FC = () => {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Yearly");
  const [funnelData, setFunnelData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalLeads, setTotalLeads] = useState(0);

  const { leadsFunnelGraphForDT, fetchFunnelGraphForDA } = useData();

  const total = funnelStages.reduce((acc, item) => acc + item.count, 0);
  useEffect(() => {
    fetchFunnelData();
  }, []);

  const fetchFunnelData = async (interval: string = "yearly") => {
    try {
      setLoading(true);
      console.log("Fetching funnel data with interval:", interval);

      const result = await fetchFunnelGraphForDA({
        interval: interval.toLowerCase(),
      });

      console.log("Funnel API result:", result);
      console.log("Funnel chart data:", leadsFunnelGraphForDT);

      if (result.success) {
        if (leadsFunnelGraphForDT && leadsFunnelGraphForDT.length > 0) {
          console.log("Raw funnel data structure:", leadsFunnelGraphForDT[0]);

          const transformedData = leadsFunnelGraphForDT
            .map((item: any, index: number) => {
              // Map the API response to funnel stage format
              const stage =
                item.category ||
                item.name ||
                item.status || // This matches your Flutter mapping
                `Stage ${index + 1}`;

              const count = item.value || item.count || Number(item.value) || 0;

              console.log(`Funnel Item ${index}:`, {
                stage,
                count,
                rawItem: item,
              });

              return {
                stage: stage,
                count: count,
                color: STAGE_COLORS[index % STAGE_COLORS.length],
              };
            })
            .filter((item) => item.count > 0)
            .sort((a, b) => b.count - a.count); // Sort by count descending

          console.log("Transformed funnel data:", transformedData);

          if (transformedData.length > 0) {
            setFunnelData(transformedData);
            const total = transformedData.reduce(
              (sum, item) => sum + item.count,
              0
            );
            setTotalLeads(total);
          } else {
            useFunnelFallbackData();
          }
        } else {
          console.log("No funnel data from API, using fallback data");
          useFunnelFallbackData();
        }
      } else {
        console.error("Failed to fetch funnel data:", result.message);
        useFunnelFallbackData();
      }
    } catch (error) {
      console.error("Error fetching funnel data:", error);
      useFunnelFallbackData();
    } finally {
      setLoading(false);
    }
  };

  const useFunnelFallbackData = () => {
    setFunnelData(funnelStages);
    const total = funnelStages.reduce((sum, item) => sum + item.count, 0);
    setTotalLeads(total);
  };

  // Update when data changes
  useEffect(() => {
    console.log("Funnel data updated:", leadsFunnelGraphForDT);
    if (leadsFunnelGraphForDT && leadsFunnelGraphForDT.length > 0) {
      const transformedData = leadsFunnelGraphForDT
        .map((item: any, index: number) => {
          const stage =
            item.category || item.name || item.status || `Stage ${index + 1}`;

          const count = item.value || item.count || Number(item.value) || 0;

          return {
            stage: stage,
            count: count,
            color: STAGE_COLORS[index % STAGE_COLORS.length],
          };
        })
        .filter((item) => item.count > 0)
        .sort((a, b) => b.count - a.count);

      if (transformedData.length > 0) {
        setFunnelData(transformedData);
        const total = transformedData.reduce(
          (sum, item) => sum + item.count,
          0
        );
        setTotalLeads(total);
      }
    }
  }, [leadsFunnelGraphForDT]);

  // Handle filter change
  const handleFilterChange = async (filter: string) => {
    setSelectedFilter(filter);
    setShowFilter(false);

    // Map UI filter to API interval
    const intervalMap: { [key: string]: string } = {
      Weekly: "weekly",
      Monthly: "monthly",
      Quarterly: "quarterly",
      "Semi-Annually": "semi-annually",
      Annually: "yearly",
    };

    const interval = intervalMap[filter] || "yearly";
    await fetchFunnelData(interval);
  };

  // Calculate width percentages for funnel visualization
  const getFunnelWidth = (index: number, data: any[]) => {
    if (data.length === 0) return 100;

    const maxCount = Math.max(...data.map((item) => item.count));
    const currentCount = data[index].count;

    // Calculate width based on percentage of maximum count
    // Start with 100% for first item and gradually decrease
    const baseWidth = 100 - index * (70 / data.length);
    const countBasedWidth = (currentCount / maxCount) * 80 + 20; // Ensure minimum 20% width

    return Math.min(baseWidth, countBasedWidth);
  };

  return (
    <div className={styles.leadsFunnel}>
      <div className={styles.chartHeader}>
        <span>Leads Funnel</span>
        <div className={styles.filterWrapper}>
          <FaFilter
            onClick={() => setShowFilter(!showFilter)}
            style={{ cursor: "pointer" }}
          />
          {showFilter && (
            <div className={styles.filterDropdown}>
              {filterOptions.map((opt) => (
                <div
                  key={opt}
                  className={styles.filterOption}
                  onClick={() => handleFilterChange(opt)}
                >
                  {opt}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.totalCount}>
        Total Leads: {totalLeads.toLocaleString()}
      </div>

      {loading ? (
        <div className={styles.loadingState}>Loading funnel data...</div>
      ) : funnelData.length > 0 ? (
        <div className={styles.funnelContainer}>
        
          {funnelData.map((stage, index) => (
            <div
              key={index}
              className={`${styles.funnelStage} ${
                styles[`funnelStage${index + 1}`]
              }`}
              style={{
                backgroundColor: stage.color,
              }}
            >
              <span className={styles.stageLabel}>
                {stage.stage}: {stage.count.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.noData}>No funnel data available</div>
      )}
    </div>
  );
};

export default FunnelChart;
