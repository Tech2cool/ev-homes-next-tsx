"use client";

import {
  Calendar,
  Sun,
  Moon,
  Bell,
  Truck,
  TrendingUp,
  Users,
  TrendingDown,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useEffect, useRef, useState } from "react";
import styles from "./dashboard.module.css";
import target from "./target-section.module.css";
import { MetricCard } from "./metric-card";
import { FaCommentDots } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { CircularProgress } from "./circular-progress";
import TargetSection from "./target-section";
import { GrGroup } from "react-icons/gr";
import { PiChartLineUpLight } from "react-icons/pi";
import { BsCardChecklist } from "react-icons/bs";
import ConversionOverview from "./conversion-overview";
import { cn } from "@/lib/utils";

interface ClosingManagerDashboardHeaderProps {
  title?: string;
  dateRange?: string;
  userName?: string;
  userAvatar?: string;
}

export function ClosingManagerDashboardHeader({
  title = "Dashboard",
  dateRange = "You have 369 pending tasks",
  userName = "Deepak Karki",
  userAvatar,
}: ClosingManagerDashboardHeaderProps) {
  const salesoverview = [
    {
      title: "Leads",
      value: "12065",
      isPositive: true,
      icon: <Users className="h-6 w-6" />,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      gradientFrom: "from-blue-50",
      gradientTo: "to-white",
    },
    {
      title: "CP Visits",
      value: "347",
      isPositive: true,
      icon: <Calendar className="h-6 w-6" />,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      gradientFrom: "from-green-50",
      gradientTo: "to-white",
    },
    {
      title: "Walk In Visits",
      value: "162",
      isPositive: true,
      icon: <Truck className="h-6 w-6" />,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      gradientFrom: "from-purple-50",
      gradientTo: "to-white",
    },
    {
      title: "Booking",
      value: "31",
      isPositive: true,
      icon: <TrendingUp className="h-6 w-6" />,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100",
      gradientFrom: "from-orange-50",
      gradientTo: "to-white",
    },
    {
      title: "Internal Leads",
      value: "209",
      isPositive: true,
      icon: <TrendingUp className="h-6 w-6" />,
      iconColor: "text-teal-600",
      iconBg: "bg-teal-100",
      gradientFrom: "from-teal-50",
      gradientTo: "to-white",
    },
    {
      title: "Bulk Leads",
      value: "306",
      isPositive: true,
      icon: <TrendingUp className="h-6 w-6" />,
      iconColor: "text-pink-600",
      iconBg: "bg-pink-100",
      gradientFrom: "from-pink-50",
      gradientTo: "to-white",
    },
    {
      title: "Pending",
      value: "11779",
      isPositive: false,
      icon: <TrendingDown className="h-6 w-6" />,
      iconColor: "text-red-600",
      iconBg: "bg-red-100",
      gradientFrom: "from-red-50",
      gradientTo: "to-white",
    },
  ];

  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [activeCard2, setActiveCard2] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const assignPendingRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  type QuickAction = {
    label: string;
    color: "blue" | "amber" | "green";
    Icon: React.ElementType;
  };

  const quickActions: QuickAction[] = [
    { label: "Follow Up", color: "blue", Icon: BsCardChecklist },
    { label: "Line Up", color: "amber", Icon: PiChartLineUpLight },
    { label: "Team Performance", color: "green", Icon: GrGroup },
  ];

  const leads = 11608;
  const bookings = 59;
  const visits = 432;

  const cards = [
    {
      name: "Closing Crew",
      tasks: "3890 tasks",
      borderColor: " #4A90E2",
      members: ["Deepak", "Muthuswami Venugopal Iyer", "Priya"],
    },
    {
      name: "Shree Ganesh",
      tasks: "2634 tasks",
      borderColor: " #91082A",

      members: ["Rahul", "Sneha", "Kiran"],
    },
    {
      name: "Deal Maker",
      tasks: "3724 tasks",
      borderColor: "#1F1F1F",

      members: ["Suresh", "Anita", "Manoj"],
    },
  ];

  const assignFeedbackcard = [
    { name: "Deepak Karki", feedback: 100, tasks: 300, border: "#87CEEB" },
    { name: "Jaspreet Arora", feedback: 210, tasks: 320, border: "#BA1A42" },
    { name: "Ranjna Gupta", feedback: 150, tasks: 310, border: "#546E86" },
  ];

  const metrics = [
    {
      title: "Lead to CP",
      percentage: 2.4,
      count1: 11708,
      count2: 280,
      label1: "Lead",
      label2: "CP",
      color: "#ec4899",
    },
    {
      title: "Lead to Walk In",
      percentage: 1.4,
      count1: 11708,
      count2: 161,
      label1: "Lead",
      label2: "Visit",
      color: "#10b981",
    },
    {
      title: "CP to Booking",
      percentage: 17.1,
      count1: 280,
      count2: 48,
      label1: "Visit",
      label2: "Booking",
      color: "#3b82f6",
    },
    {
      title: "Walk In to Booking",
      percentage: 7.5,
      count1: 161,
      count2: 12,
      label1: "Visit",
      label2: "Booking",
      color: "#f97316",
    },
  ];

  const toggleBottomSheet = (index: number) => {
    setActiveCard(activeCard === index ? null : index);
  };

  const toggleBottomSheet2 = (index: number) => {
    setActiveCard2(activeCard2 === index ? null : index);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const cardWidth = 150 + 16; // minWidth + gap (adjust if needed)
      const index = Math.round(el.scrollLeft / cardWidth);
      setActiveIndex(index);
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, []);

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
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        assignPendingRef.current &&
        !assignPendingRef.current.contains(event.target as Node)
      ) {
        setActiveCard2(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.dashboardHeader}>
        {/* Title */}
        <h1 className={styles.headerTitle}>{title}</h1>

        {/* Date Range */}

        {/* User Profile */}
        <div className={styles.headerRight}>
          <div className={styles.userProfile}>
            <Avatar className={styles.userAvatar}>
              <AvatarImage
                src={userAvatar || "/placeholder.svg"}
                alt={userName}
              />
              <AvatarFallback className={styles.userAvatarFallback}>
                {userName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <span className={styles.userName}>{userName}</span>
            <div className={styles.dateRangeContainer}>
              <Calendar className={styles.calendarIcon} />
              <span className={styles.dateRangeText}>{dateRange}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-semibold text-foreground">
          Sales Overview
        </h2>

        {/* Desktop & Tablet ≥768px → Grid */}
        <div className="hidden md:grid md:grid-cols-5 lg:grid-cols-7 gap-4 no-scrollbar">
          {salesoverview.map((metric, index) => (
            <div key={index} className={styles.metricCardWrapper}>
              <div className={styles.metricCardContent}>
                <MetricCard {...metric} />
              </div>
            </div>
          ))}
        </div>

        {/* Mobile <768px → Horizontal Scroll */}
        <div
          ref={scrollRef}
          className="flex md:hidden overflow-x-auto gap-4 no-scrollbar scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {salesoverview.map((metric, index) => (
            <div
              key={index}
              className={`${styles.metricCardWrapper} flex-shrink-0 snap-center`}
              style={{ minWidth: "150px" }}
            >
              <div className={styles.metricCardContent}>
                <MetricCard {...metric} />
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-3 gap-2 md:hidden">
          {salesoverview.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 w-2 rounded-full transition-all ${
                activeIndex === idx ? "bg-blue-600 w-2" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>

      <div className={styles.mainContainer}>
        <div className="p-6 pt-0">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Team Overview
          </h2>

          <div className={styles.Monthlytarget} ref={containerRef}>
            {cards.map((card, index) => (
              <div key={index} className={styles.cardWrapper}>
                <div
                  className={cn(
                    `${styles.cardtarget} ${
                      activeCard === index ? styles.cardActive : ""
                    }`,
                    "bg-card text-card-foreground rounded-xl shadow-sm"
                  )}
                  style={{ border: `2px solid ${card.borderColor}` }}
                  onClick={() => toggleBottomSheet(index)}
                >
                  <h3 className="teamName">{card.name}</h3>
                  <div
                    className={styles.assignpendibg}
                    style={
                      {
                        borderLeftColor: card.borderColor,
                        "--hover-color": card.borderColor, // ✅ plain string works
                      } as React.CSSProperties
                    } // cast entire style object
                  >
                    <FaTasks style={{ marginRight: "6px" }} /> {card.tasks}
                  </div>
                </div>

                <div
                  className={`${styles.bottomSheet} ${
                    activeCard === index ? styles.show : ""
                  }`}
                  style={{ border: `2px solid ${card.borderColor}` }}
                >
                  {card.members.map((member, mIndex) => (
                    <div
                      key={mIndex}
                      className={styles.sheetItem}
                      style={{
                        border: `0.5px solid ${card.borderColor}`,
                        background: `${card.borderColor}10`,
                      }}
                    >
                      <p className={styles.sheetLabel}>{member}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* assign */}
        <div className="p-6 pt-0">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Assign/Feedback Pending
          </h2>
          <div className={styles.Monthtarget} ref={assignPendingRef}>
            {assignFeedbackcard.map((card, index) => (
              <div key={index} className={styles.cardWrap}>
                <div
                  className={cn(
                    `${styles.cardassignFeedback} ${
                      activeCard2 === index ? styles.cardActive : ""
                    }`,
                    "bg-card text-card-foreground rounded-xl shadow-sm" // ✅ same look as others
                  )}
                  style={{ border: `2px solid ${card.border}` }}
                  onClick={() => toggleBottomSheet2(index)}
                >
                  <h3>{card.name}</h3>
                  <div className={styles.btnGroup}>
                    <div className={styles.feedbackpending}>
                      <FaCommentDots style={{ marginRight: "6px" }} />{" "}
                      {card.feedback}
                    </div>
                    <div className={styles.assignpending}>
                      <FaTasks style={{ marginRight: "6px" }} /> {card.tasks}
                    </div>
                  </div>
                </div>

                <div
                  className={`${styles.bottomSheet2} ${
                    activeCard2 === index ? styles.show2 : ""
                  }`}
                  style={{ border: `2px solid  ${card.border}` }}
                >
                  <div className={styles.sheetItem2}>
                    <p className={styles.sheetLabel2}>Feedback Pending</p>
                    <p className={`${styles.sheetValue2} ${styles.red}`}>
                      1000
                    </p>
                  </div>
                  <div className={`${styles.sheetItem2} ${styles.sheetgreen} `}>
                    <p className={styles.sheetLabel2}>Assign Pending</p>
                    <p className={`${styles.sheetValue2} ${styles.blue}`}>
                      200
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* overview */}
        <div className="p-6 pt-0">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Quick Actions
          </h2>

          <div className={target.quick}>
            {quickActions.map((action, idx) => (
              <div
                key={idx}
                className={`${target.rowItem} ${target[action.color]}`}
              >
                <action.Icon className={target[`icon${action.color}`]} />
                <span className={target[`label${action.color}`]}>
                  {action.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <TargetSection />

      <div className="p-4 sm:p-6 pt-0">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Left - Conversion Metrics */}
          <div className="flex-1">
            {/* Title for left */}
            <h2 className="text-xl sm:text-xl font-semibold text-foreground mb-4 sm:mb-6">
              Conversion Metrics
            </h2>

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

          <ConversionOverview
            leads={leads}
            bookings={bookings}
            visits={visits}
          />
        </div>
      </div>
    </div>
  );
}
