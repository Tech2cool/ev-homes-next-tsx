"use client";

import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import styles from "./tagging-form.module.css";
import { FaStar } from "react-icons/fa";
import {
  MdLocalPhone,
  MdOutlineEmail,
  MdOutlinePhoneInTalk,
} from "react-icons/md";
import { IoIosCalendar, IoMdCalendar } from "react-icons/io";
import { IoLocation, IoPersonOutline } from "react-icons/io5";
import { BsBuildingFill } from "react-icons/bs";
import { LuNotebookPen } from "react-icons/lu";
import Image from "next/image";
import Select, { MultiValue, SingleValue } from "react-select";
import { toast } from "react-toastify";
import { useData } from "@/providers/dataContext";
import moment from "moment-timezone";
import { useUser } from "@/providers/userContext";

// Type definitions
interface SelectOption {
  value: string;
  label: string;
}

interface LeadDetail {
  leadType: "cp" | "walk-in" | "internal-lead";
  firstName: string;
  lastName: string;
  phoneNumber: string;
  altPhoneNumber: string;
  email: string;
  address: string;
  remark: string;
  project: SelectOption[];
  requirements: SelectOption[];
  channelPartner: SelectOption | null;
  startDate: string;
  validTill: string;
}

interface TaggingFormSectionProps {
  onClose?: () => void;
}

