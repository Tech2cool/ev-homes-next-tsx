import React from "react";
import styles from "./attendancesection.module.css";
import { FaClock } from "react-icons/fa";
import { FcOvertime } from "react-icons/fc";
import { FaLocationDot } from "react-icons/fa6";
import { BsDot } from "react-icons/bs";
import { MdOutlineHorizontalRule } from "react-icons/md";
import Image from "next/image";
import { dateFormatOnly, timeFormatOnly } from "@/hooks/useDateFormat";
interface AttendancesectionProps {
    viewType: "grid" | "table";
}

const Attendancesection: React.FC<AttendancesectionProps> = ({ viewType }) => {

    const data = [
        {
            userId: "EV_01",
            name: "Shruti Misal",
            timeIn: "10:02 AM",
            timeOut: "07:00 PM",
            workingTime: "8h 56m",
            overtime: "2h 12m",
            timeInLocation: "0.99585698569",
            timeOutLocation: "0.99585698569",
            profilePic:
                "https://cdn.evhomes.tech/7e96bf8a-0881-4f88-b58d-346da0996899-fallback-profile-image_1.jpg",
            phoneNumber: "6365698569",
            timeInImage: "",
            timeOutImage: "",
            status: "week off",
            date: "25 April 2024",
        },
        {
            userId: "EV_02",

            name: "Shruti Misal",
            timeIn: "10:02 AM",
            timeOut: "07:00 PM",
            workingTime: "8h 56m",
            overtime: "2h 12m",
            timeInLocation: "0.99585698569",
            timeOutLocation: "0.99585698569",
            profilePic:
                "https://cdn.evhomes.tech/7e96bf8a-0881-4f88-b58d-346da0996899-fallback-profile-image_1.jpg",
            phoneNumber: "6365698569",
            timeInImage: "",
            timeOutImage: "",
            status: "present",
            date: "25 April 2024",
        },
        {
            userId: "EV_03",

            name: "Shruti Misal",
            timeIn: "10:02 AM",
            timeOut: "07:00 PM",
            workingTime: "8h 56m",
            overtime: "2h 12m",
            timeInLocation: "0.99585698569",
            timeOutLocation: "0.99585698569",
            profilePic:
                "https://cdn.evhomes.tech/7e96bf8a-0881-4f88-b58d-346da0996899-fallback-profile-image_1.jpg",
            phoneNumber: "6365698569",
            timeInImage: "",
            timeOutImage: "",
            status: "absent",
            date: "25 April 2024",
        },
    ];

    return (
        <div>
            <div className={styles.display}>
                <div className={styles.cardContainer}>
                    {data.map((emp, idx) => (
                        <div key={idx} className={styles.card}>
                            <div className={styles.cardHeader}>
                                <span className={styles.cardDate}>
                                    {dateFormatOnly(emp?.date)}
                                </span>

                                <button
                                    className={`${styles.cardStatusBtn} ${emp?.status === "present"
                                        ? styles.cardPresent
                                        : emp?.status === "absent"
                                            ? styles.cardAbsent
                                            : emp?.status === "weekoff"
                                                ? styles.cardWeekOff
                                                : emp?.status === "active"
                                                    ? styles.cardActive
                                                    : emp?.status === "half-day"
                                                        ? styles.cardHalfDay
                                                        : emp.status === "on-casual-leave" ||
                                                            "on-paid-leave" ||
                                                            "on-compensation-off-leave"
                                                            ? styles.cardOnLeave
                                                            : ""
                                        }`}
                                >
                                    {emp.status}
                                </button>
                            </div>
                            <span className={styles.cardName}>
                                {emp?.name}
                            </span>

                            <div className={styles.cardContent}>
                                <div className={styles.timeBlock}>
                                    <Image
                                        src={
                                            emp?.timeInImage ||
                                            "https://cdn.evhomes.tech/7e96bf8a-0881-4f88-b58d-346da0996899-fallback-profile-image_1.jpg"
                                        }
                                        alt="Time In"
                                        width={100}
                                        height={100}
                                        className={styles.cardTimeImage}
                                    />
                                    <div className={styles.timeDetails}>
                                        <div className={styles.timeValue}>
                                            {timeFormatOnly(emp?.timeIn)}
                                        </div>
                                    </div>
                                </div>
                                <span className={styles.cardWorkingTime}>
                                    {emp?.timeIn && emp?.timeOut
                                        ? emp?.workingTime
                                        : "-"}
                                </span>
                                <div className={styles.timeBlock}>
                                    <Image
                                        src={
                                            emp?.timeOutImage ||
                                            "https://cdn.evhomes.tech/7e96bf8a-0881-4f88-b58d-346da0996899-fallback-profile-image_1.jpg"
                                        }
                                        alt="Time Out"
                                        width={100}
                                        height={100}
                                        className={styles.cardTimeImage}
                                    />
                                    <div className={styles.timeDetails}>
                                        <div className={styles.timeValue}>
                                            {timeFormatOnly(emp?.timeOut)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.nodipaly}>
                {viewType == "table" ? (
                    <div className={styles.container}>
                        <table className={styles.table}>
                            <thead>
                                <tr>
                                    <th>Employee Name</th>
                                    <th>
                                        <div className={styles.headmin}>
                                            <FaClock /> div Time In & Time Out
                                        </div>

                                    </th>
                                    <th> Date </th>
                                    <th>
                                        <div className={styles.headmin}><FcOvertime /> Deviation</div>

                                    </th>
                                    <th>
                                        <div className={styles.headmin}><FaLocationDot /> Location</div>


                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((emp, idx) => (
                                    <tr key={idx}>
                                        <td
                                            className={`${styles.empSection} ${emp.status === "present"
                                                ? styles.statusPresent
                                                : emp.status === "absent"
                                                    ? styles.statusAbsent
                                                    : emp.status === "weekoff"
                                                        ? styles.statusWeekOff
                                                        : emp.status === "active"
                                                            ? styles.statusActive
                                                            : emp.status === "half-day"
                                                                ? styles.statusHalfDay
                                                                : emp.status === "on-casual-leave" ||
                                                                    "on-paid-leave" ||
                                                                    "on-compensation-off-leave"
                                                                    ? styles.statusOnLeave
                                                                    : ""
                                                }`}
                                        >
                                            <div className={styles.employeeInfo}>
                                                {/* <Image
                          src={
                            emp.profilePic ||
                            "https://cdn.evhomes.tech/7e96bf8a-0881-4f88-b58d-346da0996899-fallback-profile-image_1.jpg"
                          }
                          alt="Profile"
                          height={100}
                          width={100}
                          className={styles.profileImage}
                        /> */}

                                                <div className={styles.namePhone}>
                                                    <div className={styles.employeeName}>
                                                        {emp?.name}
                                                    </div>
                                                    <div className={styles.phoneNumber}>
                                                        {emp?.userId}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className={styles.timeContainer}>
                                            <div className={styles.timeline}>
                                                <Image
                                                    src={
                                                        emp?.timeInImage ||
                                                        "https://cdn.evhomes.tech/7e96bf8a-0881-4f88-b58d-346da0996899-fallback-profile-image_1.jpg"
                                                    }
                                                    alt="Time In"
                                                    width={100}
                                                    height={100}
                                                    className={styles.timeImage}
                                                />
                                                <span className={styles.timein}>
                                                    {timeFormatOnly(emp?.timeIn)}
                                                </span>
                                                <span className={styles.dot}>
                                                    <BsDot />
                                                </span>
                                                <div>
                                                    <MdOutlineHorizontalRule className={styles.line} />
                                                </div>
                                                <span className={styles.workingTime}>
                                                    {emp?.timeIn && emp?.timeOut
                                                        ? emp?.workingTime
                                                        : "-"}
                                                </span>

                                                <div>
                                                    <MdOutlineHorizontalRule className={styles.line} />
                                                </div>
                                                <span className={styles.dot}>
                                                    <BsDot />
                                                </span>
                                                <span className={styles.timeout}>
                                                    {timeFormatOnly(emp?.timeOut)}
                                                </span>

                                                <Image
                                                    src={
                                                        emp?.timeOutImage ||
                                                        "https://cdn.evhomes.tech/7e96bf8a-0881-4f88-b58d-346da0996899-fallback-profile-image_1.jpg"
                                                    }
                                                    alt="Time Out"
                                                    width={100}
                                                    height={100}
                                                    className={styles.timeImage}
                                                />
                                            </div>
                                        </td>
                                        <td className={styles.date}>{dateFormatOnly(emp?.date)}</td>

                                        <td className={styles.overtime}></td>
                                        <td className={styles.location}>
                                            <div>
                                                ({emp?.timeInLocation})
                                            </div>
                                            <div>
                                                ({emp?.timeOutLocation})
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className={styles.cardContainer}>
                        {data.map((emp, idx) => (
                            <div key={idx} className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <span className={styles.cardDate}>
                                        {dateFormatOnly(emp?.date)}
                                    </span>

                                    <button
                                        className={`${styles.cardStatusBtn} ${emp?.status === "present"
                                            ? styles.cardPresent
                                            : emp?.status === "absent"
                                                ? styles.cardAbsent
                                                : emp?.status === "weekoff"
                                                    ? styles.cardWeekOff
                                                    : emp?.status === "active"
                                                        ? styles.cardActive
                                                        : emp?.status === "half-day"
                                                            ? styles.cardHalfDay
                                                            : emp.status === "on-casual-leave" ||
                                                                "on-paid-leave" ||
                                                                "on-compensation-off-leave"
                                                                ? styles.cardOnLeave
                                                                : ""
                                            }`}
                                    >
                                        {emp?.status}
                                    </button>
                                </div>
                                <span className={styles.cardName}>
                                    {" "}
                                    {emp?.name}
                                </span>

                                <div className={styles.cardContent}>
                                    <div className={styles.timeBlock}>
                                        <Image
                                            src={
                                                emp?.timeInImage ||
                                                "https://cdn.evhomes.tech/7e96bf8a-0881-4f88-b58d-346da0996899-fallback-profile-image_1.jpg"
                                            }
                                            alt="Time In"
                                            width={100}
                                            height={100}
                                            className={styles.cardTimeImage}
                                        />
                                        <div className={styles.timeDetails}>
                                            <div className={styles.timeValue}>
                                                {timeFormatOnly(emp?.timeIn)}
                                            </div>
                                        </div>
                                    </div>
                                    <span className={styles.cardWorkingTime}>
                                        {emp?.timeIn && emp?.timeOut
                                            ? emp?.workingTime
                                            : "-"}
                                    </span>
                                    <div className={styles.timeBlock}>
                                        <Image
                                            src={
                                                emp?.timeOutImage ||
                                                "https://cdn.evhomes.tech/7e96bf8a-0881-4f88-b58d-346da0996899-fallback-profile-image_1.jpg"
                                            }
                                            alt="Time Out"
                                            width={100}
                                            height={100}
                                            className={styles.cardTimeImage}
                                        />
                                        <div className={styles.timeDetails}>
                                            <div className={styles.timeValue}>
                                                {timeFormatOnly(emp?.timeOut)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Attendancesection;
