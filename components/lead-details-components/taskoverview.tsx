"use client";
import React from "react";
import styles from "@/app/lead-details/lead-details.module.css";
import { Building, Calendar, Clock, User } from "lucide-react";
import { IoPersonSharp } from "react-icons/io5";
import { FaPhoneAlt, FaTasks } from "react-icons/fa";
import { MdAddCall, MdAssignment, MdEmail } from "react-icons/md";
import { IoIosPerson } from "react-icons/io";
import { PiBuildingApartmentBold } from "react-icons/pi";
import { BsFillBuildingFill } from "react-icons/bs";
import { LuSendToBack } from "react-icons/lu";

const TaskOverview = () => {


    return (
        <div style={{ display: "flex", flexDirection: "column", gap:"15px"}}>
            <div className={styles.cardrow}>
                <div className={styles.detailsCard}>
                    <div className={styles.cardTitle}>
                        <FaTasks className={styles.titleIcon} />
                        Task Information
                    </div>
                    <div className={styles.cardContent}>
                        <div className={styles.infoGridtask}>
                            <div className={styles.infoItem}>
                                <label className={styles.infoLabel}><Calendar size={11} color="#4a84ff" />Assigned</label>
                                <p className={styles.infoValue}>
                                    27 sep 25 06:38 PM
                                </p>
                            </div>

                            <div className={styles.infoItem}>
                                <label className={styles.infoLabel}><Clock size={11} color="#4a84ff" />Deadline</label>
                                <p className={styles.infoValue}>
                                    25 Oct 25
                                </p>

                            </div>
                            <div className={styles.infoItem}>
                                <label className={styles.infoLabel}><LuSendToBack size={11} color="#4a84ff" />Task Type</label>
                                <p className={styles.infoValue}>
                                    Trandfer Lead
                                </p>
                            </div>


                        </div>
                    </div>
                </div>
              
            </div>
             <div className={styles.cardrow}>
                
                {/* Project Information */}
                <div className={styles.detailsCard}>
                    <div className={styles.cardTitle}>
                        <Clock className={styles.titleIcon} />
                        Reminder Information
                    </div>
                    <div className={styles.cardContent}>
                        <div className={styles.infoGrid}>
                            <div className={styles.infoItem}>
                                <label className={styles.infoLabel}><IoIosPerson size={12} color="#4a84ff" />Reminder</label>
                                <p className={styles.infoValue}>
                                    30 Sep 25
                                </p>
                            </div>
                            <div className={styles.infoItem}>
                                <label className={styles.infoLabel}><IoIosPerson size={12} color="#4a84ff" />Reminder Note</label>
                                <p className={styles.infoValue}>
                                    Call forwarding to voice mails
                                </p>
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className={styles.detailsCard}>
                    <div className={styles.cardTitle}>
                        <MdAssignment className={styles.titleIcon} />
                        Assignment Information
                    </div>
                    <div className={styles.cardContent}>
                        <div className={styles.infoGrid}>
                            <div className={styles.infoItem}>
                                <label className={styles.infoLabel}><Calendar size={11} color="#4a84ff" />Assigned To</label>
                                <p className={styles.infoValue}>
                                    Rekha Kaur
                                </p>
                            </div>

                            <div className={styles.infoItem}>
                                <label className={styles.infoLabel}><Clock size={11} color="#4a84ff" />Assigned Kaur</label>
                                <p className={styles.infoValue}>
                                    Ranjana Gupta
                                </p>

                            </div>
                            


                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default TaskOverview;
