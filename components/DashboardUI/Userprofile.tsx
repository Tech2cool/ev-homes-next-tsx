import React from "react";
import styles from "./Userprofile.module.css";
import { MdAccountCircle } from "react-icons/md";
import { FaIdCard } from "react-icons/fa";

function Userprofile() {
  return (
    <div className={styles.userglobal}>
      <div className={styles.userpro}>
        <MdAccountCircle className={styles.usericon} />

        <div className={styles.userinfo}>
          <p className={styles.user}>testing user 2</p>
          <div className={styles.role}>
            <FaIdCard color="#f1c40f" size={20}  className={styles.MobileRoleIcon}/>
            <span>Sourcing <br className={styles.MobileBreakOne}/> Manager</span>
          </div>
        </div>

        <div className={styles.toggedinfo}>
          <button className={styles.userbutton}>Add Client Tagging</button>

          <div className={styles.usertog}>
            <p className={styles.FirstUserTog}>
              Leads Tagged <br className={styles.MobileBreakTwo}/> Today  <span className={styles.arrow}>↑ <br  className={styles.MobileBreakThree}/> 22</span>
            </p>
            <h3 className={styles.number}>142</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Userprofile;
