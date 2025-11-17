import React from "react";
import styles from "./personalsection.module.css";
import { LuAlarmClock } from "react-icons/lu";
import Image from "next/image";
import { useUser } from "@/providers/userContext";
import { useData } from "@/providers/dataContext";

const Personalsection = () => {
  const { user } = useUser();
  const { leaveCount } = useData();

  const totalDaysAll =
    (leaveCount?.casualLeave ?? 0) +
    (leaveCount?.compensatoryoff ?? 0) +
    (leaveCount?.paidLeave ?? 0);

  const casualPercent = (leaveCount?.casualLeave ?? 0 / totalDaysAll) * 100;
  const compPercent = (leaveCount?.compensatoryoff ?? 0 / totalDaysAll) * 100;
  const paidPercent = (leaveCount?.paidLeave ?? 0 / totalDaysAll) * 100;

  const formatDate = (date: string | number | Date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className={styles.maincontainer}>
      <div className={styles.headsection}>
        <div className={styles.profilesection}>
          <div className={styles.imagesection}>
            <Image
              src={user?.profilePic ?? "."}
              alt="Profile"
              className={styles.profileImage}
              width={100}
              height={100}
            />
            <h6>
              {user?.firstName ?? ""} {user?.lastName ?? ""}
            </h6>
            <div className={styles.employeebutton}>Employee</div>
          </div>

          <div className={styles.contact}>
            <p>Contact Details</p>
            <div className={styles.container}>
              <h5>Contact Number</h5>
              <p>
                {"+91"} {user?.phoneNumber?.toString() ?? ""}
              </p>
            </div>
            <div className={styles.container}>
              <h5>Email</h5>
              <p>{user?.email ?? "NA"}</p>
            </div>
          </div>
        </div>

        <div className={styles.joincontainer}>
          <div className={styles.personalInfo}>
            <p>Personal Information</p>
            <div className={styles.containerrow}>
              <div className={styles.container}>
                <h5>Full Name</h5>
                <p>
                  {user?.firstName ?? ""} {user?.lastName ?? ""}
                </p>
              </div>
              <div className={styles.container}>
                <h5>Date Of Birth</h5>
                <p>{formatDate(user?.dateOfBirth ?? "")}</p>
              </div>
            </div>
            <div className={styles.containerrow}>
              <div className={styles.container}>
                <h5>Marital Status</h5>
                <p>{user?.maritalStatus ?? "NA"}</p>
              </div>
              <div className={styles.container}>
                <h5>Blood Group</h5>
                <p>{user?.bloodGroup ?? "NA"}</p>
              </div>
            </div>
          </div>

          <div className={styles.leaverepoting}>
            <div className={styles.progressContainer}>
              <div className={styles.leaveHeadline}>
                <LuAlarmClock /> Your Leave
              </div>
              <div className={styles.progressGroup}>
                <div className={styles.labelColumn}>
                  <span>Casual Leave</span>
                  <span>Comp Off</span>
                  <span>Paid Leave</span>
                </div>
                <div className={styles.barColumn}>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFillCL}
                      style={{ width: `${casualPercent}%` }}
                    />
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFillCO}
                      style={{ width: `${compPercent}%` }}
                    />
                  </div>
                  <div className={styles.progressBar}>
                    <div
                      className={styles.progressFillPL}
                      style={{ width: `${paidPercent}%` }}
                    />
                  </div>
                </div>
                <div className={styles.countColumn}>
                  <span>{leaveCount?.casualLeave ?? 0}</span>
                  <span>{leaveCount?.compensatoryoff ?? 0}</span>
                  <span>{leaveCount?.paidLeave ?? 0}</span>
                </div>
              </div>
            </div>

            <div className={styles.reportingContair}>
              <p>Reporting to</p>
              <div className={styles.imagecontainer}>
                <Image
                  src={user?.reportingTo?.profilePic ?? "."}
                  alt="Reporting Manager"
                  className={styles.repotingImage}
                  width={100}
                  height={100}
                />
                <h6>
                  {user?.reportingTo?.firstName ?? ""}{" "}
                  {user?.reportingTo?.lastName ?? ""}
                </h6>
                <p>{user?.reportingTo?.designation?.designation ?? "NA"}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.proInfo}>
          <p>Professional Information</p>
          <div className={styles.container}>
            <h5>Employee Id</h5>
            <p>{user?.employeeId ?? "??"}</p>
          </div>
          <div className={styles.container}>
            <h5>Designation</h5>
            <p>{user?.designation?.designation ?? "??"}</p>
          </div>
          <div className={styles.container}>
            <h5>Department</h5>
            <p>{user?.department?.department ?? "??"}</p>
          </div>
          <div className={styles.container}>
            <h5>Divison</h5>
            <p>{user?.division?.division ?? "??"}</p>
          </div>
          <div className={styles.container}>
            <h5>Date of Joining</h5>
            <p>{formatDate(user?.joiningDate ?? "")}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personalsection;
