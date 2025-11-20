"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./inventorymain.module.css";
import { FaChartArea, FaHouse } from "react-icons/fa6";
import { BsBuildingsFill, BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";
import { useClickOutside } from "../MyAttendanceSection/useClickOutside";
import { useData } from "@/providers/dataContext";

const InventoryMain: React.FC = () => {
  const [displayType, setDisplayType] = useState<"FlatNo" | "Area" | "BHK">(
    "FlatNo"
  );
  const [flatFilter, setFlatFilter] = useState<"all" | "available" | "sold">(
    "all"
  );
  const [selectedRoom, setSelectedRoom] = useState<Flat | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState<string>("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isContentDropdownOpen, setIsContentDropdownOpen] = useState(false);
  const [selectedTower, setSelectedTower] = useState<"Tower 1" | "Tower 2">(
    "Tower 1"
  );
  const [showCustomDialog, setShowCustomDialog] = useState(false);

  const towerDropdownRef = useRef<HTMLDivElement>(null);
  const infoDropdownRef = useRef<HTMLDivElement>(null);

  const { projects, getProjects } = useData();

  const [selectedProject, setSelectedProject] = useState<OurProject | null>(
    null
  );
  const FlatDetailsContent = () => (
    <>
      {/* Basic Info Card */}
      <div className={styles.infoCard}>
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <BsBuildingsFill className={styles.cardIcon} />
            <span>Flat Info</span>
          </div>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Flat No:</span>
              <span className={styles.infoValue}>
                {selectedRoom?.flatNo ?? "N/A"}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Floor:</span>
              <span className={styles.infoValue}>
                {selectedRoom?.floor ?? "N/A"}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Unit:</span>
              <span className={styles.infoValue}>
                {selectedRoom?.number ?? "N/A"}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Building:</span>
              <span className={styles.infoValue}>
                {selectedRoom?.buildingNo ?? "N/A"}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Type:</span>
              <span className={styles.infoValue}>
                {selectedRoom?.type && selectedRoom.type.length > 0
                  ? selectedRoom.type
                  : "N/A"}
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Configuration:</span>
              <span className={styles.infoValue}>
                {selectedRoom?.configuration ?? "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Area Details */}
      <div className={styles.infoCard}>
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <FaChartArea className={styles.cardIcon} />
            <span>Area Details</span>
          </div>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>RERA Carpet Area:</span>
              <span className={styles.infoValue}>
                {selectedRoom?.reraArea ?? "0"} sqft
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Balcony:</span>
              <span className={styles.infoValue}>
                {selectedRoom?.balconyArea ?? "0"} sqft
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Usable Carpet Area:</span>
              <span className={styles.infoValue}>
                {selectedRoom?.carpetArea ?? "0"} sqft
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>S.S Area:</span>
              <span className={styles.infoValue}>
                {selectedRoom?.ssArea ?? "0"} sqft
              </span>
            </div>
            <div className={styles.infoItem}>
              <span className={styles.infoLabel}>Sellable Area:</span>
              <span className={styles.infoValue}>
                {selectedRoom?.sellableCarpetArea ?? "0"} sqft
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div className={styles.infoCard}>
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <span style={{ color: "#22c55e" }}>₹</span>
            <span>Pricing</span>
          </div>
          <div className={styles.pricingHighlight}>
            <div className={styles.pricingLabel}>All Inclusive Price</div>
            <div className={styles.pricingValue}>
              ₹{selectedRoom?.allInclusiveValue?.toLocaleString() ?? "N/A"}
            </div>
          </div>
        </div>
      </div>

      {/* Offer Price - only hide for occupied */}
      {!selectedRoom?.occupied && <div className={styles.infoCard}><div className={styles.infoCard}>
              <div className={styles.cardHeader}>
                <span style={{ color: '#ea580c' }}>🎯</span>
                <span>Select Offer Price</span>
              </div>
              <div className={styles.dropdownWrapperDetails}>
                <select
                  className={styles.dropdownDetails}
                  value={selectedOffer}
                  onChange={handleOfferChange}
                >
                  <option value="">Choose pricing option</option>
                  <option value="msp1">MSP1: ₹{selectedRoom?.msp1?.toLocaleString()}</option>
                  <option value="msp2">MSP2: ₹{selectedRoom?.msp2?.toLocaleString()}</option>
                  <option value="msp3">MSP3: ₹{selectedRoom?.msp3?.toLocaleString()}</option>
                  <option value="custom">BREAK-UP</option>
                </select>
              </div>
            </div></div>}

      {/* Price Breakdown */}
      {selectedOffer && <div className={styles.infoCard}>...</div>}

      {/* Layout Button */}
      {selectedRoom?.floorPlan && (
        <div className={styles.viewLayoutSection}>
          <button className={styles.viewLayoutButton}>
            <span>🏢 View Layout</span>
          </button>
        </div>
      )}

      <button className={styles.okbutton} onClick={closeDialog}>
        OK
      </button>
    </>
  );

  useEffect(() => {
    getProjects();
  }, []);

  // Set first project as default when projects load
  useEffect(() => {
    if (projects.length > 0 && !selectedProject) {
      setSelectedProject(projects[0]);
    }
  }, [projects, selectedProject]);

  const handleProjectChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    const selectedId = e.target.value;
    const project = projects.find((proj) => proj._id === selectedId);
    if (project) {
      setSelectedProject(project);
    }
  };

  const handleOfferChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const value = e.target.value;
    setSelectedOffer(value);
    if (value === "custom") {
      setShowCustomDialog(true);
    }
  };

  const handleRoomClick = (room: Flat): void => {
    setSelectedRoom(room);
    setIsDialogOpen(true);
  };

  const closeDialog = (): void => {
    setIsDialogOpen(false);
    setSelectedRoom(null);
    setSelectedOffer("");
    setIsDropdownOpen(false);
  };

  useClickOutside({
    refs: [towerDropdownRef],
    handler: () => setIsContentDropdownOpen(false),
    active: isContentDropdownOpen,
  });

  useClickOutside({
    refs: [infoDropdownRef],
    handler: () => setIsDropdownOpen(false),
    active: isDropdownOpen,
  });

  // Filter flats for Tower 2
  const tower2Flats =
    selectedProject?.flatList?.filter((f) => f.buildingNo === 2) ?? [];
  // For Tower 1, show all flats or filter by buildingNo === 1 if you have that data
  const tower1Flats =
    selectedProject?.flatList?.filter(
      (f) => f.buildingNo === 1 || !f.buildingNo
    ) ?? [];

  const groupFlatsByFloor = (flats: Flat[] = []) => {
    const grouped: Record<number, Flat[]> = {};

    flats.forEach((f) => {
      if (f.floor === undefined) return;
      if (!grouped[f.floor]) grouped[f.floor] = [];
      grouped[f.floor].push(f);
    });

    return Object.entries(grouped).sort(
      ([a], [b]) => Number(b) - Number(a) // highest floor first
    );
  };

  const getFlatCounts = (): { soldCount: number; availableCount: number } => {
    const flats = selectedProject?.flatList ?? [];

    let soldCount = 0;
    let availableCount = 0;

    flats.forEach((flat) => {
      if (flat.occupied) {
        soldCount++;
      } else {
        availableCount++;
      }
    });

    return { soldCount, availableCount };
  };

  const { soldCount, availableCount } = getFlatCounts();

  return (
    <div className={styles.background}>
      <div className={styles.overlay}>
        <div className={styles.topSection}>
          <div className={styles.content}>
            {selectedProject?.name ?? "Select a Project"}

            <div
              className={`${styles.contentIconWrapper} ${styles.onlyMobile}`}
              ref={towerDropdownRef}
              onClick={() => setIsContentDropdownOpen((prev) => !prev)}
            >
              <BsThreeDotsVertical className={styles.contentIcon} />
              {isContentDropdownOpen && (
                <div className={styles.dropdownMenu}>
                  <div
                    className={styles.dropdownItem}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTower("Tower 1");
                      setIsContentDropdownOpen(false);
                    }}
                  >
                    Tower 1
                  </div>
                  <div
                    className={styles.dropdownItem}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTower("Tower 2");
                      setIsContentDropdownOpen(false);
                    }}
                  >
                    Tower 2
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className={styles.filter}>
            <select
              className={styles.dropdown}
              value={selectedProject?._id || ""}
              onChange={handleProjectChange}
            >
              {projects.map((project) => (
                <option key={project._id} value={project._id || ""}>
                  {project.name}
                </option>
              ))}
            </select>

            <div className={styles.selectOptionContainer}>
              <button onClick={() => setDisplayType("FlatNo")}>
                <BsBuildingsFill />
                FlatNo
              </button>
              <button onClick={() => setDisplayType("Area")}>
                <FaChartArea />
                Area
              </button>
              <button onClick={() => setDisplayType("BHK")}>
                <FaHouse />
                BHK
              </button>
            </div>
          </div>
        </div>

        <div className={styles.mainSection}>
          <div className={styles.inventoryBuildingBody}>
            {/* Tower 1 */}
            <div
              className={`${styles.tower1} ${
                selectedTower === "Tower 1"
                  ? styles.mobileShow
                  : styles.mobileHide
              }`}
            >
              <div className={styles.inventoryBody}>
                <div className={styles.fixedLine}>
                  <div className={styles.imageSection}>
                    <Image
                      src={
                        selectedProject?.logo ??
                        "/images/circleBtnInventory.png"
                      }
                      alt="building model"
                      className={styles.imagebuilding}
                      width={100}
                      height={100}
                    />
                    <div className={styles.towerNameStyles}>
                      {selectedProject?.name}{" "}
                      {tower2Flats.length > 0 ? "- Tower 1" : ""}
                    </div>
                  </div>

                  <div>
                    <Image
                      src="/images/circleBtnInventory.png"
                      alt="circle"
                      className={styles.circleImage}
                      width={100}
                      height={100}
                    />
                  </div>

                  <div className={styles.line}></div>
                </div>

                <div className={styles.scrollArea}>
                  {groupFlatsByFloor(tower1Flats).map(([floorNo, flats]) => (
                    <div key={floorNo} className={styles.floorRow}>
                      <div className={styles.floorLabel}>{floorNo}</div>

                      <div className={styles.roomBoxContainer}>
                        {flats
                          .filter((f) => {
                            if (flatFilter === "available")
                              return !f.occupied && !f.hold;
                            if (flatFilter === "sold") return f.occupied;
                            return true;
                          })
                          .map((flat, idx) => (
                            <div
                              key={idx}
                              className={`${styles.roomBox} ${
                                flat.occupied ? styles.sold : styles.available
                              } ${styles.text}`}
                              onClick={() => handleRoomClick(flat)}
                            >
                              {flat.flatNo}
                            </div>
                          ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Tower 2 - Only show if there are Tower 2 flats */}
            {tower2Flats.length > 0 && (
              <div
                className={`${styles.tower2} ${
                  selectedTower === "Tower 2"
                    ? styles.mobileShow
                    : styles.mobileHide
                }`}
              >
                <div className={styles.inventoryBody}>
                  <div className={styles.fixedLine}>
                    <div className={styles.imageSection}>
                      <Image
                        src={
                          selectedProject?.logo ??
                          "/images/circleBtnInventory.png"
                        }
                        className={styles.imagebuilding}
                        alt="building model"
                        width={100}
                        height={100}
                      />
                      <div className={styles.towerNameStyles}>Tower 2</div>
                    </div>
                    <div>
                      <Image
                        src="/images/circleBtnInventory.png"
                        alt="circle"
                        className={styles.circleImage}
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className={styles.line}></div>
                  </div>

                  <div className={styles.scrollArea}>
                    {groupFlatsByFloor(tower2Flats).map(([floorNo, flats]) => (
                      <div key={floorNo} className={styles.floorRow}>
                        <div className={styles.floorLabel}>{floorNo}</div>

                        <div className={styles.roomBoxContainer}>
                          {flats
                            .filter((f) => {
                              if (flatFilter === "available")
                                return !f.occupied && !f.hold;
                              if (flatFilter === "sold") return f.occupied;
                              return true;
                            })
                            .map((flat, i) => (
                              <div
                                key={i}
                                className={`${styles.roomBox} ${
                                  flat.occupied ? styles.sold : styles.available
                                } ${styles.text}`}
                                onClick={() => handleRoomClick(flat)}
                              >
                                {flat.flatNo}
                              </div>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={styles.infoSection}>
            <div>{selectedProject?.name ?? "Select a Project"}</div>

            <div className={styles.flatInfo}>
              <div>
                Flat Info :
                <div
                  className={styles.clearFilter}
                  onClick={() => setFlatFilter("all")}
                >
                  clear filter
                </div>
              </div>
              <div
                className={styles.availableFlats}
                onClick={() => setFlatFilter("available")}
                tabIndex={0}
              >
                Available Flats: {availableCount}
              </div>
              <div
                className={styles.soldFlats}
                onClick={() => setFlatFilter("sold")}
                tabIndex={0}
              >
                Sold Flats: {soldCount}
              </div>
            </div>
            <div className={styles.filterInstruction}>
              Click on Available or Sold flats to filter; click Clear Filter to
              reset.
            </div>
          </div>
        </div>
      </div>

      {isDialogOpen && (
        <div className={styles.dialogOverlay} onClick={closeDialog}>
          <div
            className={styles.dialogBox}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: "600px",
              width: "90vw",
              maxHeight: "90vh",
              overflow: "auto",
            }}
          >
            <div className={styles.detailsContainer}>
              {/* TOP HEADER BASED ON OCCUPIED */}
              {selectedRoom?.occupied ? (
                <div className={styles.soldDialogContent}>
                  <div className={styles.leftText}>
                    <div>Flat {selectedRoom?.flatNo} is already booked !!</div>
                  </div>
                  <div className={styles.imgContainer}>
                    <Image
                      src="/images/soldOut2.png"
                      alt="sold"
                      width={100}
                      height={100}
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.headerSection}>
                  <div className={styles.headerMain}>
                    <div className={styles.headerTitle}>
                      Flat {selectedRoom?.flatNo ?? "N/A"}
                    </div>

                    {/* Status chips */}
                    <div className={styles.statusChips}>
                      <span
                        className={`${styles.statusChip} ${styles.available}`}
                      >
                        Available
                      </span>

                      {selectedRoom?.hold && (
                        <span
                          className={`${styles.statusChip} ${styles.onHold}`}
                        >
                          On Hold
                        </span>
                      )}
                    </div>
                  </div>
                  <div
                    className={styles.detailIcon}
                    ref={infoDropdownRef}
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                  >
                    <BsThreeDotsVertical />
               
                  </div>
                </div>
              )}

              {/* ALWAYS SHOW BELOW DETAILS — no condition */}
              <FlatDetailsContent />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryMain;
