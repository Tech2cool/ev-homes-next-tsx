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
import { MetricCard } from "./metric-card";
import { TeamCard } from "./team-card";
import { FaCommentDots } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";

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
  const metrics = [
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
  const containerRef = useRef<HTMLDivElement>(null);

  const cards = [
    {
      name: "Closing Crew",
      tasks: "3890 tasks",
      borderColor: "#6a5acd", // purple
      members: ["Deepak", "Muthuswami Venugopal Iyer", "Priya"],
    },
    {
      name: "Shree Ganesh",
      tasks: "2634 tasks",
      borderColor: "#2fc18c", // green
      members: ["Rahul", "Sneha", "Kiran"],
    },
    {
      name: "Deal Maker",
      tasks: "3724 tasks",
      borderColor: "#ff6b6b", // red
      members: ["Suresh", "Anita", "Manoj"],
    },
  ];

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
  });

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

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
          {metrics.map((metric, index) => (
            <div key={index} className={styles.metricCardWrapper}>
              <div className={styles.metricCardContent}>
                <MetricCard {...metric} />
              </div>
            </div>
          ))}
        </div>

          <div className="p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">
            Team Overview
          </h2>
          

          {/* <div className="grid gap-4 md:grid-cols-3">
            {teams.map((team, index) => (
              <TeamCard
                key={index}
                teamName={team.teamName}
                taskCount={team.taskCount}
                percentage={team.percentage}
                color={team.color}
                lightColor={team.lightColor}
              />
            ))}
          </div> */}

          <div className={styles.Monthlytarget} ref={containerRef}>
            {cards.map((card, index) => (
              <div key={index} className={styles.cardWrapper}>
                <div
                  className={`${styles.cardtarget} ${
                    activeCard === index ? styles.cardActive : ""
                  }`}
                  style={{ border: `2px solid ${card.borderColor}` }}
                  onClick={() => toggleBottomSheet(index)}
                >
                  <h3 className="teamName">{card.name}</h3>
                  <div className={styles.btnGroup}>
                    <div
                      className={styles.assignpendibg}
                      style={{ borderLeftColor: card.borderColor }}
                    >
                      <FaTasks style={{ marginRight: "6px" }} /> {card.tasks}
                    </div>
                  </div>
                </div>

                <div
                  className={`${styles.bottomSheet} ${
                    activeCard === index ? styles.show : ""
                  }`}
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
      </div>
    </div>
  );
}
