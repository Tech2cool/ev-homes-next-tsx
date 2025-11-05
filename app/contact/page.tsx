// "use client";
// import type React from "react";
// import { useState } from "react";
// import styles from "./contact.module.css";
// import { ThemeToggle } from "@/components/ThemeToggle";

// const ContactPage = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     subject: "",
//     message: "",
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submissionStatus, setSubmissionStatus] = useState<string | null>(null);

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setSubmissionStatus(null); // Clear previous status

//     // Simulate form submission
//     await new Promise((resolve) => setTimeout(resolve, 2000));

//     console.log("Form submitted:", formData);
//     setSubmissionStatus("Message sent successfully!"); // Set success message
//     setIsSubmitting(false);

//     // Reset form after a short delay to show success message
//     setTimeout(() => {
//       setFormData({
//         name: "",
//         email: "",
//         phone: "",
//         subject: "",
//         message: "",
//       });
//       setSubmissionStatus(null); // Clear status after reset
//     }, 3000);
//   };

//   return (
//     <div className={styles.contactContainer}>
//       {/* Theme Toggle */}
//       <div className={styles.themeToggleWrapper}>
//         <ThemeToggle />
//       </div>

//       {/* Hero Section */}
//       <section className={styles.heroSection}>
//         <div className={styles.heroContent}>
//           <div className={styles.heroText}>
//             <h1 className={styles.heroTitle}>
//               Let&apos;s Start a{" "}
//               <span className={styles.highlight}></span>
//             </h1>
//             <p className={styles.heroSubtitle}>
//               We&apos;re here to help bring your vision to life. Reach out and
//               let&apos;s discuss your next project.
//             </p>
//           </div>
//           <div className={styles.heroGraphic}>
//             <div
//               className={styles.floatingCard}
//               onClick={() =>
//                 (window.location.href =
//                   "mailto:evhomes.operations@evgroup.co.in?subject=General Inquiry")
//               }
//             >
//               <div className={styles.cardIcon}>💬</div>
//               <div className={styles.cardText}>Chat with us</div>
//             </div>
//             <div
//               className={styles.floatingCard}
//               onClick={() =>
//                 (window.location.href =
//                   "mailto:deepak@evgroup.co.in?subject=Support Request")
//               }
//             >
//               <div className={styles.cardIcon}>📧</div>
//               <div className={styles.cardText}>Send an email</div>
//             </div>
//             <div
//               className={styles.floatingCard}
//               onClick={() => (window.location.href = "tel:+918291668777")}
//             >
//               <div className={styles.cardIcon}>📞</div>
//               <div className={styles.cardText}>Give us a call</div>
//             </div>
//           </div>
//         </div>
//         <div className={styles.heroBackground}>
//           <div className={styles.gradientOrb}></div>
//           <div className={styles.gradientOrb}></div>
//         </div>
//       </section>

//       {/* Main Content */}
//       <section className={styles.mainContent}>
//         <div className={styles.contentWrapper}>
//           {/* Contact Form */}
//           <div className={styles.formSection}>
//             <div className={styles.formHeader}>
//               <h2 className={styles.formTitle}>Send us a Message</h2>
//               <p className={styles.formSubtitle}>
//                 Fill out the form below and we&apos;ll get back to you within 24
//                 hours.
//               </p>
//             </div>

//             <form className={styles.contactForm} onSubmit={handleSubmit}>
//               <div className={styles.formRow}>
//                 <div className={styles.inputGroup}>
//                   <label className={styles.label}>Full Name</label>
//                   <input
//                     type="text"
//                     name="name"
//                     value={formData.name}
//                     onChange={handleInputChange}
//                     className={styles.input}
//                     placeholder="Enter your full name"
//                     required
//                   />
//                 </div>
//                 <div className={styles.inputGroup}>
//                   <label className={styles.label}>Email Address</label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className={styles.input}
//                     placeholder="Enter your email"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className={styles.formRow}>
//                 <div className={styles.inputGroup}>
//                   <label className={styles.label}>Phone Number</label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleInputChange}
//                     className={styles.input}
//                     placeholder="Enter your phone number"
//                   />
//                 </div>
//                 <div className={styles.inputGroup}>
//                   <label className={styles.label}>Subject</label>
//                   <input
//                     type="text"
//                     name="subject"
//                     value={formData.subject}
//                     onChange={handleInputChange}
//                     className={styles.input}
//                     placeholder="What's this about?"
//                     required
//                   />
//                 </div>
//               </div>

//               <div className={styles.inputGroup}>
//                 <label className={styles.label}>Message</label>
//                 <textarea
//                   name="message"
//                   value={formData.message}
//                   onChange={handleInputChange}
//                   className={styles.textarea}
//                   placeholder="Tell us more about your project or inquiry..."
//                   rows={6}
//                   required
//                 ></textarea>
//               </div>

