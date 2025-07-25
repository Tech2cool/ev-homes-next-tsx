"use client";

import React from "react";
import { useRouter } from "next/navigation";
import styles from "./dashboard.module.css";
import { Home, User, Settings, Bell, Search, Calendar, MapPin, Heart, Eye, TrendingUp, LogOut, Phone, Mail, Filter } from 'lucide-react';

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

  return (
    <div className={styles.dashboardContainer}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <div className={styles.logo}>
            <Home className={styles.logoIcon} />
            <h1>PropertyHub</h1>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.notificationBtn}>
              <Bell />
            </button>
            <div className={styles.userProfile}>
              <img
                src="/placeholder.svg?height=40&width=40"
                alt="User"
                className={styles.userAvatar}
              />
              <div className={styles.userInfo}>
                <span className={styles.userName}>John Doe</span>
                <span className={styles.userEmail}>john.doe@example.com</span>
              </div>
            </div>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              <LogOut />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className={styles.mainContent}>
        {/* Welcome Section */}
        <div className={styles.welcomeSection}>
          <h2 className={styles.welcomeTitle}>Welcome back, John! 👋</h2>
          <p className={styles.welcomeSubtitle}>
            Here's what's happening with your property search today.
          </p>
        </div>

        {/* Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statInfo}>
                <span className={styles.statLabel}>Properties Viewed</span>
                <span className={styles.statValue}>24</span>
              </div>
              <Eye className={styles.statIcon} />
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statInfo}>
                <span className={styles.statLabel}>Favorites</span>
                <span className={styles.statValue}>8</span>
              </div>
              <Heart className={styles.statIcon} />
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statInfo}>
                <span className={styles.statLabel}>Appointments</span>
                <span className={styles.statValue}>5</span>
              </div>
              <Calendar className={styles.statIcon} />
            </div>
          </div>
          <div className={styles.statCard}>
            <div className={styles.statContent}>
              <div className={styles.statInfo}>
                <span className={styles.statLabel}>Applications</span>
                <span className={styles.statValue}>3</span>
              </div>
              <User className={styles.statIcon} />
            </div>
          </div>
        </div>

        <div className={styles.contentGrid}>
          {/* Main Content */}
          <div className={styles.mainColumn}>
            {/* Search Progress */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>
                  <TrendingUp className={styles.cardTitleIcon} />
                  Your Search Progress
                </h3>
                <p className={styles.cardDescription}>
                  You're 75% closer to finding your dream home!
                </p>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.progressItem}>
                  <div className={styles.progressLabel}>
                    <span>Profile Complete</span>
                    <span>100%</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
                <div className={styles.progressItem}>
                  <div className={styles.progressLabel}>
                    <span>Properties Viewed</span>
                    <span>75%</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
                <div className={styles.progressItem}>
                  <div className={styles.progressLabel}>
                    <span>Applications Submitted</span>
                    <span>50%</span>
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFill}
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Properties */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Your Properties</h3>
                <div className={styles.cardActions}>
                  <button className={styles.actionBtn}>
                    <Filter />
                    Filter
                  </button>
                  <button className={styles.actionBtn}>
                    <Search />
                    Search
                  </button>
                </div>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.propertiesList}>
                  {properties.map((property) => (
                    <div key={property.id} className={styles.propertyItem}>
                      <img
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        className={styles.propertyImage}
                      />
                      <div className={styles.propertyDetails}>
                        <div className={styles.propertyHeader}>
                          <h4 className={styles.propertyTitle}>
                            {property.title}
                          </h4>
                          <button className={styles.favoriteBtn}>
                            <Heart
                              className={
                                property.liked
                                  ? styles.favoriteActive
                                  : styles.favoriteInactive
                              }
                            />
                          </button>
                        </div>
                        <div className={styles.propertyLocation}>
                          <MapPin />
                          {property.location}
                        </div>
                        <div className={styles.propertyInfo}>
                          <div className={styles.propertySpecs}>
                            <span>{property.bedrooms} bed</span>
                            <span>{property.bathrooms} bath</span>
                            <span>{property.area}</span>
                          </div>
                          <div className={styles.propertyPricing}>
                            <span
                              className={`${styles.propertyStatus} ${
                                styles[property.status.toLowerCase().replace(" ", "")]
                              }`}
                            >
                              {property.status}
                            </span>
                            <span className={styles.propertyPrice}>
                              {property.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className={styles.sidebar}>
            {/* Upcoming Appointments */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>
                  <Calendar className={styles.cardTitleIcon} />
                  Upcoming Appointments
                </h3>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.appointmentsList}>
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className={styles.appointmentItem}>
                      <h4 className={styles.appointmentProperty}>
                        {appointment.property}
                      </h4>
                      <div className={styles.appointmentDetails}>
                        <span className={styles.appointmentTime}>
                          {appointment.date} at {appointment.time}
                        </span>
                        <span className={styles.appointmentType}>
                          {appointment.type}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button className={styles.scheduleBtn}>
                  <Calendar />
                  Schedule New Visit
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Quick Actions</h3>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.quickActions}>
                  <button className={styles.quickActionBtn}>
                    <Search />
                    Browse Properties
                  </button>
                  <button className={styles.quickActionBtn}>
                    <Calendar />
                    Book Site Visit
                  </button>
                  <button className={styles.quickActionBtn}>
                    <Phone />
                    Contact Agent
                  </button>
                  <button className={styles.quickActionBtn}>
                    <Mail />
                    Get Newsletter
                  </button>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className={styles.card}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Need Help?</h3>
                <p className={styles.cardDescription}>
                  Our team is here to assist you 24/7
                </p>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.supportActions}>
                  <button className={styles.supportBtn}>
                    <Phone />
                    Call Support
                  </button>
                  <button className={styles.supportBtn}>
                    <Mail />
                    Email Us
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
