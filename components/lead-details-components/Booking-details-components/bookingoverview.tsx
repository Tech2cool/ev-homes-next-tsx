"use client";
import React, { useEffect, useState } from "react";
import { FaHandshake } from "react-icons/fa6";
import bookstyle from "@/app/super-admin/booking-details/booking.module.css";
import { MdAddCall } from "react-icons/md";

import { FaCalendarAlt, FaUserTie } from "react-icons/fa";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import { Building, Building2, ParkingCircle } from "lucide-react";
import { RiAiGenerate } from "react-icons/ri";
import { BiRupee } from "react-icons/bi";
import { useData } from "@/providers/dataContext";
import { useUser } from "@/providers/userContext";
import useDebounce from "@/hooks/useDebounce";

interface BookingOverviewProps {
  booking?: PostSaleLead | null;
}

const Bookingoverview: React.FC<BookingOverviewProps> = ({ booking }) => {

  //   useEffect(() => {
  //     if (user && !loading) {
  //       fetchPostSaleLeads({
  //         query: debouncedSearchQuery,
  //         page: 1,
  //         limit: 10,
  //         // project: selectproject.project != "" ? selectproject.project : null,
  //       });
  //     }
  //   }, [user, loading,postSaleleads]);

  return (
    <div className={bookstyle.visitContainer}>
      <div className={bookstyle.headerRow}>
        <div>
          <h3 className={bookstyle.title}>Booking </h3>
        </div>
      </div>

      <div className={bookstyle.infoGrid}>
        <div
          className={`${bookstyle.infoItem} ${bookstyle.infoItemChannelPartner}`}
        >
          <p className={bookstyle.cardlabel}>
            <FaHandshake
              className={`${bookstyle.iconbg} ${bookstyle.iconChannelPartner}`}
            />{" "}
            Status
          </p>
          <p className={bookstyle.cardvalue}>
            {booking?.bookingStatus?.type ?? booking?.status ?? "NA"}
          </p>
        </div>

        <div
          className={`${bookstyle.infoItem} ${bookstyle.infoItemLeadReceived}`}
        >
          <p className={bookstyle.cardlabel}>
            <HiOutlineClipboardDocumentList
              className={`${bookstyle.iconbg} ${bookstyle.iconLeadReceived}`}
            />{" "}
            Registration Done
          </p>
          <p className={bookstyle.cardvalue}>
            {booking
              ? booking.registrationDone
                ? `YES ${
                    booking.registrationDoneDate
                      ? `(${booking.registrationDoneDate.toString()})`
                      : ""
                  }`
                : "NO"
              : ""}
          </p>
        </div>

        <div
          className={`${bookstyle.infoItem} ${bookstyle.infoItemTeamLeader}`}
        >
          <p className={bookstyle.cardlabel}>
            <Building
              className={`${bookstyle.iconbg} ${bookstyle.iconTeamLeader}`}
            />{" "}
            Project
          </p>
          <p className={bookstyle.cardvalue}>{booking?.project?.name ?? "NA"}</p>
        </div>

        <div
          className={`${bookstyle.infoItem} ${bookstyle.infoItemRevisitDate}`}
        >
          <p className={bookstyle.cardlabel}>
            <Building2
              className={`${bookstyle.iconbg} ${bookstyle.iconRevisitDate}`}
            />{" "}
            Flat No
          </p>
          <p className={bookstyle.cardvalue}>{booking?.unitNo ?? "NA"}</p>
        </div>

        {/* <div
          className={`${bookstyle.infoItem} ${bookstyle.infoItemBookingDate}`}
        >
          <p className={bookstyle.cardlabel}>
            <RiAiGenerate
              className={`${bookstyle.iconbg} ${bookstyle.iconBookingDate}`}
            />{" "}
            Demand Delivered
          </p>
          <p className={bookstyle.cardvalue}>0</p>
        </div> */}
        <div className={`${bookstyle.infoItem} ${bookstyle.infoItemFlatCost}`}>
          <p className={bookstyle.cardlabel}>
            <BiRupee
              className={`${bookstyle.iconbg} ${bookstyle.iconFlatCost}`}
            />{" "}
            Flat Cost
          </p>
          <p className={bookstyle.cardvalue}>{booking?.flatCost?.toString() ?? "NA"}</p>
        </div>
        <div className={`${bookstyle.infoItem} ${bookstyle.infoItemParkingr}`}>
          <p className={bookstyle.cardlabel}>
            <ParkingCircle
              className={`${bookstyle.iconbg} ${bookstyle.iconParkingr}`}
            />{" "}
            No of Parking
          </p>
          <p className={bookstyle.cardvalue}>{ booking?.parking?.length.toString() ?? "0"}</p>
        </div>
      </div>
    </div>
  );
};

export default Bookingoverview;
