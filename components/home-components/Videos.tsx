import React, { useEffect, useRef, useState } from "react";
import styles from "./videos.module.css";
import Image from "next/image";
import { useData } from "@/providers/dataContext";
// const testimonials: Testimonial[] = [
//   {
//     _id: "684bf08fc826636ba0ba092e",
//     title: "Ahire EV Homes 9 Square Vashi Testimonial ",
//     description: null,
//     like: 3,
//     dislike: 0,
//     videoUrl: "https://cdn.evhomes.tech/hls/vijay_ahire/vijay_ahire_1.m3u8",
//     thumbnail:
//       "https://cdn.evhomes.tech/811f5f2f-bebb-4f03-964f-62f5440190b3-Ahire.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6IjgxMWY1ZjJmLWJlYmItNGYwMy05NjRmLTYyZjU0NDAxOTBiMy1BaGlyZS5wbmciLCJpYXQiOjE3MzczODAwNDF9.4OdG05_IpehTlI9FT8H_H8dNErAt5sPdP1dicH-tbR8",
//     shareLink: null,
//     project: "project-ev-9-square-vashi-sector-9",
//     date: "2025-06-13T09:34:07.286Z",
//     // comments: [],
//     views: 34,
//   },
//   {
//     _id: "684bf08fc82663342346ba0ba092e",
//     title: "Ahire EV Homes 9 Square Vashi Testimonial ",
//     description: null,
//     like: 3,
//     dislike: 0,
//     videoUrl: "https://cdn.evhomes.tech/hls/vijay_ahire/vijay_ahire_1.m3u8",
//     thumbnail:
//       "https://cdn.evhomes.tech/811f5f2f-bebb-4f03-964f-62f5440190b3-Ahire.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6IjgxMWY1ZjJmLWJlYmItNGYwMy05NjRmLTYyZjU0NDAxOTBiMy1BaGlyZS5wbmciLCJpYXQiOjE3MzczODAwNDF9.4OdG05_IpehTlI9FT8H_H8dNErAt5sPdP1dicH-tbR8",
//     shareLink: null,
//     project: "project-ev-9-square-vashi-sector-9",
//     date: "2025-06-13T09:34:07.286Z",
//     // comments: [],
//     views: 34,
//   },
//   {
//     _id: "684bf08fc8afaf2663342346ba0ba092e",
//     title: "Ahire EV Homes 9 Square Vashi Testimonial ",
//     description: null,
//     like: 3,
//     dislike: 0,
//     videoUrl: "https://cdn.evhomes.tech/hls/vijay_ahire/vijay_ahire_1.m3u8",
//     thumbnail:
//       "https://cdn.evhomes.tech/811f5f2f-bebb-4f03-964f-62f5440190b3-Ahire.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6IjgxMWY1ZjJmLWJlYmItNGYwMy05NjRmLTYyZjU0NDAxOTBiMy1BaGlyZS5wbmciLCJpYXQiOjE3MzczODAwNDF9.4OdG05_IpehTlI9FT8H_H8dNErAt5sPdP1dicH-tbR8",
//     shareLink: null,
//     project: "project-ev-9-square-vashi-sector-9",
//     date: "2025-06-13T09:34:07.286Z",
//     // comments: [],
//     views: 34,
//   },
//   {
//     _id: "684bf08fc8afaf2663342346ba0ba092e",
//     title: "Ahire EV Homes 9 Square Vashi Testimonial ",
//     description: null,
//     like: 3,
//     dislike: 0,
//     videoUrl: "https://cdn.evhomes.tech/hls/vijay_ahire/vijay_ahire_1.m3u8",
//     thumbnail:
//       "https://cdn.evhomes.tech/811f5f2f-bebb-4f03-964f-62f5440190b3-Ahire.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6IjgxMWY1ZjJmLWJlYmItNGYwMy05NjRmLTYyZjU0NDAxOTBiMy1BaGlyZS5wbmciLCJpYXQiOjE3MzczODAwNDF9.4OdG05_IpehTlI9FT8H_H8dNErAt5sPdP1dicH-tbR8",
//     shareLink: null,
//     project: "project-ev-9-square-vashi-sector-9",
//     date: "2025-06-13T09:34:07.286Z",
//     // comments: [],
//     views: 34,
//   },
//   {
//     _id: "684bf08fc8afaf2663342346ba0ba092e",
//     title: "Ahire EV Homes 9 Square Vashi Testimonial ",
//     description: null,
//     like: 3,
//     dislike: 0,
//     videoUrl: "https://cdn.evhomes.tech/hls/vijay_ahire/vijay_ahire_1.m3u8",
//     thumbnail:
//       "https://cdn.evhomes.tech/811f5f2f-bebb-4f03-964f-62f5440190b3-Ahire.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaWxlbmFtZSI6IjgxMWY1ZjJmLWJlYmItNGYwMy05NjRmLTYyZjU0NDAxOTBiMy1BaGlyZS5wbmciLCJpYXQiOjE3MzczODAwNDF9.4OdG05_IpehTlI9FT8H_H8dNErAt5sPdP1dicH-tbR8",
//     shareLink: null,
//     project: "project-ev-9-square-vashi-sector-9",
//     date: "2025-06-13T09:34:07.286Z",
//     // comments: [],
//     views: 34,
//   },
// ];