//               <div className={styles.formActions}>
//                 {submissionStatus && (
//                   <p className={styles.submissionStatus}>{submissionStatus}</p>
//                 )}
//                 <button
//                   type="submit"
//                   className={styles.submitButton}
//                   disabled={isSubmitting}
//                 >
//                   {isSubmitting ? (
//                     <span className={styles.loadingText}>
//                       <span className={styles.spinner}></span>
//                       Sending...
//                     </span>
//                   ) : (
//                     "Send Message"
//                   )}
//                 </button>
//               </div>
//             </form>
//           </div>

//           {/* Contact Information */}
//           <div className={styles.infoSection}>
//             <div className={styles.infoCard}>
//               <h3 className={styles.infoTitle}>Get in Touch</h3>
//               <p className={styles.infoDescription}>
//                 Ready to start your next project? We&apos;re here to help you
//                 every step of the way.
//               </p>

//               <div className={styles.contactMethods}>
//                 <div className={styles.contactMethod}>
//                   <div className={styles.methodIcon}>📍</div>
//                   <div className={styles.methodContent}>
//                     <h4 className={styles.methodTitle}>Visit Our Office</h4>
//                     <p className={styles.methodText}>
//                       201, 201-A, 211,212, Vardhman Chambers
//                       <br />
//                       A-Wing, Sector-17, Vashi
//                       <br />
//                       Navi Mumbai - 400703
//                     </p>
//                   </div>
//                 </div>

//                 <div className={styles.contactMethod}>
//                   <div className={styles.methodIcon}>📞</div>
//                   <div className={styles.methodContent}>
//                     <h4 className={styles.methodTitle}>Call Us</h4>
//                     <p className={styles.methodText}>
//                       +91 22 27890 389
//                       <br />
//                       +91 22 27890 354
//                       <br />
//                       +91 98209 04400
//                     </p>
//                   </div>
//                 </div>

//                 <div className={styles.contactMethod}>
//                   <div className={styles.methodIcon}>✉️</div>
//                   <div className={styles.methodContent}>
//                     <h4 className={styles.methodTitle}>Email Us</h4>
//                     <p className={styles.methodText}>
//                       evhomes.operations@evgroup.co.in
//                       <br />
//                       deepak@evgroup.co.in
//                     </p>
//                   </div>
//                 </div>

//                 <div className={styles.contactMethod}>
//                   <div className={styles.methodIcon}>🕒</div>
//                   <div className={styles.methodContent}>
//                     <h4 className={styles.methodTitle}>Business Hours</h4>
//                     <p className={styles.methodText}>
//                       Monday - Friday: 10:00 AM - 10:00 PM
//                       <br />
//                       Saturday: 10:00 AM - 10:00 PM
//                       <br />
//                       Sunday: 10:00 AM - 10:00 PM
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Stats Card */}
//             <div className={styles.statsCard}>
//               <h3 className={styles.statsTitle}>Why Choose Us?</h3>
//               <div className={styles.statsGrid}>
//                 <div className={styles.statItem}>
//                   <div className={styles.statNumber}>500+</div>
//                   <div className={styles.statLabel}>Happy Clients</div>
//                 </div>
//                 <div className={styles.statItem}>
//                   <div className={styles.statNumber}>27+</div>
//                   <div className={styles.statLabel}>Projects</div>
//                 </div>
//                 <div className={styles.statItem}>
//                   <div className={styles.statNumber}>30+</div>
//                   <div className={styles.statLabel}>Years</div>
//                 </div>
//                 <div className={styles.statItem}>
//                   <div className={styles.statNumber}>24/7</div>
//                   <div className={styles.statLabel}>Support</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Map Section */}
//       <section className={styles.mapSection}>
//         <div className={styles.mapHeader}>
//           <h2 className={styles.mapTitle}>Find Us on the Map</h2>
//           <p className={styles.mapSubtitle}>
//             Visit our headquarters or find us on Google Maps.
//           </p>
//         </div>
//         <div className={styles.mapContainer}>
//           <iframe
//             title="Kohinoor Location"
//             src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d120668.05003740653!2d72.999586!3d19.069164!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c1495dbe19e9%3A0xefa01ea4da6478f2!2sE.v%20Homes!5e0!3m2!1sen!2sus!4v1749801473349!5m2!1sen!2sus"
//             className={styles.mapIframe}
//             allowFullScreen={true}
//             loading="lazy"
//             referrerPolicy="no-referrer-when-downgrade"
//           ></iframe>
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className={styles.faqSection}>
//         <div className={styles.faqContainer}>
//           <h2 className={styles.faqTitle}>Frequently Asked Questions</h2>
//           <div className={styles.faqGrid}>
//             <div className={styles.faqItem}>
//               <h3 className={styles.faqQuestion}>
//                 How quickly do you respond?
//               </h3>
//               <p className={styles.faqAnswer}>
//                 We typically respond to all inquiries within 24 hours during
//                 business days.
//               </p>
//             </div>
//             <div className={styles.faqItem}>
//               <h3 className={styles.faqQuestion}>
//                 Do you offer consultations?
//               </h3>
//               <p className={styles.faqAnswer}>
//                 Yes! We offer free initial consultations to discuss your project
//                 requirements.
//               </p>
//             </div>
//             <div className={styles.faqItem}>
//               <h3 className={styles.faqQuestion}>
//                 What information should I include?
//               </h3>
//               <p className={styles.faqAnswer}>
//                 Please include project details, timeline, budget range, and any
//                 specific requirements.
//               </p>
//             </div>
//             <div className={styles.faqItem}>
//               <h3 className={styles.faqQuestion}>
//                 Can I schedule a site visit?
//               </h3>
//               <p className={styles.faqAnswer}>
//                 Contact us to schedule a convenient time for a site visit.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default ContactPage;


