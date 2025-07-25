import React from "react";
import styles from "./contact.module.css";
import stylesPro from "./contact.module.css";
import Image from "next/image";
import { useTheme } from "next-themes";
// import { useRouter } from "next/router";
const projectInfo: OurProject[] = [
  {
    _id: "project-ev23-malibu-west-koparkhairne-2024",
    name: "EV 23 Malibu West",
    description:
      "Welcome to EV 23 Malibu West 🌴✨\nUltra-Luxury Living Inspired by Malibu, California\n\nDeveloped by EV Homes Construction Pvt Ltd, a name synonymous with quality and innovation, EV 23 Malibu West is an ultra-luxury residential project located in Kopar Khairane Sector 23, Navi Mumbai. Inspired by the opulent beachfront lifestyle of Malibu, California, this development offers a range of 2 BHK and 3 BHK sea-facing residences designed to provide both comfort and elegance. Each home is thoughtfully crafted to offer breathtaking sea views and a peaceful living experience.\n\n🌟 World-Class Amenities\nAt EV 23 Malibu West, we believe in offering more than just a home – it’s a lifestyle. The project features a range of curated amenities for residents:\n\n🏊 Zuma 23 – An infinity pool with stunning sea views, perfect for relaxation.\n🌌 Crystal Venue 23 – Kopar Khairane’s first sky banquet hall for special events.\n⚽ Sky Arena 23 – A rooftop sports turf for sports enthusiasts.\n🛝 23 Play Land – A vibrant, specially designed kids’ play area.\n🧘‍♀️ Dhyana Center 23 – A tranquil sea-facing meditation center.\n🏃‍♂️ Dash 23 – A jogging track for fitness lovers.\n🏋️ Titan 23 – A fully equipped gym for your health goals.\n📍 Prime Location\nSituated in Kopar Khairane Sector 23, this project offers easy access to key locations such as:\n\n🛒 Local Market & D-Mart for daily essentials.\n🏥 Hospitals for your healthcare needs.\n🏫 Christ Academy for quality education.\n🚆 Kopar Khairane Railway Station for seamless connectivity.\nWith prices starting from ₹2.09 Crores (All Inclusive), EV 23 Malibu West is the perfect place to experience a life of luxury, elegance, and convenience.\n\n📞 Contact us today to book your viewing appointment!\n\n🌴 EV 23 Malibu West – Where Dreams Meet Reality. 🌟",
    showCaseImage:
      "https://cdn.evhomes.tech/443bf3d3-bfe5-4df3-87be-0e112c8fc64c-malibu_showcase.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6IjQ0M2JmM2QzLWJmZTUtNGRmMy04N2JlLTBlMTEyYzhmYzY0Yy1tYWxpYnVfc2hvd2Nhc2UuanBlZyIsImlhdCI6MTczNzM2MjU1MX0.EIxd0mt7cmz3mOEcR6ncHMm2qClQzCAUMAF3YnJxIQY",
    carouselImages: [
      "https://cdn.evhomes.tech/d9445019-76eb-4b18-bbe0-639007906396-malibu carousel (1).jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6ImQ5NDQ1MDE5LTc2ZWItNGIxOC1iYmUwLTYzOTAwNzkwNjM5Ni1tYWxpYnUgY2Fyb3VzZWwgKDEpLmpwZyIsImlhdCI6MTczNzQ2MDg2M30.unL5N-",
      "https://cdn.evhomes.tech/fee7b374-9377-4a78-b201-8eb2447e7c99-malibu_view_1.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6ImZlZTdiMzc0LTkzNzctNGE3OC1iMjAxLThlYjI0NDdlN2M5OS1tYWxpYnVfdmlld18xLmpwZyIsImlhdCI6MTczNzM2Nzk4Nn0.X9AYcaPG5gkkSXlBeEwrWr6Ip7BStJoZNmGkhme98OA",
      "https://cdn.evhomes.tech/f0e929ab-2ae6-47c2-ad5a-b7903a836418-malibu carousel (3).jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6ImYwZTkyOWFiLTJhZTYtNDdjMi1hZDVhLWI3OTAzYTgzNjQxOC1tYWxpYnUgY2Fyb3VzZWwgKDMpLmpwZyIsImlhdCI6MTczNzQ2MTAzM30.1tPmgu1rNoFMyWrk4YdJVJ3PwtULqmiZQZQsr-SCnH8",
    ],
    contactNumber: null,
    countryCode: "+91",
    locationLink: "https://maps.app.goo.gl/da19zbC6vEEaSnXG9",
    locationName: "Koparkhairne",
    brochure:
      "https://cdn.evhomes.tech/1ae2cc95-d5a1-4043-b1e1-9e93f057bbcb-Malibu West (Vasundra) Digital Brochure.pdf?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6IjFhZTJjYzk1LWQ1YTEtNDA0My1iMWUxLTllOTNmMDU3YmJjYi1NYWxpYnUgV2VzdCAoVmFzdW5kcmEpIERpZ2l0YWwgQnJvY2h1cmUucGRmIiwiaWF0IjoxNzM3NDYwMzI3fQ.cyMRQBW1PWpKZ1SS3S5KejZIs3BIjwQacCEQ5Np0fvw",

    amenities: [
      {
        image:
          "https://cdn.evhomes.tech/9df5f5cf-e066-4b60-aefb-8092665bca97-1000026259.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6IjlkZjVmNWNmLWUwNjYtNGI2MC1hZWZiLTgwOTI2NjViY2E5Ny0xMDAwMDI2MjU5LnBuZyIsImlhdCI6MTczNDMzODI1OX0.1lZ-jI5z4gNoPu5oFOmVp24eRU1r31UgFzdbJRnfPqo",
        name: "Swimming ",
        _id: "675fe6d4e376fc409d7ee62f",
      },
      {
        image:
          "https://cdn.evhomes.tech/0a187d48-d2d4-44d9-bae0-110091acb4e7-malibu_gym.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6IjBhMTg3ZDQ4LWQyZDQtNDRkOS1iYWUwLTExMDA5MWFjYjRlNy1tYWxpYnVfZ3ltLmpwZyIsImlhdCI6MTczNzQ2MTM2MH0.asQ6Gu_7Xlo_CvYyYDR7GAnQW5Yaq2e_CkOuitT3NDM",
        name: "Gym",
        _id: "675fe6d4e376fc409d7ee630",
      },
      {
        image:
          "https://cdn.evhomes.tech/27b06e14-60f3-4d44-8826-0c66bd3e6298-malibu_banquet.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6IjI3YjA2ZTE0LTYwZjMtNGQ0NC04ODI2LTBjNjZiZDNlNjI5OC1tYWxpYnVfYmFucXVldC5qcGciLCJpYXQiOjE3Mzc0NjE0ODZ9.RWbVwdoyaKErzWB7Oj3AgGVZafb3mBT4cauAZsKCB9M",
        name: "Banquet ",
        _id: "675fe6d4e376fc409d7ee631",
      },
      {
        image:
          "https://cdn.evhomes.tech/b98ec853-d71a-4ba8-ba68-96da7789f427-malibu_meditation.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6ImI5OGVjODUzLWQ3MWEtNGJhOC1iYTY4LTk2ZGE3Nzg5ZjQyNy1tYWxpYnVfbWVkaXRhdGlvbi5qcGciLCJpYXQiOjE3Mzc0NjE0MDh9.PGueXh0TvajU-7DL2WwcHrkgIX558SQkP1qSBPWrCcY",
        name: "Meditation ",
        _id: "675fe6d4e376fc409d7ee632",
      },
      {
        image:
          "https://cdn.evhomes.tech/e018da56-d039-46b8-82f5-e6b893464849-1000026256.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6ImUwMThkYTU2LWQwMzktNDZiOC04MmY1LWU2Yjg5MzQ2NDg0OS0xMDAwMDI2MjU2LnBuZyIsImlhdCI6MTczNDMzODI1OX0.itIkOttAQaP-YOaSgE3zYzKX-yAe8KJianO2VWRK3QQ",
        name: "Jogging Track",
        _id: "675fe6d4e376fc409d7ee633",
      },
      {
        image:
          "https://cdn.evhomes.tech/edadb358-b42d-41a2-bdf8-1a943dbfdff0-malibu_kids.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6ImVkYWRiMzU4LWI0MmQtNDFhMi1iZGY4LTFhOTQzZGJmZGZmMC1tYWxpYnVfa2lkcy5qcGciLCJpYXQiOjE3Mzc0NjE0Mzl9.FfgSj7oBffbtAwnO3SXoQtxiLUO9YfDyJmlDz0-Nlcc",
        name: "Kids Play Area",
        _id: "675fe6d4e376fc409d7ee634",
      },
    ],
    configurations: [
      {
        carpetArea: "674 sq.ft",
        configuration: "2 BHK",
        image:
          "http://cdn.evhomes.tech/f952646b-0447-40e6-9486-5254ff1f4a93-1000025259.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6ImY5NTI2NDZiLTA0NDctNDBlNi05NDg2LTUyNTRmZjFmNGE5My0xMDAwMDI1MjU5LnBuZyIsImlhdCI6MTczNDMzODI1OX0.Tckb7T2WFHzXasnQwGjdkZn4JTXabsEpJqFX-eYctaA",
        price: "20000000",
        reraId: "P51700078094",
      },
      {
        carpetArea: "809 sq.ft",
        configuration: "3 BHK",
        image:
          "http://cdn.evhomes.tech/f952646b-0447-40e6-9486-5254ff1f4a93-1000025259.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6ImY5NTI2NDZiLTA0NDctNDBlNi05NDg2LTUyNTRmZjFmNGE5My0xMDAwMDI1MjU5LnBuZyIsImlhdCI6MTczNDMzODI1OX0.Tckb7T2WFHzXasnQwGjdkZn4JTXabsEpJqFX-eYctaA",
        price: "23000000",
        reraId: "P51700078094",
      },
      {
        carpetArea: "871 sq.ft",
        configuration: "3 BHK",
        image:
          "http://cdn.evhomes.tech/f952646b-0447-40e6-9486-5254ff1f4a93-1000025259.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6ImY5NTI2NDZiLTA0NDctNDBlNi05NDg2LTUyNTRmZjFmNGE5My0xMDAwMDI1MjU5LnBuZyIsImlhdCI6MTczNDMzODI1OX0.Tckb7T2WFHzXasnQwGjdkZn4JTXabsEpJqFX-eYctaA",
        price: "25000000",
        reraId: "P51700078094",
      },
    ],

    logo: "https://cdn.evhomes.tech/6e1e0618-cb62-4ff0-afec-8cbd435c478e-New%20shortcut.lnk.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6IjZlMWUwNjE4LWNiNjItNGZmMC1hZmVjLThjYmQ0MzVjNDc4ZS1OZXcgc2hvcnRjdXQubG5rLnBuZyIsImlhdCI6MTczNzM1ODc2NH0.ZrgFVOxTco7ihF9qhVreZNzxQnHcz68OGUFegKNq78o",
    shareLink: "https://evgroup.in/home.html",
    address:
      "Plot No.6 sector 23, sai baba rd., kopar khairane, Navi Mumbai-400709",
    shortCode: "EV-23",
    showCaseImageLandscape:
      "https://cdn.evhomes.tech/05e35771-5741-4918-ad11-86b4a731a466-malibu_west.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6IjA1ZTM1NzcxLTU3NDEtNDkxOC1hZDExLTg2YjRhNzMxYTQ2Ni1tYWxpYnVfd2VzdC5qcGciLCJpYXQiOjE3NDQyNjk1MjB9.zuWDVMMWvoGdmtIOkoe-UyTFivbFAA7p7t-lygizA0g",
  },
];
 

