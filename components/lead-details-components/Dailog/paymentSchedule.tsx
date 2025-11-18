"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styles from "./dailog.module.css";
import { IoLocation, IoHome, IoCall, IoBusiness, IoCalculator } from "react-icons/io5";
import { BsCurrencyRupee, BsPersonFill } from "react-icons/bs";
import { PiBagFill } from "react-icons/pi";
import { AiFillPicture, AiFillFilePdf } from "react-icons/ai";
import ReactDOM from "react-dom";
import { MdCancel } from "react-icons/md";
import { customRound, getNumberWithSuffix } from "@/app/helper";
import { useData } from "@/providers/dataContext";

interface PaymentScheduleProps {
  openclick: React.Dispatch<React.SetStateAction<boolean>>;
  postSaleLead?: PostSaleLead | null;
  project?: OurProject;
  flatNo?: string;
  allInclusive?: number;
  leads?: Lead | null;
}

interface NameField {
  prefix: string;
  name: string;
}

interface FormData {
  selectedProject: OurProject | null;
  propertyType: "Flat" | "Shop";
  flatNo: string;
  phone: string;
  allInclusiveAmount: string;
  carpetArea: string;
  selectedStampDuty: string;
  whichBuildingNo: number | null;
  whichFloor: number | null;
  selectedFlatNo: number | null;
  selectedShopNumber: string | null;
}

