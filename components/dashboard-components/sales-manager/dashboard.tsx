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
import target from "../closing-manager/target-section.module.css";

import { FaCommentDots } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { CircularProgress } from "../closing-manager/circular-progress";
import { GrGroup } from "react-icons/gr";
import { PiChartLineUpLight } from "react-icons/pi";
import { BsCardChecklist } from "react-icons/bs";
import ConversionOverview from "../closing-manager/conversion-overview";
import { cn } from "@/lib/utils";
import { MetricCard } from "../closing-manager/metric-card";
import { useData } from "@/providers/dataContext";
import { useUser } from "@/providers/userContext";
import React from "react";
import { Button } from "@/components/ui/button";
import { Timeline20Regular } from "@fluentui/react-icons";

interface SalesManagerDashboardHeaderProps {
  userName: string;
  pendingText?: string; // e.g., "You have 369 pending tasks"
  lastSyncText?: string; // e.g., "24 Sep 25 10:45 pm"
  avatarUrl?: string;
  className?: string;
  onSyncNow?: () => void;
}

export function SalesManagerDashboardHeader({
  userName,
  pendingText,
  lastSyncText = "07 Oct 25",
  avatarUrl,
  className,
  onSyncNow,
}: SalesManagerDashboardHeaderProps) {
  const {
    dashCount,
    asssignFeedbackInfo,
    getSalesManagerDashBoardCount,
    fetchAssignFeedbackLeadsCount,
  } = useData();
  const { user, loading } = useUser();

  useEffect(() => {
    if (user && !loading) {
      console.log("use effect dashboard");
      getSalesManagerDashBoardCount({ id: user?._id ?? null });
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

  const displayName = (dashCount?.name ?? "").trim() || "User";
  const initials = React.useMemo(() => {
    const parts = displayName.split(/\s+/).filter(Boolean);
    if (parts.length === 0) return "U";
    return parts
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [displayName]);

  const salesoverview = [
    {
      title: "Leads",
      value: dashCount?.lead?.total ?? 0,
      isPositive: true,
      icon: <Users className="h-6 w-6" />,
      iconColor: "text-blue-600",
      iconBg: "bg-blue-100",
      gradientFrom: "from-blue-50",
      gradientTo: "to-white",
    },
    {
      title: "CP Visits",
      value: dashCount?.lead?.visit1 ?? 0,
      isPositive: true,
      icon: <Calendar className="h-6 w-6" />,
      iconColor: "text-green-600",
      iconBg: "bg-green-100",
      gradientFrom: "from-green-50",
      gradientTo: "to-white",
    },
    {
      title: "Walk In Visits",
      value: dashCount?.lead?.visit2 ?? 0,
      isPositive: true,
      icon: <Truck className="h-6 w-6" />,
      iconColor: "text-purple-600",
      iconBg: "bg-purple-100",
      gradientFrom: "from-purple-50",
      gradientTo: "to-white",
    },
    {
      title: "Booking",
      value: dashCount?.lead?.booking ?? 0,
      isPositive: true,
      icon: <TrendingUp className="h-6 w-6" />,
      iconColor: "text-orange-600",
      iconBg: "bg-orange-100",
      gradientFrom: "from-orange-50",
      gradientTo: "to-white",
    },
    {
      title: "Internal Leads",
      value: dashCount?.lead?.internalLeadCount ?? 0,
      isPositive: true,
      icon: <TrendingUp className="h-6 w-6" />,
      iconColor: "text-teal-600",
      iconBg: "bg-teal-100",
      gradientFrom: "from-teal-50",
      gradientTo: "to-white",
    },
    {
      title: "Bulk Leads",
      value: dashCount?.lead?.bulkCount ?? 0,
      isPositive: true,
      icon: <TrendingUp className="h-6 w-6" />,
      iconColor: "text-pink-600",
      iconBg: "bg-pink-100",
      gradientFrom: "from-pink-50",
      gradientTo: "to-white",
    },
    {
      title: "Pending",
      value: dashCount?.lead?.pending ?? 0,
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
    { label: "My Task & Follow Up", color: "blue", Icon: BsCardChecklist },
    { label: "Line Up", color: "amber", Icon: PiChartLineUpLight },
    { label: "Inventory", color: "green", Icon: Timeline20Regular  },
  ];

  const leads = dashCount?.lead?.total ?? 0;
  const bookings = dashCount?.lead?.booking ?? 0;
  const visits =
    (dashCount?.lead?.visit1 ?? 0) + (dashCount?.lead?.visit2 ?? 0);

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
    {
      name: asssignFeedbackInfo?.teamLeader?.firstName ?? "Test",
      feedback: asssignFeedbackInfo?.notFollowUpCount ?? 0,
      tasks: asssignFeedbackInfo?.notAssignedCount ?? 0,
      border: "#87CEEB",
    },
  ];

  const safeDivision = (numerator: number, denominator: number): number => {
    if (!denominator || denominator === 0) return 0;
    return +(numerator / denominator).toFixed(1);
  };

  const metrics = [
    {
      title: "Lead to CP",
      percentage: safeDivision(
        (dashCount?.lead?.visit1 ?? 0) * 100,
        dashCount?.lead?.total ?? 0
      ),
      count1: dashCount?.lead?.total ?? 0,
      count2: dashCount?.lead?.visit1 ?? 0,
      label1: "Lead",
      label2: "CP",
      color: "#ec4899",
    },
    {
      title: "Lead to Walk In",
      percentage: safeDivision(
        (dashCount?.lead?.visit2 ?? 0) * 100,
        dashCount?.lead?.total ?? 0
      ),
      count1: dashCount?.lead?.total ?? 0,
      count2: dashCount?.lead?.visit2 ?? 0,
      label1: "Lead",
      label2: "Visit",
      color: "#10b981",
    },
    {
      title: "CP to Booking",
      percentage: safeDivision(
        (dashCount?.lead?.bookingCp ?? 0) * 100,
        dashCount?.lead?.visit1 ?? 0
      ),
      count1: dashCount?.lead?.visit1 ?? 0,
      count2: dashCount?.lead?.bookingCp ?? 0,
      label1: "Visit",
      label2: "Booking",
      color: "#3b82f6",
    },
    {
      title: "Walk In to Booking",
      percentage: safeDivision(
        (dashCount?.lead?.bookingWalkIn ?? 0) * 100,
        dashCount?.lead?.visit2 ?? 0
      ),
      count1: dashCount?.lead?.visit2 ?? 0,
      count2: dashCount?.lead?.bookingWalkIn ?? 0,
      label1: "Visit",
      label2: "Booking",
      color: "#f97316",
    },
  ];

  // const toggleBottomSheet = (index: number) => {
  //   setActiveCard(activeCard === index ? null : index);
  // };

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
      <header
        role="banner"
        className={cn(
          "w-full border-b bg-gradient-to-b from-background to-secondary/50 backdrop-blur supports-[backdrop-filter]:to-secondary/40",
          className
        )}
      >
        <div className="mx-auto max-w-screen-2xl px-4">
          <div className="flex items-center justify-between py-2">
            {/* Left Side - Avatar & Info */}
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 ring-2 ring-border">
                <AvatarImage
                  src={
                    avatarUrl ||
                    "/placeholder.svg?height=32&width=32&query=user%20avatar"
                  }
                  alt={`${dashCount?.name ?? "test"} avatar`}
                />
                <AvatarFallback className="text-xs">{initials}</AvatarFallback>
              </Avatar>

              <div className="flex flex-col">
                <span className="text-xs font-semibold uppercase tracking-widest text-foreground">
                  {dashCount?.name ?? "test"}
                </span>
                <span className="text-[11px] leading-4 text-muted-foreground">
                  {/* dynamically show pending tasks from dashCount */}
                  {`You have ${dashCount?.task?.pending ?? 0} pending tasks`}
                </span>
              </div>
            </div>

            {/* Right Side - Sync Info */}
            <div className="flex flex-col items-end">
              <p className="text-[11px] leading-4 text-muted-foreground mb-1">
                Last sync was:{" "}
                <span className="font-small text-foreground">
                  {lastSyncText}
                </span>
              </p>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="rounded-full px-2 py-1 text-xs bg-transparent"
                  onClick={onSyncNow}
                  aria-label="Sync now"
                >
                  Sync now
                </Button>
                <span className="text-[11px] text-muted-foreground">19:00</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <h2 className="text-xl font-semibold text-foreground">
          Sales Overview
        </h2>

        {/* Desktop & Tablet ≥768px → Grid */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-0 no-scrollbar scroll-smooth snap-x snap-mandatory"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {salesoverview.map((metric, index) => (
            <div
              key={index}
              className={`${styles.metricCardWrapper} flex-shrink-0 snap-center`}
              style={
                {
                  // minWidth: "150px", // adjust card width as needed
                }
              }
            >
              <div className={styles.metricCardContent}>
                <MetricCard {...metric} />
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-3 gap-2 max-[1300px]:flex hidden">
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

      {/* assign and feedback pending */}
      <div className="  sm:flex flex-row justify-center mt-5">
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

        {/* quick links */}
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
      {/* conversion metrics */}

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
