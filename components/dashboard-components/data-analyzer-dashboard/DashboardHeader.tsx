"use client";
import { useUser } from "@/providers/userContext";
import styles from "./analyzerdashboard.module.css";
import { PiBagSimpleFill } from "react-icons/pi";

type DashboardHeaderProps = {
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
  activeTab: string;
};
const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  setActiveTab,
  activeTab,
}) => {
  const { user, loading } = useUser();

  return (
    <div className={styles.container}>
      <div className={styles.innercontainer}>
        <div className={styles.profilesection}>
          <img
            src={user?.profilePic || "/images/HomePageImage.png"}
            alt="profile img"
            onError={(e) => {
              e.currentTarget.src = "/images/HomePageImage.png";
            }}
          />
          <div className={styles.name}>
            <h1>
              {/* Display user's name or fallback */}
              {
                user?.firstName && user?.lastName
                  ? `${user.firstName ?? ""} ${user.lastName ?? ""}`
                  : user?.firstName
                  ? user.firstName
                  : "Test" // Fallback name
              }
            </h1>
            <p>
              <PiBagSimpleFill />

              {user?.designation?.designation ?? ""}
            </p>
          </div>
        </div>

        <div className={styles.nectsection}>
          <div className={styles.textsection}>
            <div
              className={`${styles.text} ${
                activeTab === "overview" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("overview")}
            >
              Overview
            </div>

            <div
              className={`${styles.text} ${
                activeTab === "enquiry" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("enquiry")}
            >
              Enquiry
            </div>
            <div
              className={`${styles.text} ${
                activeTab === "inventory" ? styles.active : ""
              }`}
              onClick={() => setActiveTab("inventory")}
            >
              Inventory
            </div>
          </div>

          <button
            className={styles.button}
            onClick={() => setActiveTab("tagging")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                fill="currentColor"
                d="M14.187 8.096L15 5.25L15.813 8.096C16.0231 8.83114 16.4171 9.50062 16.9577 10.0413C17.4984 10.5819 18.1679 10.9759 18.903 11.186L21.75 12L18.904 12.813C18.1689 13.0231 17.4994 13.4171 16.9587 13.9577C16.4181 14.4984 16.0241 15.1679 15.814 15.903L15 18.75L14.187 15.904C13.9769 15.1689 13.5829 14.4994 13.0423 13.9587C12.5016 13.4181 11.8321 13.0241 11.097 12.814L8.25 12L11.096 11.187C11.8311 10.9769 12.5006 10.5829 13.0413 10.0423C13.5819 9.50162 13.9759 8.83214 14.186 8.097L14.187 8.096Z"
              />
            </svg>
            <span className={styles.textbutton}>Client Tagging</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
