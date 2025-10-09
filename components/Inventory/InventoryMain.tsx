"use client";
import React, { useRef, useState } from "react";
import styles from "./inventorymain.module.css";
import { FaChartArea, FaHouse } from "react-icons/fa6";
import { BsBuildingsFill, BsThreeDotsVertical } from "react-icons/bs";
import {
    heartInventoryData,
    malibuInventoryData,
    marinaInventoryData,
    nineInventoryData,
} from "./inventoryData";
import Image from "next/image";
import { useClickOutside } from "../MyAttendanceSection/useClickOutside";

// -------- Types --------
type Room = {
    roomNo: string;
    area: string;
    bhk: string;
    sold: boolean;
    floorNumber: string;
};

type Floor = {
    floorNumber: string;
    rooms: Room[];
};

type Tower = {
    towerName: string;
    floors: Floor[];
};

type ProjectOption = {
    name: string;
    data: Tower[];
    image: string;
};

const InventoryMain: React.FC = () => {
    const [displayType, setDisplayType] = useState<"FlatNo" | "Area" | "BHK">(
        "FlatNo"
    );
    const [flatFilter, setFlatFilter] = useState<"all" | "available" | "sold">(
        "all"
    );
    const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
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

    const handleOfferChange = (
        e: React.ChangeEvent<HTMLSelectElement>
    ): void => {
        const value = e.target.value;
        setSelectedOffer(value);
        if (value === "custom") {
            setShowCustomDialog(true);
        }
    };

    const handleRoomClick = (room: Room): void => {
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

    const getRoomDisplayText = (room: Room): string => {
        switch (displayType) {
            case "Area":
                return room.area;
            case "BHK":
                return room.bhk;
            case "FlatNo":
            default:
                return room.roomNo;
        }
    };

    const projectOptions: ProjectOption[] = [
        {
            name: "EV Heart City",
            data: heartInventoryData as Tower[],
            image: "/images/evheartcity.png",
        },
        {
            name: "EV 23 Malibu West",
            data: malibuInventoryData as Tower[],
            image: "/images/ev23malibuwestmodel.png",
        },
        {
            name: "EV 10 Marina Bay",
            data: marinaInventoryData as Tower[],
            image: "/images/ev10marinabaymodel.png",
        },
        {
            name: "EV 9 Square",
            data: nineInventoryData as Tower[],
            image: "/images/ev9squaremodel.png",
        },
    ];

    const [selectedProjects, setSelectedProjects] = useState<ProjectOption>(
        projectOptions[0]
    );

    const getFlatCounts = (): { soldCount: number; availableCount: number } => {
        let soldCount = 0;
        let availableCount = 0;

        selectedProjects.data.forEach((tower) => {
            if (tower.floors) {
                tower.floors.forEach((floor) => {
                    floor.rooms.forEach((room) => {
                        if (room.sold) {
                            soldCount++;
                        } else {
                            availableCount++;
                        }
                    });
                });
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
                        {selectedProjects.name}

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
                            onChange={(e) =>
                                setSelectedProjects(
                                    projectOptions.find((proj) => proj.name === e.target.value)! // 👈 non-null assertion
                                )
                            }

                        >
                            {projectOptions.map((project, index) => (
                                <option key={index} value={project.name}>
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
                        <div
                            className={`${styles.tower1} ${selectedTower === "Tower 1"
                                    ? styles.mobileShow
                                    : styles.mobileHide
                                }`}
                        >
                            <div className={styles.inventoryBody}>
                                <div className={styles.fixedLine}>
                                    <div className={styles.imageSection}>
                                        <Image
                                            src={selectedProjects.image}
                                            alt="building model"
                                            className={styles.imagebuilding}
                                            width={100}
                                            height={100}
                                        />
                                        <div className={styles.towerNameStyles}>
                                            {selectedProjects.data[0].towerName}
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
                                    {selectedProjects.data[0].floors.map((floor, index) => (
                                        <div key={index} className={styles.floorRow}>
                                            <div className={styles.floorLabel}>
                                                {floor.floorNumber}
                                            </div>
                                            <div className={styles.roomBoxContainer}>
                                                {floor.rooms
                                                    .filter((room) => {
                                                        if (flatFilter === "available") return !room.sold;
                                                        if (flatFilter === "sold") return room.sold;
                                                        return true;
                                                    })
                                                    .map((room, i) => (
                                                        <div
                                                            key={i}
                                                            className={`${styles.roomBox} ${room.sold ? styles.sold : styles.available
                                                                } ${styles.text}`}
                                                            onClick={() => handleRoomClick(room)}
                                                        >
                                                            {getRoomDisplayText(room)}
                                                        </div>
                                                    ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {selectedProjects.data[1]?.floors?.length > 0 && (
                            <div
                                className={`${styles.tower2} ${selectedTower === "Tower 2"
                                        ? styles.mobileShow
                                        : styles.mobileHide
                                    }`}
                            >
                                <div className={styles.inventoryBody}>
                                    <div className={styles.fixedLine}>
                                        <div className={styles.imageSection}>
                                            <Image
                                                src={selectedProjects.image}
                                                className={styles.imagebuilding}
                                                alt="building model"
                                                width={100}
                                                height={100}
                                            />
                                            <div className={styles.towerNameStyles}>
                                                {selectedProjects.data[1].towerName}
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
                                        {selectedProjects.data[1].floors.map((floor, index) => (
                                            <div key={index} className={styles.floorRow}>
                                                <div className={styles.floorLabel}>
                                                    {floor.floorNumber}
                                                </div>
                                                <div className={styles.roomBoxContainer}>
                                                    {floor.rooms
                                                        .filter((room) => {
                                                            if (flatFilter === "available") return !room.sold;
                                                            if (flatFilter === "sold") return room.sold;
                                                            return true;
                                                        })
                                                        .map((room, i) => (
                                                            <div
                                                                key={i}
                                                                className={`${styles.roomBox} ${room.sold ? styles.sold : styles.available
                                                                    } ${styles.text}`}
                                                                onClick={() => handleRoomClick(room)}
                                                            >
                                                                {getRoomDisplayText(room)}
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
                        <div>{selectedProjects.name}</div>

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
                    >
                        {selectedRoom?.sold ? (
                            <div className={styles.soldDialogContent}>
                                <div className={styles.leftText}>
                                    <div>Flat {selectedRoom?.roomNo} is already booked !!</div>
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
                            <>
                                <div className={styles.headerSection}>
                                    <div className={styles.headerText}>
                                        Details for Flat {selectedRoom?.roomNo}
                                    </div>
                                    <div
                                        className={styles.detailIcon}
                                        ref={infoDropdownRef}
                                        onClick={() => setIsDropdownOpen((prev) => !prev)}
                                    >
                                        <BsThreeDotsVertical />
                                        {isDropdownOpen && (
                                            <div className={styles.dropdownMenu}>
                                                <div className={styles.dropdownItem}>
                                                    Cost Sheet Generator
                                                </div>
                                                <div className={styles.dropdownItem}>
                                                    Payment Schedule
                                                </div>
                                                <div className={styles.dropdownItem}>Demand Letter</div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className={styles.middleSection}>
                                    <div className={styles.detailsText}>
                                        <div>Floor : {selectedRoom?.floorNumber}</div>
                                        <div>Flat : {selectedRoom?.roomNo}</div>
                                        <div>Type : {selectedRoom?.bhk}</div>
                                        <div>Usable Carpet Area : {selectedRoom?.area}</div>
                                        <div>Sellable Carpet Area : 1159sqft.</div>
                                        <div>All Inclusive Price : amount</div>
                                    </div>

                                    <div className={styles.statusContainer}>
                                        <div className={styles.imgContainer}>
                                            <Image
                                                src="/images/available.png"
                                                alt="Available"
                                                width={100}
                                                height={100}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className={styles.lastSection}>
                                    <div className={styles.dropdownWrapperDetails}>
                                        <select
                                            className={styles.dropdownDetails}
                                            value={selectedOffer}
                                            // onChange={(e) => setSelectedOffer(e.target.value)}
                                            onChange={handleOfferChange}
                                        >
                                            <option value="">Offer Price</option>
                                            <option value="msp1"> MSP1</option>
                                            <option value="msp2"> MSP2</option>
                                            <option value="msp3"> MSP3</option>
                                            <option value="custom"> Custom</option>
                                        </select>
                                    </div>

                                    {showCustomDialog && (
                                        <div className={styles.dialogOverlay}>
                                            <div className={styles.dialogBox2}>
                                                <h3>Edit Price</h3>
                                                <input
                                                    type="text"
                                                    className={styles.priceInput}
                                                    placeholder="Enter price"
                                                />

                                                <div className={styles.dialogButtons}>
                                                    <button
                                                        onClick={() => {
                                                            setShowCustomDialog(false);
                                                            setSelectedOffer("custom");
                                                        }}
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        onClick={() => {
                                                            setShowCustomDialog(false);
                                                        }}
                                                    >
                                                        OK
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {selectedOffer && (
                                        <div className={styles.lastDetailsSection}>
                                            <div className={styles.lastText}>
                                                <div className={styles.label}>Agreement Value:</div>
                                                <div className={styles.value}>value</div>

                                                <div className={styles.label}>Stamp Duty:</div>
                                                <div className={styles.value}>value</div>

                                                <div className={styles.label}>GST 5%:</div>
                                                <div className={styles.value}>value</div>

                                                <div className={styles.label}>Registration:</div>
                                                <div className={styles.value}>value</div>

                                                <div className={styles.label}>
                                                    Total (All Inclusive):
                                                </div>
                                                <div className={styles.value}>value</div>
                                            </div>

                                            <div className={styles.noteContainer}>
                                                <span className={styles.noteText}>Note</span> : All
                                                Inclusive price does not include 1 lakh rupees of
                                                maintenance deposit and 30,000 rupees of legal charges.
                                            </div>
                                        </div>
                                    )}
                                </div>
                                <button className={styles.okbutton} onClick={closeDialog}>
                                    OK
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default InventoryMain;
