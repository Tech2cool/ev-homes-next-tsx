import React from "react";
import styles from "./enquirie.module.css";
import { MdOutlineFeedback, MdPhone } from "react-icons/md";
import { IoIosPerson, IoMdPerson } from "react-icons/io";
import { BsPersonVcard } from "react-icons/bs";

const filteredData = [
  {
    ChannelPartner: "Balaji Properties",
    clientname: "Rohi Sing",
    teamleader: "Deepak Karki",
    Phone: "9876543210",
    enquairy: "Please send proper feedback",
  },
  {
    ChannelPartner: "Amol",
    clientname: "Priti Arora",
    teamleader: "Vicky Mane",
    Phone: "9586324756",
    enquairy: "Need detailed response",
  },
  {
    ChannelPartner: "Balaji",
    clientname: "Kajal Deshmukh",
    teamleader: "Jasprit Arora",
    Phone: "9586324756",
    enquairy: "Follow up required",
  },
  {
    ChannelPartner: "Akta",
    clientname: "Raj Maske",
    teamleader: "Deepak Karki",
    Phone: "9586324756",
    enquairy: "Please provide timeline",
  },
];

const EnquiriesSection = () => {
  return (
    <div className={styles.maincontainer}>
      <div></div>
      <div className={styles.leaveSection}>
        <div className={styles.tableContainer}>
          <div className={styles.topBar}></div>
          <table className={styles.leaveTable}>
            <thead>
              <tr>
                <th>
                  <span>
                    <IoMdPerson /> Channel Partner
                  </span>
                </th>
                <th>
                  <span>
                    <BsPersonVcard /> Client Name
                  </span>
                </th>
                <th>
                  <span>
                    <IoIosPerson /> Team Leader
                  </span>
                </th>
                <th>
                  <span>
                    <MdPhone /> Phone Number
                  </span>
                </th>
                <th>
                  <span>
                    <MdOutlineFeedback /> Enquiry
                  </span>
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredData.map((enquiry, index) => (
                <tr key={index}>
                  <td>{enquiry.ChannelPartner}</td>
                  <td>{enquiry.clientname}</td>
                  <td>{enquiry.teamleader}</td>
                  <td>{enquiry.Phone}</td>
                  <td>{enquiry.enquairy}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EnquiriesSection;
