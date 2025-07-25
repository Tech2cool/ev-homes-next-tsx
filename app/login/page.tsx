"use client";

import type React from "react";
import { useState } from "react";
import styles from "./login.module.css";
import {
  Mail,
  Lock,
  ArrowRight,
  ChromeIcon as Google,
  Github,
  Phone,
  MessageSquareText,
  CalendarCheck,
  CalendarPlus,
  Home,
} from "lucide-react"; // Using Lucide React icons
import { ThemeToggle } from "@/components/ThemeToggle";
import { redirect } from "next/navigation";

const LoginPage = () => {
  const [activeLoginTab, setActiveLoginTab] = useState<"email" | "phone">(
    "email"
  );
  const [emailFormData, setEmailFormData] = useState({
    email: "",
    password: "",
  });
  const [phoneFormData, setPhoneFormData] = useState({
    phone: "",
    otp: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loginMessage, setLoginMessage] = useState<string | null>(null);
  const [otpSent, setOtpSent] = useState(false);

  const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEmailFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPhoneFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginMessage(null);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (
      emailFormData.email === "user@example.com" &&
      emailFormData.password === "password"
    ) {
      setLoginMessage("Login successful! Redirecting...");
      redirect("/dashboard");
      // In a real app, you'd redirect here, e.g., router.push('/dashboard')
    } else {
      setLoginMessage("Invalid email or password.");
    }
    setIsSubmitting(false);
  };

  const handleSendOtp = async () => {
    setIsSubmitting(true);
    setLoginMessage(null);
    setOtpSent(false);

    // Simulate OTP sending
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (phoneFormData.phone) {
      setLoginMessage(`OTP sent to ${phoneFormData.phone}.`);
      setOtpSent(true);
    } else {
      setLoginMessage("Please enter a valid phone number.");
    }
    setIsSubmitting(false);
  };

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginMessage(null);

    // Simulate OTP verification and login
    await new Promise((resolve) => setTimeout(resolve, 2000));

    if (phoneFormData.phone && phoneFormData.otp === "123456") {
      // Example OTP
      setLoginMessage("Login successful! Redirecting...");
      // In a real app, you'd redirect here
    } else {
      setLoginMessage("Invalid OTP or phone number.");
    }
    setIsSubmitting(false);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.themeToggleWrapper}>
        <ThemeToggle />
      </div>

      <div className={styles.mainContentArea}>
        {/* Visual Showcase Section (Left Side - Blending Background) */}
        <div
          className={styles.visualShowcaseSection}
          style={{
            backgroundImage:
              "url('https://cdn.evhomes.tech/9e777ccb-8f63-4c1f-a939-ba279aff71aa-first.jpg')",
          }}
        >
          <h2 className={styles.visualShowcaseTitle}>Your Dream Home Awaits</h2>
          <p className={styles.visualShowcaseSubtitle}>
            Explore exclusive properties and seamless services.
          </p>
          <div className={styles.testimonialCard}>
            <p className={styles.testimonialQuote}>
              {
                '"Finding our dream home was effortless with their platform. The team was incredibly supportive and made the entire process a joy!"'
              }
            </p>
            <p className={styles.testimonialAuthor}>
              - Sarah & John D., Happy Homeowners
            </p>
          </div>
        </div>

        {/* Right Column for Stacked Cards */}
        <div className={styles.rightColumnCards}>
          {/* Login Card (Top Right) */}
          <div className={styles.loginCard}>
            <div className={styles.loginHeader}>
              <h1 className={styles.loginTitle}>Welcome Back!</h1>
              <p className={styles.loginSubtitle}>
                Sign in to your account to continue.
              </p>
            </div>

            <div className={styles.loginTabs}>
              <button
                className={`${styles.tabButton} ${
                  activeLoginTab === "email" ? styles.activeTab : ""
                }`}
                onClick={() => {
                  setActiveLoginTab("email");
                  setLoginMessage(null);
                  setOtpSent(false);
                }}
              >
                <Mail className={styles.tabIcon} /> Email & Password
              </button>
              <button
                className={`${styles.tabButton} ${
                  activeLoginTab === "phone" ? styles.activeTab : ""
                }`}
                onClick={() => {
                  setActiveLoginTab("phone");
                  setLoginMessage(null);
                  setOtpSent(false);
                }}
              >
                <Phone className={styles.tabIcon} /> Phone & OTP
              </button>
            </div>

            {activeLoginTab === "email" && (
              <form className={styles.loginForm} onSubmit={handleEmailSubmit}>
                <div className={styles.inputGroup}>
                  <label htmlFor="email" className={styles.label}>
                    Email Address
                  </label>
                  <div className={styles.inputWithIcon}>
                    <Mail className={styles.inputIcon} />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={emailFormData.email}
                      onChange={handleEmailInputChange}
                      className={styles.input}
                      placeholder="user@example.com"
                      required
                    />
                  </div>
                </div>

                <div className={styles.inputGroup}>
                  <label htmlFor="password" className={styles.label}>
                    Password
                  </label>
                  <div className={styles.inputWithIcon}>
                    <Lock className={styles.inputIcon} />
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={emailFormData.password}
                      onChange={handleEmailInputChange}
                      className={styles.input}
                      placeholder="••••••••"
                      required
                    />
                  </div>
                  <a href="#" className={styles.forgotPasswordLink}>
                    Forgot Password?
                  </a>
                </div>

                {loginMessage && (
                  <p
                    className={`${styles.loginMessage} ${
                      loginMessage.includes("successful")
                        ? styles.success
                        : styles.error
                    }`}
                  >
                    {loginMessage}
                  </p>
                )}

                <button
                  type="submit"
                  className={styles.loginButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className={styles.loadingText}>
                      <span className={styles.spinner}></span>
                      Logging in...
                    </span>
                  ) : (
                    <>
                      Login <ArrowRight className={styles.buttonIcon} />
                    </>
                  )}
                </button>
              </form>
            )}

            {activeLoginTab === "phone" && (
              <form className={styles.loginForm} onSubmit={handlePhoneLogin}>
                <div className={styles.inputGroup}>
                  <label htmlFor="phone" className={styles.label}>
                    Phone Number
                  </label>
                  <div className={styles.inputWithIcon}>
                    <Phone className={styles.inputIcon} />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={phoneFormData.phone}
                      onChange={handlePhoneInputChange}
                      className={styles.input}
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                </div>

                {!otpSent ? (
                  <button
                    type="button"
                    className={styles.loginButton}
                    onClick={handleSendOtp}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className={styles.loadingText}>
                        <span className={styles.spinner}></span>
                        Sending OTP...
                      </span>
                    ) : (
                      <>
                        Send OTP{" "}
                        <MessageSquareText className={styles.buttonIcon} />
                      </>
                    )}
                  </button>
                ) : (
                  <div className={styles.inputGroup}>
                    <label htmlFor="otp" className={styles.label}>
                      Enter OTP
                    </label>
                    <div className={styles.inputWithIcon}>
                      <Lock className={styles.inputIcon} />
                      <input
                        type="text"
                        id="otp"
                        name="otp"
                        value={phoneFormData.otp}
                        onChange={handlePhoneInputChange}
                        className={styles.input}
                        placeholder="••••••"
                        maxLength={6}
                        required
                      />
                    </div>
                    <a href="#" className={styles.forgotPasswordLink}>
                      Resend OTP?
                    </a>
                  </div>
                )}

                {loginMessage && (
                  <p
                    className={`${styles.loginMessage} ${
                      loginMessage.includes("successful")
                        ? styles.success
                        : loginMessage.includes("sent")
                        ? styles.info
                        : styles.error
                    }`}
                  >
                    {loginMessage}
                  </p>
                )}

                {otpSent && (
                  <button
                    type="submit"
                    className={styles.loginButton}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className={styles.loadingText}>
                        <span className={styles.spinner}></span>
                        Verifying...
                      </span>
                    ) : (
                      <>
                        Verify & Login{" "}
                        <ArrowRight className={styles.buttonIcon} />
                      </>
                    )}
                  </button>
                )}
              </form>
            )}

            <div className={styles.divider}>
              <span>OR</span>
            </div>

            <div className={styles.socialLogin}>
              <button className={styles.socialButton}>
                <Google className={styles.socialIcon} />
                Sign in with Google
              </button>
              <button className={styles.socialButton}>
                <Github className={styles.socialIcon} />
                Sign in with GitHub
              </button>
            </div>

            <p className={styles.signupText}>
              Don&apos;t have an account?{" "}
              <a href="#" className={styles.signupLink}>
                Sign Up
              </a>
            </p>
          </div>

          {/* Reliability Section (Bottom Right) */}
          <div className={styles.reliabilitySection}>
            <h2 className={styles.reliabilityTitle}>
              Your Journey Starts Here
            </h2>
            <p className={styles.reliabilitySubtitle}>
              Unlock exclusive features and find your perfect property with
              ease.
            </p>
            <div className={styles.reliabilityGrid}>
              <div className={styles.reliabilityItem}>
                <CalendarCheck className={styles.reliabilityIcon} />
                <h3 className={styles.reliabilityItemTitle}>
                  Instant Site Visit
                </h3>
                <p className={styles.reliabilityItemDescription}>
                  Schedule a personalized visit to your dream property with just
                  a few clicks.
                </p>
              </div>
              <div className={styles.reliabilityItem}>
                <CalendarPlus className={styles.reliabilityIcon} />
                <h3 className={styles.reliabilityItemTitle}>
                  Easy Appointment Booking
                </h3>
                <p className={styles.reliabilityItemDescription}>
                  Book a meeting with our experts to discuss your needs at your
                  convenience.
                </p>
              </div>
              <div className={styles.reliabilityItem}>
                <Home className={styles.reliabilityIcon} />
                <h3 className={styles.reliabilityItemTitle}>
                  Book Your Dream Home
                </h3>
                <p className={styles.reliabilityItemDescription}>
                  Secure your ideal property quickly and effortlessly through
                  our platform.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