"use client";

import { FaFacebookF, FaGoogle, FaInstagram, FaLinkedinIn, FaTwitter, FaYoutube } from "react-icons/fa6";
import Navbar from "../../components/home-components/HomeNavbar";
import styles from "./contact.module.css"
import Contact from "@/components/home-components/Contact";
import { IoLogoYoutube } from "react-icons/io5";
const ContactPage = () => {




  return (
    <>
      <Navbar />
      <div className={styles.contcontainer}>
        <section className={styles.mapSection}>

          <div className={styles.mapContainer}>
            <iframe
              title="Kohinoor Location"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d120668.05003740653!2d72.999586!3d19.069164!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c1495dbe19e9%3A0xefa01ea4da6478f2!2sE.v%20Homes!5e0!3m2!1sen!2sus!4v1749801473349!5m2!1sen!2sus"
              className={styles.mapIframe}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

          </div>
        </section>
       
        <div className={styles.secrow}>
          <div className={styles.nextcont}>
            <div className={styles.contact}>

              <div className={styles.headline}>
                <h3>EV Homes</h3>
                <div className={styles.compan}>Vardhman Chambers,A-Wing, Sector- 17, Vashi Navi Mumbai.</div>

                <div className={styles.social}  >
                  <a href="https://www.facebook.com/people/EV-Homes/100083195565500/" rel="noopener"><FaFacebookF /></a>
                  <a href="https://www.youtube.com/channel/UC1Ww0vrG5vSQprMtGxKXCIw" rel="noopener"><IoLogoYoutube   /></a>
                    <a href="https://evgroup.in" rel="noopener"><FaGoogle /></a>
                  <a href="https://in.linkedin.com/company/ev-homes" rel="noopener"><FaLinkedinIn /> </a>
                  <a href="https://www.instagram.com/evhomesofficial/?hl=en" rel="noopener"><FaInstagram />
                  </a>
                </div>

                <div className={styles.detail}><span>Phone:</span><a href="">+91 2227890389</a></div>
                <div className={styles.detail}><span>Mobile:</span> <a href="">+91 27890354</a></div>
                <div className={styles.detail}><span>Email:</span> <a href="mailto: info@evgroup.in "> info@evgroup.in </a></div>
              </div>

              <div className={styles.pragraf}>
                <p>EV Group to one of India's Leading and Fast Growing Engineering and Real Estate Company. To a Team of Entrepreneurs, focused on Quality and an excellent. Return on Investment. The Group has ideally positioned itself as a market leader in identifying and executing projects with realistic valuations, thus always performing above the market average.</p>
                <p>The Group has a diverse portfolio of Engineering and Real Estate assets under its management. The portfolio is also geographically diversified with a Pan India presence in Tier II & Tier III cities of Bangalore, Cochin & N.Mumbai and Globally focused on the Middle East market.</p>
              </div>



            </div>
            <div className={styles.form}>
              <h2 className={styles.heading}>Enquiry Form</h2>

              <form className={styles.formInner}>
                <div className={styles.formrow}>
                  <label className={styles.label}>Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formrow}>
                  <label className={styles.label}>Phone</label>
                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className={styles.input}
                  />
                </div>

                <div className={styles.formrow}>
                  <label className={styles.label}>Message</label>
                  <textarea
                   
                    placeholder="Write your message..."
                    className={styles.textarea}
                  ></textarea>

                </div>

                <button type="submit" className={styles.button}>
                  Submit Enquiry
                </button>
              </form>
            </div>

          </div>
        </div>
        <Contact />
      </div>



    </>


  );
};

export default ContactPage;
