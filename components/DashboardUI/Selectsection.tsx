import styles from "../DashboardUI/Selectsection.module.css"
function Selectsection(){
    return(
        <>
        < div className={styles.mainselect }>
            <p className={styles.SelectHeader}>Select Section</p>
            < div className={styles.selectlinks}>
         <a href="#">Overview</a>
            <a href="#">Reports</a>
             <a href="#">Tagging</a>
               <a href="#">Enquiry</a>
                <div><a href="#">Inventory</a></div>
                
        </div>
        </div>
        </>
    )
}
export default Selectsection;