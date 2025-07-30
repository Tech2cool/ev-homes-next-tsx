import styles from "../DashboardUI/Selectsection.module.css"
function Selectsection(){
    return(
        <>
        <div className={styles.mainselect }>
            <p className={styles.SelectHeader}>Select Section</p>
            <div className={styles.selectlinks}>

            <div><a href="#">Overview</a></div>
             <div><a href="#">Reports</a></div>
              <div><a href="#">Tagging</a></div>
               <div><a href="#">Enquiry</a></div>
                <div><a href="#">Inventory</a></div>
                </div>
        </div>
        </>
    )
}
export default Selectsection;