const Contact = () => {
  //   const router = useRouter();
const{ theme} = useTheme();
const bottomline=
theme==="dark"
?"/images/design1.png"
:"/images/designlight.png"
  return (
    <div id="contact" className={styles.contactUs}>
      <div className={stylesPro.footerSection}>
        <div className={stylesPro.designWrapper}>
          <Image
            src={bottomline}
            alt="Design"
            fill
            priority
            quality={75}
          />
        </div>
        <div className={stylesPro.lineWithLogo}>
          <div className={stylesPro.leftLine}></div>
          <div className={stylesPro.logoWrapper}>
            <Image
              src={"/images/evhomeslogo_1.webp"}
              alt="Logo"
              fill
              priority
              quality={75}
            />
          </div>
          <div className={stylesPro.rightLine}></div>
        </div>
      </div>
      <div className={stylesPro.mainFooter}>
        <div className={stylesPro.quicklinks}>
          <div className={stylesPro.head}>QUICK LINKS</div>
          <div
          //   onClick={() => router.push("/")}
          >
            HOME
          </div>
          <div
          //   onClick={() => router.push("/project-showcase")}
          >
            PROJECTS
          </div>
          <div
          //   onClick={() => router.push("/project-contact-us")}
          >
            CONTACT US
          </div>
          <div
          //    onClick={() => router.push("/watch")}
          >
            VIDEOS
          </div>
        </div>

        <div className={stylesPro.addressSection}>
          <div className={stylesPro.head}>CONTACT</div>
          <div>MUMBAI</div>
          <div>
            211&212, Vardhaman Chambers A Wing Plot No.84, Sector - 17 Vashi,
            Navi Mumbai - 400 703.
          </div>
          <div>Tel: +91 98209 04400</div>
        </div>
        <div className={stylesPro.projectsName}>
          <div className={stylesPro.head}>PROJECTS</div>
          {projectInfo.map((project) => (
            <div key={project._id}>
              <a href={`/project/${project._id}`}>{project.name}</a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
