"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";
import {
  Home,
  User,
  Settings,
  Bell,
  Search,
  Calendar,
  MapPin,
  Heart,
  Eye,
  TrendingUp,
  LogOut,
  Phone,
  Mail,
  Filter,
} from "lucide-react";
import DashboardSalesPage from "@/components/dashboard-components/sales/dashboard";

const DashboardPage = () => {
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  const properties = [
    {
      id: 1,
      title: "Modern Villa in Downtown",
      location: "Manhattan, NY",
      price: "$2,500,000",
      image: "/placeholder.svg?height=200&width=300",
      status: "Available",
      bedrooms: 4,
      bathrooms: 3,
      area: "3,200 sq ft",
      liked: true,
    },
    {
      id: 2,
      title: "Luxury Apartment with City View",
      location: "Brooklyn, NY",
      price: "$1,800,000",
      image: "/placeholder.svg?height=200&width=300",
      status: "Under Review",
      bedrooms: 3,
      bathrooms: 2,
      area: "2,100 sq ft",
      liked: false,
    },
    {
      id: 3,
      title: "Cozy Family Home",
      location: "Queens, NY",
      price: "$950,000",
      image: "/placeholder.svg?height=200&width=300",
      status: "Visited",
      bedrooms: 3,
      bathrooms: 2,
      area: "1,800 sq ft",
      liked: true,
    },
  ];

  const upcomingAppointments = [
    {
      id: 1,
      property: "Modern Villa in Downtown",
      date: "Tomorrow",
      time: "2:00 PM",
      type: "Site Visit",
    },
    {
      id: 2,
      property: "Luxury Apartment with City View",
      date: "Dec 28",
      time: "10:00 AM",
      type: "Consultation",
    },
  ];
  return <DashboardSalesPage />;

};

export default DashboardPage;
