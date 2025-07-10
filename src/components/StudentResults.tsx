"use client";
import { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const videoUrls = [
  "https://www.tiktok.com/@tarik_hoca/video/7477519833676958984?lang=en",
  "https://www.tiktok.com/@tarik_hoca/video/7476963327055252743?lang=en",
  "https://www.tiktok.com/@tarik_hoca/video/7476962236540390664?lang=en",
  "https://www.tiktok.com/@tarik_hoca/video/7477564574170877202?lang=en",
  "https://www.tiktok.com/@tarik_hoca/video/7477166583245278471?lang=en",
  "https://www.tiktok.com/@tarik_hoca/video/7476962688032115976?lang=en",
  "https://www.tiktok.com/@tarik_hoca/video/7476963770942721298?lang=en",
  "https://www.tiktok.com/@tarik_hoca/video/7478691357083569416?lang=en",
  "https://www.tiktok.com/@tarik_hoca/video/7478136792575724818?lang=en",
  "https://www.tiktok.com/@tarik_hoca/video/7477509077053066514?lang=en",
  "https://www.tiktok.com/@tarik_hoca/video/7477173489422617864?lang=en",
  "https://www.tiktok.com/@tarik_hoca/video/7477169400324410632?lang=en",
  "https://www.tiktok.com/@tarik_hoca/video/7477174441118567688?lang=en",
  "https://www.tiktok.com/@tarik_hoca/video/7476964440282336519?lang=en",
  "https://www.tiktok.com/@tarik_hoca/video/7484182895066729736?lang=en",
  "https://www.tiktok.com/@tarik_hoca/video/7513293338343148807?lang=en",
];

export default function StudentResults() {
useEffect(() => {
  const script = document.createElement("script");
  script.src = "https://www.tiktok.com/embed.js";
  script.async = true;
  document.body.appendChild(script);

  script.onload = () => {
    // TikTok embed script yüklendikten sonra tekrar tetikle
    if ((window as any).tiktokEmbedLoad) {
      (window as any).tiktokEmbedLoad();
    }
  };

  return () => {
    document.body.removeChild(script);
  };
}, []);


  return (
    <section className="py-12 bg-[#F9FAFB]">
      <h2 className="text-3xl font-bold text-center mb-8 text-black">Student Results</h2>
      <div className="max-w-3xl mx-auto">
        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={20}
          slidesPerView={1}
          loop
        >
          {videoUrls.map((url, idx) => {
            const videoId = url.split("/").pop();
            return (
              <SwiperSlide key={idx}>
                <blockquote
                  className="tiktok-embed"
                  cite={url}
                  data-video-id={videoId}
                  style={{ maxWidth: "100%", minWidth: "600px" }}
                >
                  <section></section>
                </blockquote>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