const PaymentSchedule: React.FC<PaymentScheduleProps> = ({ 
  openclick, 
  postSaleLead,
  project, 
  flatNo, 
  allInclusive,
  leads, 
}) => {
  const { getProjects, projects } = useData();
  const dialogRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isLoading, setIsLoading] = useState(false);


  const [formData, setFormData] = useState<FormData>({
    selectedProject:null,
    propertyType: "Flat",
    flatNo: "",
    phone: "",
    allInclusiveAmount: "",
    carpetArea: "",
    selectedStampDuty: "5",
    whichBuildingNo: null,
    whichFloor: null,
    selectedFlatNo: null,
    selectedShopNumber: null
  });


  const [names, setNames] = useState<NameField[]>([{ prefix: "", name: "" }]);
  const [slabs, setSlabs] = useState<Slab[]>([]);

  const prefixList = ["mr.", "mrs.", "miss"];
  const shopNumbers = Array.from({ length: 20 }, (_, i) => 
    (i + 1).toString().padStart(2, '0')
  );

  useEffect(() => {
    getProjects();
    
    if (postSaleLead) {
      // Pre-fill form with lead data
      setFormData(prev => ({
        ...prev,
        selectedProject: postSaleLead.project || null,
        flatNo: postSaleLead.unitNo || "",
        phone: postSaleLead.phoneNumber?.toString() || "",
        carpetArea: postSaleLead.carpetArea?.toString() || "",
        allInclusiveAmount: allInclusive?.toString() || "",
        selectedStampDuty: postSaleLead.preRegistrationCheckList?.stampDuty?.percent?.toString() || "6",
      }));

      // Set names from lead applicants
      if (postSaleLead.applicants && postSaleLead.applicants.length > 0) {
        const applicantNames = postSaleLead.applicants.map(app => ({
          prefix: app.prefix || "",
          name: `${app.firstName || ""} ${app.lastName || ""}`.trim()
        }));
        setNames(applicantNames);
      } else {
        setNames([{
          prefix: "",
          name: `${postSaleLead.firstName || ""} ${postSaleLead.lastName || ""}`.trim()
        }]);
      }
    } else if (leads) {
      // Use leads if postSaleLead is not provided
    //   setFormData(prev => ({
    //     ...prev,
    //     selectedProject: leads.project || null,
    //     flatNo: leads.unitNo || "",
    //     phone: leads.phoneNumber?.toString() || "",
    //     carpetArea: leads.carpetArea?.toString() || "",
    //     allInclusiveAmount: allInclusive?.toString() || "",
    //     selectedStampDuty: leads.preRegistrationCheckList?.stampDuty?.percent?.toString() || "6",
    //   }));

      if (postSaleLead!.applicants && postSaleLead!.applicants.length > 0) {
        const applicantNames = postSaleLead!.applicants.map(app => ({
          prefix: app.prefix || "",
          name: `${app.firstName || ""} ${app.lastName || ""}`.trim()
        }));
        setNames(applicantNames);
      } else {
        setNames([{
          prefix: "",
          name: `${leads.firstName || ""} ${leads.lastName || ""}`.trim()
        }]);
      }
    }

    if (project) {
      setFormData(prev => ({ ...prev, selectedProject: project }));
    }

    if (flatNo) {
      setFormData(prev => ({ ...prev, flatNo }));
    }

    if (allInclusive) {
      setFormData(prev => ({ ...prev, allInclusiveAmount: allInclusive.toString() }));
    }
  }, [postSaleLead, project, flatNo, allInclusive, openclick, leads, getProjects]);

  const fetchSlabs = async (projectId: string) => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
    //   const mockSlabs: Slab[] = [
    //     { index: 1, name: 'Booking Amount', percent: 10 },
    //     { index: 2, name: 'Within 30 Days', percent: 15 },
    //     { index: 3, name: 'On Foundation', percent: 10 },
    //     { index: 4, name: 'On 1st Floor', percent: 10 },
    //     { index: 5, name: 'On 2nd Floor', percent: 10 },
    //     { index: 6, name: 'On 3rd Floor', percent: 10 },
    //     { index: 7, name: 'On 4th Floor', percent: 10 },
    //     { index: 8, name: 'On 5th Floor', percent: 10 },
    //     { index: 9, name: 'On Floor Roof', percent: 10 },
    //     { index: 10, name: 'On Possession', percent: 5 },
    //   ];
    //   setSlabs(mockSlabs);
    } catch (error) {
      console.error('Failed to load slabs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
        openclick(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [openclick]);

  const handleCancel = () => {
    setFormData({
      selectedProject: null,
      propertyType: "Flat",
      flatNo: "",
      phone: "",
      allInclusiveAmount: "",
      carpetArea: "",
      selectedStampDuty: "5",
      whichBuildingNo: null,
      whichFloor: null,
      selectedFlatNo: null,
      selectedShopNumber: null,
    });
    setNames([{ prefix: "", name: "" }]);
    openclick(false);
  };

  const onChangeField = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProjectChange = (projectId: string) => {
    const project = projects.find(p => p._id === projectId) || null;
    setFormData(prev => ({
      ...prev,
      selectedProject: project,
      whichBuildingNo: null,
      whichFloor: null,
      selectedFlatNo: null,
      flatNo: ""
    }));
    
    if (project) {
      fetchSlabs(project._id!);
    }
  };

  const addName = () => {
    setNames(prev => [...prev, { prefix: "", name: "" }]);
  };

  const removeName = (index: number) => {
    if (names.length > 1) {
      setNames(prev => prev.filter((_, i) => i !== index));
    }
  };

  const updateName = (index: number, field: keyof NameField, value: string) => {
    setNames(prev => prev.map((name, i) => 
      i === index ? { ...name, [field]: value } : name
    ));
  };

  const handleViewSchedule = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.selectedProject) {
      newErrors.project = "Please select a project";
    }

    if (!formData.allInclusiveAmount) {
      newErrors.allInclusiveAmount = "Please enter all inclusive amount";
    }

    if (names.some(name => !name.name.trim())) {
      newErrors.names = "Please fill all name fields";
    }

    if (names.some(name => !name.prefix.trim())) {
      newErrors.prefixes = "Please select prefix for all names";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    const allInclusiveNum = parseFloat(formData.allInclusiveAmount);
    const stampDutyPercentage = parseFloat(formData.selectedStampDuty);
    const gstPercentage = 5.0;
    const registrationCharges = 30000;

    const agreementValue = (allInclusiveNum - registrationCharges) / 
      (((stampDutyPercentage + gstPercentage) / 100) + 1);

    const stampDutyValue = customRound(agreementValue * (stampDutyPercentage / 100));
    const gstValue = customRound(agreementValue * (gstPercentage / 100));
    const total1 = customRound(stampDutyValue + registrationCharges);
    const total2 = customRound(allInclusiveNum - total1);

    // Show schedule in modal
    showScheduleModal(total2, allInclusiveNum);
  };

  const showScheduleModal = (total2: number, allInclusiveNum: number) => {
    const scheduleContent = slabs.map(slab => {
      const slabPercentage = slab.percent || 0;
      const slabAmount = total2 * (slabPercentage / 100);
      const cumulativeTotal = slabs
        .slice(0, slab.index??0)
        .reduce((sum, s) => sum + (total2 * ((s.percent || 0) / 100)), 0) + slabAmount;

      return {
        name: slab.name || 'Unknown Stage',
        percentage: slabPercentage,
        amount: slabAmount,
        cumulative: cumulativeTotal
      };
    });

    const modalContent = `
      <div class="${styles.scheduleModal}">
        <h3>Payment Schedule Preview</h3>
        <div class="${styles.scheduleList}">
          ${scheduleContent.map(item => `
            <div class="${styles.scheduleItem}">
              <div class="${styles.scheduleHeader}">
                <strong>${item.name}</strong>
                <span>${item.percentage}%</span>
              </div>
              <div class="${styles.scheduleDetails}">
                <div>Amount: ₹${item.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                <div><strong>Cumulative: ₹${item.cumulative.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong></div>
              </div>
            </div>
          `).join('')}
        </div>
        <div class="${styles.scheduleTotal}">
          <strong>Total Payment: ₹${total2.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</strong>
        </div>
      </div>
    `;

    const modal = document.createElement('div');
    modal.className = styles.modalOverlay;
    modal.innerHTML = `
      <div class="${styles.modalContent}">
        <div class="${styles.modalHeader}">
          <h3>Payment Schedule</h3>
          <button onclick="this.closest('.${styles.modalOverlay}').remove()" class="${styles.closeButton}">×</button>
        </div>
        ${modalContent}
        <div class="${styles.modalFooter}">
          <button onclick="this.closest('.${styles.modalOverlay}').remove()" class="${styles.okButton}">OK</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  };

  const handleGeneratePDF = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.selectedProject) {
      newErrors.project = "Please select a project";
    }

    if (!formData.allInclusiveAmount) {
      newErrors.allInclusiveAmount = "Please enter all inclusive amount";
    }

    if (!formData.flatNo) {
      newErrors.flatNo = "Please enter flat/shop number";
    }

    if (names.some(name => !name.name.trim())) {
      newErrors.names = "Please fill all name fields";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    if (!formData.selectedProject) return;

    // TODO: Uncomment and implement generatePDF function
    // generatePDF({
    //   project: formData.selectedProject,
    //   flatNo: formData.flatNo,
    //   allInclusiveAmount: parseFloat(formData.allInclusiveAmount),
    //   names,
    //   selectedStampDuty: formData.selectedStampDuty,
    //   propertyType: formData.propertyType,
    //   slabs,
    //   phone: formData.phone,
    //   carpetArea: formData.carpetArea
    // });

    alert("PDF generated successfully!");
  };

  // Get filtered data based on selections
  const buildings = formData.selectedProject?.flatList
    ?.map(flat => flat.buildingNo)
    .filter((b): b is number => b !== undefined)
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort() || [];

  const floors = formData.selectedProject?.flatList
    ?.filter(flat => flat.buildingNo === formData.whichBuildingNo)
    .map(flat => flat.floor)
    .filter((f): f is number => f !== undefined)
    .filter((v, i, a) => a.indexOf(v) === i)
    .sort() || [];

  const flats = formData.selectedProject?.flatList
    ?.filter(flat => flat.floor === formData.whichFloor && flat.buildingNo === formData.whichBuildingNo)
    .map(flat => flat.number)
    .filter((n): n is number => n !== undefined)
    .sort() || [];

  const RequiredLabel: React.FC<{ icon: React.ReactNode; text: string }> = ({ icon, text }) => (
    <label style={{ display: "flex", alignItems: "center", gap: "3px" }}>
      {icon}
      <span>{text}</span>
      <span style={{ color: "red", fontSize: "15px", marginLeft: "-1px" }}>*</span>
    </label>
  );

  return ReactDOM.createPortal(
    <div className={styles.dialogOverlay}>
      <div ref={dialogRef} className={styles.dialogBox} style={{ maxWidth: "600px", maxHeight: "90vh" }}>
        <h3 className={styles.dialogTitle}>💰 Payment Schedule</h3>
        <MdCancel
          onClick={() => openclick(false)}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: "red",
            border: "none",
            borderRadius: "50%",
            width: "23px",
            height: "23px",
            cursor: "pointer",
            zIndex: "999",
          }}
        />
        <div className={styles.dailogcnt} style={{ padding: "20px" }}>

          {/* Project Selection */}
          <div className={styles.formControl}>
            <label>
              <RequiredLabel icon={<IoBusiness className={styles.iconcolor} />} text="Select Project" />
            </label>
            <select
              value={formData.selectedProject?._id || ""}
              onChange={(e) => handleProjectChange(e.target.value)}
              className={styles.selectInput}
            >
              <option value="">Select Project</option>
              {projects.map(project => (
                <option key={project?._id || ""} value={project?._id || ""}>
                  {project?.name || "Unknown Project"}
                </option>
              ))}
            </select>
            {errors.project && <p className={styles.errorMsg}>{errors.project}</p>}
          </div>

          {/* Property Type */}
          <div className={styles.formControl}>
            <label>
              <RequiredLabel icon={<IoHome className={styles.iconcolor} />} text="Property Type" />
            </label>
            <select
              value={formData.propertyType}
              onChange={(e) => setFormData(prev => ({ 
                ...prev, 
                propertyType: e.target.value as "Flat" | "Shop",
                whichBuildingNo: null,
                whichFloor: null,
                selectedFlatNo: null,
                selectedShopNumber: null,
                flatNo: ""
              }))}
              className={styles.selectInput}
            >
              <option value="Flat">Flat</option>
              <option value="Shop">Shop</option>
            </select>
          </div>

          {formData.propertyType === 'Flat' && (
            <>
              {/* Building, Floor, Unit Selection */}
              <div className={styles.card} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "10px" }}>
                {buildings.length > 0 && (
                  <div className={styles.formControl}>
                    <label>Building No</label>
                    <select
                      value={formData.whichBuildingNo || ""}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        whichBuildingNo: e.target.value ? parseInt(e.target.value) : null,
                        whichFloor: null,
                        selectedFlatNo: null,
                        flatNo: ""
                      }))}
                      className={styles.selectInput}
                    >
                      <option value="">Select Building</option>
                      {buildings.map(building => (
                        <option key={building} value={building}>
                          {getNumberWithSuffix(building)}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className={styles.formControl}>
                  <label>Floor</label>
                  <select
                    value={formData.whichFloor || ""}
                    onChange={(e) => setFormData(prev => ({ 
                      ...prev, 
                      whichFloor: e.target.value ? parseInt(e.target.value) : null,
                      selectedFlatNo: null,
                      flatNo: ""
                    }))}
                    className={styles.selectInput}
                  >
                    <option value="">Select Floor</option>
                    {floors.map(floor => (
                      <option key={floor} value={floor}>
                        {getNumberWithSuffix(floor)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formControl}>
                  <label>Unit No</label>
                  <select
                    value={formData.selectedFlatNo || ""}
                    onChange={(e) => {
                      const value = e.target.value ? parseInt(e.target.value) : null;
                      setFormData(prev => ({ 
                        ...prev, 
                        selectedFlatNo: value 
                      }));
                      
                      const flat = formData.selectedProject?.flatList?.find(f => 
                        f.floor === formData.whichFloor && 
                        f.buildingNo === formData.whichBuildingNo && 
                        f.number === value
                      );
                      if (flat) {
                        setFormData(prev => ({
                          ...prev,
                          flatNo: flat.flatNo || '',
                          allInclusiveAmount: flat.allInclusiveValue?.toString() || prev.allInclusiveAmount,
                          carpetArea: flat.carpetArea?.toString() || prev.carpetArea
                        }));
                      }
                    }}
                    className={styles.selectInput}
                  >
                    <option value="">Select Unit</option>
                    {flats.map(unit => (
                      <option key={unit} value={unit}>
                        {unit.toString().padStart(2, '0')}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Flat Number */}
              <div className={styles.formControl}>
                <label>
                  <RequiredLabel icon={<IoHome className={styles.iconcolor} />} text="Flat Number" />
                </label>
                <input
                  type="text"
                  name="flatNo"
                  placeholder="Enter flat number...."
                  value={formData.flatNo}
                  onChange={onChangeField}
                  className={styles.textInput}
                />
                {errors.flatNo && <p className={styles.errorMsg}>{errors.flatNo}</p>}
              </div>
            </>
          )}

          {formData.propertyType === 'Shop' && (
            <div className={styles.formControl}>
              <label>Shop Number</label>
              <select
                value={formData.selectedShopNumber || ""}
                onChange={(e) => setFormData(prev => ({ 
                  ...prev, 
                  selectedShopNumber: e.target.value,
                  flatNo: e.target.value
                }))}
                className={styles.selectInput}
              >
                <option value="">Select Shop</option>
                {shopNumbers.map(number => (
                  <option key={number} value={number}>Shop {number}</option>
                ))}
              </select>
            </div>
          )}

          {/* Stamp Duty */}
          <div className={styles.formControl}>
            <label>
              <RequiredLabel icon={<IoCalculator className={styles.iconcolor} />} text="Stamp Duty (%)" />
            </label>
            <select
              name="selectedStampDuty"
              value={formData.selectedStampDuty}
              onChange={onChangeField}
              className={styles.selectInput}
            >
              {['5', '6', '7', '8'].map(value => (
                <option key={value} value={value}>{value}%</option>
              ))}
            </select>
          </div>

          {/* Phone Number */}
          <div className={styles.formControl}>
            <label>
              <IoCall className={styles.iconcolor} /> Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Enter phone number...."
              value={formData.phone}
              onChange={onChangeField}
              className={styles.textInput}
            />
          </div>

          {/* Names */}
          <div className={styles.formControl}>
            <label>
              <RequiredLabel icon={<BsPersonFill className={styles.iconcolor} />} text="Client Names" />
            </label>
            {names.map((name, index) => (
              <div key={index} className={styles.nameRow}>
                <select
                  value={name.prefix}
                  onChange={(e) => updateName(index, 'prefix', e.target.value)}
                  className={styles.selectInput}
                  style={{ flex: 1 }}
                >
                  <option value="">Prefix</option>
                  {prefixList.map(prefix => (
                    <option key={prefix} value={prefix}>
                      {/* {capitalize(prefix)} */}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Enter name"
                  value={name.name}
                  onChange={(e) => updateName(index, 'name', e.target.value)}
                  className={styles.textInput}
                  style={{ flex: 2 }}
                />
                {names.length > 1 && (
                  <button
                    onClick={() => removeName(index)}
                    className={styles.removeButton}
                    type="button"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            {(errors.names || errors.prefixes) && (
              <p className={styles.errorMsg}>Please fill all name fields and select prefixes</p>
            )}
            <button
              onClick={addName}
              className={styles.addButton}
              type="button"
            >
              + Add Name
            </button>
          </div>

          {/* Carpet Area */}
          <div className={styles.formControl}>
            <label>
              <IoHome className={styles.iconcolor} /> Carpet Area (sq. ft.)
            </label>
            <input
              type="number"
              name="carpetArea"
              placeholder="Enter carpet area...."
              value={formData.carpetArea}
              onChange={onChangeField}
              className={styles.textInput}
            />
          </div>

          {/* All Inclusive Amount */}
          <div className={styles.formControl}>
            <label>
              <RequiredLabel icon={<BsCurrencyRupee className={styles.iconcolor} />} text="All Inclusive Amount" />
            </label>
            <input
              type="number"
              name="allInclusiveAmount"
              placeholder="Enter amount...."
              value={formData.allInclusiveAmount}
              onChange={onChangeField}
              className={styles.textInput}
            />
            {errors.allInclusiveAmount && <p className={styles.errorMsg}>{errors.allInclusiveAmount}</p>}
          </div>

          {/* Action Buttons */}
          <div className={styles.dialogButtons}>
            <button
              className={styles.cancelBtn}
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              className={styles.viewBtn}
              onClick={handleViewSchedule}
              disabled={isLoading}
            >
              <IoCalculator style={{ marginRight: "5px" }} />
              View Schedule
            </button>
            <button
              className={styles.submitBtn}
              onClick={handleGeneratePDF}
              disabled={isLoading}
            >
              <AiFillFilePdf style={{ marginRight: "5px" }} />
              Generate PDF
            </button>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className={styles.loadingOverlay}>
          <div className={styles.loadingContent}>
            <div className={styles.loadingSpinner}></div>
            <p>Loading...</p>
          </div>
        </div>
      )}
    </div>,
    document.body
  );
};

export default PaymentSchedule;