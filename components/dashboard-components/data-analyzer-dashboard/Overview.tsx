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

const SectionTap = () => {
  const {
    searchLeadInfo,
    siteInfo,
    asssignFeedbackInfo,
    fetchSearchLeads,
    fetchDataAnalyzerVisits,
     fetchAssignFeedbackLeadsCount,
  } = useData();
  const { user, loading } = useUser();
useEffect(() => {
  if (user && !loading && !searchLeadInfo) {
    fetchSearchLeads({
      query: "",
      page: 1,
      limit: 10,
    });
  }
}, [user, loading, searchLeadInfo]);

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
        // Add other parameters as needed
      });
    }
  }, []);

  const cardsData = [
    {
      label: "Total Leads",
      value: searchLeadInfo?.totalItems ?? 0,
      icon: <FaUsers />,
      color: "#ad82f2e1",
      bgcolor: "#7c2ff706",
    },
    {
      label: "Approved",
      value: searchLeadInfo?.approvedCount ?? 0,
      icon: <FaCheck />,
      color: "#88c08aa8",
      bgcolor: "#4caf4f09",
    },
    {
      label: "Rejected",
      value: searchLeadInfo?.rejectedCount ?? 0,
      icon: <FaTimes />,
      color: "#ce676082",
      bgcolor: "#f4433609",
    },
    {
      label: "Pending",
      value: searchLeadInfo?.pendingCount ?? 0,
      icon: <FaClock />,
      color: "#c0a24aa7",
      bgcolor: "#ffc10709",
    },
    {
      label: "Bulk Lead",
      value: searchLeadInfo?.bulkCount ?? 0,
      icon: <FaBoxes />,
      color: "#58b1bd9c",
      bgcolor: "#00bbd409",
    },
  ];

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
  const filterRef = useRef<HTMLDivElement>(null);
  const visitscrollRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const starRef = useRef<HTMLSpanElement>(null);
  const starvisitRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
      if (asssignFeedbackInfo) {
        console.log("assignFeedbackInfo updated:", asssignFeedbackInfo);
      }
    }, [asssignFeedbackInfo]);

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

  return (
    <div className={styles.tabcontainer}>
      <div className={styles.headtitle}>
        <div className={styles.ding}>Leads Overview</div>
      </div>
      <div className={styles.leadsection}>
        {/* Horizontal scrollable cards */}
        <div className={styles.tapsection} ref={scrollRef}>
          {cardsData.map((card, index) => (
            <div className={styles.card} key={index}>
              <div className={styles.bgIcon} style={{ color: card.bgcolor }}>
                {card.icon}
              </div>
              <div className={styles.cardContent}>
                <div className={styles.topRow}>
                  <div
                    className={styles.iconContainer}
                    style={{ color: card.color }}
                  >
                    {card.icon}
                  </div>
                  <div
                    className={styles.arrowContainer}
                    style={{ color: card.color }}
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
      <div className={styles.graf}>
        <div className={styles.grafcontainer}>
          {data.map((item, index) => {
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
                  <div className={styles.centerNumber}>{item.value}</div>
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
