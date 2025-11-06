"use client";

import React, { useEffect } from "react";
import styles from "./profiledialog.module.css";
import { FaUserEdit, FaKey, FaSignOutAlt } from "react-icons/fa";

interface ProfileDialogBox {
  isOpen: boolean;
  onClose: () => void;
}

const dummyUser = {
  profilePic:
    "https://www.ohe.org/wp-content/uploads/2023/02/fallback-profile-image_1.jpg",
  firstName: "John",
  lastName: "Doe",
  designation: { designation: "Sales Manager" },
  employeeId: "EMP001",
  division: { division: "Real Estate" },
  department: { department: "Sales" },
  maritalStatus: "Single",
  bloodGroup: "O+",
  reportingTo: {
    firstName: "Jane",
    lastName: "Smith",
    designation: { designation: "Regional Head" },
    profilePic:
      "https://www.ohe.org/wp-content/uploads/2023/02/fallback-profile-image_1.jpg",
  },
  phoneNumber: "+91 9876543210",
  email: "johndoe@example.com",
};

const ProfileDialogBox: React.FC<ProfileDialogBox> = ({ isOpen, onClose }) => {
  const user = dummyUser;

  const onClickLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      alert("Logged out successfully!");
      onClose();
    }
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>

        <div className={styles.profileContainer}>
          {/* Profile Section */}
          <div className={styles.profileSection}>
            <div
              className={styles.profileImage}
              style={{
                background: `url("${user.profilePic}") no-repeat center center/cover`,
              }}
            ></div>

            <div className={`${styles.userInfo} ${styles.userInfoDesktop}`}>
              <div className={styles.userName}>
                {user.firstName} {user.lastName}
              </div>
              <div className={styles.userDesignation}>
                {user.designation.designation}
              </div>
            </div>

            <div className={styles.profileActionsWrapper}>
              <div className={styles.profileActions}>
                <div className={styles.customButtonOrange}>
                  <div className={styles.iconCircleOrange}>
                    <FaUserEdit />
                  </div>
                  <div className={styles.textBoxOrange}>Edit Profile</div>
                </div>

                <div className={styles.customButtonBlue}>
                  <div className={styles.iconCircleBlue}>
                    <FaKey />
                  </div>
                  <div className={styles.textBoxBlue}>Change Password</div>
                </div>

                <div className={styles.customButtonRed} onClick={onClickLogout}>
                  <div className={styles.iconCircleRed}>
                    <FaSignOutAlt />
                  </div>
                  <div className={styles.textBoxRed}>Logout</div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Info */}
          <div className={`${styles.userInfo} ${styles.userInfoMobile}`}>
            <div className={styles.userName}>
              {user.firstName} {user.lastName}
            </div>
            <div className={styles.userDesignation}>
              {user.designation.designation}
            </div>
          </div>

          {/* Right Section */}
          <div className={styles.rightSection}>
            <div className={styles.perRepoContainer}>
              {/* Personal Info */}
              <div className={styles.personalInfoSection}>
                <h3 className={styles.sectionHeading}>Personal Information</h3>
                <div className={styles.infoRow}>
                  <span>Employee ID : </span> <span>{user.employeeId}</span>
                </div>
                <div className={styles.infoRow}>
                  <span>Full Name : </span>{" "}
                  <span>
                    {user.firstName} {user.lastName}
                  </span>
                </div>
                <div className={styles.infoRow}>
                  <span>Division : </span> <span>{user.division.division}</span>
                </div>
                <div className={styles.infoRow}>
                  <span>Department : </span>{" "}
                  <span>{user.department.department}</span>
                </div>
                <div className={styles.infoRow}>
                  <span>Designation : </span>{" "}
                  <span>{user.designation.designation}</span>
                </div>
                <div className={styles.infoRow}>
                  <span>Marital Status : </span>{" "}
                  <span>{user.maritalStatus}</span>
                </div>
                <div className={styles.infoRow}>
                  <span>Blood Group : </span> <span>{user.bloodGroup}</span>
                </div>
              </div>

              {/* Reporting & Contact Info */}
              <div className={styles.repoContContainer}>
                <div className={styles.reportingInfoSection}>
                  <h3 className={styles.sectionHeading}>Reporting To</h3>
                  <div className={styles.repoSection}>
                    <div
                      className={styles.reportingToImage}
                      style={{
                        background: `url("${user.reportingTo.profilePic}") no-repeat center center/cover`,
                      }}
                    ></div>
                    <div className={styles.repoInfo}>
                      <div className={styles.infoRow}>
                        {user.reportingTo.firstName} {user.reportingTo.lastName}
                      </div>
                      <div className={styles.infoRow}>
                        ({user.reportingTo.designation.designation})
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.contactInfoSection}>
                  <h3 className={styles.sectionHeading}>Contact Information</h3>
                  <div className={styles.infoRow}>
                    <span>Phone No. : </span>{" "}
                    <span>{user.phoneNumber}</span>
                  </div>
                  <div className={styles.infoRow}>
                    <span>Email : </span> <span>{user.email}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Leave Info */}
            <div className={styles.leaveInfoSection}>
              <h3 className={styles.sectionHeading}>Leave Information</h3>
              <div className={styles.infoRow}>
                <span>Paid Leave : </span> <span>5</span>
              </div>
              <div className={styles.infoRow}>
                <span>Casual Leave : </span> <span>3</span>
              </div>
              <div className={styles.infoRow}>
                <span>Compensatory Leave : </span> <span>2</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileDialogBox;
