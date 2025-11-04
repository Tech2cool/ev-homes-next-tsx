"use client";

import { useEffect, useRef, useState } from "react";
import styles from "../data-analyzer-dashboard/overview.module.css";
import superstayle from "./dashboard.module.css";
import { FaCommentDots, FaTasks, FaUserFriends } from "react-icons/fa";
import { FaUsers, FaCheck, FaBoxes, FaArrowRight } from "react-icons/fa";
import { FaCarSide, FaFlag, FaUserTie } from "react-icons/fa6";
import { MdOutlinePendingActions } from "react-icons/md";
import { IoMdKey } from "react-icons/io";
import { CircularProgress } from "../closing-manager/circular-progress";
import { PiFunnelSimple, PiFunnelSimpleBold } from "react-icons/pi";
import { useUser } from "@/providers/userContext";
import { useData } from "@/providers/dataContext";

const SuperAdminDasboard = () => {
  const {
    searchLeadInfo,
    searchPostSaleLeadInfo,
    asssignFeedbackInfo,
    closingManagerAllGraph,

    fetchSearchLeads,
    fetchPostSaleLeads,
    fetchAssignFeedbackLeadsCount,
    getAllGraph,
  } = useData();
  const { user, loading } = useUser();

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
  const [showFilter, setShowFilter] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const [selectproject, setSelectproject] = useState<{ project: string }>({
    project: "",
  });
  const [startDate, setStartDate] = useState<string | null>(null);
const [endDate, setEndDate] = useState<string | null>(null);


  useEffect(() => {
    if (user && !loading) {
      console.log("use effect dashboard");

      fetchAssignFeedbackLeadsCount({
        query: "",
        page: 1,
        limit: 10,
      });
    }
  }, [user, loading]);

  // This runs when the state is actually updated
  useEffect(() => {
    if (asssignFeedbackInfo) {
      console.log("assignFeedbackInfo updated:", asssignFeedbackInfo);
    }
  }, [asssignFeedbackInfo]);

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
    if (user && !loading && !searchPostSaleLeadInfo) {
      fetchPostSaleLeads({
        query: "",
        page: 1,
        limit: 10,
      });
    }
  }, [user, loading, searchPostSaleLeadInfo]);

  const cardsData = [
    {
      label: "Total Leads",
      value: searchLeadInfo?.totalItems ?? 0,
      icon: <FaUsers />,
      color: "#ad82f2e1",
      bgcolor: "#7c2ff706",
    },
    {
      label: "Visit 1",
      value: searchLeadInfo?.visitCount ?? 0,
      icon: <FaUserTie />,
      color: "#88c08aa8",
      bgcolor: "#4caf4f09",
    },
    {
      label: "Visit 2",
      value: searchLeadInfo?.visit2Count ?? 0,
      icon: <FaCarSide />,
      color: "#ce676082",
      bgcolor: "#f4433609",
    },
    {
      label: "Booking",
      value: searchLeadInfo?.bookingCount ?? 0,
      icon: <IoMdKey />,
      color: "#c0a24aa7",
      bgcolor: "#ffc10709",
    },
    {
      label: "Internal leads",
      value: searchLeadInfo?.internalLeadCount ?? 0,
      icon: <FaUserFriends />,
      color: "#bd58959c",
      bgcolor: "#d4006a09",
    },
    {
      label: "Bulk Leads",
      value: searchLeadInfo?.bulkCount ?? 0,
      icon: <FaBoxes />,
      color: "#58b1bd9c",
      bgcolor: "#00bbd409",
    },
  ];

//   const dashCount = {
//     name: "Deepak Karki",
//     task: { pending: 5 },
//     lead: {
//       total: 120,
//       visit1: 80,
//       visit2: 40,
//       booking: 25,
//       internalLeadCount: 10,
//       bulkCount: 5,
//       pending: 15,
//       bookingCp: 20,
//       bookingWalkIn: 5,
//     },
//   };

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

//  useEffect(() => {
//   if (user && !loading) {
//     if (!selectedFilter && !startDate && !endDate) return;
//     getAllGraph({
//       interval: selectedFilter,
//       startDate,
//       endDate,
//     });
//   }
// }, [user, loading, selectedFilter, startDate, endDate]);



//  useEffect(() => {
//   if (user && !loading) {
//     console.log("Fetching graph data with params:", {
//       interval: selectedFilter,
//       startDate,
//       endDate
//     });
    
//     getAllGraph({
//       interval: selectedFilter,
//       startDate,
//       endDate,
//     });
//   }
// }, [user, loading, selectedFilter, startDate, endDate]);

