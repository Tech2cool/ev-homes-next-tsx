import React from "react";
import styles from "./personalsection.module.css";
import { LuAlarmClock } from "react-icons/lu";
import Image from "next/image";

const Personalsection = () => {
  // Dummy user data
  const user = {
    firstName: "John",
    lastName: "Doe",
    countryCode: "+91",
    phoneNumber: "9876543210",
    email: "john.doe@example.com",
    dateOfBirth: "1990-05-15",
    maritalStatus: "Single",
    bloodGroup: "O+",
    employeeId: "EMP123456",
    designation: { designation: "Frontend Developer" },
    department: { department: "Engineering" },
    division: { division: "Web Team" },
    joiningDate: "2020-01-10",
    profilePic:
      "https://cdn.evhomes.tech/7e96bf8a-0881-4f88-b58d-346da0996899-fallback-profile-image_1.jpg",
    reportingTo: {
      firstName: "Jane",
      lastName: "Smith",
      designation: { designation: "Engineering Manager" },
      profilePic:
        "https://cdn.evhomes.tech/7e96bf8a-0881-4f88-b58d-346da0996899-fallback-profile-image_1.jpg",
    },
  };

  const leaveInfo = {
    casualLeave: 4,
    compensatoryoff: 2,
    paidLeave: 5,
  };

  const totalDaysAll =
    leaveInfo.casualLeave + leaveInfo.compensatoryoff + leaveInfo.paidLeave;

  const casualPercent = (leaveInfo.casualLeave / totalDaysAll) * 100;
  const compPercent = (leaveInfo.compensatoryoff / totalDaysAll) * 100;
  const paidPercent = (leaveInfo.paidLeave / totalDaysAll) * 100;

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
              src={user.profilePic}
              alt="Profile"
              className={styles.profileImage}
              width={100}
              height={100}
            />
            <h6>{user.firstName} {user.lastName}</h6>
            <div className={styles.employeebutton}>Employee</div>
          </div>

          <div className={styles.contact}>
            <p>Contact Details</p>
            <div className={styles.container}>
              <h5>Contact Number</h5>
              <p>{user.countryCode} {user.phoneNumber}</p>
            </div>
            <div className={styles.container}>
              <h5>Email</h5>
              <p>{user.email}</p>
            </div>
          </div>
        </div>

        <div className={styles.joincontainer}>
          <div className={styles.personalInfo}>
            <p>Personal Information</p>
            <div className={styles.containerrow}>
              <div className={styles.container}>
                <h5>Full Name</h5>
                <p>{user.firstName} {user.lastName}</p>
              </div>
              <div className={styles.container}>
                <h5>Date Of Birth</h5>
                <p>{formatDate(user.dateOfBirth)}</p>
              </div>
            </div>
            <div className={styles.containerrow}>
              <div className={styles.container}>
                <h5>Marital Status</h5>
                <p>{user.maritalStatus}</p>
              </div>
              <div className={styles.container}>
                <h5>Blood Group</h5>
                <p>{user.bloodGroup}</p>
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
                    <div className={styles.progressFillCL} style={{ width: `${casualPercent}%` }} />
                  </div>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFillCO} style={{ width: `${compPercent}%` }} />
                  </div>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFillPL} style={{ width: `${paidPercent}%` }} />
                  </div>
                </div>
                <div className={styles.countColumn}>
                  <span>{leaveInfo.casualLeave}</span>
                  <span>{leaveInfo.compensatoryoff}</span>
                  <span>{leaveInfo.paidLeave}</span>
                </div>
              </div>
            </div>

            <div className={styles.reportingContair}>
              <p>Reporting to</p>
              <div className={styles.imagecontainer}>
                <Image
                  src={user.reportingTo.profilePic}
                  alt="Reporting Manager"
                  className={styles.repotingImage}
                  width={100}
                  height={100}
                />
                <h6>{user.reportingTo.firstName} {user.reportingTo.lastName}</h6>
                <p>{user.reportingTo.designation.designation}</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.proInfo}>
          <p>Professional Information</p>
          <div className={styles.container}>
            <h5>Employee Id</h5>
            <p>{user.employeeId}</p>
          </div>
          <div className={styles.container}>
            <h5>Designation</h5>
            <p>{user.designation.designation}</p>
          </div>
          <div className={styles.container}>
            <h5>Department</h5>
            <p>{user.department.department}</p>
          </div>
          <div className={styles.container}>
            <h5>Divison</h5>
            <p>{user.division.division}</p>
          </div>
          <div className={styles.container}>
            <h5>Date of Joining</h5>
            <p>{formatDate(user.joiningDate)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personalsection;
