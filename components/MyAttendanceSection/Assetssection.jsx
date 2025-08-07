import React, { useState, useRef } from "react";
import styles from "./leavesection.module.css";
import { MdOutlineFeedback, MdOutlineCallToAction } from "react-icons/md";
import { MdHolidayVillage } from "react-icons/md";
import {
  FaCalendarCheck,
  FaCalendarDay,
  FaClock,
  FaMobile,
  FaMobileAlt,
  FaTypo3,
} from "react-icons/fa";
import AsstsForm from "./Forms/AsstsForm";
import { useClickOutside } from "./useClickOutside";
import Image from "next/image";

const AssetData = [
  // {
  //   apply: "25 April 2025",
  //   assetsDate: "6 April 2025",
  //   type: "Mobile",
  //   remark: " apply to  Mobile",
  //   status: "Pending",
  // },
  // {
  //   apply: "25 April 2025",
  //   assetsDate: "6 April 2025",
  //   type: "Mobile",
  //   remark: " apply to Mobile",
  //   status: "Approved",
  // },
  // {
  //   apply: "25 April 2025",
  //   assetsDate: "6 April 2025",
  //   type: "Mobile",
  //   remark: " apply to Mobile",
  //   status: "Rejected",
  // },
  // {
  //   apply: "25 April 2025",
  //   assetsDate: "6 April 2025",
  //   type: "Mobile",
  //   remark: " apply to Mobile",
  //   status: "Rejected",
  // },
];

function Assets() {
  const modalRef = useRef(null);
  const [Asset, setAssetData] = useState(AssetData);
  const [filter, setFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredData =
    filter == "All" ? Asset : Asset.filter((asset) => asset.status === filter);

  useClickOutside({
    refs: [modalRef],
    handler: () => setIsModalOpen(false),
    active: isModalOpen,
  });

  return (
    <div className={styles.maincontainer}>
      <div className={styles.leaveSection}>
        <div className={styles.statsWithProgress}>
          <div className={styles.leavecontainer}>
            <div className={styles.leavecard} onClick={() => setFilter("All")}>
              <div className={styles.request}>Requested</div>
              <div className={styles.numberleave}>{Asset.length}</div>
            </div>
            <div
              className={styles.leavecard}
              onClick={() => setFilter("Approved")}
            >
              <div className={styles.aproved}>Approved</div>
              <div className={styles.numberleave}>
                {Asset.filter((l) => l.status === "Approved").length}
              </div>
            </div>
            <div
              className={styles.leavecard}
              onClick={() => setFilter("Rejected")}
            >
              <div className={styles.rejected}>Rejected</div>
              <div className={styles.numberleave}>
                {Asset.filter((l) => l.status === "Rejected").length}
              </div>
            </div>
            <div
              className={styles.leavecard}
              onClick={() => setFilter("Pending")}
            >
              <div className={styles.pending}>Pending</div>
              <div className={styles.numberleave}>
                {Asset.filter((l) => l.status === "Pending").length}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.tableContainer}>
          <div className={styles.topBar}>
            <div
              className={styles.applyButton}
              onClick={() => setIsModalOpen(true)}
            >
              <FaMobileAlt className={styles.applyIcon} /> Apply Asset
            </div>
          </div>

          {/* Table for desktop */}
          <div className={styles.tableDesktop}>
            {filteredData.length > 0 ? (
              <table className={styles.leaveTable}>
                <thead>
                  <tr>
                    <th>
                      <FaCalendarCheck /> Applied On
                    </th>
                    <th>
                      <FaCalendarDay /> Asset Date
                    </th>
                    <th>
                      <FaClock /> Asset Type
                    </th>
                    <th>
                      <FaClock /> Remark
                    </th>

                    <th>
                      <MdOutlineCallToAction /> Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((asset, index) => (
                    <tr key={index}>
                      <td>{asset.apply}</td>
                      <td>{asset.assetsDate}</td>
                      <td>{asset.type}</td>
                      <td>{asset.remark}</td>

                      <td>
                        <span
                          className={
                            asset.status === "Approved"
                              ? styles.statusApproved
                              : asset.status === "Rejected"
                              ? styles.statusRejected
                              : styles.statusPending
                          }
                        >
                          {asset.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className={styles.noDataContainer}>
                <Image
                  src="/images/nodata.png"
                  alt="No asset data"
                  className={styles.noDataImage}
                  width={300}
                  height={300}
                  quality={100}
                  priority
                />
                <div className={styles.noDataText}>
                  "You haven’t requested any assets yet."
                </div>
              </div>
            )}
          </div>

          {/* Cards for mobile */}
          <div className={styles.cardsMobile}>
            {filteredData.length > 0 ? (
              filteredData.map((asset, index) => (
                <div className={styles.leaveCardMobile} key={index}>
                  <div className={styles.firstSectMobile}>
                    <div>
                      <strong>Applied On:</strong> {asset.apply}
                    </div>
                    <div>
                      <span
                        className={
                          asset.status === "Approved"
                            ? styles.statusApproved
                            : asset.status === "Rejected"
                            ? styles.statusRejected
                            : styles.statusPending
                        }
                      >
                        {asset.status}
                      </span>
                    </div>
                  </div>
                  <div>
                    <strong>Asset Date:</strong> {asset.assetsDate}
                  </div>

                  <div>
                    <strong>Asset Type:</strong> {asset.type}
                  </div>
                  <div>
                    <strong>Remark:</strong> {asset.remark}
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.noDataContainer}>
                 <Image
                  src="/images/nodata.png"
                  alt="No asset data"
                  className={styles.noDataImage}
                  width={300}
                  height={300}
                  quality={100}
                  priority
                />
                <div className={styles.noDataText}>
                  "You haven’t requested any assets yet."
                </div>
              </div>
            )}
          </div>
        </div>
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent} ref={modalRef}>
              <button
                className={styles.closeButton}
                onClick={() => setIsModalOpen(false)}
              >
                x
              </button>
              <AsstsForm onCancel={() => setIsModalOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Assets;