// Add this for initial load
useEffect(() => {
  if (user && !loading) {
    // Initial load with default params
    getAllGraph({
      interval: selectedFilter || "Monthly", 
      startDate,
      endDate,
    });
  }
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
  const cards = Array.isArray(asssignFeedbackInfo)
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
  const safeDivision = (numerator: number, denominator: number): number => {
    if (!denominator || denominator === 0) return 0;
    return +(numerator / denominator).toFixed(1);
  };
  const projectOptions = [
    { value: "p1", label: "EV 23 Malibu West" },
    { value: "p2", label: "EV 10 Marina Bay" },
  ];
  const metrics = [
    {
      title: "Lead to CP Visit",
     percentage: safeDivision(
      (closingManagerAllGraph?.visitCount ?? 0) * 100,
      closingManagerAllGraph?.leadCount ?? 1
    ),
      count1: closingManagerAllGraph?.visitCount ?? 0,
      count2: closingManagerAllGraph?.leadCount ?? 0,
      label1: "Lead",
      label2: "CP Visit",
      color: "#ec4899",
    },
    {
      title: "CP Visit to Booking",
       percentage: safeDivision(
      (closingManagerAllGraph?.bookingCpCount ?? 0) * 100,
      closingManagerAllGraph?.visitCount ?? 1
    ),
      count1: closingManagerAllGraph?.bookingCpCount ?? 0,
      count2: closingManagerAllGraph?.visitCount ?? 0,
      label1: "CP Visit",
      label2: "Booking",
      color: "#10b981",
    },
    {
      title: "Lead to Booking",
      percentage: safeDivision(
      (closingManagerAllGraph?.bookingCount ?? 0) * 100,
      closingManagerAllGraph?.leadCount ?? 1
    ),
      count1: closingManagerAllGraph?.leadCount ?? 0,
      count2: closingManagerAllGraph?.bookingCount ?? 0,
      label1: "Lead",
      label2: "Booking",
      color: "#3b82f6",
    },
    {
      title: "Walk In to Booking",
     percentage: safeDivision(
      (closingManagerAllGraph?.bookingWalkinCount ?? 0) * 100,
      closingManagerAllGraph?.visit2Count ?? 1
    ),
      count1: closingManagerAllGraph?.bookingWalkinCount ?? 0,
      count2: closingManagerAllGraph?.visit2Count ?? 0,
      label1: "Visit",
      label2: "Booking",
      color: "#f97316",
    },
  ];
  const visitData = [
    {
      id: 1,
      count: searchPostSaleLeadInfo?.totalItems ?? 0,
      label: "Total Booking",
    },
    {
      id: 2,
      count: searchPostSaleLeadInfo?.registrationDone ?? 0,
      label: "Reg-done",
    },
    {
      id: 3,
      count: searchPostSaleLeadInfo?.eoiRecieved ?? 0,
      label: "EOI Recieved",
    },
    {
      id: 4,
      count: searchPostSaleLeadInfo?.cancelled ?? 0,
      label: "Cancelled",
    },
  ];

  const filters = ["Monthly", "Quarterly", "Semi-Annually", "Annually"];
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowFilter(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    setSelectedFilter(option);
    setShowFilter(false);
  };

  return (
    <div className={styles.tabcontainer} style={{ position: "relative" }}>
      <div className={superstayle.headpart}>
        <div className={superstayle.projectctn}>
          <div className={superstayle.formControl}>
            <select
              value={selectproject.project}
              onChange={(e) =>
                setSelectproject((prev) => ({
                  ...prev,
                  project: e.target.value,
                }))
              }
            >
              <option value="">Select Project</option>
              {projectOptions.map((option: any, index: number) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={superstayle.filter}>
          <div className={superstayle.filterContainer} ref={menuRef}>
            <div
              className={superstayle.filterIcon}
              onClick={() => setShowFilter((prev) => !prev)}
            >
              <PiFunnelSimple />
            </div>
            {showFilter && (
              <div className={superstayle.filterMenu}>
                {filters.map((option) => (
                  <div
                    key={option}
                    className={`${superstayle.filterOption} ${
                      selectedFilter === option ? superstayle.activeOption : ""
                    }`}
                    onClick={() => handleSelect(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className={superstayle.rank}>
        <div className={superstayle.rankItem}>
          <span className={superstayle.medal}>🥇</span>
          <span className={superstayle.name}>Ranjana</span>
          <span className={superstayle.score}>1264</span>
        </div>
        <div className={superstayle.rankItem}>
          <span className={superstayle.medal}>🥈</span>
          <span className={superstayle.name}>Jaspreet</span>
          <span className={superstayle.score}>967</span>
        </div>
        <div className={superstayle.rankItem}>
          <span className={superstayle.medal}>🥉</span>
          <span className={superstayle.name}>Deepak</span>
          <span className={superstayle.score}>859</span>
        </div>
      </div>

      <div className={styles.headtitle}>
        <div className={styles.ding}>Leads Overview</div>
      </div>
      <div className={styles.leadsection}>
        <div className={superstayle.tapsection} ref={scrollRef}>
          {cardsData.map((card, index) => (
            <div className={superstayle.card} key={index}>
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
        <div className={styles.ding}>Booking Overview</div>
      </div>
      <div className={styles.visitsection}>
        <div className={styles.viewrow} ref={visitscrollRef}>
          {visitData.map((item) => (
            <div key={item.id} className={styles.viewcontainer}>
              <div className={styles.numsec}>{item.count}</div>
              <p>{item.label}</p>
            </div>
          ))}
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
        <div className={styles.ding}>Assign/Feedback Pending</div>
      </div>
      <div className={styles.Monthlytarget} ref={containerRef}>
        {cards.map((card, index) => (
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
                  {card.tasks}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.headtitle}>
        <div className={styles.ding}>Conversion Metrics</div>
      </div>
      <div className="p-4 sm:p-6 pt-0">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="bg-card rounded-xl p-4 sm:p-6 shadow-sm border text-card-foreground">
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {metrics.map((kpi, index) => (
                  <CircularProgress
                    key={index}
                    title={kpi.title}
                    percentage={kpi.percentage}
                    count1={kpi.count1}
                    count2={kpi.count2}
                    label1={kpi.label1}
                    label2={kpi.label2}
                    color={kpi.color}
                    size={100}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminDasboard;
