"use client"
import React, { useEffect } from "react";
import styles from "./../forgotpassword.module.css";
import Lottie from "lottie-react";
import forgotAnimation from "../../../public/assets/password (1).json"
import email from "../../../public/assets/email.json"
import { FiMail } from "react-icons/fi";
import { useState, useRef } from "react";
import { IoMdKey } from "react-icons/io";
import { useRouter } from "next/navigation";
// import animatetwo from "../../../public/assets/animatetwo.json";
function ForgotPassword() {
    const [otpform, setshowotpform] = useState(false);
    const [otp, setotp] = useState(["", "", "", ""]);
    const inputrefs = useRef<(HTMLInputElement | null)[]>([]);
    const [hidden, sethidden] = useState(false);
    const [hideConfirm, setHideConfirm] = useState(false);

    const emailinput = useRef<(HTMLInputElement | null)>(null);
    const [timer, settimer] = useState(120);
    const [isactive, setisactve] = useState(true);


    const router = useRouter();

    const handlePageChnage = () => {
        router.push("/login")
    }






    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const value = e.target.value;
        const newOtp = [...otp];
        newOtp[index] = value;
        setotp(newOtp);

        if (value && index < 3) {
            inputrefs.current[index + 1]?.focus();

        }

    };

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>, fields: "new" | "confirm") => {
        const inputvalue = e.target.value;

        if (fields === "new") {
            sethidden(inputvalue.length > 6);
        }
        else {
            setHideConfirm(inputvalue.length > 6);
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Backspace") {
            e.preventDefault();

            const newOtp = [...otp];


            if (newOtp[index]) {
                newOtp[index] = "";
                setotp(newOtp);
                return;
            }


            if (index > 0) {
                newOtp[index - 1] = "";
                setotp(newOtp);
                inputrefs.current[index - 1]?.focus();
            }
        }
    };


    useEffect(() => {
        let interval: ReturnType<typeof setInterval>;

        if (isactive && timer > 0) {
            interval = setInterval(() => {
                settimer(prev => prev - 1);
            }, 1000);
        } else if (timer === 0) {

            setisactve(false);
        }
        return () => {
            if (interval) clearInterval(interval);
        };
    }, [isactive, timer])



    return (
        <>
            <div className={styles.pagewrapper}>
                <div className={styles.ContentMain}>
                    <div className={styles.BuildingContaier}>
                        <div className={styles.leftcontainer}>
                        </div>

                    </div>
                    <div className={styles.rightside}>

                    </div>

                    {
                        !otpform ? (
                            <div className={`${styles.resetpass} ${otpform ? styles.hide : ""}`}>

                                {/* <img src="/images/evhomeslogo_1.webp" alt="img" className={styles.logoimg} /> */}
                                <h2 className={styles.forgottext}>FORGOT PASSWORD!!</h2>
                                <p className={styles.note}>Enter your registered email address below. <br /> We’ll send you password reset instructions.</p>
                                <div className={styles.inputmain}>
                                    <FiMail className={styles.mailicon} />
                                    <input type="email" placeholder="Enter your email" className={styles.emailInput} ref={emailinput} />

                                </div>
                                <button className={styles.Submitbtn} onClick={() => {
                                    if (!emailinput.current || emailinput.current.value.trim() === "") {
                                        alert("please enter your email before proceding!");
                                        return;

                                    }
                                    setshowotpform(true);
                                }





                                }> Submit</button>


                            </div>

                        ) :
                            <div className={`${styles.otpform} ${styles.fadeIn}`}>
                                <div className={styles.otpAndP}>
                                    <h2 className={styles.otpHeading}>ENTER OTP</h2>
                                    <p className={styles.otpinstrucrtion}>Enter the code from your email and set a new password.</p>
                                </div>
                                <p className={styles.otptimer}>
                                    {isactive ? `wait ${timer} sec...` : "Timer finished!"}
                                </p>



                                <div className={styles.otpinputsmain}>
                                    {otp.map((value, index) => (
                                        <input type="text"
                                            key={index}
                                            value={value}
                                            maxLength={1}
                                            ref={(el) => { (inputrefs.current[index] = el) }}
                                            onChange={(e) => handleChange(e, index)}
                                            onKeyDown={(e) => handleKeyDown(e, index)}
                                            className={styles.otpinput}
                                        />
                                    ))}

                                </div>

                                <button className={styles.ResendOtpbtn}>Resend 0TP</button>
                                <h2 className={styles.resetHeading}>RESET PASSWORD</h2>
                                <div className={styles.passwordinputsmain}>
                                    <div className={styles.newpassowrd}>
                                        <IoMdKey className={styles.keyicon} />
                                        <input type={hidden ? "password" : "text"} placeholder="New Password" onChange={(e) => handlePassword(e, "new")} className={styles.passwordInputs} />
                                    </div>
                                    <div className={styles.setnewpassword}>
                                        <IoMdKey className={styles.keyicontwo} />

                                        <input type={hideConfirm ? "password" : "text"} placeholder="Confirm Password" onChange={(e) => handlePassword(e, "confirm")} className={styles.passwordInputs} />
                                    </div>


                                </div>

                                <button className={styles.Submitpasswordbtn} onClick={handlePageChnage}>SUBMIT</button>


                            </div>
                    }






                </div>

            </div>






        </>
    )
}
export default ForgotPassword