const Videos = () => {
  // const loadingTestimonial = false;
  const [isLeftHovered, setIsLeftHovered] = useState(false);
  const [isLeftClicked, setIsLeftClicked] = useState(false);
  const [isRightHovered, setIsRightHovered] = useState(false);
  const [isRightClicked, setIsRightClicked] = useState(false);
  const videoGalleryRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: string) => {
    const container = videoGalleryRef.current;
    const scrollAmount = 400;
    if (container) {
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };
  const {
    getTestimonals,
    testimonials,
 loadingTestimonial,
  } = useData();


    useEffect(() => {
    getTestimonals();
  }, []);

  return (
    <div id="videos" className={styles.videos}>
      <div className={styles.heading}>VIDEOS</div>

      {loadingTestimonial ? (
        <p>Loading testimonials...</p>
      ) : testimonials != null && testimonials.length > 0 ? (
        <div className={styles.videoScrollWrapper}>
          <button
            className={styles.scrollButton}
            onClick={() => scroll("left")}
            onMouseEnter={() => setIsLeftHovered(true)}
            onMouseLeave={() => setIsLeftHovered(false)}
          >
            <Image
              src={
                isLeftHovered || isLeftClicked
                  ? "/images/leftFilledBtn.png"
                  : "/images/leftBtn.png"
              }
              alt="left"
              width={500}
              height={500}
            />
          </button>
          <div className={styles.videoGallery} ref={videoGalleryRef}>
            {testimonials.map((video, idx) => (
              <div
                key={idx}
                className={styles.videoBox}
                // onClick={() => handleVideoClick(video._id)}
                style={{ cursor: "pointer" }}
              >
                <video
                  src={video?.videoUrl ?? ""}
                  poster={video.thumbnail || ""}
                  className={styles.testimonialVideo}
                  muted
                />
                <p className={styles.caption}>{video.title || "Testimonial"}</p>
              </div>
            ))}
          </div>
          <button
            className={styles.scrollButton}
            onClick={() => scroll("right")}
            onMouseEnter={() => setIsRightHovered(true)}
            onMouseLeave={() => setIsRightHovered(false)}
          >
            <Image
              src={
                isRightHovered || isRightClicked
                  ? "/images/rightFilledBtn.png"
                  : "/images/rightBtn.png"
              }
              alt="right"
              width={500}
              height={500}
            />
          </button>
        </div>
      ) : (
        <p>No testimonials found.</p>
      )}
    </div>
  );
};

export default Videos;
