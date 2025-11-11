"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./overview.module.css";
import { FaCommentDots, FaTasks } from "react-icons/fa";
import {
  FaUsers,
  FaCheck,
  FaTimes,
  FaClock,
  FaBoxes,
  FaArrowRight,
} from "react-icons/fa";
import { Flag, Funnel } from "lucide-react";
import { FaArrowLeft, FaFlag } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";
import Report from "./Report";
import { useUser } from "@/providers/userContext";
import { useData } from "@/providers/dataContext";
import Link from "next/link";
import { useRouter } from "next/navigation";

const SectionTap = () => {
  const {
    searchLeadInfo,
    siteInfo,
    asssignFeedbackInfo,
    onboardTargetData,
    fetchSearchLeads,
    fetchDataAnalyzerVisits,
    fetchAssignFeedbackLeadsCount,
    fetchOnboardTarget,
  } = useData();
  const { user, loading } = useUser();
  const router = useRouter();

  const [activeCard, setActiveCard] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [year, setYear] = useState(new Date().getFullYear());
  const months = [
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
  const [showMonths, setShowMonths] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const visitscrollRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLSpanElement>(null);
  const starvisitRef = useRef<HTMLSpanElement>(null);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    if (typeof document !== "undefined") {
      setIsLight(document.documentElement.classList.contains("light"));
    }

    const observer = new MutationObserver(() => {
      const lightMode = document.documentElement.classList.contains("light");
      setIsLight(lightMode);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const [loadingTarget, setLoadingTarget] = useState(false);

  useEffect(() => {
    if (asssignFeedbackInfo) {
      console.log("assignFeedbackInfo updated:", asssignFeedbackInfo);
    }
  }, [asssignFeedbackInfo]);

  useEffect(() => {
    if (user && !loading) {
      // console.log("use effect dashboard");
      // getClosingManagerDashBoardCount({ id: user?._id ?? null });
      fetchAssignFeedbackLeadsCount({
        query: "",
        page: 1,
        limit: 10,
      });
    }
  }, [user, loading]);

  useEffect(() => {
    if (user && !loading) {
      // console.log("use effect dashboard");
      fetchDataAnalyzerVisits({
        query: "",
        page: 1,
        limit: 10,
      });
    }
  }, []);
  const cardsData = [
    {
      label: "Total Leads",
      value: searchLeadInfo?.totalItems ?? 0,
      status: "all",
      icon: <FaUsers />,
      color: "#00024a92",
      lightcolor: "#9ea1f7ff",
      iconcolor: "#00024a6c",
      darkiconcolor: "#6166f111",
      bgcolor: "linear-gradient(135deg, #324effff, #99adffff)",
    },
    
    {
      label: "Approved",
      value: searchLeadInfo?.approvedCount ?? 0,
      status: "approved",
      icon: <FaCheck />,
      color: "#0f4a00ab",
      lightcolor: "#a6f79eff",
      iconcolor: "#004a0664",
      darkiconcolor: "#61f1740d",
      bgcolor: "linear-gradient(135deg, #48c058ff, #a7ff99ff)",
    },

    {
      label: "Rejected",
      value: searchLeadInfo?.rejectedCount ?? 0,
      status: "rejected",
      icon: <FaTimes />,
      color: "#760400ad",
      lightcolor: "#f7a09eff",
      iconcolor: "#4a020043",
      darkiconcolor: "#f16a610d",
      bgcolor: "linear-gradient(135deg, #c06648ff, #ffaf99ff)",
    },

    {
      label: "Pending",
      value: searchLeadInfo?.pendingCount ?? 0,
      status: "pending",
      icon: <FaClock />,
      color: "#857500b8",
      lightcolor: "#f7f19eff",
      iconcolor: "#7951006f",
      darkiconcolor: "#f1c8610d",
      bgcolor: "linear-gradient(135deg, #c2c047ff, #faff99ff)",
    },

    {
      label: "Bulk Lead",
      value: searchLeadInfo?.bulkCount ?? 0,
      status: "bulk",
      icon: <FaBoxes />,
      color: "#49004abe",
      lightcolor: "#e29ef7ff",
      iconcolor: "#45004a63",
      darkiconcolor: "#d261f10d",
      bgcolor: "linear-gradient(135deg, #b84dd6ff, #e099ffff)",
    },
  ];

  // const cardsData = [
  //   {
  //     label: "Total Leads",
  //     value: searchLeadInfo?.totalItems ?? 0,
  //     // linkHref: "/lead-details?status=all",
  //     status: "all",
  //     icon: <FaUsers />,
  //     color: "#ad82f2ff",
  //     iconcolor: "#00024a87",
  //     bgcolor: ["#324effff", "#99adffff"],
  //   },
  //   {
  //     label: "Approved",
  //     value: searchLeadInfo?.approvedCount ?? 0,

  //     // linkHref:"/lead-details?status=approved",

  //     status: "approved",
  //     icon: <FaCheck />,
  //     color: "#88c08aa8",
  //     iconcolor: "#88c08aa8",
  //     lighticoncolor: "#88c08aa8",
  //     bgcolor: ["#5A70F7", "#6A83EA"],
  //   },
  //   {
  //     label: "Rejected",
  //     value: searchLeadInfo?.rejectedCount ?? 0,

  //     //  linkHref:"/lead-details?status=rejected",

  //     status: "rejected",
  //     icon: <FaTimes />,
  //     color: "#ce676082",
  //     iconcolor: "#88c08aa8",
  //     bgcolor: ["#5A70F7", "#6A83EA"],
  //   },
  //   {
  //     label: "Pending",
  //     value: searchLeadInfo?.pendingCount ?? 0,

  //     // linkHref:"/lead-details?status=pending",

  //     status: "pending",
  //     icon: <FaClock />,
  //     color: "#c0a24aa7",
  //     iconcolor: "#88c08aa8",
  //     bgcolor: ["#5A70F7", "#6A83EA"],
  //   },
  //   {
  //     label: "Bulk Lead",
  //     value: searchLeadInfo?.bulkCount ?? 0,

  //     // linkHref:"/lead-details?status=bulk",

  //     status: "bulk",
  //     icon: <FaBoxes />,
  //     color: "#58b1bd9c",
  //     iconcolor: "#88c08aa8",
  //     bgcolor: ["#5A70F7", "#6A83EA"],
  //   },
  // ];

  const handleCardClick = async (status?: String) => {
    const apiStatus = status === "all" ? null : status;
    // Pass the filtered data via router state
    router.push(`/lead-details?status=${apiStatus}`);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollEl = scrollRef.current;
      const starEl = starRef.current;
      const hintContainer = document.querySelector(
        `.${styles.hintcontainer}`
      ) as HTMLDivElement;

      if (!scrollEl || !starEl || !hintContainer) return;

      const scrollPercent =
        scrollEl.scrollLeft / (scrollEl.scrollWidth - scrollEl.clientWidth);
      const hintWidth = hintContainer.offsetWidth;
      const wrapper = starEl.parentElement as HTMLElement;
      wrapper.style.left = `${
        scrollPercent * (hintWidth - wrapper.offsetWidth)
      }px`;
      starEl.style.transform = `rotate(${scrollPercent * 360 * 3}deg)`;
    };

    scrollRef.current?.addEventListener("scroll", handleScroll);
    return () => scrollRef.current?.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!user || loading) return;
    fetchSearchLeads({
      page: 1,
      limit: 10,
      query: "",
    });
  }, [user, loading]);

  useEffect(() => {
    const visitScroll = () => {
      const scrollEl = visitscrollRef.current;
      const starEl = starvisitRef.current;
      const hintContainer = document.querySelector(
        `.${styles.hintcontainer}`
      ) as HTMLDivElement;

      if (!scrollEl || !starEl || !hintContainer) return;

      const scrollPercent =
        scrollEl.scrollLeft / (scrollEl.scrollWidth - scrollEl.clientWidth);
      const hintWidth = hintContainer.offsetWidth;
      const wrapper = starEl.parentElement as HTMLElement;
      wrapper.style.left = `${
        scrollPercent * (hintWidth - wrapper.offsetWidth)
      }px`;
      starEl.style.transform = `rotate(${scrollPercent * 360 * 3}deg)`;
    };

    visitscrollRef.current?.addEventListener("scroll", visitScroll);
    return () =>
      visitscrollRef.current?.removeEventListener("scroll", visitScroll);
  }, []);

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month);
    setShowMonths(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        filterRef.current &&
        !filterRef.current.contains(event.target as Node)
      ) {
        setShowMonths(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterRef]);
  const years = Array.from({ length: 10 }, (_, i) => year - 5 + i);
  // const cards = [
  //   { name: "Deepak Karki", feedback: 100, tasks: 300 },
  //   { name: "Jasprit Arora", feedback: 210, tasks: 320 },
  //   { name: "Janhana Gumpta", feedback: 150, tasks: 310 },
  // ];
  const assignFeedbackcard = Array.isArray(asssignFeedbackInfo)
    ? asssignFeedbackInfo.map((item, index) => ({
        name: `${item.teamLeader?.firstName ?? "Team"} ${
          item.teamLeader?.lastName ?? "Leader"
        }`,
        feedback: item.notFollowUpCount ?? 0,
        tasks: item.notAssignedCount ?? 0,
        border: ["#87CEEB", "#FF6B6B", "#4ECDC4", "#FFE66D"][index % 4],
      }))
    : [];

  const toggleBottomSheet = (index: number) => {
    setActiveCard(activeCard === index ? null : index);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setActiveCard(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const data = [
    {
      label: "Target",
      value: 65,
      color1: "#ff7e5f",
      color2: "#feb47b",
      icon: FaFlag,
      iconColor: "#ff7e5f",
    },
    {
      label: "Achieved",
      value: 20,
      color1: "#00b09b",
      color2: "#96c93d",
      icon: FaCheck,
      iconColor: "#00b09b",
    },
    {
      label: "Pending",
      value: 10,
      color1: "#4facfe",
      color2: "#00f2fe",
      icon: MdOutlinePendingActions,
      iconColor: "#4facfe",
    },
  ];

  useEffect(() => {
    if (user && !loading) {
      fetchTargetData();
    }
  }, [user, loading]);

  // Add useEffect for year/month changes
  useEffect(() => {
    if (selectedMonth !== null) {
      fetchTargetData();
    }
  }, [year, selectedMonth]);

  // Add fetch target data function
  const fetchTargetData = async () => {
    try {
      setLoadingTarget(true);
      const date =
        selectedMonth !== null
          ? `${year}-${String(selectedMonth + 1).padStart(2, "0")}-01`
          : undefined;

      console.log("Fetching target data with date:", date);
      await fetchOnboardTarget({ date });
    } catch (error) {
      console.error("Error fetching target data:", error);
    } finally {
      setLoadingTarget(false);
    }
  };

  // Replace your static data with dynamic data calculation
  const getTargetData = () => {
    if (!onboardTargetData) {
      // Fallback data when no API data
      return [
        {
          label: "Target",
          value: 0,
          color1: "#ff7e5f",
          color2: "#feb47b",
          icon: FaFlag,
          iconColor: "#ff7e5f",
        },
        {
          label: "Achieved",
          value: 0,
          color1: "#00b09b",
          color2: "#96c93d",
          icon: FaCheck,
          iconColor: "#00b09b",
        },
        {
          label: "Pending",
          value: 0,
          color1: "#4facfe",
          color2: "#00f2fe",
          icon: MdOutlinePendingActions,
          iconColor: "#4facfe",
        },
      ];
    }

    const { target = 0, achieved = 0, pending = 0 } = onboardTargetData;
    const completionRate =
      target > 0 ? Math.min(100, (achieved / target) * 100) : 0;

    return [
      {
        label: "Target",
        value: target,
        color1: "#ff7e5f",
        color2: "#feb47b",
        icon: FaFlag,
        iconColor: "#ff7e5f",
      },
      {
        label: "Achieved",
        value: achieved,
        color1: "#00b09b",
        color2: "#96c93d",
        icon: FaCheck,
        iconColor: "#00b09b",
      },
      {
        label: "Pending",
        value: pending,
        color1: "#4facfe",
        color2: "#00f2fe",
        icon: MdOutlinePendingActions,
        iconColor: "#4facfe",
      },
      {
        label: "Completion",
        value: Math.round(completionRate),
        color1: "#8B5CF6",
        color2: "#A78BFA",
        icon: FaUsers,
        iconColor: "#8B5CF6",
      },
    ];
  };

  // Calculate remaining info
  const getRemainingInfo = () => {
    if (!onboardTargetData) {
      return { percentage: 0, days: 2, cps: 5 }; // Default values
    }

    const { target = 0, achieved = 0, pending = 0 } = onboardTargetData;
    const percentage =
      target > 0 ? Math.min(100, (achieved / target) * 100) : 0;

    // Calculate days remaining in current month
    const now = new Date();
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const daysRemaining = Math.max(0, lastDay.getDate() - now.getDate());

    return {
      percentage: Math.round(percentage),
      days: daysRemaining,
      cps: pending,
    };
  };

  const targetData = getTargetData();
  const remainingInfo = getRemainingInfo();

  return (
    <div className={styles.tabcontainer}>
      <div className={styles.headtitle}>
        <div className={styles.ding}>Leads Overview</div>
      </div>
      <div className={styles.leadsection}>
        {/* Horizontal scrollable cards */}
        <div className={styles.tapsection} ref={scrollRef}>
          {cardsData.map((card, index) => (
            <div
              className={styles.card}
              key={index}
              onClick={() => handleCardClick(card.status)}
              style={{
                cursor: "pointer",
              }} //
            >
              <div
                className={styles.bgIcon}
                style={{
                  color: isLight ? card.iconcolor : card.darkiconcolor,
                }}
              >
                {card.icon}
              </div>
              <div className={styles.cardContent}>
                <div className={styles.topRow}>
                  <div
                    className={styles.iconContainer}
                    style={{
                      color: isLight ? "white" : card.lightcolor,
                      background: isLight ? card.color : card.darkiconcolor,
                    }}
                  >
                    {card.icon}
                  </div>
                  <div
                    className={styles.arrowContainer}
                    style={{ color: isLight ? card.color : card.lightcolor }}
                  >
                    <FaArrowRight />
                  </div>
                </div>
                <p className={styles.label}>{card.label}</p>
                <p className={styles.value}>{card.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.hint}>
          <div className={styles.hintcontainer}>
            <span className={styles.starWrapper}>
              «
              <span className={styles.star} ref={starRef}>
                ✦︎
              </span>
              »
            </span>
          </div>
        </div>
      </div>

      <div className={styles.headtitle}>
        <div className={styles.ding}>Visit Overview</div>
      </div>
      <div className={styles.visitsection}>
        <div className={styles.viewrow} ref={visitscrollRef}>
          <div className={styles.viewcontainer}>
            <div className={styles.numsec}>{siteInfo?.totalItems ?? 0}</div>
            <p>
              <i className="fas fa-check-circle"></i>Total Visit
            </p>
          </div>
          <div className={styles.viewcontainer}>
            <div className={styles.numsec}>{siteInfo?.approvedCount ?? 0}</div>
            <p> Visit Approved</p>
          </div>
          <div className={styles.viewcontainer}>
            <div className={styles.numsec}>{siteInfo?.rejectedCount ?? 0}</div>
            <p> Visit Rejected</p>
          </div>
          <div className={styles.viewcontainer}>
            <div className={styles.numsec}>{siteInfo?.pendingCount ?? 0}</div>
            <p> Visit Pending</p>
          </div>
        </div>
        <div className={styles.hint}>
          <div className={styles.hintcontainer}>
            <span className={styles.starWrapper}>
              «
              <span className={styles.star} ref={starvisitRef}>
                ✦︎
              </span>
              »
            </span>
          </div>
        </div>
      </div>

      <div className={styles.headtitle}>
        <div className={styles.ding}>Monthly Target</div>
      </div>
      {loadingTarget ? (
        <div className={styles.loadingState}>Loading target data...</div>
      ) : (
        <div className={styles.graf}>
          <div className={styles.grafcontainer}>
            {targetData.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div className={styles.mytr} key={index}>
                  <div
                    className={styles.donut}
                    style={{
                      background: `conic-gradient(from 0deg, ${item.color1} 0%, ${item.color2} ${item.value}%, #e0e0e0 ${item.value}% 100%)`,
                    }}
                  >
                    <div
                      className={styles.iconBg}
                      style={{ color: item.iconColor }}
                    >
                      <IconComponent size={45} />
                    </div>
                    <div className={styles.centerNumber}>
                      {item.value}
                      {item.label === "Completion" ? "%" : ""}
                    </div>
                  </div>
                  <div className={styles.label}>{item.label}</div>
                </div>
              );
            })}
          </div>

          <div className={styles.targetcontainer}>
            <div className={styles.texttarget}>
              <div className={styles.progressHeader}>
                <p className={styles.title}>Progress</p>
                <span className={styles.percentage}>0% Completed</span>
              </div>
              <div className={styles.description}>
                You have <strong>2 days</strong> remaining to complete{" "}
                <strong>5 more CP's Onboarding</strong>.
              </div>
            </div>

            <div className={styles.filter}>
              <div className={styles.yearSelector}>
                <select
                  value={year}
                  onChange={(e) => setYear(Number(e.target.value))}
                >
                  {years.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.monthGrid}>
                {months.map((month, index) => (
                  <div key={index} className={styles.monthItem}>
                    {month}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className={styles.grafMobile}>
        <div className={styles.progressCard}>
          <div className={styles.targetsWrapper}>
            {[
              { label: "Target", value: 10, color: "#ffb347" },
              { label: "Achieved", value: 5, color: "#4caf50" },
              { label: "Pending", value: 5, color: "#ef5350" },
            ].map((item, index) => (
              <div className={styles.targetCard} key={index}>
                <div
                  className={styles.targetNumber}
                  style={{ backgroundColor: item.color }}
                >
                  {item.value}
                </div>
                <div className={styles.targetLabel}>{item.label}</div>
              </div>
            ))}
          </div>
          <div className={styles.texttarget}>
            <div className={styles.filterIconContainer} ref={filterRef}>
              <button
                className={styles.filterButton}
                onClick={() => setShowMonths(!showMonths)}
              >
                {selectedMonth ? selectedMonth : ""} <Funnel size={15} />
              </button>

              {showMonths && (
                <div className={styles.monthDropdown}>
                  <div className={styles.yearSelector}>
                    <select
                      value={year}
                      onChange={(e) => setYear(Number(e.target.value))}
                    >
                      {years.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.monthGrid}>
                    {months.map((month, index) => (
                      <div
                        key={index}
                        className={styles.monthItemMobile}
                        onClick={() => handleMonthSelect(month)}
                      >
                        {month}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className={styles.progressHeader}>
              <p className={styles.title}>Progress</p>
              <span className={styles.percentage}>0% Completed</span>
            </div>
            <div className={styles.description}>
              You have <strong>2 days</strong> remaining to complete{" "}
              <strong>5 more CP's Onboarding</strong>.
            </div>
          </div>

          {/* Month Filter Icon */}
        </div>
      </div>

      <div className={styles.headtitle}>
        <div className={styles.ding}>Assign/Feedback Pending</div>
      </div>
      <div className={styles.Monthlytarget} ref={containerRef}>
        {assignFeedbackcard.map((card, index) => (
          <div key={index} className={styles.cardWrapper}>
            <div
              className={`${styles.cardtarget} ${
                activeCard === index ? styles.cardActive : ""
              }`}
              onClick={() => toggleBottomSheet(index)}
            >
              <h3>{card.name}</h3>
              <div className={styles.btnGroup}>
                <div className={styles.feedbackpendibg}>
                  <FaCommentDots style={{ marginRight: "6px" }} />{" "}
                  {card.feedback}
                </div>
                <div className={styles.assignpendibg}>
                  <FaTasks style={{ marginRight: "6px" }} /> {card.tasks}
                </div>
              </div>
            </div>

            <div
              className={`${styles.bottomSheet} ${
                activeCard === index ? styles.show : ""
              }`}
            >
              <div className={styles.sheetItem}>
                <p className={styles.sheetLabel}>Feedback Pending</p>
                <p className={`${styles.sheetValue} ${styles.red}`}>
                  {card.feedback}
                </p>
              </div>
              <div className={`${styles.sheetItem} ${styles.sheetgreen} `}>
                <p className={styles.sheetLabel}>Assign Pending</p>
                <p className={`${styles.sheetValue} ${styles.blue}`}>
                  {" "}
                  {card.tasks}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.headtitle}>
        <div className={styles.ding}>Report Overview</div>
      </div>
      <Report />
    </div>
  );
};

export default SectionTap;
