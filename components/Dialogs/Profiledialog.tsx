"use client";

import React, { useEffect } from "react";
import styles from "./profiledialog.module.css";
import { FaUserEdit, FaKey, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useUser } from "@/providers/userContext";
import { redirect } from "next/navigation";

interface ProfileDialogBoxProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDialogBox: React.FC<ProfileDialogBoxProps> = ({
  isOpen,
  onClose,
}) => {
  const { user, logout } = useUser(); // ✅ Hook moved INSIDE component

  const onClickLogout = () => {
    //
    logout();
    redirect("/login");
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !user) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.container} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          X
        </button>

        <div className={styles.profileContainer}>
          {/* Profile Section */}
          <div className={styles.profileSection}>
            <div className={styles.profileImage}>
              {user?.profilePic ? (
                <div
                  className={styles.imageCircle}
                  style={{
                    backgroundImage: `url("${user.profilePic}")`,
                  }}
                />
              ) : (
                <div className={styles.fallbackIcon}>
                  <FaUser />
                </div>
              )}
            </div>

            <div className={`${styles.userInfo} ${styles.userInfoDesktop}`}>
              <div className={styles.userName}>
                {user.firstName} {user.lastName}
              </div>
              <div className={styles.userDesignation}>
                {user.designation?.designation}
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
              {user?.designation?.designation}
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
                  <span>Division : </span>{" "}
                  <span>{user?.division?.division}</span>
                </div>
                <div className={styles.infoRow}>
                  <span>Department : </span>{" "}
                  <span>{user?.department?.department}</span>
                </div>
                <div className={styles.infoRow}>
                  <span>Designation : </span>{" "}
                  <span>{user.designation?.designation}</span>
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
                    <div className={styles.reportingToImage}>
                      {user?.reportingTo?.profilePic ? (
                        <div
                          className={styles.imageCircleSmall}
                          style={{
                            backgroundImage: `url("${user.reportingTo.profilePic}")`,
                          }}
                        />
                      ) : (
                        <div className={styles.fallbackIconSmall}>
                          <FaUser />
                        </div>
                      )}
                    </div>
                    <div className={styles.repoInfo}>
                      <div className={styles.infoRow}>
                        {user?.reportingTo?.firstName}{" "}
                        {user?.reportingTo?.lastName}
                      </div>
                      <div className={styles.infoRow}>
                        ({user?.reportingTo?.designation?.designation})
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.contactInfoSection}>
                  <h3 className={styles.sectionHeading}>Contact Information</h3>
                  <div className={styles.infoRow}>
                    <span>Phone No. : </span>{" "}
                    <span>{user?.phoneNumber?.toString() ?? ""}</span>
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
