import React, { useRef, useState } from "react";
import styles from "./leavesection.module.css";
import { MdOutlineCallToAction } from "react-icons/md";
import {
  FaCalendarCheck,
  FaCalendarDay,
  FaClock,
  FaMobileAlt
} from "react-icons/fa";
import AsstsForm from "./Forms/AsstsForm";
import { useClickOutside } from "./useClickOutside";
import Image from "next/image";

// Define Type for Asset Data
interface AssetItem {
  apply: string;
  assetsDate: string;
  type: string;
  remark: string;
  status: "Pending" | "Approved" | "Rejected";
}

const AssetData: AssetItem[] = [
  { apply: "25 April 2025", assetsDate: "6 April 2025", type: "Mobile", remark: "apply to Mobile", status: "Pending" },
  { apply: "25 April 2025", assetsDate: "6 April 2025", type: "Mobile", remark: "apply to Mobile", status: "Approved" },
  { apply: "25 April 2025", assetsDate: "6 April 2025", type: "Mobile", remark: "apply to Mobile", status: "Rejected" },
  { apply: "25 April 2025", assetsDate: "6 April 2025", type: "Mobile", remark: "apply to Mobile", status: "Rejected" },
];

function Assets() {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [Asset] = useState<AssetItem[]>(AssetData);
  const [filter, setFilter] = useState<string>("All");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const filteredData = filter === "All" ? Asset : Asset.filter((asset) => asset.status === filter);

  useClickOutside({
    refs: [modalRef],
    handler: () => setIsModalOpen(false),
    active: isModalOpen,
  });

  return (
    <div className={styles.maincontainer}>
      <div className={styles.leaveSection}>
        {/* Status Cards */}
        <div className={styles.statsWithProgress}>
          <div className={styles.leavecontainer}>
            {["All", "Approved", "Rejected", "Pending"].map((status) => (
              <div
                key={status}
                className={styles.leavecard}
                onClick={() => setFilter(status)}
              >
                <div className={styles[status.toLowerCase()]}>
                  {status === "All" ? "Requested" : status}
                </div>
                <div className={styles.numberleave}>
                  {status === "All"
                    ? Asset.length
                    : Asset.filter((l) => l.status === status).length}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Table Section */}
        <div className={styles.tableContainer}>
          <div className={styles.topBar}>
            <div className={styles.applyButton} onClick={() => setIsModalOpen(true)}>
              <FaMobileAlt className={styles.applyIcon} /> Apply Asset
            </div>
          </div>

          <div className={styles.tableDesktop}>
            {filteredData.length > 0 ? (
              <table className={styles.leaveTable}>
                <thead>
                  <tr>
                    <th><FaCalendarCheck /> Applied On</th>
                    <th><FaCalendarDay /> Asset Date</th>
                    <th><FaClock /> Asset Type</th>
                    <th><FaClock /> Remark</th>
                    <th><MdOutlineCallToAction /> Action</th>
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
                  You haven’t requested any assets yet.
                </div>
              </div>
            )}
          </div>

          {/* Mobile Cards */}
          <div className={styles.cardsMobile}>
            {filteredData.length > 0 ? (
              filteredData.map((asset, index) => (
                <div className={styles.leaveCardMobile} key={index}>
                  <div className={styles.firstSectMobile}>
                    <div><strong>Applied On:</strong> {asset.apply}</div>
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
                  <div><strong>Asset Date:</strong> {asset.assetsDate}</div>
                  <div><strong>Asset Type:</strong> {asset.type}</div>
                  <div><strong>Remark:</strong> {asset.remark}</div>
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
                  You haven’t requested any assets yet.
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className={styles.modalOverlay}>
            <div className={styles.modalContent} ref={modalRef}>
              <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>x</button>
              <AsstsForm onCancel={() => setIsModalOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Assets;