const TaggingFormSection: React.FC<TaggingFormSectionProps> = ({
  onClose = () => {},
}) => {
  const {
    projects,
    requirements,
    getProjects,
    getRequirements,
    getChannelPartners,
    channelPartners,
    // error,
    addNewLead,
  } = useData();

  const { user } = useUser();

  const [startDate, setStartDate] = useState<string>("");
  const [validTill, setValidTill] = useState<string>("");
  const [iConfirm, setIConfirm] = useState<boolean>(false);
  const [detail, setDetail] = useState<LeadDetail>({
    leadType: "cp",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    altPhoneNumber: "",
    email: "",
    address: "",
    remark: "",
    project: [],
    requirements: [],
    channelPartner: null,
    startDate: "",
    validTill: "",
  });

  const tagdateRef = useRef<HTMLInputElement>(null);
  const validTillRef = useRef<HTMLInputElement>(null);

  // Memoized options to prevent unnecessary re-renders
  const projectOptions = useMemo(() => {
    return projects.length > 0
      ? projects.map((ele) => ({
          value: ele?._id ?? "",
          label: ele?.name ?? "",
        }))
      : [];
  }, [projects.length]);

  const apartmentOptions = useMemo((): SelectOption[] => {
    return requirements.length > 0
      ? requirements.map((ele: string) => ({ value: ele, label: ele }))
      : [];
  }, [requirements.length]);

  const channelPartnerOptions = useMemo(() => {
    return channelPartners?.length > 0
      ? channelPartners.map((ele) => ({
          value: ele?._id ?? "",
          label: ele?.firmName ?? "",
        }))
      : [];
  }, [channelPartners.length]);

  // Phone number validation and formatting
  const validatePhoneNumber = useCallback((value: string): string => {
    // Remove all non-digit characters
    const cleaned = value.replace(/\D/g, "");
    // Limit to 10 digits for Indian phone numbers
    return cleaned.slice(0, 10);
  }, []);

  const handlePhoneChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const cleanedValue = validatePhoneNumber(value);
      setDetail((prev) => ({
        ...prev,
        [name]: cleanedValue,
      }));
    },
    [validatePhoneNumber]
  );

  const onChangeStartDate = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setStartDate(value);
      // Add your date logic here if needed
      const today = moment().tz("Asia/Kolkata");
      const stDate = moment.tz(value, "YYYY-MM-DD", "Asia/Kolkata").set({
        hour: today.hour(),
        minute: today.minute(),
        second: today.second(),
      });

      console.log(value);
      console.log(today);
      console.log(stDate);

      const validTillDate = moment(stDate).add(59, "days");
      setValidTill(validTillDate.format("YYYY-MM-DD"));
      setDetail((prev) => ({
        ...prev,
        startDate: stDate.toISOString(),
        validTill: validTillDate.toISOString(),
      }));

      console.log(validTillDate);
    },
    []
  );

  const onChangeField = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      const { name, value } = e.target;
      setDetail((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  // Remove or comment out the selectStyles useMemo completely
  // const selectStyles = useMemo(
  //   () => ({
  //     control: (base: any) => ({
  //       ...base,
  //       padding: "0.3rem",
  //       fontSize: "12px",
  //       borderRadius: "8px",
  //       backgroundColor: "transparent",
  //       border: "1px solid #444444f5",
  //       color: "#fff",
  //     }),
  //     input: (base: any) => ({
  //       ...base,
  //       color: "white",
  //     }),
  //     placeholder: (base: any) => ({
  //       ...base,
  //       color: "#666",
  //     }),
  //     singleValue: (base: any) => ({
  //       ...base,
  //       color: "white",
  //     }),
  //     multiValueLabel: (base: any) => ({
  //       ...base,
  //       color: "black",
  //     }),
  //     option: (base: any, { isSelected, isFocused }: any) => ({
  //       ...base,
  //       color: "black",
  //       backgroundColor: isSelected
  //         ? "#e6f3ff"
  //         : isFocused
  //         ? "#f0f0f0"
  //         : "white",
  //       padding: "10px 12px",
  //     }),
  //     menu: (base: any) => ({
  //       ...base,
  //       zIndex: 9999,
  //     }),
  //   }),
  //   []
  // );

  // Initialize dates on mount
  useEffect(() => {
    // Add your date initialization logic here if needed
    const startDate = moment().tz("Asia/Kolkata");
    const validTill = moment(startDate).add(59, "days");
    setStartDate(startDate.format("YYYY-MM-DD"));
    setValidTill(validTill.format("YYYY-MM-DD"));
    setDetail((prev) => ({
      ...prev,
      startDate: startDate.toISOString(),
      validTill: validTill.toISOString(),
    }));
  }, []);

  // Load data on mount
  useEffect(() => {
    if (projects.length === 0) {
      getProjects();
    }
    if (requirements.length === 0) {
      getRequirements();
    }
    if (channelPartners?.length === 0) {
      getChannelPartners();
    }
  }, [
    projects.length,
    requirements.length,
    channelPartners?.length,
    getProjects,
    getRequirements,
    getChannelPartners,
  ]);

  const replaceEmptyStringsWithNull = useCallback(
    (obj: Record<string, any>) => {
      return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
          key,
          value === "" ? null : value,
        ])
      );
    },
    []
  );

  const onSubmit = useCallback(async () => {
    try {
      if (!iConfirm) {
        toast("Confirm Details first", { type: "error" });
        return;
      }
      if (!detail.phoneNumber || detail.phoneNumber === "") {
        toast("Phone Number is Required", { type: "error" });
        return;
      }
      if (detail.phoneNumber.length !== 10) {
        toast("Phone Number must be 10 digits", { type: "error" });
        return;
      }
      if (detail.leadType === "cp" && !detail.channelPartner) {
        toast("Channel Partner is Required", { type: "error" });
        return;
      }

      const datas: any = { ...detail };
      if (detail.channelPartner) {
        datas.channelPartner = detail.channelPartner?.value;
      }
      if (detail.project?.length > 0) {
        const projs = detail.project.map((ele) => ele.value);
        datas.project = projs;
      }
      if (detail.requirements?.length > 0) {
        const reqs = detail.requirements.map((ele) => ele.value);
        datas.requirement = reqs;
      }

      if (user?._id != null) {
        datas.dataAnalyzer = user?._id;
      }

      console.log(datas);
      console.log(detail);
      const resp = await addNewLead(datas);
      toast(resp?.message);

      setDetail({
        leadType: "cp",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        altPhoneNumber: "",
        email: "",
        address: "",
        remark: "",
        project: [],
        requirements: [],
        channelPartner: null,
        startDate: "",
        validTill: "",
      });
      setIConfirm(false);
      onClose();
    } catch (error) {
      toast((error as Error).toString());
    }
  }, [detail, iConfirm, addNewLead, replaceEmptyStringsWithNull, onClose]);

  const handleCancel = useCallback(() => {
    // Reset form or navigate back
    setDetail({
      leadType: "cp",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      altPhoneNumber: "",
      email: "",
      address: "",
      remark: "",
      project: [],
      requirements: [],
      channelPartner: null,
      startDate: "",
      validTill: "",
    });
    setIConfirm(false);
    onClose();
  }, [onClose]);

  const handleProjectsChange = useCallback(
    (selectedOptions: MultiValue<SelectOption>) => {
      setDetail((prev) => ({
        ...prev,
        project: selectedOptions ? Array.from(selectedOptions) : [],
      }));
    },
    []
  );

  const handleRequirementsChange = useCallback(
    (selectedOptions: MultiValue<SelectOption>) => {
      setDetail((prev) => ({
        ...prev,
        requirements: selectedOptions ? Array.from(selectedOptions) : [],
      }));
    },
    []
  );

  const handleChannelPartnerChange = useCallback(
    (selectedOption: SingleValue<SelectOption>) => {
      setDetail((prev) => ({
        ...prev,
        channelPartner: selectedOption,
      }));
    },
    []
  );


  return (
    <div className={styles.container}>
      <div className={styles.maincontainer}>
        <div className={styles.headline}>Client Tagging Form</div>
        <div className={styles.mainlable}>Client Details</div>
        <div className={styles.infocard}>
          <div className={styles.card}>
            <div className={styles.formControl}>
              <label htmlFor="select">
                <FaStar /> Lead Type
              </label>
              <select
                value={detail.leadType}
                name="leadType"
                id="select"
                onChange={onChangeField}
              >
                <option value="cp">CP</option>
                <option value="walk-in">Walk-in</option>
                <option value="internal-lead">Internal-lead</option>
              </select>
            </div>
            <div className={styles.formControl}>
              <label htmlFor="email">
                <MdOutlineEmail className={styles.icon} /> Email
              </label>
              <input
                value={detail.email}
                name="email"
                type="email"
                id="email"
                onChange={onChangeField}
              />
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.formControl}>
              <label htmlFor="firstname">
                <IoPersonOutline className={styles.icon} />
                Client First Name
              </label>
              <input
                id="firstname"
                type="text"
                value={detail.firstName}
                name="firstName"
                onChange={onChangeField}
              />
            </div>
            <div className={styles.formControl}>
              <label htmlFor="lastname">
                <IoPersonOutline className={styles.icon} />
                Client Last Name
              </label>
              <input
                type="text"
                id="lastname"
                value={detail.lastName}
                name="lastName"
                onChange={onChangeField}
              />
            </div>
          </div>
          <div className={styles.card}>
            <div
              className={styles.formControl}
              onClick={() => tagdateRef.current?.showPicker()}
            >
              <label htmlFor="taggeddate">
                <IoIosCalendar className={styles.icon} /> Tagged Date
              </label>
              <input
                ref={tagdateRef}
                id="taggeddate"
                value={startDate}
                onChange={onChangeStartDate}
                type="date"
              />
            </div>
            <div
              className={styles.formControl}
              onClick={() => validTillRef.current?.showPicker()}
            >
              <label htmlFor="validtill">
                <IoMdCalendar className={styles.icon} /> Valid Till
              </label>
              <input
                type="date"
                ref={validTillRef}
                id="validtill"
                value={validTill}
                disabled
              />
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.formControl}>
              <label htmlFor="phone">
                <MdOutlinePhoneInTalk className={styles.icon} /> Client Phone
                Number *
              </label>
              <input
                id="phone"
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                value={detail.phoneNumber}
                name="phoneNumber"
                onChange={handlePhoneChange}
                placeholder="Enter 10-digit phone number"
                maxLength={10}
                className={styles.phoneInput}
              />
            </div>
            <div className={styles.formControl}>
              <label htmlFor="alterphone">
                <MdLocalPhone className={styles.icon} /> Alternate Phone Number
              </label>
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                id="alterphone"
                value={detail.altPhoneNumber}
                name="altPhoneNumber"
                onChange={handlePhoneChange}
                placeholder="Enter 10-digit phone number"
                maxLength={10}
                className={styles.phoneInput}
              />
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.formControl}>
              {projectOptions.length > 0 ? (
                <>
                  <label htmlFor="selectproject">
                    <BsBuildingFill className={styles.icon} /> Projects
                  </label>
                  <Select
                    id="projects"
                    isMulti
                    name="projects"
                    options={projectOptions || []}
                    value={detail.project}
                    onChange={handleProjectsChange}
                    placeholder="Select projects..."
                    classNamePrefix="react-select"
                    closeMenuOnSelect={false}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
            <div className={styles.formControl}>
              {apartmentOptions.length ? (
                <>
                  <label htmlFor="requirement">
                    <BsBuildingFill className={styles.icon} /> Requirements
                  </label>
                  <Select
                    id="requirements"
                    isMulti
                    options={apartmentOptions || []}
                    value={detail.requirements}
                    onChange={handleRequirementsChange}
                    placeholder="Select apartments..."
                    classNamePrefix="react-select"
                    closeMenuOnSelect={false}
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className={styles.card}>
            <div className={styles.formControl}>
              <label htmlFor="address">
                <IoLocation className={styles.icon} /> Client Address
              </label>
              <textarea
                id="address"
                rows={3}
                value={detail.address}
                name="address"
                onChange={onChangeField}
              />
            </div>
            <div className={styles.formControl}>
              <label htmlFor="remark">
                <LuNotebookPen className={styles.icon} /> Remarks
              </label>
              <textarea
                id="remark"
                rows={3}
                value={detail.remark}
                name="remark"
                onChange={onChangeField}
              />
            </div>
          </div>
        </div>
        <div className={styles.cpheadline}>Channel Partner Details</div>
        <div className={styles.clientdetails}>
          <div className={styles.card}>
            <div className={styles.formControl}>
              {channelPartnerOptions.length > 0 ? (
                <>
                  <label htmlFor="cpname">
                    <IoPersonOutline className={styles.icon} /> Channel Partner
                  </label>
                  <Select
                    id="channelPartner"
                    name="channelPartner"
                    options={channelPartnerOptions || []}
                    value={detail.channelPartner}
                    onChange={handleChannelPartnerChange}
                    placeholder="Select Channel Partner..."
                    classNamePrefix="react-select"
                    closeMenuOnSelect={true}
                    isClearable
                  />
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
        <div className={styles.confirm}>
          Confirm Details
          <label className={styles.switch}>
            <input
              type="checkbox"
              checked={iConfirm}
              onChange={(e) => {
                setIConfirm(e.target.checked);
              }}
            />
            <span className={styles.slider}></span>
          </label>
        </div>
        <div className={styles.buttoncontainer}>
          <button className={styles.cancelbtn} onClick={handleCancel}>
            Cancel
          </button>
          <button className={styles.submitbtn} onClick={onSubmit}>
            Submit
          </button>
        </div>
      </div>
      <div className={styles.detailSection}>
        <Image
          src="/images/add-files-concept-illustration.png"
          alt="Client Tagging Illustration"
          width={300}
          height={300}
          quality={100}
          priority
        />
      </div>
    </div>
  );
};

export default TaggingFormSection;
